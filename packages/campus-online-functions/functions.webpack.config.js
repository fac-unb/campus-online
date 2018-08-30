/* eslint-env node, commonjs */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {plugins: [new UglifyJsPlugin()]}
