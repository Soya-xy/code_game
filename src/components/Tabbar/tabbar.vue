<script setup lang='ts'>
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const tabbar = useTabbarStore()
const { active } = storeToRefs(tabbar)

function jump(v: string, to = true) {
  switch (v) {
    case 'index':
      to && router.push({ name: 'index' })
      tabbar.setActive(0)
      break
    case 'promotion':
      to && router.push({ name: 'promotion' })
      tabbar.setActive(1)
      break
    case 'support':
      to && router.push({ name: 'support' })
      tabbar.setActive(2)
      break
    case 'mine':
      to && router.push({ name: 'mine' })
      tabbar.setActive(3)
      break
  }
}

watch(() => route.name, (name) => {
  jump(name as string, false)
}, {
  immediate: true,
})
</script>

<template>
  <v-bottom-navigation v-model="active" :elevation="3" active fixed grow class="custom-tabbar" color="primary">
    <v-btn :value="0" @click="jump('index')">
      <v-icon icon="i-mdi-controller" />
      <span>Home</span>
    </v-btn>

    <v-btn :value="1" @click="jump('promotion')">
      <v-icon icon="i-mdi-tag-heart" />
      <span>Promotion</span>
    </v-btn>

    <v-btn :value="2" @click="jump('support')">
      <v-icon icon="i-mdi-face-agent" />
      <span>Support</span>
    </v-btn>

    <v-btn :value="3" @click="jump('mine')">
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
