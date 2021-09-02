export type Unpack<T> = T extends (infer U)[] ? U : T

export type Guard<T> = (value: T | unknown) => value is T

export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R

export type ContextType = "2d" | "bitmaprenderer" | "webgl" | "webgl2"

export type OffscreenContextType = "2d"

interface ContextsRenderingContext {
  "2d": CanvasRenderingContext2D
  bitmaprenderer: ImageBitmapRenderingContext
  webgl: WebGLRenderingContext
  webgl2: WebGL2RenderingContext
}

interface OffscreenContextsRenderingContext {
  "2d": OffscreenCanvasRenderingContext2D
  bitmaprenderer: ImageBitmapRenderingContext
  webgl: WebGLRenderingContext
  webgl2: WebGL2RenderingContext
}

interface ContextsAttributes {
  "2d": CanvasRenderingContext2DSettings
  bitmaprenderer: ImageBitmapRenderingContextSettings
  webgl: WebGLContextAttributes
  webgl2: WebGLContextAttributes
}

export type ContextRenderingContext<T extends ContextType> =
  ContextsRenderingContext[T]

export type OffscreenContextRenderingContext<T extends ContextType> =
  OffscreenContextsRenderingContext[T]

export type ContextAttributes<T extends ContextType> = ContextsAttributes[T]
