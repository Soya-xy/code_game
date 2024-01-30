<script setup>
import { useLocale } from 'vuetify'

const { current } = useLocale()
console.log('🚀 ~ current:', current)
</script>

<template>
  <v-app class="mx-auto max-w-500px overflow-x-hidden">
    <RouterView />
  </v-app>
</template>
