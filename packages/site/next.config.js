module.exports = {
  basePath: "/projects/ios-symbols",
  cleanUrls: true,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects/ios-symbols",
        permanent: true,
        basePath: false
      }
    ]
  }
}
