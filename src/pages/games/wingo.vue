<script setup lang='ts'>
const router = useRouter()
const { query }: any = useRoute()
const tab = ref()
const number = ref(1)
const windows = ref(false)
const items = ref([
  'Parity',
  'Sapre',
  'Bcone',
  'Emerd',
])
const record = ref([
  'Parity Record',
  'My Parity Record',
])

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
onMounted(() => {
  setNextTime()
})

function openDialog() {
  windows.value = true
}
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
          <count-down :date="nextTime" :min="Number(query.min)" @start="btn_disabled = false " @end="btn_disabled = true" />
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
              v-modal="windows" min-width="400px" transition="dialog-bottom-transition" persistent
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
        <v-col cols="4" justify="center">
          <v-btn color="#651FFF" :disabled="btn_disabled" class="text-white" w-full>
            Join Violet
            <v-dialog
              v-modal="windows" min-width="400px" transition="dialog-bottom-transition" persistent
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
        <v-col cols="4" justify="center">
          <v-btn color="red" :disabled="btn_disabled" class="text-white" w-full>
            Join Red
            <v-dialog
              v-modal="windows" min-width="400px" transition="dialog-bottom-transition" persistent
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
      <div class="mt-4 flex flex-wrap items-center">
        <v-row>
          <v-col v-for="n in 10" :key="n">
            <v-btn color="blue" class="w-full text-white" :disabled="btn_disabled" @click="openDialog">
              {{ n }}
              <!-- diaglog -->
              <v-dialog
                v-modal="windows" min-width="400px" transition="dialog-bottom-transition" persistent
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
      </div>
    </v-card>

    <!--  -->
    <v-card rounded="0" m8px p="[0px_8px_12px]">
      <div w-full>
        <v-tabs v-model="tab" align-tabs="center" fixed-tabs bg-color="#fff" color="primary">
          <v-tab v-for="item in record" :key="item" :value="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
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
