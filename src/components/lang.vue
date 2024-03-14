<script setup lang='ts'>
const BASE_URL = import.meta.env.BASE_URL
const langList = [{
  text: 'عربي',
  value: 'ar',
}, {
  text: 'español',
  value: 'es',
}, {
  text: 'Français',
  value: 'fr',
}, {
  text: 'Português',
  value: 'pt',
}, {
  text: 'русский язык',
  value: 'ru',
}, {
  text: 'English',
  value: 'en',
}, {
  text: 'Việt Nam',
  value: 'vi',
}, {
  text: 'Italia',
  value: 'it',
}]
const { setLang: sl, lang } = useLang()
const active = ref(lang)

function setLang(local: string) {
  active.value = local
  sl(local)
}
</script>

<template>
  <v-menu location="bottom" transition="slide-y-transition" eager :content-class="`${active === 'ar' ? '!left-0 !right-unset' : '!left-unset !right-0'}`">
    <template #activator="{ props }">
      <v-btn v-bind="props">
        <img :src="`/img/lang/${active}.png`" class="h-28px w-28px">
      </v-btn>
    </template>
    <v-list color="#5713D4">
      <v-list-item
        v-for="(item, index) in langList" :key="index" :active="active === item.value" :value="index"
        @click="setLang(item.value)"
      >
        <v-list-item-title class="h-30px w-30px">
          <img :src="`/img/lang/${item.value}.png`" class="h-full w-full">
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
