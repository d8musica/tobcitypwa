/* eslint-disable */
const withCSS = require('@zeit/next-css')
const withOffline = require('next-offline')
const withImages = require('next-images')
const withLess = require('@zeit/next-less')
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => { }
}
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withOffline(withLess(withImages(withCSS({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  publicRuntimeConfig: {
    GOOGLE_MAPS: process.env.GOOGLE_MAPS
  }
}))))