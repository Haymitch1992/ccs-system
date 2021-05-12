import {LOGIN, ROUTES,START_SIMULAT,STOP_SIMULAT} from '@/services/api'
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
// 开启仿真
export async function startSimulat(requestId,obj) {
  return request(START_SIMULAT, METHOD.POST, {
    requestId: requestId, // 请求时间戳
    data: obj // 
  })
}
// 开启仿真
export async function stopSimulat(requestId,obj) {
  return request(STOP_SIMULAT, METHOD.POST, {
    requestId: requestId, // 请求时间戳
    data: obj // 
  })
}


export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
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
export default {
  login,
  logout,
  getRoutesConfig,
  startSimulat,
  stopSimulat
}
