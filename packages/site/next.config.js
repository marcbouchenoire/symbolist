module.exports = {
  basePath: "/ios-symbols",
  cleanUrls: true,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ios-symbols",
        permanent: true,
        basePath: false
      }
    ]
  }
}
