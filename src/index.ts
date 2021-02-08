import { isCanvas, isHTMLCanvasElement, isNumber } from "./guards"
import {
  ContextAttributes,
  ContextRenderingContext,
  ContextType,
  OffscreenContextRenderingContext
} from "./types"
import { isBrowser, returnIf, supportsOffscreenCanvas } from "./utils"

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150

interface Options {
  canvas?: HTMLCanvasElement | OffscreenCanvas
  offscreen?: boolean
  width?: number
  height?: number
}

const defaultOptions: Options = {
  offscreen: false
}

function createCanvas(offscreen: boolean) {
  if (isBrowser()) {
    return offscreen
      ? new OffscreenCanvas(DEFAULT_WIDTH, DEFAULT_HEIGHT)
      : document.createElement("canvas")
  } else {
    return null
  }
}

export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | (Options & { canvas?: undefined; offscreen?: false })
    | ContextAttributes<T>
): [HTMLCanvasElement | null, ContextRenderingContext<T> | null]
export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | (Options & { canvas?: undefined; offscreen: true })
    | ContextAttributes<T>
): [
  HTMLCanvasElement | OffscreenCanvas | null,
  OffscreenContextRenderingContext<T> | ContextRenderingContext<T> | null
]
export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | (Options & { canvas: HTMLCanvasElement; offscreen?: false })
    | ContextAttributes<T>
): [HTMLCanvasElement, ContextRenderingContext<T> | null]
export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | (Options & { canvas: HTMLCanvasElement; offscreen: true })
    | ContextAttributes<T>
): [
  HTMLCanvasElement | OffscreenCanvas,
  OffscreenContextRenderingContext<T> | ContextRenderingContext<T> | null
]
export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | (Options & { canvas: OffscreenCanvas; offscreen?: true })
    | ContextAttributes<T>
): [OffscreenCanvas, OffscreenContextRenderingContext<T> | null]
export function createCanvasContext<T extends ContextType>(
  type: T,
  options: Options | ContextAttributes<T> = defaultOptions
) {
  const { canvas: optionsCanvas, offscreen, width, height, ...attributes } = {
    ...defaultOptions,
    ...options
  }
  const asOffscreenCanvas = Boolean(offscreen && supportsOffscreenCanvas())

  const defaultCanvas =
    returnIf(optionsCanvas, isCanvas) ?? createCanvas(asOffscreenCanvas)
  const canvas =
    asOffscreenCanvas && isHTMLCanvasElement(defaultCanvas)
      ? defaultCanvas?.transferControlToOffscreen()
      : defaultCanvas

  if (isCanvas(canvas)) {
    if (isNumber(width)) {
      canvas.width = width
    }

    if (isNumber(height)) {
      canvas.height = height
    }
  }

  const context = isCanvas(canvas) ? canvas.getContext(type, attributes) : null

  return [canvas, context]
}
