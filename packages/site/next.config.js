module.exports = {
  basePath: "/ios-symbols",
  cleanUrls: true,
  trailingSlash: false,
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
