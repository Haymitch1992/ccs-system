import {
  LOGIN,
  ROUTES,
  START_SIMULAT,
  GET_PERCEPTION_ALARM,
  GET_PROCESS_PERCEPTION_ALARM,
  STOP_SIMULAT, STATUS_SIMULAT,
  GET_CUSTOMER_FLOW,
  GET_CLEAR,
  GET_VIDEO_URL,
  SEND_SCENE,
  SEND_WELCOME_SCENE,
  POWER_ON,
  POWER_OFF,
  GET_EMERGENT3,
  GET_RECOVER
} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    name: name,
    password: password
  })
}

export async function changeScene(type) {
  return request(SEND_SCENE + type, METHOD.GET)
}

export async function powerOn(devices) {
  return request(POWER_ON, METHOD.POST, {
    devices:devices
  })
}
export async function powerOff(devices) {
  return request(POWER_OFF, METHOD.POST, {
    devices:devices
  })
}

export async function sendWelcomeScene(text) {
  return request(SEND_WELCOME_SCENE, METHOD.GET,{
    message: text,
  })
}

export async function videoUrl() {
  return request(GET_VIDEO_URL, METHOD.GET)
}


export async function getClear() {
  return request(GET_CLEAR, METHOD.GET)
}
// 开启仿真
export async function startSimulat(requestId,obj) {
  return request(START_SIMULAT, METHOD.POST, {
    requestId: requestId, // 请求时间戳
    data: obj // 
  })
}
// 停止仿真
export async function stopSimulat(requestId,obj) {
  return request(STOP_SIMULAT, METHOD.POST, {
    requestId: requestId, // 请求时间戳
    data: obj // 
  })
}
// 感知报警
export async function perceptionAlarm(number) {
  return request(GET_PERCEPTION_ALARM, METHOD.GET, {
    number: number
  })
}
// 获取仿真数据
export async function statusSimulat() {
  return request(STATUS_SIMULAT, METHOD.GET)
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

export async function ProcessPerceptionAlarm(uuid) {
  return request(GET_PROCESS_PERCEPTION_ALARM, METHOD.GET,{
    detect_uuid:uuid
  })
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}

// 获取实时客流监测
export async function customerFlow(start,end,interval) {
  return request(GET_CUSTOMER_FLOW, METHOD.GET,{
    start: start,
    end: end,
    interval:interval
  })
}

export async function getEmergent3() {
  return request(GET_EMERGENT3, METHOD.GET, {})
}
// 感知报警
export async function getRecover() {
  return request(GET_RECOVER, METHOD.GET, {})
}

export default {
  login,
  logout,
  getRoutesConfig,
  startSimulat,
  stopSimulat,
  statusSimulat,
    ProcessPerceptionAlarm,
  perceptionAlarm,
  customerFlow,
  videoUrl,
  getClear,
  changeScene,
  powerOn,
  powerOff,
  sendWelcomeScene, // 切换场景
  getEmergent3,
  getRecover
}
