<!-- eslint-disable no-var -->
<!-- eslint-disable eqeqeq -->
<script setup lang='ts'>
const toast = useToast()
const mobile = ref('+91')
const actualName = ref('')
const email = ref('')

const number = ref([])
const numberKey = ref('')
const selectedKey = ref('')
const usdtRate = ref(0)
const payment = ref<any>([])
const overlay = ref(true)

findRechargeInfo().then((res) => {
  if (res.res === 1)
    payment.value = res.obj.list

  else
    toast.error(res.resMsg ? res.resMsg : 'Please wait one minute')
}).finally(() => overlay.value = false)

findUsdtRechargeInfo().then((res) => {
  if (res.res === 1) {
    number.value = res.obj.recharge_prices.split(',')
    usdtRate.value = res.obj.usdt_rate
  }
  else {
    toast.error(res.resMsg ? res.resMsg : 'Please wait one minute')
  }
})

function pay(_e: any) {
  if (!numberKey.value || Number(numberKey.value) <= 0) {
    toast.error('check recharge money!')
    return
  }

  if (!actualName.value) {
    toast.error('Please input Actual Name')
    return
  }

  if (!mobile.value) {
    toast.error('Please check mobile number')
    return
  }

  if (!email.value) {
    toast.error('Please input Email')
    return
  }

  overlay.value = true
  paymentPost({
    money: numberKey.value,
    actualName: actualName.value,
    mobile: mobile.value,
    email: email.value,
    payType: payment.value[selectedKey.value].channelKey,
  }).then((res) => {
    if (res.res === 1)
      getRechargeResult(res.obj || '')

    else toast.error(res.res.resMsg ? res.res.resMsg : 'Please wait one minute')
  }).finally(() => overlay.value = false)
}

function JSPost(URL: any, PARAMTERS: any) {
  // 创建form表单
  const temp_form = document.createElement('form')
  temp_form.action = URL
  // 如需打开新窗口，form的target属性要设置为'_blank'
  temp_form.target = '_self'
  temp_form.method = 'post'
  temp_form.style.display = 'none'
  // 添加参数
  if (PARAMTERS) {
    PARAMTERS.forEach(
      (value: any, key: any) => {
        const opt = document.createElement('textarea')
        opt.name = key
        opt.value = value
        temp_form.appendChild(opt)
      },
    )
  }
  document.body.appendChild(temp_form)
  // 提交数据
  temp_form.submit()
}
function JSGet(URL: any, PARAMTERS: any) {
  // 创建form表单
  const temp_form = document.createElement('form')
  temp_form.action = URL
  // 如需打开新窗口，form的target属性要设置为'_blank'
  temp_form.target = '_self'
  temp_form.method = 'get'
  temp_form.style.display = 'none'
  // 添加参数
  // for (var item in PARAMTERS) {
  // 	var opt = document.createElement("textarea");
  // 	opt.name = PARAMTERS[item].name;
  // 	opt.value = PARAMTERS[item].value;
  // 	temp_form.appendChild(opt);
  // }

  // 添加参数
  if (PARAMTERS) {
    PARAMTERS.forEach(
      (value: any, key: any) => {
        const opt = document.createElement('textarea')
        opt.name = key
        opt.value = value
        temp_form.appendChild(opt)
      },
    )
  }
  document.body.appendChild(temp_form)
  // 提交数据
  temp_form.submit()
}

function getRechargeResult(orderNo: any) {
  const data = JSON.parse(orderNo)
  // 充值成功
  if (data.code == 0) {
    // 充值地址 orderNo.pay_url
    // this.globalTimer(true, data.down_sn);
    const index = data.pay_url.indexOf('?')

    let newURL = data.pay_url
    const args: any = new Map() // 空Map

    if (index > 0) {
      const query = data.pay_url.substring(index + 1)
      newURL = data.pay_url.substring(0, index)
      const pairs = query.split('&')
      // var args;

      for (let i = 0; i < pairs.length; i++) {
        const pos = pairs[i].indexOf('=')
        if (pos == -1)
          continue
        // 如果没找到，就跳过
        const name = pairs[i].substr(0, pos) // 获得名称
        let value = pairs[i].substr(pos + 1) // 提取value
        value = decodeURIComponent(value) // 解码value ,如果地址栏的参数没有转码的话则不需要这一步
        // args[name] = value;
        args.set(name, value)
      }
    }
    const submitType = payment.value[selectedKey.value].channelSubmitType
    const rechargeType = payment.value[selectedKey.value].channelKey
    if (submitType) {
      if (submitType === 'get')
        JSGet(newURL, args)

      else if (submitType === 'post')
        JSPost(newURL, args)

      else if (submitType === 'redirect')
        window.location.href = data.pay_url
    }
    else {
      if (rechargeType === 5 || rechargeType === 3 || rechargeType === 8 || rechargeType === 11 || rechargeType === 14) {
        // var index = data.pay_url.indexOf('?');
        // var query = data.pay_url.substring(index + 1);
        // var newURL = data.pay_url.substring(0, index);
        // var pairs = query.split('&');
        // // var args;
        // var args = new Map(); // 空Map
        // for (var i = 0; i < pairs.length; i++) {
        // 	var pos = pairs[i].indexOf('=');
        // 	if (pos == -1) {
        // 		continue;
        // 	} // 如果没找到，就跳过
        // 	var name = pairs[i].substr(0, pos); // 获得名称
        // 	var value = pairs[i].substr(pos + 1); // 提取value
        // 	value = decodeURIComponent(value); // 解码value ,如果地址栏的参数没有转码的话则不需要这一步
        // 	// args[name] = value;
        // 	args.set(name, value)
        // }
        JSGet(newURL, args)
      }
      else if (rechargeType === 2 || rechargeType === 9 || rechargeType === 12 || rechargeType === 13) {
        // var index = data.pay_url.indexOf('?');
        // var query = data.pay_url.substring(index + 1);
        // var newURL = data.pay_url.substring(0, index);
        // var pairs = query.split('&');
        // // var args;
        // var args = new Map(); // 空Map
        // for (var i = 0; i < pairs.length; i++) {
        // 	var pos = pairs[i].indexOf('=');
        // 	if (pos == -1) {
        // 		continue;
        // 	} // 如果没找到，就跳过
        // 	var name = pairs[i].substr(0, pos); // 获得名称
        // 	var value = pairs[i].substr(pos + 1); // 提取value
        // 	value = decodeURIComponent(value); // 解码value ,如果地址栏的参数没有转码的话则不需要这一步
        // 	// args[name] = value;
        // 	args.set(name, value)
        // }
        JSPost(newURL, args)
        // this.JSPost(data.pay_url, null);
      }
      else {
        JSPost(data.pay_url, null)
      }
    }
  }
  else {
    toast.error(data.msg)
  }
}
</script>

<template>
  <div>
    <div class="w-full flex items-center bg-[#fb8c00] p2 text-white">
      <i class="i-mdi:alert-decagram-outline mr-2 block text-xl text-[#0000004d] icon-btn" />
      <p flex-1>
        Note: If the recharge amount has been deducted but the amount has not arrived, please send the payment details
        and
        game ID screenshots to the online customer service of the game interface for processing.
      </p>
    </div>
    <div p2>
      <v-card rounded="0">
        <div text-center>
          <p text="#f00 17px" m8px font-bold>
            Any problem? Contact customer service
          </p>
          <p text="#000 3xl" my4 font-bold>
            Balance: ₹ 0.00
          </p>
        </div>
        <v-form>
          <v-container>
            <v-row justify-center>
              <v-col cols="12">
                <v-text-field
                  v-model="numberKey" rounded="0" type="number" prepend-inner-icon="i-mdi-wallet"
                  variant="solo"
                />
              </v-col>

              <v-col v-for="v in number" :key="v" cols="4" sm="3" py-6px>
                <v-btn variant="tonal" w-full @click="numberKey = v">
                  ₹ {{ v }}
                </v-btn>
              </v-col>
              <v-divider mt-4 />
              <v-item-group v-model="selectedKey" mandatory w-full>
                <v-list w-full>
                  <v-list-subheader>Payment</v-list-subheader>

                  <v-item v-for="v in payment" :key="v" v-slot="{ isSelected, toggle }">
                    <v-list-item class="w-full" :value="v">
                      <template #prepend>
                        <v-icon v-if="isSelected" icon="i-mdi-check" />
                      </template>
                      <div @click="toggle">
                        <v-list-item-title>{{ v.channelName }}</v-list-item-title>
                      </div>
                    </v-list-item>
                  </v-item>
                </v-list>
              </v-item-group>

              <v-col cols="6" items-center py-6px>
                <v-btn variant="elevated" color="#5713D4" w-full>
                  Recharge
                  <v-dialog
                    min-width="325px" transition="dialog-bottom-transition" persistent activator="parent"
                    width="auto"
                  >
                    <template #default="{ isActive }">
                      <v-card>
                        <v-toolbar color="primary" :title="payment[selectedKey].channelName" />
                        <v-sheet width="80%" color="#FAFAFA" class="mx-auto mt-10">
                          <v-text-field
                            v-model="mobile" density="compact" placeholder="Mobile Number"
                            prepend-inner-icon="i-mdi-cellphone" variant="solo"
                            :rules="[value => !!value || 'Mobile Number is required']"
                          />

                          <v-text-field
                            v-model="actualName" type="text"
                            :rules="[value => !!value || 'actualName is required']" density="compact"
                            placeholder="Enter your Actual Name" prepend-inner-icon="i-mdi-account" variant="solo"
                          />
                          <v-text-field
                            v-model="email" type="text" :rules="[value => !!value || 'Email is required']"
                            density="compact" placeholder="Enter your Email" prepend-inner-icon="i-mdi-mail"
                            variant="solo"
                          />
                        </v-sheet>
                        <v-card-actions class="justify-end">
                          <v-btn variant="text" @click="isActive.value = false">
                            CANCEL
                          </v-btn>
                          <v-btn variant="text" color="primary" @click="pay(''), isActive.value = false">
                            CONFIRM
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </div>
    <v-overlay :model-value="overlay" persistent class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate />
    </v-overlay>
  </div>
</template>

<route lang="yaml">
meta:
  layout: nav
  icon: i-mdi-text-long
  path: /recharge_log
  title: Recharge
</route>
