<script setup lang='ts'>
const games = [{
  name: 'Win Go',
  img: '/img/win01.png',
}, {
  name: 'Lucky Hit',
  img: '/img/bit02.png',
}, {
  name: 'Aviator',
  img: '/img/fly01.png',
}, {
  name: 'Mines',
  img: '/img/roc01.png',
}]
</script>

<template>
  <v-row align="center" justify="center" class="m-0 p-2 pt-0">
    <v-col
      v-for="(v, i) in games" :key="i"
      cols="6"
      p-2 pt-0
    >
      <v-card class="mx-auto" col max-width="250" variant="elevated" elevation="5">
        <v-card-item>
          <div flex="~ col" justify="center">
            <img :src="v.img" class="w-full">
            <div class="text-caption mt-1">
              {{ v.name }}
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
