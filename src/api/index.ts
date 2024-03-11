import qs from 'qs'
import { alovaInstance } from '~/utils/ajax'

const Api = alovaInstance()

export const getIndex = (e: any) => Api.Get('/demo/list', e)
export const postIndex = (e: any) => Api.Post('/demo/list', e)
export const sendSMS = (e: any) => Api.Post('/smsserver/getCode', e)

export function login(data: any) {
  return Api.Post('/user/login', qs.stringify(data))
}
export const findNotice = (e?: any) => Api.Post('/user/findNotice', e)
export const userInfo = (e?: any) => Api.Post('/user/findUserInfo', e)
export const findGameLogByPage = (e?: any) => Api.Post('/lottery/findGameLogByPage', e)
export const getPeriod = (e?: any) => Api.Post('/lottery/getPeriod', e)
export const pour = (e?: any) => Api.Post('/lottery/pour', e)
