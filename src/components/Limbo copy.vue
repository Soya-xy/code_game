<script setup lang='ts'>
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'
import { crashAssets } from '~/utils/pixi'

const emit = defineEmits(['startGame', 'end'])
const container = ref()
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
let shipReady: PIXI.Container
let shipLaunch: PIXI.Sprite
let explode: PIXI.AnimatedSprite
sound.add('winMp3', '/limbo/win.mp3')
sound.add('loseMp3', '/limbo/losing.mp3')

const textBoom: any = []
const waypoints = [
  {
    x: 50,
    y: 687,
  },
  {
    x: 920,
    y: 637,
  },
  {
    x: 920,
    y: 200,
  },
]
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
    width: screen.width,
    height: screen.height,
    backgroundColor: '#000', // 背景颜色，这里是黑色
    backgroundAlpha: 0, // 背景透明度，0 表示完全透明
  })
  container.value.appendChild(app.view)

  // 背景
  const bgSvg = PIXI.Texture.from('ground')
  const bg = new PIXI.Sprite(bgSvg)

  bg.width = screen.width
  bg.height = screen.height
  bg.anchor.set(0, 1)
  bg.position.set(0, screen.height)
  bg.width = screen.width
  bg.scale.y = bg.scale.x
  app.stage.addChild(bg)

  // 烟雾
  PIXI.Assets.get('dx')

  for (let s = 1; s <= 8; ++s) {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    textBoom.push(PIXI.Texture.from('dx'.concat(s, '.png')))
  }

  // 飞船
  // const atlas = PIXI.Assets.get('atlas')

  shipReady = new PIXI.Container()

  const glow = new PIXI.Sprite(PIXI.Texture.from('glow'))
  glow.anchor.set(0.5, 0.5)
  glow.scale.set(2.5, 2.5)
  glow.visible = false

  const racoon = new PIXI.Sprite(PIXI.Texture.from('racoon'))
  racoon.scale.set(0.5, 0.5)
  racoon.anchor.set(0.5, 0.5)
  racoon.position.set(waypoints[0].x, waypoints[0].y)

  const moon = new PIXI.Sprite(PIXI.Texture.from('moon.png'))
  moon.position.set(screen.width + 20, -20)
  moon.anchor.set(0.5, 0.5)

  const fumes = new PIXI.AnimatedSprite(textBoom)
  fumes.loop = false
  fumes.animationSpeed = 0.3
  fumes.anchor.set(0.5, 0.5)
  fumes.position.copyFrom(shipReady.position)
  fumes.play()

  shipReady.addChild(glow)
  shipReady.addChild(racoon)
  shipReady.addChild(moon)

  app.stage.addChild(shipReady)
  app.stage.addChild(fumes)
})

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
  <div ref="container" className="max-w-100% PixiPanel" />
</template>

<style>
.PixiPanel canvas {
  width: 100% !important;
  height: auto;
  cursor: inherit
}
</style>
