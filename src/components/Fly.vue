<script setup lang='ts'>
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound'
import { assetsLoad } from '~/utils/pixi'

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
sound.add('flyMp3', '/limbo/limbo_fly.mp3')
sound.add('winMp3', '/limbo/limbo_win.mp3')
sound.add('loseMp3', '/limbo/losing.mp3')

onMounted(async () => {
  await PIXI.Assets.load(assetsLoad.map((v) => {
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

  const bgSvg = PIXI.Texture.from('bg')
  const texture = PIXI.Texture.from('ship_ready')
  const texture2 = PIXI.Texture.from('ship_launch')
  const upPng = PIXI.Texture.from('up')
  shipReady = new PIXI.Container()
  const sprite1 = new PIXI.Sprite(texture)
  shipLaunch = new PIXI.Sprite(texture2)
  const up = new PIXI.Sprite(upPng)
  const bg = new PIXI.Sprite(bgSvg)
  const fireAnimation = new PIXI.AnimatedSprite(PIXI.Assets.get('fires').animations.fires)
  explode = new PIXI.AnimatedSprite(PIXI.Assets.get('explode').animations.expl)
  explode.anchor.set(0.5, 0.5)
  explode.animationSpeed = 0.3
  explode.loop = false
  explode.visible = false
  explode.onComplete = function () {
    explode.visible = false
  }

  fireAnimation.anchor.set(0.5, 0)
  fireAnimation.animationSpeed = 0.5
  fireAnimation.play()

  bg.width = screen.width
  bg.height = screen.height
  up.width = screen.width
  up.height = screen.height

  sprite1.anchor.set(0.5, 0.5)
  shipReady.addChild(sprite1)
  shipReady.addChild(fireAnimation)

  shipLaunch.anchor.set(0.5, 0.5)
  shipLaunch.visible = false

  shipLaunch.position.set(screen.width / 2, screen.height - 100)
  shipReady.position.set(screen.width / 2, screen.height - 100)
  explode.position.set(screen.width / 2, screen.height - 100)

  app.stage.addChild(bg)
  app.stage.addChild(up)
  app.stage.addChild(shipReady)
  app.stage.addChild(shipLaunch)
  app.stage.addChild(explode)

  bitmapText = new PIXI.BitmapText('1x', {
    fontName: 'Montserrat ExtraBold',
    fontSize: 128,
    align: 'center',
  })
  bitmapText.position.set(screen.width / 2, screen.height / 2)
  bitmapText.anchor.set(0.5, 0.5)
  bitmapText.tint = 16777215

  app.stage.addChild(bitmapText)
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
