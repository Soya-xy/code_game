<script setup lang='ts'>
import type { Chart } from 'klinecharts'
import type { Nullable } from 'vitest'
import Limbo from '~/components/Limbo.vue'

const router = useRouter()
const tab = ref('Parity')

const recordTab = ref('Parity Record')
const chart = shallowRef<Nullable<Chart>>()
const fly = ref()
const recordList = ref<number[]>([])
const record = computed(() => {
  chart.value && chart.value.applyNewData(genData())

  return [
  `${tab.value} Record`,
  `My ${tab.value} Record`,
  ]
})

watch(tab, async () => {
  await nextTick()
  recordTab.value = record.value[0]
})

const itemsRecord = ref([
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
])

function genData(timestamp = new Date().getTime(), length = 800) {
  let basePrice = 5000
  timestamp = Math.floor(timestamp / 1000 / 60) * 60 * 1000 - length * 60 * 1000
  const dataList = []
  for (let i = 0; i < length; i++) {
    const prices = []
    for (let j = 0; j < 4; j++)
      prices.push(basePrice + Math.random() * 60 - 30)

    prices.sort()
    const open = +(prices[Math.round(Math.random() * 3)].toFixed(2))
    const high = +(prices[3].toFixed(2))
    const low = +(prices[0].toFixed(2))
    const close = +(prices[Math.round(Math.random() * 3)].toFixed(2))
    const volume = Math.round(Math.random() * 100) + 10
    const turnover = (open + high + low + close) / 4 * volume
    dataList.push({ timestamp, open, high, low, close, volume, turnover })

    basePrice = close
    timestamp += 60 * 1000
  }
  return dataList
}

const number = ref(1)

function gameEnd(e: number) {
  recordList.value.unshift(e)
}
</script>

<template>
  <div>
    <v-toolbar color="#5713d4" elevation="2" height="58">
      <v-btn icon="i-mdi-arrow-left" @click="router.back()" />
      <v-app-bar-title>BIT GAME</v-app-bar-title>
      <template #append>
        <p>₹ 0.00</p>
        <v-btn icon="i-mdi-wallet" />

        <v-btn icon="i-mdi-help-circle" />
      </template>
    </v-toolbar>

    <!-- game -->
    <v-card rounded="0" m8px p="[8px_8px_0]">
      <div relative>
        <Limbo ref="fly" @end="gameEnd" />
        <div absolute right-0 top-10px w-full flex flex-row-reverse overflow-x-scroll>
          <div v-for="(v, i) in recordList" :key="i" m-1 rounded-2 bg-green-500 px-2 py1 text-white>
            {{ v }}
          </div>
        </div>
      </div>
    </v-card>
    <v-card rounded="0" m8px p="[10px]">
      <div flex items-center justify="between">
        <p>
          Cashout in
        </p>
        <div w="40%" flex justify="between" items-center>
          <v-btn class="h-full" variant="tonal" @click="number > 0 && number--">
            <v-icon>
              i-mdi-minus
            </v-icon>
          </v-btn>
          <p class="text-28px">
            {{ number }}
          </p>
          <v-btn class="h-full" variant="tonal" @click="number++">
            <v-icon>
              i-mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
    <v-card rounded="0" m8px p="[10px]">
      <div flex items-center>
        <div flex-1>
          <div flex items-center justify="between">
            <p>
              Cashout in
            </p>
            <div flex justify="between" items-center>
              <v-btn class="h-full" variant="tonal" @click="number > 0 && number--">
                <v-icon>
                  i-mdi-minus
                </v-icon>
              </v-btn>
              <p class="mx-2 text-28px">
                {{ number }}
              </p>
              <v-btn class="h-full" variant="tonal" @click="number++">
                <v-icon>
                  i-mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div flex items-center justify="between">
            <p>
              Cashout in
            </p>
            <div flex justify="between" items-center>
              <v-btn class="h-full" variant="tonal" @click="number > 0 && number--">
                <v-icon>
                  i-mdi-minus
                </v-icon>
              </v-btn>
              <p class="mx-2 text-28px">
                {{ number }}
              </p>
              <v-btn class="h-full" variant="tonal" @click="number++">
                <v-icon>
                  i-mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div p="1.7rem" ml-3 bg-red-500 text-white @click="fly.startGame((Math.random() * 100).toFixed(2))">
          Bet
        </div>
      </div>
    </v-card>

    <!--  -->
    <v-card rounded="0" m8px p="[0px_8px_12px]">
      <div w-full>
        <v-tabs v-model="recordTab" align-tabs="center" fixed-tabs bg-color="#fff" color="primary">
          <v-tab v-for="item in record" :key="item" :value="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-window v-model="recordTab">
          <v-window-item v-for="n in record" :key="n" :value="n">
            <v-data-table :items="itemsRecord">
              <template #bottom>
                <v-pagination :length="10" variant="plain" size="small" class="custom-page" />
              </template>
            </v-data-table>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: empty
</route>

<style scoped>
.custom-page :deep(.v-pagination__item) {
  display: none;
}
</style>
