<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import Swiper from '~/components/Code/Swiper.vue'
import NoticeBarVue from '~/components/NoticeBar/index.vue'
import Lang from '~/components/lang.vue'

const { t: $t } = useI18n()

const tab = ref()
const items = ref([
  $t('CODE GAMES'),
  'PG GAMES',
])
</script>

<template>
  <div>
    <v-toolbar color="#5713d4" elevation="4" height="58" extension-height="40">
      <v-toolbar-title><img src="/img/logo.png" w-25 alt="" srcset=""></v-toolbar-title>
      <div>
        <v-btn icon="i-mdi-bell" />
        <Lang />
      </div>
      <!-- <template #extension>
        <div w-full>
          <v-tabs
            v-model="tab" align-tabs="center"
            fixed-tabs
          >
            <v-tab v-for="item in items" :key="item" :value="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </div>
      </template> -->
    </v-toolbar>
    <v-window v-model="tab">
      <v-window-item v-for="(item, index) in items" :key="item" :value="item">
        <div v-if="index === 0" class="h-[calc(100vh-110px)] overflow-y-scroll bg-[#FAFAFA] pb-24">
          <Swiper />
          <NoticeBarVue
            text="Welcome to Woner to keep the game exciting!" background="#E4E0EC"
            left-icon="i-mdi-bell text-[#5713D4]"
          />
          <Code />
        </div>
        <!-- <template v-else>
          <v-row align="center" items-center class="p-4">
            <v-col v-for="(_v, i) in 20" :key="i" cols="4" p="1">
              <v-card variant="elevated" elevation="2">
                <v-card-item>
                  <div>
                    <v-img
                      class="bg-whit rounded-4"
                      :width="140"
                      :aspect-ratio="1"
                      cover
                      src="https://img.cooe.in/media/caishen-wins_rounded_200.png"
                    />
                    <div class="mt-1 text-center">
                      Caishen Wins
                    </div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </template> -->
      </v-window-item>
    </v-window>
  </div>
</template>
