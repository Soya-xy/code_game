<script setup lang='ts'>
const router = useRouter()
console.log(import.meta.env.BASE_URL)

const games = [{
  name: 'Win Go',
  sub: '1Min',
  img: `${import.meta.env.BASE_URL}img/win01.png`,
  url: '/games/wingo?min=60',
}, {
  name: 'Win Go',
  sub: '3Min',
  img: `${import.meta.env.BASE_URL}img/win03.png`,
  url: '/games/wingo?min=180',
}, {
  name: 'Win Go',
  sub: '5Min',
  img: `${import.meta.env.BASE_URL}img/win05.png`,
  url: '/games/wingo?min=300',
}, {
  name: 'Bit Game',
  img: `${import.meta.env.BASE_URL}img/bit02.png`,
  url: '/games/bitgame',
}, {
  name: 'Aviator',
  img: `${import.meta.env.BASE_URL}img/fly01.png`,
  url: '/games/limbo',
}, {
  name: 'Mines',
  img: `${import.meta.env.BASE_URL}img/roc01.png`,
  url: '/games/crash',
}]
</script>

<template>
  <v-row align="center" justify="center" class="m-0 p-2 pt-0">
    <v-col v-for="(v, i) in games" :key="i" cols="6" p-2 pt-0>
      <v-card class="mx-auto" col max-width="250" variant="elevated" elevation="5">
        <v-card-item @click="router.push(v.url)">
          <div flex="~ col" justify="center">
            <img :src="v.img" class="w-full">
            <div class="mt-1 text-center">
              {{ v.name }}
              <p>
                {{ v.sub || '&nbsp;' }}
              </p>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>

  <!-- <v-row align="center" justify="center" class="m-0 p-2 pt-0">
    <v-col
      v-for="(v) in ['2c67b00158c14fa098b819cff0a1e71c113', 'e9acc3283d044e1c98ef8d22accb18b622402']" :key="v"
      cols="6" p-2 pt-0
    >
      <div w="full" h="150px" relative>
        <img :src="`/img/${v}.webp`" h-full w-full rounded-3 alt="">
        <div justify="center" absolute bottom-3 right-0 w-full flex px-2>
          <div class="btns text-center text-white leading-7">
            Play Now
          </div>
        </div>
      </div>
    </v-col>
  </v-row> -->
</template>

<style scoped>
.btns {
  border-radius: 6px;
  align-self: flex-start;
  flex-direction: column;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  border-top-style: solid;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  height: 28px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px 4px;
}
</style>
