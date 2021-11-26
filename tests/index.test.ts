import * as assert from "uvu/assert"
import { createCanvasContext } from "../src"
import { mock } from "./helpers"

const PROVIDED_WIDTH = 200
const PROVIDED_HEIGHT = 100

describe("createCanvasContext", () => {
  it("should return an HTMLCanvasElement when the offscreen option is not specified or set to false", () => {
    const [, canvas] = createCanvasContext("2d")
    const [, specifiedCanvas] = createCanvasContext("2d", { offscreen: false })

    assert.instance(canvas, HTMLCanvasElement)
    assert.instance(specifiedCanvas, HTMLCanvasElement)
  })

  it("should return an OffscreenCanvas when the offscreen option is set to true", () => {
    const [, canvas] = createCanvasContext("2d", { offscreen: true })

    assert.instance(canvas, OffscreenCanvas)
  })

  it("should return an HTMLCanvasElement when the offscreen option is to true but OffscreenCanvas isn't supported", () => {
    const restoreOffscreenCanvas = mock(window, "OffscreenCanvas")

    const [, canvas] = createCanvasContext("2d", { offscreen: true })

    assert.instance(canvas, HTMLCanvasElement)

    restoreOffscreenCanvas()
  })

  it("should return null values when HTMLCanvasElement or OffscreenCanvas aren't supported", () => {
    const restoreHTMLCanvasElement = mock(window, "HTMLCanvasElement")
    const restoreOffscreenCanvas = mock(window, "OffscreenCanvas")

    const [context, canvas] = createCanvasContext("2d")
    const [offscreenContext, offscreenCanvas] = createCanvasContext("2d", {
      offscreen: true
    })

    assert.equal(context, null)
    assert.equal(canvas, null)
    assert.equal(offscreenContext, null)
    assert.equal(offscreenCanvas, null)

    restoreHTMLCanvasElement()
    restoreOffscreenCanvas()
  })

  it("should return a rendering context from the canvas instance it returns", () => {
    const [context, canvas] = createCanvasContext("2d", { offscreen: true })

    assert.equal(canvas, context?.canvas)
  })

  it("should return a rendering context matching the type argument", () => {
    const [context2d] = createCanvasContext("2d")
    const [contextBitmap] = createCanvasContext("bitmaprenderer")
    const [contextWebgl] = createCanvasContext("webgl")
    const [contextWebgl2] = createCanvasContext("webgl2")

    assert.instance(context2d, CanvasRenderingContext2D)
    assert.instance(contextBitmap, ImageBitmapRenderingContext)
    assert.instance(contextWebgl, WebGLRenderingContext)
    assert.instance(contextWebgl2, WebGL2RenderingContext)
  })

  it("should use an existing HTMLCanvasElement when provided", () => {
    const providedCanvas = document.createElement("canvas")
    const [, canvas] = createCanvasContext("2d", {
      canvas: providedCanvas
    })

    assert.equal(canvas, providedCanvas)
  })

  it("should use an existing OffscreenCanvas when provided", () => {
    const providedOffscreenCanvas = new OffscreenCanvas(200, 200)
    const [, offscreenCanvas] = createCanvasContext("2d", {
      canvas: providedOffscreenCanvas
    })

    assert.equal(offscreenCanvas, providedOffscreenCanvas)
  })

  it("should transfer control from a provided HTMLCanvasElement to an OffscreenCanvas", () => {
    const providedCanvas = document.createElement("canvas")
    providedCanvas.width = PROVIDED_WIDTH
    providedCanvas.height = PROVIDED_HEIGHT

    const [, canvas] = createCanvasContext("2d", {
      offscreen: true,
      canvas: providedCanvas
    })

    assert.instance(canvas, OffscreenCanvas)
    assert.equal(canvas.width, PROVIDED_WIDTH)
    assert.equal(canvas.height, PROVIDED_HEIGHT)
  })

  it("should set the width and/or height canvas attributes when provided values", () => {
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

    assert.equal(canvas?.width, PROVIDED_WIDTH)
    assert.equal(providedCanvas?.width, PROVIDED_WIDTH)
    assert.equal(offscreenCanvas?.width, PROVIDED_WIDTH)
    assert.equal(canvas?.height, PROVIDED_HEIGHT)
    assert.equal(providedCanvas?.height, PROVIDED_HEIGHT)
    assert.equal(offscreenCanvas?.height, PROVIDED_HEIGHT)
  })
})
