<script setup>
import { useLocale } from 'vuetify'

const loading = useLoading()
const { loading: overlay } = storeToRefs(loading)

const { current } = useLocale()
console.log('🚀 ~ current:', current)
</script>

<template>
  <v-app class="mx-auto max-w-500px overflow-x-hidden">
    <RouterView />
    <v-overlay
      :model-value="overlay"
      persistent

      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      />
    </v-overlay>
  </v-app>
</template>
