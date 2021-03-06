let path = require('path')
const webpack = require('webpack')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const {getThemeColors, modifyVars} = require('./src/utils/themeUtil')
const {resolveCss} = require('./src/utils/theme-color-replacer-extend')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    // axios: 'axios',
    // nprogress: 'NProgress',
    // clipboard: 'ClipboardJS',
    // '@antv/data-set': 'DataSet',
    // 'js-cookie': 'Cookies'
  },
  css: [
  ],
  js: [
    // '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    // '//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
    // '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    // '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    // '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    // '//cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js',
    // '//cdn.jsdelivr.net/npm/@antv/data-set@0.11.4/build/data-set.min.js',
    // '//cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js'
  ]
}

module.exports = {
  devServer: {
    proxy: {
      '/api/v1/device/platform_ws': {//代理api
        target: 'http://172.51.215.158:80',
        changeOrigin: true,//是否跨域
        ws: true, // proxy websockets
        },
      '/api/v1/css_screen/platform_ags': { //此处要与 /services/api.js 中的 API_PROXY_PREFIX 值保持一致
        target: process.env.VUE_APP_API_BASE_URL,
        // target: 'http://10.252.187.11:80',
        changeOrigin: true,
      },
      '/api/v1/device/platform_ips': {//代理api
        //target: "http://192.168.62.228:9092",//测试api地址
        target: 'http://10.252.187.11:80',
        //target: "http://101.200.86.95:9092",//开发api地址http://192.168.62.228:9092/
        changeOrigin: true,//是否跨域
        ws: true, // proxy websockets
      },
      '/api/v1/device/platform_manage': {//代理api
        //target: "http://192.168.62.228:9092",//测试api地址
        target: 'http://10.252.187.11:80',
        //target: "http://101.200.86.95:9092",//开发api地址http://192.168.62.228:9092/
        changeOrigin: true,//是否跨域
        ws: true, // proxy websockets
      },
    
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
    }
  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];
    config.performance = {
      hints: false
    }
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    )
    // Ignore all locale files of moment.js
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
    // if prod, add externals
    if (isProd) {
      config.externals = assetsCDN.externals
    }
  },
  chainWebpack: config => {
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (isProd) {
      config.plugin('optimize-css')
        .tap(args => {
            args[0].cssnanoOptions.preset[1].colormin = false
          return args
        })
    }
    // 生产环境下使用CDN
    if (isProd) {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = assetsCDN
        return args
      })
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false
}
