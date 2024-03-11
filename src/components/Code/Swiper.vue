<script setup lang='ts'>
const BASE_URL = import.meta.env.BASE_URL
</script>

<template>
  <div>
    <v-carousel
      height="125" :show-arrows="false" interval="40000"
      hide-delimiters cycle my-2 px-2
    >
      <v-carousel-item v-for="v in 2" :key="v" :src="`${BASE_URL}/img/lunbo${v}.png`" selected-class="selected-item" />
    </v-carousel>
  </div>
</template>

<style scoped>
.selected-item :deep(.v-img__img) {
  object-fit: fill;
  border-radius: 10px;
}
</style>
