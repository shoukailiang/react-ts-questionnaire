const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = {
  // 配置别名
  webpack: {
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}
