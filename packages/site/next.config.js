module.exports = {
  basePath: "/projects/symbolist",
  cleanUrls: true,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects/symbolist",
        permanent: true,
        basePath: false
      }
    ]
  }
}
