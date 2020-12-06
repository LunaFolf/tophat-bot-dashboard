const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = {
  publicPath: './',
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html', // template file to embed the source
        inlineSource: '.(js|css)$' // embed all javascript and css inline
      }),
      new HtmlWebpackInlineSourcePlugin()
    ],
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@': 'components',
        assets: 'assets',
        store: 'store'
      }
    }
  }
}
