<script setup lang='ts'>
const page = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const list: any = ref([])
findDownByPage(page.value).then((res) => {
  if (res.res === 1) {
    total.value = res.obj.totalPage
    list.value = res.obj.results
  }
})

function change(e: any) {
  page.value.pageNum = e
  findDownByPage(page.value).then((res) => {
    if (res.res === 1) {
      total.value = res.obj.totalPage
      list.value = res.obj.results
    }
  })
}
</script>

<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            Account
          </th>
          <th class="text-center">
            Balance
          </th>
          <th class="text-center">
            Subordinates
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in list"
          :key="item.name"
        >
          <td class="text-center">
            {{ item.promoteId }}
          </td>
          <td class="text-center">
            {{ item.balance }}
          </td>
          <td class="text-center">
            {{ item.lowerCount }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination :length="total" @update:model-value="change" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  title: Subordinates List
</route>
