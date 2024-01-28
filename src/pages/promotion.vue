<script setup lang='ts'>
const money = ref(0)
const tab = ref(1)
</script>

<template>
  <v-layout full-height>
    <v-app-bar elevation="3" color="#5713d4">
      <v-app-bar-title>Promotion</v-app-bar-title>
      <template #append>
        <v-btn icon="i-mdi-text-long" />
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid bg="#FAFAFA" class="min-h-[calc(100vh-120px)]">
        <v-card :elevation="3">
          <v-card :title="`Bonus: ₹ ${money}`" rounded="0" flex flex-col items-center>
            <template #actions>
              <v-btn color="#5713d4" variant="flat" :elevation="2" :rounded="0" my-3>
                Apply to Balance
              </v-btn>
            </template>
          </v-card>
          <v-card rounded="0">
            <v-divider />
            <v-tabs v-model="tab" color="deep-purple-accent-4" grow>
              <v-tab :value="1">
                Level 1
              </v-tab>
              <v-tab :value="2">
                Level 2
              </v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item v-for="n in 3" :key="n" :value="n">
                <v-container fluid>
                  <div my-5>
                    <div flex justify="between" items-center>
                      <div text="16px #000000de center" font-bold flex="1">
                        <p>Total People</p>
                        <p text="22px">
                          0
                        </p>
                      </div>
                      <div text="16px #000000de center" font-bold flex="1">
                        <p>Contribution</p>
                        <p text="22px">
                          ₹ 0.00
                        </p>
                      </div>
                    </div>
                    <div mt10>
                      <v-text-field model-value="954721938DE" label="My Promotion Code" variant="underlined" readonly />
                      <div pt-4>
                        <v-textarea
                          model-value="https://cooe.in/#/register?r_code=95357ACG" label="My Promotion Link"
                          variant="underlined" readonly
                          rows="3"
                        />
                      </div>
                    </div>
                    <div w-full flex justify="center">
                      <v-btn color="" variant="tonal" :width="200" :elevation="2" :rounded="0" my-3>
                        Open Link
                      </v-btn>
                    </div>
                  </div>
                </v-container>
              </v-window-item>
            </v-window>
          </v-card>
        </v-card>
      </v-container>
    </v-main>
  </v-layout>
</template>
