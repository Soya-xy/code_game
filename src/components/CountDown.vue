<script setup lang='ts'>
const continue_button_show = ref(true)
const continue_button_disabled = ref(false)
const guess_button_disabled = ref(false)
// 倒计时3分钟
const nowTime = ref({
  min_ten: 0,
  min_bit: 0,
  sec_ten: 0,
  sec_bit: 0,
})

function startGame() {
  continue_button_show.value = true
  continue_button_disabled.value = false
  guess_button_disabled.value = false
}
function setNextTime() {
  const e = Date.parse(new Date().toString()) / 1e3
  const a = 180 - e % 180

  if (a <= 30)
    guess_button_disabled.value = true

  const i = a / 60
  const o = a % 60
  const n = o / 10
  const s = o % 10
  nowTime.value.min_ten = 0
  nowTime.value.min_bit = Math.floor(i)
  nowTime.value.sec_ten = Math.floor(n)
  nowTime.value.sec_bit = Math.floor(s)
  if (a === 180) {
    continue_button_show.value = false
    continue_button_disabled.value = true
    setTimeout(() => {
      continue_button_disabled.value = false
    }, 2500)
    setTimeout(() => {
      startGame()
    }, 5500)
  }
  setTimeout(() => {
    setNextTime()
  }, 1000)
}
onMounted(() => {
  setNextTime()
})
</script>

<template>
  <div>
    <div v-if="continue_button_show">
      <span class="time-sub">{{ nowTime.min_ten }}</span>
      <span class="time-sub">{{ nowTime.min_bit }}</span>
      <span class="time-sub-dot">:</span>
      <span class="time-sub">{{ nowTime.sec_ten }}</span>
      <span class="time-sub">{{ nowTime.sec_bit }}</span>
    </div>
    <v-btn v-else color="orange" class="text-white" :disabled="continue_button_disabled" @click="startGame">
      continue
    </v-btn>
  </div>
</template>

<style scoped>
.time-sub {
  margin: 0 2px;
  padding: 0 4px;
  font-size: 24px;
  background: #f2f2f2;
  color: #0f1223;
  border-radius: 5px;
}

.time-sub-dot {
  padding: 0 3px;
  font-size: 26px;
  line-height: 26px;
}
</style>
