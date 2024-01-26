<script setup>
// 监听resize事件，网页刷新
window.addEventListener('resize', () => {
  window.location.reload()
})
</script>

<template>
  <v-app class="mx-auto max-w-500px overflow-hidden">
    <RouterView />
  </v-app>
</template>
