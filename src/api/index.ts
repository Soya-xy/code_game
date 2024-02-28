import Api from '~/utils/ajax'

export const getIndex = (e: any) => Api.get('/demo/list', e)
export const postIndex = (e: any) => Api.post('/demo/list', e)
export const sendSMS = (e: any) => Api.post('/smsserver/getCode', e)
export const login = (e: any) => Api.post('/user/login', e)
export const findNotice = (e?: any) => Api.post('/user/findNotice', e)
export const userInfo = (e?: any) => Api.post('/user/findUserInfo', e)
export const findGameLogByPage = (e?: any) => Api.post('/lottery/findGameLogByPage', e)
export const getPeriod = (e?: any) => Api.post('/lottery/getPeriod', e)
export const pour = (e?: any) => Api.post('/lottery/pour', e)
