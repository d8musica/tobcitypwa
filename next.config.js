/* eslint-disable */
const withCss = require('@zeit/next-css')
const withOffline = require('next-offline')
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withOffline(withCss())
