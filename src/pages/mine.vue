<script setup lang='ts'>
// const money = ref(0)
// const tab = ref(1)
const router = useRouter()
const user = ref<any>()
const startStar = ref(Number(localStorage.getItem('msg')) === 1)

userInfo().then((res) => {
  if (res.res !== 0) {
    useUserStore().setUser(res.obj)
    user.value = res.obj
  }
})
const promotoId = useStorage('promotoId', '')
const mobile = useStorage('mobile', '')
if (!promotoId.value)
  router.replace('/login')

const toast = useToast()
const newName = ref('')
function changeName(_e: any) {
  changeNick({ nickname: newName.value }).then((res) => {
    if (res.res === 1) {
      toast.success('Success')
      userInfo().then((res) => {
        if (res.res !== 0) {
          useUserStore().setUser(res.obj)
          user.value = res.obj
        }
      })
    }
    else { toast.error(res.resMsg) }
  })
}
</script>

<template>
  <v-layout>
    <!-- <v-app-bar color="#e0e0e0" :height="56">
      <v-app-bar-title>Download App</v-app-bar-title>
      <template #prepend>
        <img src="https://cooe.in/images/cooe_app_icon.png" h45px w45px>
      </template>
      <template #append>
        <v-btn icon="i-mdi-download" />
      </template>
    </v-app-bar> -->
    <v-app-bar elevation="3" color="#5713d4" :height="56">
      <v-app-bar-title>Mine</v-app-bar-title>
      <template #append>
        <p>₹ {{ user?.money }}</p>
        <!-- <v-btn icon="i-mdi-credit-card-check-outline " /> -->
        <v-btn p="!0" :width="28">
          <v-avatar size="28">
            <i class="i-mdi-bell" text-28px text-white />
          </v-avatar>
          <v-dialog min-width="325px" transition="dialog-bottom-transition" activator="parent" width="auto">
            <v-card>
              <v-toolbar color="primary" title="RelianceMall" />
              <p p2>
                We will bring you a better gaming experience Minimum recharge 100RS Minimum withdrawal 230RS,Invite
                members to recharge 300 rupees to get bonus 158 rupees. About Recharge and withdrawal, you can send
                questions to email: reliancemall555@gmail.com
              </p>
            </v-card>
          </v-dialog>
        </v-btn>
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
              Nick Name: {{ user?.nickname }}
              <v-btn variant="text" color="#1565C0">
                CHANGE
                <v-dialog
                  min-width="325px" transition="dialog-bottom-transition" persistent
                  activator="parent" width="auto"
                >
                  <template #default="{ isActive }">
                    <v-card>
                      <v-toolbar color="primary" title="CHANGE Nick Name" />

                      <v-text-field
                        v-model="newName" density="compact" placeholder="Nick Name" variant="solo"
                        :rules="[value => !!value || 'Nick Name is required']"
                      />

                      <v-card-actions class="justify-end">
                        <v-btn variant="text" @click="isActive.value = false">
                          CANCEL
                        </v-btn>
                        <v-btn variant="text" color="primary" @click="changeName(''), isActive.value = false">
                          CONFIRM
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
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
              <v-btn
                mb-2 icon="i-mdi-ballot-recount-outline" size="small" :elevation="10"
                color="#1565c0"
              />Transactions
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

              <v-list-item title="Reset Password" link href="/#/resetps" />
            </v-list-group>

            <v-list-item prepend-icon="i-mdi-message-bulleted" title="Complaints & Suggestions" link border href="/#/complaint" />

            <v-list-group value="Admin" collapse-icon="i-mdi-menu-up" expand-icon="i-mdi-menu-down" border-b="1px solid #E0E0E0">
              <template #activator="{ props }">
                <v-list-item v-bind="props" title="About" prepend-icon="i-mdi-message-alert" color="#5713d4" />
              </template>

              <v-list-item title="Privacy Policy" link href="/#/privacy" />
              <v-list-item title="Risk Disclosure Agreement" link href="/#/risk" />
            </v-list-group>

            <v-list-group v-if="startStar" value="Star" collapse-icon="i-mdi-menu-up" expand-icon="i-mdi-menu-down">
              <template #activator="{ props }">
                <v-list-item v-bind="props" title="Start Agent" prepend-icon="i-mdi-star" color="#5713d4" />
              </template>

              <v-list-item title="Subordinates List" link href="/#/star/list" />
              <v-list-item title="Subordinates Report" link href="/#/star/report" />
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
