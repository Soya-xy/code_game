<script setup lang='ts'>
const page = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const list: any = ref([])
findMoneyTranceList(page.value).then((res) => {
  if (res.res === 1) {
    total.value = res.obj.totalPage
    list.value = res.obj.results
  }
})

function change(e: any) {
  page.value.pageNum = e
  findMoneyTranceList(page.value).then((res) => {
    if (res.res === 1) {
      total.value = res.obj.totalPage
      list.value = res.obj.results
    }
  })
}
</script>

<template>
  <div>
    <v-list lines="one">
      <v-list-item
        v-for="n in list" :key="n"
        :title="n.gameType"
        :subtitle="n.changeMoney"
      >
        <template #append>
          <v-list-item :subtitle="n.logTime" />
        </template>
        <template #prepend>
          <v-avatar size="40" :color="n.changeMoney < 0 ? 'red' : 'green'">
            <i class="i-mdi-crown" />
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
    <v-pagination :length="total" @update:model-value="change" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  title: Transactions
</route>
