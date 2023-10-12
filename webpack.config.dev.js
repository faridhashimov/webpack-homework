const ESLintPlugin = require('eslint-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common.js')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 3000,
        hot: true,
        open: true,
    },
    plugins: [new ESLintPlugin()],
})
