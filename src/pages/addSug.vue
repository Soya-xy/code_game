<script setup lang='ts'>
const router = useRouter()

const suggestList = ['Suggestion', 'Consult', 'Recharge Problem', 'Withdraw Problem', 'Parity Problem', 'Gift Receive Problem', 'Other']
const Description = ref<string>('')
const WhatsApp = ref<string>('')
const outId = ref<string>('')
const toast = useToast()
const type = ref<string>('')
const loading = useLoading()
function submit() {
  if (!outId.value)
    return toast.error('Please input outId')
  if (!WhatsApp.value)
    return toast.error('Please input WhatsApp')
  if (!Description.value)
    return toast.error('Please input Description')
  if (!type.value)
    return toast.error('Please select type')
  loading.setLoading(true)

  addComplaints({
    whatsapp: WhatsApp.value,
    outId: outId.value,
    description: Description.value,
    type: suggestList.indexOf(type.value) + 1,
  }).then((res) => {
    if (res.res === 1) {
      toast.success('Your Complaints & Suggestions is successful completd', {
        onClose: () => {
          router.replace('/mine')
        },
      })
    }
  }).finally(() => loading.setLoading(false))
}
</script>

<template>
  <div>
    <v-container fluid bg="#FAFAFA" class="min-h-[calc(100vh-64px)]">
      <v-sheet width="350" color="#FAFAFA" class="mx-auto mt-10">
        <v-select
          v-model="type"
          label="Select"
          :items="suggestList"
        />
        <v-text-field
          v-model="outId" density="compact" placeholder="outId"
          variant="solo"
        />
        <v-text-field
          v-model="WhatsApp" density="compact" placeholder="WhatsApp"
          variant="solo"
        />
        <v-text-field
          v-model="Description" density="compact" placeholder="Description"
          variant="solo"
        />

        <v-btn class="mb-8 mt-5" block color="#0288d1" size="large" variant="elevated" @click="submit">
          Continue
        </v-btn>
      </v-sheet>
    </v-container>
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  title: Privacy Policy
</route>
