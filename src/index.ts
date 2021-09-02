import { isCanvas, isHTMLCanvasElement, isNumber } from "./guards"
import {
  ContextAttributes,
  ContextRenderingContext,
  ContextType,
  OffscreenContextRenderingContext,
  OffscreenContextType
} from "./types"
import { isBrowser } from "./utils/is-browser"
import { returnIf } from "./utils/return-if"
import { supportsOffscreenCanvas } from "./utils/supports-offscreen-canvas"

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150

interface Options {
  canvas?: HTMLCanvasElement | OffscreenCanvas
  height?: number
  offscreen?: boolean
  width?: number
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
    | ContextAttributes<T>
    | (Options & { canvas?: undefined; offscreen?: false })
): [ContextRenderingContext<T> | null, HTMLCanvasElement | null]
export function createCanvasContext<T extends OffscreenContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas?: undefined; offscreen: true })
): [
  ContextRenderingContext<T> | OffscreenContextRenderingContext<T> | null,
  HTMLCanvasElement | OffscreenCanvas | null
]
export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas: HTMLCanvasElement; offscreen?: false })
): [ContextRenderingContext<T> | null, HTMLCanvasElement]
export function createCanvasContext<T extends OffscreenContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas: HTMLCanvasElement; offscreen: true })
): [
  ContextRenderingContext<T> | OffscreenContextRenderingContext<T> | null,
  HTMLCanvasElement | OffscreenCanvas
]
export function createCanvasContext<T extends OffscreenContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas: OffscreenCanvas; offscreen?: true })
): [OffscreenContextRenderingContext<T> | null, OffscreenCanvas]
export function createCanvasContext<
  T extends ContextType | OffscreenContextType
>(type: T, options: ContextAttributes<T> | Options = defaultOptions) {
  const {
    canvas: optionsCanvas,
    offscreen,
    width,
    height,
    ...attributes
  } = {
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

  const context = isCanvas(canvas)
    ? canvas.getContext(type as OffscreenContextType, attributes)
    : null

  return [context, canvas]
}
