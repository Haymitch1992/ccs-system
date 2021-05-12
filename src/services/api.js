//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`,
  START_SIMULAT: '/api/v1/css_screen/platform_ags/start_simulat',
  STOP_SIMULAT: '/api/v1/css_screen/platform_ags/stop_simulat',
}
