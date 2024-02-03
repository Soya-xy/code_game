<script setup lang='ts'>
import { TooltipShowRule, dispose, init } from 'klinecharts'

const router = useRouter()
const tab = ref('Parity')

const recordTab = ref('Parity Record')
const chart = shallowRef()

const items = ref([
  'BTC',
  'ETH',
])

const btn = ref([
  {
    title: 'B',
    number: 1.95,
    color: '#009A3F',
  },
  {
    title: 'S',
    number: 1.95,
    color: '#E7162C',
  },
  {
    title: 'O',
    number: 1.95,
    color: '#EEA901',
  },
  {
    title: 'E',
    number: 1.95,
    color: '#2276E0',
  },
  {
    title: 'SE',
    number: 1.95,
    color: '#DE3CAE',
  },
  {
    title: 'SO',
    number: 1.95,
    color: '#01A89B',
  },
  {
    title: 'SE',
    number: 1.95,
    color: '#FF7022',
  },
  {
    title: 'BO',
    number: 1.95,
    color: '#A512F7',
  },
])

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

const btn_disabled = ref(false)

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

onMounted(() => {
  // 初始化图表
  chart.value = init('chart', {
    styles: {
      xAxis: {

      },
      candle: {
        tooltip: {
          showRule: TooltipShowRule.None,
        },
      },
      indicator: {
        tooltip: {
          showRule: TooltipShowRule.None,
        },
      },
    },
  })!

  // 为图表添加数据
  chart.value.applyNewData(genData())

  chart.value.createIndicator('MA', true, { id: 'candle_pane' })
  chart.value.createIndicator('BOLL', true, { id: 'candle_pane' })
})

const toggle = ref(0)

const number = ref(1)
const total = computed(() => {
  return number.value * (toggle.value === 1 ? 100 : (toggle.value === 2 ? 1000 : (toggle.value === 3 ? 10000 : 10)))
})
onUnmounted(() => {
  // 销毁图表
  dispose('chart')
})
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
          <count-down
            :min="180" @start="btn_disabled = false"
            @end="btn_disabled = true"
          />
        </div>
      </div>
    </v-card>

    <!-- game -->
    <v-card rounded="0" m8px p="[0px_8px]">
      <div id="chart" h-300px w-full />
      <div flex items-center justify-between py-2>
        <p text-sm>
          20240203191
        </p>
        <p text-sm>
          43173.94
        </p>
        <p text="sm red-500">
          3+9+4=16
        </p>
        <p text-white>
          <span class="text-btn-S" px2>S</span><span class="text-btn-E" px2>E</span><span class="text-btn-SE" px2>SE</span>
        </p>
      </div>
    </v-card>
    <v-card rounded="0" m8px p="[10px_4px]">
      <v-row dense>
        <v-col v-for="(n, i) in btn" :key="i" cols="3" justify="center">
          <v-btn :color="n.color" class="w-full text-white" height="45" :disabled="btn_disabled">
            <div text-base leading-4>
              <p>{{ n.title }}</p>
              <p>{{ n.number }}</p>
            </div>
            <!-- diaglog -->
            <v-dialog
              min-width="325px" transition="dialog-bottom-transition" persistent
              activator="parent" width="auto"
            >
              <template #default="{ isActive }">
                <v-card>
                  <v-toolbar color="primary" :title="`Select ${n.title}`" />
                  <div class="px-16px">
                    <p class="my-12px font-bold">
                      Contract Money
                    </p>
                    <v-btn-toggle v-model="toggle" color="primary" elevation="2" mandatory rounded="0" height="20">
                      <v-btn size="small">
                        10
                      </v-btn>
                      <v-btn size="small">
                        100
                      </v-btn>
                      <v-btn size="small">
                        1000
                      </v-btn>
                      <v-btn size="small">
                        10000
                      </v-btn>
                    </v-btn-toggle>

                    <div>
                      <p class="my-12px font-bold">
                        Number
                      </p>
                      <div w-full flex justify="between" items-center>
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
                      <p class="my-12px font-bold">
                        Total contract money is {{ total }}
                      </p>
                    </div>
                    <div flex>
                      <v-checkbox style="--v-medium-emphasis-opacity:1">
                        <template #label>
                          <p text-14px>
                            I agree
                            <span text="#0288d1 14px" class="font-bold" @click.stop.prevent="number++">
                              PRESALE RULE
                            </span>
                          </p>
                        </template>
                      </v-checkbox>
                    </div>
                  </div>

                  <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="isActive.value = false">
                      CANCEL
                    </v-btn>
                    <v-btn variant="text" color="primary" @click="isActive.value = false">
                      CONFIRM
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
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
