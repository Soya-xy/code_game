<script setup lang='ts'>
</script>

<template>
  <div>
    <v-list lines="one">
      <v-list-item
        v-for="n in 3" :key="n"
        :title="`${n}0000.00`"
        subtitle="UK90"
        prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
      >
        <template #append>
          <v-list-item subtitle="2024-01-30 10:10:10" />
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  title: Recharge Record
</route>
