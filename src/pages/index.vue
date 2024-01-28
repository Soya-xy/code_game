<script setup lang='ts'>
const tab = ref()
const items = ref([
  'CODE GAMES',
  'PG GAMES',
])
</script>

<template>
  <div>
    <v-toolbar color="#5713d4">
      <v-toolbar-title>Your Dashboard</v-toolbar-title>
      <v-btn icon="i-mdi-cog" />
      <template #extension>
        <div w-full>
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab v-for="item in items" :key="item" :value="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </div>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item v-for="item in items" :key="item" :value="item">
        <Code v-if="item === 'CODE GAMES'" />
        <template v-else>
          <v-row align="center" justify="center" items-center class="p-4">
            <v-col
              v-for="(_v, i) in 20" :key="i"
              sm="4"
            >
              <v-card class="mx-auto" col max-width="344" variant="elevated" elevation="5">
                <v-card-item>
                  <div flex="~ col" justify="center">
                    <img src="https://img.cooe.in/media/caishen-wins_rounded_200.png" class="h-30 w-30">
                    <div class="mt-1 text-center">
                      Caishen Wins
                    </div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-window-item>
    </v-window>
  </div>
</template>
