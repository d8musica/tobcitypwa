// Progressive Web App: Add service worker with network-first strategy.
// Network-first strategy means that if there is no internet connection,
// the browser will use files previously saved locally to the user’s device instead.
// AKA Offline Mode!
const withOffline = require("next-offline");
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withLess = require('@zeit/next-less')
require("dotenv").config
const path =require("path")
const Dotenv = require("dotenv-webpack")

const nextConfig = {
  webpack: config => {
    config.plugins= config.plugins || []
    config.plugins = [
      ...config.plugins,

      new Dotenv({
      path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ]
    return config
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  target: "serverless",
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "networkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
}

module.exports = withCSS(withImages(withLess(withOffline(nextConfig))));
