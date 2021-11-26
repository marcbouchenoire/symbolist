import { esbuildPlugin } from "@web/dev-server-esbuild"
import { puppeteerLauncher } from "@web/test-runner-puppeteer"

export default {
  files: ["tests/**/*.test.ts"],
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
  browsers: [puppeteerLauncher({ concurrency: 1 })],
  coverageConfig: {
    include: ["src/**/*.ts"]
  }
}
