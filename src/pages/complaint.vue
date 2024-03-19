<script setup lang="ts">
const router = useRouter()
const tab = ref('one')
const list: any = ref([])
const suggestList = ['Suggestion', 'Consult', 'Recharge Problem', 'Withdraw Problem', 'Parity Problem', 'Gift Receive Problem', 'Other']

findComplaints({ handleStatus: 1 }).then((res) => {
  if (res.res === 1)
    list.value = res.obj
})

watch(tab, (val) => {
  list.value = []
  if (val === 'one') {
    findComplaints({ handleStatus: 1 }).then((res) => {
      if (res.res === 1)
        list.value = res.obj
    })
  }
  else {
    findComplaints({ handleStatus: 0 }).then((res) => {
      if (res.res === 1)
        list.value = res.obj
    })
  }
})
</script>

<template>
  <div>
    <v-toolbar color="#5713d4" elevation="4" height="58" extension-height="40">
      <v-btn icon="i-mdi-arrow-left" @click="router.back()" />
      <v-toolbar-title><span text-12px>Add Complaints & Suggestion</span></v-toolbar-title>
      <div>
        <v-btn icon="i-mdi-plus" @click="router.push('/addSug')" />
      </div>
      <template #extension>
        <div w-full>
          <v-tabs
            v-model="tab" align-tabs="center"
            fixed-tabs
          >
            <v-tab value="one">
              COMPLETED
            </v-tab>
            <v-tab value="two">
              WAIT
            </v-tab>
          </v-tabs>
        </div>
      </template>
    </v-toolbar>
    <v-list lines="one">
      <v-list-item
        v-for="n, k in list" :key="k"
        :title="suggestList[n.type]"
        :subtitle="n.description"
      >
        <template #prepend>
          <v-icon :icon="tab === 'one' ? 'i-mdi-check' : 'i-mdi-clock'" size="18" />
        </template>
        <template #append>
          <v-list-item :subtitle="n.createTime">
            <template #title>
              <p text-right>
                {{ n.outId }}
              </p>
            </template>
          </v-list-item>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: empty
</route>

<style>
.v-list-item__prepend{
  display: block;
}
</style>
