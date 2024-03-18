import qs from 'qs'
import Api from '~/utils/ajax'

// const Api = alovaInstance()

// export const getIndex = (e: any) => Api.Get('/demo/list', e)
export const postIndex = (e: any) => Api.post('/demo/list', e)
export const sendSMS = (e: any) => Api.post('/smsserver/getCode', e)

export function login(data: any) {
  return Api.post('/user/login', qs.stringify(data))
}
export const findNotice = (e?: any) => Api.post('/user/findNotice', e)
export const userInfo = (e?: any) => Api.post('/user/findUserInfo', e)
export const findGameLogByPage = (e?: any) => Api.post('/wingo/findGameLogByPage', e)
export const findUserGameLogByPage = (e?: any) => Api.post('/wingo/findUserLogByPage', e)
export const getPeriod = (e?: any) => Api.post('/wingo/getPeriod', e)
export const pour = (e?: any) => Api.post('/lottery/pour', e)
export const addBankCard = (e?: any) => Api.post('/cash/addBankCard', e)
export const editBankCard = (e?: any) => Api.post('/cash/editBankCard', e)
export const findBankCard = (e?: any) => Api.post('/cash/findBankCard', e)
export const delBankCard = (e?: any) => Api.post('/cash/delBankCard', e)
export const findPromote = (e?: any) => Api.post('/user/findPromote', e)
export const changeNick = (e?: any) => Api.post('/user/changeNick', e)
export const balance = (e?: any) => Api.post('/user/balance', e)
export const findMoneyTranceList = (e?: any) => Api.post('/cash/findMoneyTranceList', e)
export const withdrawPost = (e?: any) => Api.post('/cash/withdraw', e)
export const findUsdtRechargeInfo = (e?: any) => Api.post('/cash/findUsdtRechargeInfo', e)
export const findRechargeInfo = (e?: any) => Api.post('/cash/findRechargeInfo', e)
export const paymentPost = (e?: any) => Api.post('/cash/pay', e)
