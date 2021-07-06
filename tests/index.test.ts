import { createCanvasContext } from "../src"

describe("createCanvasContext", () => {
  test("should return an HTMLCanvasElement when the offscreen option is not specified or set to false", () => {
    const [, canvas] = createCanvasContext("2d")
    const [, specifiedCanvas] = createCanvasContext("2d", { offscreen: false })

    expect(canvas).toBeInstanceOf(HTMLCanvasElement)
    expect(specifiedCanvas).toBeInstanceOf(HTMLCanvasElement)
  })

  test("should return an OffscreenCanvas when the offscreen option is set to true", () => {
    const [, canvas] = createCanvasContext("2d", { offscreen: true })

    expect(canvas).toBeInstanceOf(OffscreenCanvas)
  })

  test("should return a rendering context from the canvas instance it returns", () => {
    const [context, canvas] = createCanvasContext("2d", { offscreen: true })

    expect(canvas).toBe(context?.canvas)
  })

  test("should return a rendering context matching the type argument", () => {
    const [context2d] = createCanvasContext("2d")
    const [contextBitmap] = createCanvasContext("bitmaprenderer")
    const [contextWebgl] = createCanvasContext("webgl")
    const [contextWebgl2] = createCanvasContext("webgl2")

    expect(context2d).toBeInstanceOf(CanvasRenderingContext2D)
    expect(contextBitmap).toBeInstanceOf(ImageBitmapRenderingContext)
    expect(contextWebgl).toBeInstanceOf(WebGLRenderingContext)
    expect(contextWebgl2).toBeInstanceOf(WebGL2RenderingContext)
  })

  test("should use an existing HTMLCanvasElement when provided", () => {
    const providedCanvas = document.createElement("canvas")
    const [, canvas] = createCanvasContext("2d", {
      canvas: providedCanvas
    })

    expect(canvas).toBe(providedCanvas)
  })

  test("should use an existing OffscreenCanvas when provided", () => {
    const providedOffscreenCanvas = new OffscreenCanvas(200, 200)
    const [, offscreenCanvas] = createCanvasContext("2d", {
      canvas: providedOffscreenCanvas
    })

    expect(offscreenCanvas).toBe(providedOffscreenCanvas)
  })

  test("should set the width and/or height canvas attributes when provided values", () => {
    const PROVIDED_WIDTH = 100
    const PROVIDED_HEIGHT = 100

    const [, canvas] = createCanvasContext("2d", {
      height: PROVIDED_HEIGHT,
      width: PROVIDED_WIDTH
    })
    const [, providedCanvas] = createCanvasContext("2d", {
      canvas: document.createElement("canvas"),
      height: PROVIDED_HEIGHT,
      width: PROVIDED_WIDTH
    })
    const [, offscreenCanvas] = createCanvasContext("2d", {
      height: PROVIDED_HEIGHT,
      offscreen: true,
      width: PROVIDED_WIDTH
    })

    expect(canvas?.width).toBe(PROVIDED_WIDTH)
    expect(providedCanvas?.width).toBe(PROVIDED_WIDTH)
    expect(offscreenCanvas?.width).toBe(PROVIDED_WIDTH)
    expect(canvas?.height).toBe(PROVIDED_HEIGHT)
    expect(providedCanvas?.height).toBe(PROVIDED_HEIGHT)
    expect(offscreenCanvas?.height).toBe(PROVIDED_HEIGHT)
  })
})
