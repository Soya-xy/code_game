<script setup lang='ts'>
const list = ref<any>([])
const router = useRouter()
const overlay = ref(true)

findBankCard().then((res) => {
  if (res.res === 1) {
    list.value = res.obj
    overlay.value = false
  }
})

function delCard(e: any) {
  overlay.value = true
  delBankCard({ id: e.id }).then((res) => {
    if (res.res === 1) {
      findBankCard().then((res) => {
        if (res.res === 1) {
          list.value = res.obj
          overlay.value = false
        }
      })
    }
  })
}
</script>

<template>
  <div>
    <v-list lines="one">
      <v-list-item
        v-for="n in list" :key="n"
        :title="n.bankName"
        :subtitle="n.bankType === 3 ? 'Bank Card' : 'UPI'"
      >
        <template #append>
          <div flex justify="center" gap-2>
            <v-btn class="mb-8 mt-5" color="#0288d1" size="large" variant="elevated" @click="router.push('/addBank')">
              Edit
            </v-btn>
            <v-btn class="mb-8 mt-5" color="red" size="large" variant="elevated" @click="delCard(n)">
              Delete
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>
    <div flex justify="center">
      <v-btn class="mb-8 mt-5" width="250" color="#0288d1" size="large" variant="elevated" @click="router.push('/addBank')">
        Add Bank
      </v-btn>
    </div>
    <v-overlay
      :model-value="overlay"
      persistent

      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      />
    </v-overlay>
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  title: Bank
</route>
