import {
  isFunction,
  isNumber,
  isCanvas,
  isHTMLCanvasElement
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
  test("should return true for functions", () => {
    expect(isFunction(fun)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isFunction(array)).toBeFalsy()
    expect(isFunction(boolean)).toBeFalsy()
    expect(isFunction(map)).toBeFalsy()
    expect(isFunction(number)).toBeFalsy()
    expect(isFunction(object)).toBeFalsy()
    expect(isFunction(set)).toBeFalsy()
    expect(isFunction(string)).toBeFalsy()
  })
})

describe("isNumber", () => {
  test("should return true for numbers", () => {
    expect(isNumber(number)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isNumber(array)).toBeFalsy()
    expect(isNumber(boolean)).toBeFalsy()
    expect(isNumber(fun)).toBeFalsy()
    expect(isNumber(map)).toBeFalsy()
    expect(isNumber(object)).toBeFalsy()
    expect(isNumber(set)).toBeFalsy()
    expect(isNumber(string)).toBeFalsy()
  })
})

describe("isCanvas", () => {
  const canvas = document.createElement("canvas")
  const offscreenCanvas = new OffscreenCanvas(200, 200)

  test("should return true for HTMLCanvasElement and OffscreenCanvas", () => {
    expect(isCanvas(canvas)).toBeTruthy()
    expect(isCanvas(offscreenCanvas)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isCanvas(array)).toBeFalsy()
    expect(isCanvas(boolean)).toBeFalsy()
    expect(isCanvas(fun)).toBeFalsy()
    expect(isCanvas(map)).toBeFalsy()
    expect(isCanvas(number)).toBeFalsy()
    expect(isCanvas(object)).toBeFalsy()
    expect(isCanvas(set)).toBeFalsy()
    expect(isCanvas(string)).toBeFalsy()
  })
})

describe("isHTMLCanvasElement", () => {
  const canvas = document.createElement("canvas")
  const offscreenCanvas = new OffscreenCanvas(200, 200)

  test("should return true for HTMLCanvasElement", () => {
    expect(isHTMLCanvasElement(canvas)).toBeTruthy()
  })

  test("should return false for OffscreenCanvas", () => {
    expect(isHTMLCanvasElement(offscreenCanvas)).toBeFalsy()
  })
})
