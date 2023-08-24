const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = {
  // 配置别名
  webpack: {
    configure(webpackConfig) {
      // production
      if (webpackConfig.mode === 'production') {
        // 抽离公共代码
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunks',
              test: /antd/,
              priority: 100
            },
            reactDom: {
              name: 'react-dom-chunks',
              test: /react-dom/,
              priority: 99
            },
            vendors: {
              name: 'vendors-chunks',
              test: /node_modules/,
              priority: 98
            }
          }
        }
      }
      return webpackConfig
    },
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
