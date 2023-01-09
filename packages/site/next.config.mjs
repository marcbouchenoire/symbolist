import { createRequire } from "module"
import path from "path"
import { writeJsonFileSync } from "write-json-file"

const DATA_PATH = path.resolve("./src/data.json")

/**
 * Create a static data object.
 */
function getData() {
  const pkg = createRequire(import.meta.url)("./package.json")

  return {
    version: pkg.version,
    date: String(new Date().getFullYear())
  }
}

/**
 * Store various things as static files.
 */
export function storeStaticFiles() {
  writeJsonFileSync(DATA_PATH, getData())
}

export default () => {
  storeStaticFiles()

  return {
    trailingSlash: false,
    eslint: {
      ignoreDuringBuilds: true
    }
  }
}
