//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`,
  START_SIMULAT: '/api/v1/css_screen/platform_ags/start_simulat',
  STOP_SIMULAT: '/api/v1/css_screen/platform_ags/stop_simulat',
  STATUS_SIMULAT: '/api/v1/css_screen/platform_ags/status_simulat',
  GET_PERCEPTION_ALARM: '/api/v1/device/platform_ips/perception_alarm_history',// 感知报警
  GET_PROCESS_PERCEPTION_ALARM: '/api/v1/device/platform_ips/process_perception_alarm',// 感知报警
  GET_CUSTOMER_FLOW: '/api/v1/device/platform_ips/customer_flow',// 实时客流监测
  GET_VIDEO_URL: '/api/v1/device/platform_manage/video_url',
  GET_CLEAR: '/api/v1/device/platform_ips/get_clear',
  SEND_SCENE: '/api/v1/device/platform_ws/send/',
  SEND_WELCOME_SCENE: '/api/v1/device/platform_ws/send/welcome_scene',
  POWER_ON: '/api/v1/device/platform_power/poweron',
  POWER_OFF: '/api/v1/device/platform_power/poweroff',
  GET_EMERGENT3: '/api/v1/device/platform_ats/waiting',// 感知报警 3级应急响应
  // 停止紧急状态
  GET_RECOVER: '/api/v1/device/platform_ats/recover',// 感知报警
  // 切换场景
}
