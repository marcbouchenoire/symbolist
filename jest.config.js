module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc-node/jest"
  },
  runner: "jest-electron/runner",
  testEnvironment: "jest-electron/environment"
}
