<script setup lang='ts'>
import SwiperVue from './Swiper.vue'

const variants = ['elevated', 'flat', 'tonal', 'outlined']
</script>

<template>
  <div class="h-full bg-[#FAFAFA] pb-24">
    <SwiperVue />
    <v-row align="center" justify="center" class="p-4">
      <v-col
        v-for="(_variant, i) in variants" :key="i"
        cols="6"
      >
        <v-card class="mx-auto" col max-width="344" variant="elevated" elevation="5">
          <v-card-item>
            <div flex="~ col" justify="center">
              <img src="https://cooe.in/images/wingo_enter.png" class="h-33 w-full">
              <div class="text-caption mt-1">
                Greyhound divisely hello coldly fonwderfully
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
