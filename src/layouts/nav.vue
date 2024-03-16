<script setup lang="ts">
const router = useRouter()
const icon = computed<any>(() => router?.currentRoute?.value?.meta)
function jump() {
  if (icon.value?.path)
    router.push(icon.value.path)
}
</script>

<template>
  <div>
    <Suspense>
      <v-layout>
        <v-app-bar elevation="3" color="#5713d4" :height="56">
          <v-btn icon="i-mdi-arrow-left" @click="router.back()" />
          <v-app-bar-title>{{ icon.title }}</v-app-bar-title>
          <template v-if="icon.icon" #append>
            <v-btn :icon="icon.icon" @click="jump" />
          </template>
        </v-app-bar>

        <v-main>
          <v-container bg="#FAFAFA" class="h-[calc(100vh-60px)] overflow-scroll p0">
            <main>
              <RouterView />
            </main>
          </v-container>
        </v-main>
      </v-layout>
    </Suspense>
    <!-- <TabbarTabbar /> -->
  </div>
</template>
