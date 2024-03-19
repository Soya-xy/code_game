<script setup lang='ts'>
const list = ref([
  {
    text1: '0',
    text2: 'Users number',
  },
  {
    text1: '0',
    text2: 'Daily active number',
  },
  {
    text1: '0',
    text2: 'Register number',
  },
  {
    text1: '0',
    text2: 'Recharge amount',
  },
  {
    text1: '0',
    text2: 'Recharge number',
  },
  {
    text1: '0',
    text2: 'Withdrawal amount',
  },
  {
    text1: '0',
    text2: 'Withdrawal number',
  },
  {
    text1: '0',
    text2: 'Change delivery',
  },
  {
    text1: '0',
    text2: 'Deliveries number',
  },
  {
    text1: '0',
    text2: 'Team balance',
  },

  {
    text1: '0',
    text2: 'Team bet amount',
  },

  {
    text1: '0',
    text2: 'Team refund fee',
  },
])
findAllInfo().then((res) => {
  list.value[0].text1 = res.obj.user_number
  list.value[1].text1 = res.obj.active_number
  list.value[2].text1 = res.obj.register_number
  list.value[3].text1 = res.obj.first_charge_number
  list.value[5 - 1].text1 = res.obj.recharge_number
  list.value[6 - 1].text1 = res.obj.sumWithdraw
  list.value[7 - 1].text1 = res.obj.withdrawal_number
  list.value[8 - 1].text1 = res.obj.bet_fee
  list.value[9 - 1].text1 = res.obj.bet_number
  list.value[10 - 1].text1 = res.obj.balance
  list.value[11 - 1].text1 = res.obj.bet_amount
  list.value[12 - 1].text1 = res.obj.refund_fee
})
</script>

<template>
  <div>
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col v-for="v in list" :key="v.text2" cols="4">
        <v-sheet class="border" h-full min-h-100px>
          <div justify="center" flex flex-col items-center py15px>
            <p text-red-500>
              {{ v.text1 }}
            </p>
            <p mt-3 text-center text-14px>
              {{ v.text2 }}
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  title: Subordinates List
</route>
