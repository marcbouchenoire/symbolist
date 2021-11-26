import { PlainFunction, Unpack } from "./types"

export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

export function isCanvas<T extends HTMLCanvasElement | OffscreenCanvas>(
  value: T | unknown
): value is T {
  return isFunction((value as HTMLCanvasElement | OffscreenCanvas)?.getContext)
}

export function isTransferableCanvas(
  value: HTMLCanvasElement | OffscreenCanvas | unknown
): value is HTMLCanvasElement {
  return (
    Boolean(value) &&
    "transferControlToOffscreen" in (value as HTMLCanvasElement)
  )
}
