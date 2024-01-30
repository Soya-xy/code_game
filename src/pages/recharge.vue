<script setup lang='ts'>
const number = [100, 500, 1000, 3000, 5000, 10000, 20000, 50000]
const payment = ['ppp', 'agents', 'mings', 'super', 'UK90']
</script>

<template>
  <div>
    <div class="w-full flex items-center bg-[#fb8c00] p2 text-white">
      <i class="i-mdi:alert-decagram-outline mr-2 block text-xl text-[#0000004d] icon-btn" />
      <p flex-1>
        Note: If the recharge amount has been deducted but the amount has not arrived, please send the payment details and
        game ID screenshots to the online customer service of the game interface for processing.
      </p>
    </div>
    <div p2>
      <v-card rounded="0">
        <div text-center>
          <p text="#f00 17px" m8px font-bold>
            Any problem? Contact customer service
          </p>
          <p text="#000 3xl" my4 font-bold>
            Balance: ₹ 0.00
          </p>
        </div>
        <v-form>
          <v-container>
            <v-row justify-center>
              <v-col cols="12">
                <v-text-field rounded="0" type="number" prepend-inner-icon="i-mdi-wallet" variant="solo" />
              </v-col>

              <v-col v-for="v in number" :key="v" cols="4" sm="3" py-6px>
                <v-btn variant="tonal" w-full>
                  ₹ {{ v }}
                </v-btn>
              </v-col>
              <v-divider mt-4 />
              <v-item-group mandatory w-full>
                <v-list w-full>
                  <v-list-subheader>Payment</v-list-subheader>

                  <v-item
                    v-for="v in payment" :key="v"

                    v-slot="{ isSelected, toggle }"
                  >
                    <v-list-item
                      class="w-full" :value="v"
                    >
                      <template #prepend>
                        <v-icon v-if="isSelected" icon="i-mdi-check" />
                      </template>
                      <div @click="toggle">
                        <v-list-item-title>{{ v }}</v-list-item-title>
                      </div>
                    </v-list-item>
                  </v-item>
                </v-list>
              </v-item-group>

              <v-col cols="6" items-center py-6px>
                <v-btn variant="elevated" color="#5713D4" w-full>
                  Recharge
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  icon: i-mdi-text-long
  path: /recharge_log
  title: Recharge
</route>
