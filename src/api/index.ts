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
