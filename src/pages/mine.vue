<script setup lang='ts'>
// const money = ref(0)
// const tab = ref(1)
const router = useRouter()
const user = ref<any>()

userInfo().then((res) => {
  if (res.res !== 0)
    user.value = res.obj
})
const promotoId = useStorage('promotoId', '')
console.log('🚀 ~ promotoId:', promotoId)
const mobile = useStorage('mobile', '')
if (!promotoId.value)
  router.replace('/login')
</script>

<template>
  <v-layout>
    <v-app-bar color="#e0e0e0" :height="56">
      <v-app-bar-title>Download App</v-app-bar-title>
      <template #prepend>
        <img src="https://cooe.in/images/cooe_app_icon.png" h45px w45px>
      </template>
      <template #append>
        <v-btn icon="i-mdi-download" />
      </template>
    </v-app-bar>
    <v-app-bar elevation="3" color="#5713d4" :height="56">
      <v-app-bar-title>Mine</v-app-bar-title>
      <template #append>
        <p>₹ {{ user?.money }}</p>
        <v-btn icon="i-mdi-credit-card-check-outline " />
        <v-btn icon="i-mdi-bell" />
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid bg="#FAFAFA" class="min-h-[calc(100vh-162px)] p2">
        <v-card rounded="0" p3 py4 :elevation="3">
          <div text="14px" font-bold>
            <p>ID: <span>{{ promotoId }}</span></p>
            <p my-2>
              Mobile: <span>{{ mobile }}</span>
            </p>
            <p>
              Nick Name: {{ user?.nickname }}<v-btn variant="text" color="#1565C0">
                CHANGE
              </v-btn>
            </p>
          </div>
          <div justify="between" mt-2 flex items-center>
            <div flex="~ col" items-center @click="router.push('/recharge')">
              <v-btn mb-2 icon="i-mdi-credit-card-check-outline" size="small" :elevation="10" color="#1565c0" />Recharge
            </div>
            <div flex="~ col" items-center @click="router.push('/withdraw')">
              <v-btn mb-2 icon="i-mdi-cash-check" size="small" :elevation="10" color="#1565c0" />Withdraw
            </div>
            <div flex="~ col" items-center @click="router.push('/transactions')">
              <v-btn mb-2 icon="i-mdi-ballot-recount-outline" size="small" :elevation="10" color="#1565c0" />Transactions
            </div>
            <div flex="~ col" items-center @click="router.push('/bank')">
              <v-btn mb-2 icon="i-mdi-credit-card-outline" size="small" :elevation="10" color="#1565c0" />Bank Card
            </div>
          </div>
        </v-card>

        <v-card rounded="0" mt-2 :elevation="3">
          <v-list border>
            <v-list-group value="Users" collapse-icon="i-mdi-menu-up" expand-icon="i-mdi-menu-down">
              <template #activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="i-mdi-security" title="Account Security" color="#5713d4" />
              </template>

              <v-list-item title="Reset Password" link />
            </v-list-group>

            <v-list-item prepend-icon="i-mdi-message-bulleted" title="Complaints & Suggestions" link border />

            <v-list-group value="Admin" collapse-icon="i-mdi-menu-up" expand-icon="i-mdi-menu-down">
              <template #activator="{ props }">
                <v-list-item v-bind="props" title="About" prepend-icon="i-mdi-message-alert" color="#5713d4" />
              </template>

              <v-list-item title="Privacy Policy" link />
              <v-list-item title="Risk Disclosure Agreement" link />
            </v-list-group>
          </v-list>
        </v-card>

        <v-dialog width="500">
          <template #activator="{ props }">
            <div class="w-full text-center">
              <v-btn v-bind="props" variant="outlined" mt-5 color="red" min-width="200px">
                LOGOUT
              </v-btn>
            </div>
          </template>

          <template #default="{ isActive }">
            <v-card title="Confirm">
              <v-card-text>
                Do you want to logout?
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn text="CANCEL" @click="isActive.value = false" />
                <v-btn text="YES" color="info" @click="router.replace('/login')" />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-container>
    </v-main>
  </v-layout>
</template>
