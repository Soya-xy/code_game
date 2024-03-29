<script setup lang='ts'>
import { ref } from 'vue'

const router = useRouter()
const { query }: any = useRoute()
const tab = ref('Parity')
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const recordTab = ref('Parity Record')
const number = ref(1)
const windows = ref(false)
const items = ref([
  'Parity',
  'Sapre',
  'Bcone',
  'Emerd',
])
const startType = query.min === '60' ? 4 : (query.min === '180' ? 0 : 8)

const gameType = ref(startType + 1)
const record = computed(() => [
  `${tab.value} Record`,
  `My ${tab.value} Record`,
])
const userRecord = ref([])

const toggle = ref(0)
const startTime = ref(new Date())
const nextTime = ref()

const total = computed(() => {
  return number.value * (toggle.value === 1 ? 100 : (toggle.value === 2 ? 1000 : (toggle.value === 3 ? 10000 : 10)))
})

function setNextTime() {
  nextTime.value = new Date(startTime.value.getTime() + 1000 * 60 * 3)
  setTimeout(() => {
    setNextTime()
  }, 1000 * 60 * 3)
}
const headers = [{
  key: 'period',
  title: 'Period',
}, {
  key: 'resultPrice',
  title: 'Price',
}, {
  key: 'resultNum',
  title: 'Number',
  width: '30px',
}, {
  key: 'result',
  title: 'Result',
}]
const userHeaders = [{
  key: 'period',
  title: 'Period',
}, {
  key: 'GameResult',
  title: 'Result',
}, {
  key: 'winMoney',
  title: 'winMoney',
}, {
  key: 'pourType',
  title: 'Pour',
}, {
  key: 'result',
  title: 'Result',
}]
const itemsRecord = ref<any>([])

const pageNum = ref(1)
const agree = ref<boolean>(false)
onMounted(() => {
  setNextTime()
  getData()
})

watch(tab, async () => {
  await nextTick()
  recordTab.value = record.value[0]
  gameType.value = startType + (items.value.indexOf(tab.value) + 1)
  getData()
})

const periodId = ref('')
function getData() {
  getPeriod({
    gameType: gameType.value,
  }).then((res) => {
    if (res.res !== 0)
      periodId.value = res.obj.period
  })

  findGameLogByPage({
    gameType: gameType.value,
    pageSize: 10,
    pageNum: pageNum.value,
  }).then((res) => {
    if (res.res !== 0)
      itemsRecord.value = res.obj.results
  })
  findUserGameLogByPage({
    gameType: gameType.value,
    pageSize: 10,
    pageNum: pageNum.value,
  }).then((res) => {
    if (res.res !== 0)
      userRecord.value = res.obj.list.results
  })
}

const btn_disabled = ref(false)

function endGame(status: boolean) {
  if (!status)
    btn_disabled.value = status
  getData()
}

function openDialog() {
  windows.value = true
}

function stopGame() {
  btn_disabled.value = true

  windows.value = false
}
const moneyList = [10, 100, 1000, 10000]
const toast = useToast()
async function pourGame(pourType: any) {
  if (!agree.value) {
    toast.error('Please agree to the presale rule')
    return
  }

  const res: any = pour({
    gameType: gameType.value,
    pourType,
    pourCount: number.value,
    pourMoney: moneyList[toggle.value],
  })
  if (res.res !== 0) {
    getData()
    userStore.getUser()
    agree.value = false
    number.value = 1
    toggle.value = 0
    toast.success('Success')
  }
}
</script>

<template>
  <div>
    <v-toolbar color="#5713d4" elevation="2" height="58">
      <v-btn icon="i-mdi-arrow-left" @click="router.back()" />
      <v-app-bar-title>Win Go</v-app-bar-title>
      <template #append>
        <p>₹ {{ user?.money }}</p>
        <v-btn icon="i-mdi-wallet" @click="router.push('/recharge')" />

        <v-btn>
          <v-avatar size="28">
            <i class="i-mdi-help-circle" text-28px text-white />
          </v-avatar>
          <v-dialog min-width="325px" transition="dialog-bottom-transition" activator="parent" width="auto">
            <v-card>
              <v-toolbar color="primary" title="GAME RULE" />
              <div px4 py2 text-14px>
                <div style="padding: 4px;">
                  3 minutes 1 issue, 2 minutes 30 seconds you can place your bet and 30 seconds to show the lottery
                  result. it open 24/7. The total number of trades is 480 issues.
                </div>
                <div style="padding: 4px;">
                  If you spend 100 to trade, after the deduction 2 service fees, your bet amount is 98:
                </div>
                <div style="padding: 4px;">
                  1. JOIN GREEN: if the result show on board 1,3,7,9, you will get (98*2) a total of 196
                </div>
                <div style="padding: 4px;">
                  if the result shows 5, you will get (98*1.5) a total of 147
                </div>
                <div style="padding: 4px;">
                  2.JOIN RED: if the result shows 2,4,6,8, you will get (98*2) a total of 196
                </div>
                <div style="padding: 4px;">
                  if the result shows 0, you will get (98*1.5) a total of 147
                </div>
                <div style="padding: 4px;">
                  3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) a total of 441
                </div>
                <div style="padding: 4px;">
                  4. SELECT NUMBER: if the result is the same as the number you selected, you will get(98*9) a total of
                  882
                </div>
              </div>
            </v-card>
          </v-dialog>
        </v-btn>
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
          {{ periodId }}
        </div>
        <div class="mx12px text-18px font-bold">
          <count-down
            :date="nextTime" :min="Number(query.min)" @start="endGame(false)" @end="endGame(true)"
            @stop="stopGame"
          />
        </div>
      </div>
    </v-card>

    <!-- game -->
    <v-card rounded="0" m8px p="20px">
      <v-row>
        <v-col cols="4" justify="center">
          <v-btn color="#00E676" :disabled="btn_disabled" class="text-white" w-full>
            Join Green
            <v-dialog
              v-modal="windows" min-width="325px" transition="dialog-bottom-transition" persistent
              activator="parent" width="auto"
            >
              <template #default="{ isActive }">
                <v-card>
                  <v-toolbar color="primary" title="Join Green" />
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
                      <v-checkbox v-model="agree" style="--v-medium-emphasis-opacity:1">
                        <template #label>
                          <p text-14px>
                            I agree
                            <span text="#0288d1 14px" class="font-bold">
                              <!-- <span text="#0288d1 14px" class="font-bold" @click.stop.prevent="number++"> -->
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
                    <v-btn variant="text" color="primary" @click="pourGame('green'), isActive.value = false">
                      CONFIRM
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-btn>
        </v-col>
        <v-col cols="4" justify="center">
          <v-btn color="#651FFF" :disabled="btn_disabled" class="text-white" w-full>
            Join Violet
            <v-dialog
              v-modal="windows" min-width="325px" transition="dialog-bottom-transition" persistent
              activator="parent" width="auto"
            >
              <template #default="{ isActive }">
                <v-card>
                  <v-toolbar color="primary" title="Join Violet" />
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
                      <v-checkbox v-model="agree" style="--v-medium-emphasis-opacity:1">
                        <template #label>
                          <p text-14px>
                            I agree
                            <span text="#0288d1 14px" class="font-bold">
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
                    <v-btn variant="text" color="primary" @click="pourGame('violet'), isActive.value = false">
                      CONFIRM
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-btn>
        </v-col>
        <v-col cols="4" justify="center">
          <v-btn color="red" :disabled="btn_disabled" class="text-white" w-full>
            Join Red
            <v-dialog
              v-modal="windows" min-width="325px" transition="dialog-bottom-transition" persistent
              activator="parent" width="auto"
            >
              <template #default="{ isActive }">
                <v-card>
                  <v-toolbar color="primary" title="Join Red" />
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
                      <v-checkbox v-model="agree" style="--v-medium-emphasis-opacity:1">
                        <template #label>
                          <p text-14px>
                            I agree
                            <span text="#0288d1 14px" class="font-bold">
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
                    <v-btn variant="text" color="primary" @click="pourGame('red'), isActive.value = false">
                      CONFIRM
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
      <div class="mt-4 flex flex-wrap items-center">
        <div flex flex-wrap items-center gap-3 justify="center" class="sm:justify-between">
          <v-btn
            v-for="(n, i) in 10" :key="n" color="blue" class="min-w-[15%] text-white" :disabled="btn_disabled"
            @click="openDialog"
          >
            {{ i }}
            <!-- diaglog -->
            <v-dialog
              v-modal="windows" min-width="325px" transition="dialog-bottom-transition" persistent
              activator="parent" width="auto"
            >
              <template #default="{ isActive }">
                <v-card>
                  <v-toolbar color="primary" :title="`Select ${n}`" />
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
                      <v-checkbox v-model="agree" style="--v-medium-emphasis-opacity:1">
                        <template #label>
                          <p text-14px>
                            I agree
                            <span text="#0288d1 14px" class="font-bold">
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
                    <v-btn variant="text" color="primary" @click="pourGame(n), isActive.value = false">
                      CONFIRM
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-btn>
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
        <v-window v-model="recordTab" disabled>
          <v-window-item :value="`${tab} Record`">
            <v-data-table :items="itemsRecord" :headers="headers">
              <template #bottom>
                <v-pagination :length="10" variant="plain" size="small" class="custom-page" />
              </template>

              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.result="{ item: { result } }: any">
                <div flex gap-1>
                  <div
                    v-for="v in (result.split(','))" :key="v" :style="`margin-right: 5px;
                      width: 15px;
                      height: 15px;
                      background:${v}
                      `"
                  />
                </div>
              </template>
            </v-data-table>
          </v-window-item>
          <v-window-item :value="`My ${tab} Record`">
            <v-data-table :items="userRecord" :headers="userHeaders">
              <template #bottom>
                <v-pagination :length="10" variant="plain" size="small" class="custom-page" />
              </template>

              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.result="{ item: { result } }: any">
                <div flex gap-1>
                  <div
                    v-for="v in (result.split(','))" :key="v" :style="`margin-right: 5px;
                      width: 15px;
                      height: 15px;
                      background:${v}
                      `"
                  >
                    <p v-if="Number(v)">
                      {{ v }}
                    </p>
                  </div>
                </div>
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.winMoney="{ item: { winMoney } }: any">
                <span :style="{ color: winMoney > 0 ? 'green' : 'red' }">{{ winMoney }}</span>
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.GameResult="{ item }: any">
                <span :style="{ color: item.winMoney > 0 ? 'green' : 'red' }">{{ item.winMoney > 0 ? 'Win' : 'Fail'
                }}</span>
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.pourType="{ item: { pourType } }: any">
                <div flex gap-1>
                  <div
                    v-for="v in (pourType.split(','))" :key="v" :style="`margin-right: 5px;
                      width: 15px;
                      height: 15px;
                      background:${v}
                      `"
                  >
                    <p v-if="Number(v)">
                      {{ v }}
                    </p>
                  </div>
                </div>
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
