<script setup lang='ts'>
import md5 from 'js-md5'

const router = useRouter()
const toast = useToast()
const { t: $t } = useI18n()
const mobile = ref('+91')
const password = ref('')
// const userStore = useUserStore()
function loginBtn() {
  if (!mobile.value)
    return toast.error($t('请输入手机号'))

  if (!password.value)
    return toast.error($t('请输入密码'))

  login({
    mobile: mobile.value,
    password: md5.md5(password.value),
  }).then((res: any) => {
    if (res.res === 1) {
      useStorage('lgmd', false)
      useStorage('username', res.obj.user)
      useStorage('promotoId', res.obj.promotoId)
      useStorage('msg', res.obj.isAgent)
      useStorage('balance', `${res.obj.balance}`)
      useStorage('mobile', mobile)
      useStorage('lgpp', password)
      useStorage('lgmn', mobile)
      userInfo().then((res: any) => {
        if (res.res !== 0) {
          useUserStore().setUser(res.obj)

          toast.success($t('登录成功'), {
            timeout: 2000,
            onClose: () => {
              router.push('/')
            },
          })
        }
      })
    }
  })
}
</script>

<template>
  <v-layout full-height>
    <v-app-bar elevation="3" color="#5713d4">
      <v-app-bar-title>Login</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid bg="#FAFAFA" class="min-h-[calc(100vh-64px)]">
        <v-sheet width="350" color="#FAFAFA" class="mx-auto mt-10">
          <v-text-field
            v-model="mobile" density="compact" placeholder="Mobile Number"
            prepend-inner-icon="i-mdi-cellphone" variant="solo"
            :rules="[value => !!value || 'Mobile Number is required']"
          />

          <v-text-field
            v-model="password" type="password" :rules="[value => !!value || 'Password is required']"
            density="compact" placeholder="Enter your password" prepend-inner-icon="i-mdi-lock-outline"
            variant="solo"
          />

          <v-btn class="mb-8 mt-5" block color="#0288d1" size="large" variant="elevated" @click="loginBtn">
            Log In
          </v-btn>

          <div w-full flex justify="between">
            <v-btn text="Register" color="#FAFAFA" variant="elevated" @click="router.push('/reg')" />
            <v-btn text="Forget Password?" color="#FAFAFA" variant="elevated" @click="router.push('/forget')" />
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
