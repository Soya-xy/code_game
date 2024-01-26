<script setup lang='ts'>
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const tabbar = useTabbarStore()
const { active } = storeToRefs(tabbar)

watch(() => route.name, (name) => {
  switch (name) {
    case 'index':
      tabbar.setActive(0)
      break
    case 'promotion':
      tabbar.setActive(1)
      break
    case 'mine':
      tabbar.setActive(2)
      break
  }
}, {
  immediate: true,
})

function jump(v: number) {
  switch (v) {
    case 0:
      router.push({ name: 'index' })
      tabbar.setActive(0)
      break
    case 1:
      router.push({ name: 'promotion' })
      tabbar.setActive(1)
      break
    case 2:
      router.push({ name: 'mine' })
      tabbar.setActive(2)
      break
  }
}
</script>

<template>
  <v-bottom-navigation v-model="active" :elevation="1" active absolute grow class="custom-tabbar" color="primary">
    <v-btn :value="0" @click="jump(0)">
      <v-icon icon="i-mdi-controller" />
      <span>Home</span>
    </v-btn>

    <v-btn :value="1" @click="jump(1)">
      <v-icon icon="i-mdi-tag-heart" />
      <span>Promotion</span>
    </v-btn>

    <v-btn :value="2" @click="jump(2)">
      <v-icon icon="i-mdi-face-man" />
      <span>Mine</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped>
.custom-tabbar :deep(.v-btn--active>.v-btn__overlay) {
  opacity: 0;
}
</style>
