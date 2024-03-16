<script setup lang='ts'>
const payment = ref<any>([])
const money = ref('')
const password = ref('')
const bankId = ref('')
const fee = computed(() => {
  return `fee:${Number(money.value) <= 1000 ? 30 : Number(money.value) * 0.03},to account: ${Number(money.value) - (Number(money.value) <= 1000 ? 30 : Number(money.value) * 0.03)}, to usdt ${((Number(money.value) <= 1000 ? 30 : Number(money.value) * 0.03) + Number(money.value) - (Number(money.value) <= 1000 ? 30 : Number(money.value) * 0.03)) * 0.0125}`
})
const userInfo = useUserStore()
const { user } = storeToRefs(userInfo)
const overlay = ref(true)

findBankCard().then((res) => {
  if (res.res === 1) {
    payment.value = res.obj
    overlay.value = false
  }
}).catch(() => {
  overlay.value = false
})

const toast = useToast()

function onGroupSelected(e: any) {
  bankId.value = e.id
}

function withdrawal() {
  if (!money.value || Number(money.value) <= 0) {
    toast.error('check exchange money!')
    return
  }

  if (!password.value || password.value.length === 0) {
    toast.error('check your password!')
    return
  }

  if (!bankId.value)
    toast.error('please select bank card')
  overlay.value = true
  withdrawPost({
    money: Number(money.value),
    password: password.value,
    id: bankId.value,
  }).then((res) => {
    if (res.res === 1 && res.obj) {
      toast.success('withdrawal success')
      money.value = ''
      password.value = ''
      userInfo.getUser()
    }
    else {
      toast.error(res.resMsg)
    }
  }).finally(() => {
    overlay.value = false
  })
}
</script>

<template>
  <div>
    <div class="w-full flex items-center bg-[#fb8c00] p2 text-white">
      <i class="i-mdi:alert-decagram-outline mr-2 block text-xl text-[#0000004d] icon-btn" />
      <p flex-1>
        Please assure the bank details are correct otherwise company will not be responsible for any missing withdraw.
      </p>
    </div>
    <div p2>
      <v-card rounded="0">
        <div text-center>
          <p text="#f00 17px" m8px font-bold>
            Any problem? Contact customer service
          </p>
          <p text="#000 3xl" my4 font-bold>
            Balance: ₹ {{ user.money }}
          </p>
        </div>
        <v-form>
          <v-container>
            <v-row justify-center>
              <v-col cols="12">
                <v-text-field
                  v-model="money" rounded="0" type="number" prepend-inner-icon="i-mdi-currency-usd"
                  variant="solo" :messages="fee"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password" rounded="0" type="password"
                  placeholder="Please Input Withdrawal Password" prepend-inner-icon="i-mdi-onepassword"
                  variant="solo"
                />
              </v-col>

              <v-divider mt-4 />
              <v-item-group mandatory w-full>
                <v-list w-full>
                  <v-list-subheader>Payment</v-list-subheader>

                  <v-item v-for="v in payment" :key="v" v-slot="{ isSelected, toggle }" @group:selected="onGroupSelected(v)">
                    <v-list-item class="w-full" :value="v">
                      <template #prepend>
                        <v-icon v-if="isSelected" icon="i-mdi-check" />
                      </template>
                      <div @click="toggle">
                        <v-list-item-title>
                          {{ v.actualName + (v.bankName === null ? v.upiaccount : v.bankName) }}
                        </v-list-item-title>
                      </div>
                    </v-list-item>
                  </v-item>
                </v-list>
              </v-item-group>

              <v-col cols="6" items-center py-6px>
                <v-btn variant="elevated" color="#5713D4" w-full @click="withdrawal">
                  Withdrawal
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </div>
    <v-overlay :model-value="overlay" persistent class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate />
    </v-overlay>
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  icon: i-mdi-text-long
  path: /withdraw_log
  title: Withdraw
</route>
