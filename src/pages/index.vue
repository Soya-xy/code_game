<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import Swiper from '~/components/Code/Swiper.vue'
import NoticeBarVue from '~/components/NoticeBar/index.vue'
import Lang from '~/components/lang.vue'

const { t: $t } = useI18n()

const tab = ref()
const isRead = localStorage.getItem('isRead') === '1'
const showToast = ref(!isRead)
const noticeList = ref<any>([])
const items = ref([
  $t('CODE GAMES'),
  'PG GAMES',
])

findNotice().then((res: any) => {
  if (res.res !== 0)
    noticeList.value = res.obj
})

function download() {
  location.href = `${location.origin}/down/h5app.apk`
}
function closeModal() {
  showToast.value = false
  localStorage.setItem('isRead', '1')
}
</script>

<template>
  <div>
    <v-toolbar color="#5713d4" elevation="4" height="58" extension-height="40">
      <v-toolbar-title><img src="/img/logo.png" w-25 alt="" srcset=""></v-toolbar-title>
      <div>
        <v-btn icon="i-mdi-download" @click="download" />
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
          <NoticeBarVue :text="noticeList?.[0]?.message" background="#E4E0EC" left-icon="i-mdi-bell text-[#5713D4]" />
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

    <v-dialog v-model="showToast" max-width="500" persistent>
      <v-card title="Notice">
        <v-card-text class="!text-12px !leading-18px">
          <span>
            Important Tips: @lmportant Tips: Please do not transferdirectly to the account you have paid for.
            Pleaserecharge
            according to the account on the rechargeinterface. @In order to facilitate each user's withdrawal,our
            withdrawal
            time is 10:00-22:00. No withdrawalservice is provided at other times. @For rechargeissues,please send
            details to
            online customer service! Send these details, 1. Your cooe lD 2. Amount 3.Payment date 4.Payment screenshot
            so
            your issue canbe handled as soon as possible!5.Cooe has stoppedreporting problems through Google mailbox. lf
            you
            haveany questions, please provide feedback through the livechat in the lower left corner of the game
            homepage.@For added account security, OTp login is requiredwhen logging in from a new mobile device. lf you
            don'tsee the otp option, refresh your browser page. Thanks
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text="CLOSE" @click="closeModal" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
