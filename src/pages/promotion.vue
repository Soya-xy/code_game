<script setup lang='ts'>
import { Clipboard } from 'v-clipboard'

const tab = ref(1)
const linkUrl = ref('')
const code = ref('')
const people = ref(0)
const contribution = ref(0)
const bonus = ref(0)
const money = ref('')
const overlay = ref(false)

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

function apply(_e: any) {
  if (!money.value || Number(money.value) <= 0)
    return toast.error('Please input bonus')
  overlay.value = true
  balance({
    bonus: money.value,
  }).then((res) => {
    if (res.res === 1)
      toast.success('SUCCESS')

    else
      toast.error(res.resMsg)
  }).finally(() => overlay.value = false)
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
                <v-dialog
                  min-width="325px" transition="dialog-bottom-transition" persistent activator="parent"
                  width="auto"
                >
                  <template #default="{ isActive }">
                    <v-card>
                      <v-toolbar color="primary" title="Apply to Balance" />
                      <v-sheet width="80%" color="#FAFAFA" class="mx-auto mt-10">
                        <v-text-field
                          v-model="money" density="compact" placeholder="Bonus"
                          variant="solo"
                        />
                      </v-sheet>
                      <v-card-actions class="justify-end">
                        <v-btn variant="text" @click="isActive.value = false">
                          CANCEL
                        </v-btn>
                        <v-btn variant="text" color="primary" @click="apply(''), isActive.value = false">
                          CONFIRM
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
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
    <v-overlay :model-value="overlay" persistent class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate />
    </v-overlay>
  </v-layout>
</template>
