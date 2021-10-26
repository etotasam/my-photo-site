const isProduction = process.env.NODE_ENV === `production`
const path = require('path')


module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: isProduction ? process.env.PRODUCTION_API_URL : process.env.DEVELOPMENT_API_URL
  },
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
  images: {
    domains: ['firebasestorage.googleapis.com', `storage.googleapis.com`]
  }
}

