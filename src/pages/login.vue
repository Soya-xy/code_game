<script setup lang='ts'>
const router = useRouter()
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
            prefix="+91" density="compact" placeholder="Mobile Number" prepend-inner-icon="i-mdi-cellphone"
            variant="solo" :rules="[value => !!value || 'Mobile Number is required']"
          />

          <v-text-field
            type="password" :rules="[value => !!value || 'Password is required']" density="compact"
            placeholder="Enter your password" prepend-inner-icon="i-mdi-lock-outline" variant="solo"
          />

          <v-btn class="mb-8 mt-5" block color="#0288d1" size="large" variant="elevated">
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
