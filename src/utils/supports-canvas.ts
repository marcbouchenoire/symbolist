export function supportsCanvas() {
  return typeof HTMLCanvasElement !== "undefined"
}

export function supportsOffscreenCanvas() {
  return typeof OffscreenCanvas !== "undefined"
}
