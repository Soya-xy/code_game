<script setup lang='ts'>
const TabCur = ref('Select Bank Card')
const tabNav = ref(['Select Bank Card', 'Select UPI'])
const bankTitle = ('Add Bank Card')
const actualName = ref('')
const ifscCode = ref('')
const bankName = ref('')
const upiAccount = ref('')
const bankType = ref(3)
const mobile = ref('')
const email = ref('')
const bankeId = ref('')
const isFirstMobile = ref(true)
const router = useRouter()

const toast = useToast()

async function addBtn() {
  console.log(TabCur.value)

  if (!actualName.value) {
    toast.error('Please input Actual Name')
    return
  }

  if (!ifscCode.value) {
    toast.error('Please input IFSC Code')
    return
  }

  if (!bankName.value) {
    toast.error('Please input Bank Name')
    return
  }

  if (!upiAccount.value) {
    toast.error('Please input UPI Account')
    return
  }

  if (!mobile.value) {
    toast.error('Please check mobile number')
    return
  }

  if (!email.value)
    toast.error('Please input Email')

  let params: any = {
    mobileNumber: mobile.value,
    UPIAccount: upiAccount.value,
    actualName: actualName.value,
  }
  if (TabCur.value === 'Select UPI') { params.bankType = 2 }
  else {
    params = {
      mobileNumber: mobile.value,
      IFSCCode: ifscCode.value,
      UPIAccount: upiAccount.value,
      email: email.value,
      bankName: bankName.value,
      bankType: bankType.value,
      actualName: actualName.value,
    }
  }
  addBankCard(params).then((res) => {
    console.log(res)
    if (res.res === 1) {
      toast.success('Add Success', {
        timeout: 2000,
        onClose: () => {
          router.back()
        },
      })
    }
  })
}
</script>

<template>
  <div>
    <v-toolbar color="#5713d4" elevation="2" height="58">
      <v-btn icon="i-mdi-arrow-left" @click="router.back()" />
      <v-app-bar-title>Add Bank Card</v-app-bar-title>
      <template #extension>
        <div w-full>
          <v-tabs v-model="TabCur" align-tabs="center" fixed-tabs bg-color="#fff" color="primary">
            <v-tab v-for="item in tabNav" :key="item" :value="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </div>
      </template>
    </v-toolbar>

    <v-window v-model="TabCur">
      <v-window-item value="Select Bank Card">
        <v-main>
          <v-container fluid bg="#FAFAFA" class="min-h-[calc(100vh-64px)]">
            <v-sheet width="350" color="#FAFAFA" class="mx-auto">
              <v-text-field v-model="actualName" density="compact" placeholder="Mobile Number" variant="solo" />

              <v-text-field
                v-model="ifscCode" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />
              <v-text-field
                v-model="bankName" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />
              <v-text-field
                v-model="upiAccount" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />
              <v-text-field
                v-model="mobile" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />
              <v-text-field
                v-model="email" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />

              <v-btn class="mb-8 mt-5" block color="#0288d1" size="large" variant="elevated" @click="addBtn">
                Continue
              </v-btn>
            </v-sheet>
          </v-container>
        </v-main>
      </v-window-item>
      <v-window-item value="Select UPI">
        <v-main>
          <v-container fluid bg="#FAFAFA" class="min-h-[calc(100vh-64px)]">
            <v-sheet width="350" color="#FAFAFA" class="mx-auto">
              <v-text-field v-model="actualName" density="compact" placeholder="Mobile Number" variant="solo" />

              <v-text-field
                v-model="upiAccount" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />
              <v-text-field
                v-model="mobile" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />
              <v-text-field
                v-model="email" type="password" density="compact" placeholder="Enter your password"
                variant="solo"
              />

              <v-btn class="mb-8 mt-5" block color="#0288d1" size="large" variant="elevated" @click="addBtn">
                Continue
              </v-btn>
            </v-sheet>
          </v-container>
        </v-main>
      </v-window-item>
    </v-window>
  </div>
</template>
