<script setup lang='ts'>
import { ref } from 'vue'

const router = useRouter()
const opting = ref(false)
const mobile = ref('')
const min = ref(60)
const password = ref<string>('')
async function sendOpt() {
  const res = await sendSMS({
    mobile: `+91${mobile.value}`,
  })
  if (res) {
    opting.value = true
    const timer = setInterval(() => {
      min.value--
      if (min.value < 0) {
        clearInterval(timer)
        opting.value = false
        min.value = 60
      }
    }, 1000)
  }
}

function reg() {
  console.log(123)
}
</script>

<template>
  <v-layout full-height>
    <v-app-bar elevation="3" color="#5713d4">
      <v-btn icon="i-mdi-arrow-left" @click="router.back()" />
      <v-app-bar-title>Reset Password</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid bg="#FAFAFA" class="min-h-[calc(100vh-64px)]">
        <v-sheet color="#FAFAFA" class="mx-auto mt-10">
          <v-text-field
            v-model="mobile" prefix="+91" density="compact" placeholder="Mobile Number"
            prepend-inner-icon="i-mdi-cellphone" variant="solo" :rules="[value => !!value || 'Mobile Number is required']"
          />

          <div flex items-center justify="between">
            <v-text-field
              v-model="password" :rules="[value => !!value || 'Password is required']"
              density="compact" placeholder="Enter your new password" prepend-inner-icon="i-mdi-message-processing"
              variant="solo"
            />
            <v-btn class="mb-6 ml-4" variant="elevated" width="100" size="large" :disabled="opting" @click="sendOpt">
              {{ opting ? `WAIT ${min}S` : 'OPT' }}
            </v-btn>
          </div>
          <v-text-field
            type="password" :rules="[value => !!value || 'Password is required']" density="compact"
            placeholder="Enter your new password" prepend-inner-icon="i-mdi-key" variant="solo"
          />
          <v-text-field
            :rules="[value => !!value || 'Password is required']" density="compact"
            placeholder="Enter your new password" prepend-inner-icon="i-mdi-wallet-giftcard" variant="solo"
          />

          <div w-full flex justify="center">
            <v-btn class="mx-auto mb-8 mt-5" color="#0288d1" width="250" size="large" variant="elevated" @click="reg">
              Continue
            </v-btn>
          </div>
        </v-sheet>
      </v-container>
    </v-main>
  </v-layout>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>

<style>
.v-text-field__prefix {
  opacity: 1;
  color: #000;
}
</style>
