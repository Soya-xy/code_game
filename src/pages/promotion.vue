<script setup lang='ts'>
import { Clipboard } from 'v-clipboard'

const tab = ref(1)
const linkUrl = ref('')
const code = ref('')
const people = ref(0)
const contribution = ref(0)
const bonus = ref(0)

watch(tab, (e) => {
  findPromote({ level: e }).then((res) => {
    if (res.res === 1) {
      linkUrl.value = res.obj.link
      code.value = res.obj.code
      people.value = res.obj.people
      contribution.value = res.obj.contribution
      bonus.value = res.obj.bonus
    }
  })
}, {
  immediate: true,
})

const toast = useToast()
function copy() {
  try {
    Clipboard.copy(linkUrl.value)
    toast.success('Success')
  }
  catch (error) {

  }
}
</script>

<template>
  <v-layout>
    <v-app-bar elevation="3" color="#5713d4" :height="56">
      <v-app-bar-title>Promotion</v-app-bar-title>
      <template #append>
        <v-btn icon="i-mdi-text-long" />
      </template>
    </v-app-bar>

    <v-main>
      <v-container bg="#FAFAFA" class="h-[calc(100vh-120px)] overflow-scroll p2">
        <v-card :elevation="3">
          <v-card :title="`Bonus: ₹ ${(bonus).toFixed(2)}`" rounded="0" flex flex-col items-center>
            <template #actions>
              <v-btn color="#5713d4" variant="flat" :elevation="2" :rounded="0" my-3>
                Apply to Balance
              </v-btn>
            </template>
          </v-card>
          <v-card rounded="0">
            <v-divider />
            <v-tabs v-model="tab" color="deep-purple-accent-4" grow>
              <v-tab :value="1">
                Level 1
              </v-tab>
              <v-tab :value="2">
                Level 2
              </v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item v-for="n in 3" :key="n" :value="n">
                <v-container fluid>
                  <div my-5>
                    <div flex justify="between" items-center>
                      <div text="16px #000000de center" font-bold flex="1">
                        <p>Total People</p>
                        <p text="22px">
                          {{ people }}
                        </p>
                      </div>
                      <div text="16px #000000de center" font-bold flex="1">
                        <p>Contribution</p>
                        <p text="22px">
                          ₹ {{ contribution }}
                        </p>
                      </div>
                    </div>
                    <div mt10>
                      <v-text-field :model-value="code" label="My Promotion Code" variant="underlined" readonly />
                      <div
                        class="onlyLink"
                        pt-4 :data-clipboard-text="linkUrl"
                      >
                        <v-textarea
                          :model-value="linkUrl"
                          label="My Promotion Link" variant="underlined" readonly
                          rows="3"
                        />
                      </div>
                    </div>
                    <div w-full flex justify="center">
                      <v-btn color="" variant="tonal" :width="200" :elevation="2" :rounded="0" my-3 @click="copy">
                        Copy Link
                      </v-btn>
                    </div>
                  </div>
                </v-container>
              </v-window-item>
            </v-window>
          </v-card>
        </v-card>
      </v-container>
    </v-main>
  </v-layout>
</template>
