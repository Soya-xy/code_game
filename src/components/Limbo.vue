<script setup lang='ts'>
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'
import { crashAssets } from '~/utils/pixi'

const emit = defineEmits(['startGame', 'end'])
const container = ref()
const spineCanvas = ref()
const bumpTarget = ref(0)
const bumpTimer = ref(0)
const screen = {
  width: 1000,
  height: 737,
  backgroundColor: '#000',
  backgroundAlpha: 0,
}
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
let bitmapText: PIXI.BitmapText
let wordFlyAray: PIXI.Text
let shipReady: PIXI.Container
const blurLayer: PIXI.Container = new PIXI.Container()
const waitingPoint: PIXI.Container = new PIXI.Container()
const centerPoint: PIXI.Container = new PIXI.Container()
let bg: PIXI.Sprite
let spWaitting: PIXI.Sprite
let bgBlur: PIXI.Sprite
let shipLaunch: PIXI.Sprite
let explode: PIXI.AnimatedSprite

let blurGraphics: PIXI.Graphics = new PIXI.Graphics()

sound.add('winMp3', '/limbo/win.mp3')
sound.add('loseMp3', '/limbo/losing.mp3')

onMounted(async () => {
  await PIXI.Assets.load(crashAssets.map((v) => {
    PIXI.Assets.add({
      alias: v.alias,
      src: v.url,
      name: v.name,
    })
    return v.alias
  }))

  const app = new PIXI.Application({
    width: 580,
    height: 280,
    backgroundAlpha: 0, // 背景透明度，0 表示完全透明
    antialias: !0,
    autoDensity: !0,
    resolution: 1.5,
    resizeTo: spineCanvas.value,
    view: spineCanvas.value,
  })
  // DEBUG
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  globalThis.__PIXI_APP__ = app

  app.stage.addChildAt(centerPoint, 0)
  centerPoint.addChild(waitingPoint)

  // 等待点
  const spWaittingSvg = PIXI.Texture.from('porp')
  spWaitting = new PIXI.Sprite(spWaittingSvg)
  spWaitting.anchor.set(0.5, 0.5)
  spWaitting.y = -50
  waitingPoint.addChild(spWaitting)

  // 等待文字

  const nextRound = new PIXI.Text('NEXT_ROUND', {
    fontFamily: 'Roboto',
    fontSize: 50,
    fill: 16777215,
    align: 'center',
    fontWeight: 'bolder',
  })
  nextRound.anchor.set(0.5, 0.5)
  nextRound.y = 60
  waitingPoint.addChild(nextRound)

  // 背景
  const bgSvg = PIXI.Texture.from('bg-sun')
  bg = new PIXI.Sprite(bgSvg)
  bg.anchor.set(0.5, 0.5)
  app.stage.addChildAt(bg, 0)

  // 背景模糊
  const blurSvg = PIXI.Texture.from('blur')
  bgBlur = new PIXI.Sprite(blurSvg)
  bgBlur.anchor.set(0.5)
  app.stage.addChildAt(blurLayer, 0)
  blurLayer.addChildAt(bgBlur, 0)

  // 背景色
  app.stage.addChildAt(blurGraphics, 0)
  blurGraphics = new PIXI.Graphics()
  blurGraphics.beginFill(2563616, 0.4)
  blurGraphics.drawRect(0, 0, 2e3, 1e3)

  // 飞行文字
  wordFlyAray = new PIXI.Text('FLEW_AWAY', {
    fontFamily: 'Roboto',
    fontSize: 50,
    fill: 16777215,
    align: 'center',
    fontWeight: 'bolder',
  })
  wordFlyAray.anchor.set(0.5, 0.5)
  wordFlyAray.y = -90
  centerPoint.addChild(wordFlyAray)

  // 添加完成
  container.value.appendChild(app.view)
  reposition()
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  reposition()
}
const blurMargin = 60
function reposition() {
  const t = spineCanvas.value
  if (spineCanvas.value) {
    // const e = Math.min(t.clientWidth ** 0.6 / 50, 1)
    // const i = Math.min(t.clientHeight ** 0.6 / 50, 1)
    // const n = Math.min(e, i)
    bg.y = t.clientHeight

    // this.centerPoint.x = t.clientWidth / 2
    // this.centerPoint.y = t.clientHeight / 2
    // this.centerPoint.scale.set(n, n)
    // this.planeStatus == 0 && (this.peijiPoint.x = this.margin
    // this.peijiPoint.y = t.clientHeight - this.margin)

    bgBlur.scale.set((t.clientWidth - 2 * Math.min(blurMargin, t.clientWidth / 10)) / 438, (t.clientHeight - 2 * Math.min(blurMargin, t.clientHeight / 10)) / 334)

    bgBlur.x = t.clientWidth / 2
    bgBlur.y = t.clientHeight / 2

    // this.peijiPoint.scale.set(n, n)
    const r = (t.clientWidth ** 2 + t.clientHeight ** 2) ** 0.5 / (bg.width / 2)
    console.log('🚀 ~ reposition ~ r:', r)
    bg.scale.set(r, r)
  }
}

function updateX(e: number) {
  bumpTimer.value += (e / 100)
  const t = bumpTimer.value / 0.5
  if (t > 1) {
    bitmapText.text = `${Math.floor(bumpTarget.value).toFixed(2)}x`
    const tl = gsap.timeline()
    tl.set(bitmapText, {
      pixi: {
        scaleX: 1,
        scaleY: 1,
      },
    }).to(bitmapText, {
      pixi: {
        scaleX: 1.5,
        scaleY: 1.5,
      },
    }).to(bitmapText, {
      pixi: {
        scaleX: 1,
        scaleY: 1,
      },
    })
    sound.play('winMp3')
    bitmapText.tint = 4115583
    shipReady.visible = true
    shipLaunch.visible = false
    explode.visible = false
    emit('end', bumpTarget.value)
  }
  else {
    if (bitmapText) {
      const i = 0 + (bumpTarget.value - 0) * t
      bitmapText.text = `${Number(i).toFixed(2)}x`
    }
    setTimeout(() => {
      updateX(e++)
    }, 10)
  }
}

function startGame(e: number) {
  bumpTarget.value = e
  shipReady.visible = false
  shipLaunch.visible = true
  explode.visible = true
  explode.gotoAndPlay(0)

  bitmapText.text = '1x'
  bitmapText.tint = 16777215
  bumpTimer.value = 0

  const tl = gsap.timeline()
  sound.play('flyMp3')
  tl.set(shipLaunch, {
    y: screen.height - 100,
    pixi: {
      scaleX: 1,
      scaleY: 1,
    },
  }).to(shipLaunch, {
    y: screen.height / 2,
    pixi: {
      scaleX: 0,
      scaleY: 0,
    },
  })
  setTimeout(() => {
    updateX(1)
  }, 600)
}

defineExpose({
  startGame,
})
</script>

<template>
  <div ref="container" class="PixiPanel max-w-100%">
    <canvas ref="spineCanvas" class="wh-full" />
  </div>
</template>

<style>
.PixiPanel canvas {
  width: 100% !important;
  height: auto;
  cursor: inherit
}
</style>
