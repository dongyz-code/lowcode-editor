const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0',
    port: '8080',
  },
  transpileDependencies: true,
  configureWebpack: {},
  chainWebpack: (config) => {
    config.resolve.extensions.clear().merge(['.ts', '.js', '.json', '.vue', '.tsx'])
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
})
