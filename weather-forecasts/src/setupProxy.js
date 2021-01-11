
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/weather_boot', {
    // target: 'http://127.0.0.1:80',
    // target: 'http://www.qianyong.net',
     target: 'http://81.70.95.26:8080',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/weather_boot": "/weather_boot"
    }
  }))
}