<script setup lang='ts'>
const router = useRouter()
const tab = ref()
const items = ref([
  'Parity',
  'Sapre',
  'Bcone',
  'Emerd',
])
const startTime = ref(new Date())
const nextTime = ref()
function setNextTime() {
  nextTime.value = new Date(startTime.value.getTime() + 1000 * 60 * 3)
  setTimeout(() => {
    setNextTime()
  }, 1000 * 60 * 3)
}
onMounted(() => {
  setNextTime()
})
</script>

<template>
  <div>
    <v-toolbar color="#5713d4" elevation="2" height="58">
      <v-btn icon="i-mdi-arrow-left" @click="router.back()" />
      <v-app-bar-title>Win Go</v-app-bar-title>
      <template #append>
        <p>₹ 0.00</p>
        <v-btn icon="i-mdi-wallet" />

        <v-btn icon="i-mdi-help-circle" />
      </template>
      <template #extension>
        <div w-full>
          <v-tabs v-model="tab" align-tabs="center" fixed-tabs bg-color="#fff" color="primary">
            <v-tab v-for="item in items" :key="item" :value="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </div>
      </template>
    </v-toolbar>

    <!--  -->
    <v-card rounded="0" m8px p="[0px_8px_12px]">
      <div flex justify="between" items-center>
        <div class="m12px flex items-center text-18px text-#7d7d7d font-bold">
          <v-icon icon="i-mdi-trophy" size="small" mr-2 />Period
        </div>
        <div class="m12px text-18px text-#7d7d7d font-bold">
          Count Down
        </div>
      </div>
      <div flex justify="between" items-center>
        <div class="mx12px flex items-center text-22px font-bold tracking-widest">
          20240131377
        </div>
        <div class="mx12px text-18px font-bold">
          <count-down :date="nextTime" />
        </div>
      </div>
    </v-card>

    <!-- game -->
    <v-card rounded="0" m8px p="20px">
      <v-row>
        <v-col
          cols="4"
          justify="center"
        >
          <v-btn color="#00E676" class="text-white" w-full>
            Join Green
          </v-btn>
        </v-col>
        <v-col
          cols="4"
          justify="center"
        >
          <v-btn color="#651FFF" class="text-white" w-full>
            Join Violet
          </v-btn>
        </v-col>
        <v-col
          cols="4"
          justify="center"
        >
          <v-btn color="red" class="text-white" w-full>
            Join Red
          </v-btn>
        </v-col>
      </v-row>
      <div class="mt-4 flex flex-wrap items-center gap-5px">
        <v-btn
          v-for="n in 10"
          :key="n"
          color="orange" width="70px" class="basis-[19%] text-white"
        >
          {{ n }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
