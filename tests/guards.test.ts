import * as assert from "uvu/assert"
import {
  isCanvas,
  isFunction,
  isNumber,
  isTransferableCanvas
} from "../src/guards"
import {
  array,
  boolean,
  fun,
  map,
  number,
  object,
  set,
  string
} from "./constants"

describe("isFunction", () => {
  it("should return true for functions", () => {
    assert.equal(isFunction(fun), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isFunction(array), false)
    assert.equal(isFunction(boolean), false)
    assert.equal(isFunction(map), false)
    assert.equal(isFunction(number), false)
    assert.equal(isFunction(object), false)
    assert.equal(isFunction(set), false)
    assert.equal(isFunction(string), false)
  })
})

describe("isNumber", () => {
  it("should return true for numbers", () => {
    assert.equal(isNumber(number), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isNumber(array), false)
    assert.equal(isNumber(boolean), false)
    assert.equal(isNumber(fun), false)
    assert.equal(isNumber(map), false)
    assert.equal(isNumber(object), false)
    assert.equal(isNumber(set), false)
    assert.equal(isNumber(string), false)
  })
})

describe("isCanvas", () => {
  const canvas = document.createElement("canvas")
  const offscreenCanvas = new OffscreenCanvas(200, 200)

  it("should return true for HTMLCanvasElement and OffscreenCanvas", () => {
    assert.equal(isCanvas(canvas), true)
    assert.equal(isCanvas(offscreenCanvas), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isCanvas(array), false)
    assert.equal(isCanvas(boolean), false)
    assert.equal(isCanvas(fun), false)
    assert.equal(isCanvas(map), false)
    assert.equal(isCanvas(number), false)
    assert.equal(isCanvas(object), false)
    assert.equal(isCanvas(set), false)
    assert.equal(isCanvas(string), false)
  })
})

describe("isTransferableCanvas", () => {
  const canvas = document.createElement("canvas")
  const offscreenCanvas = new OffscreenCanvas(200, 200)

  it("should return true for HTMLCanvasElement", () => {
    assert.equal(isTransferableCanvas(canvas), true)
  })

  it("should return false for OffscreenCanvas", () => {
    assert.equal(isTransferableCanvas(offscreenCanvas), false)
  })
})
