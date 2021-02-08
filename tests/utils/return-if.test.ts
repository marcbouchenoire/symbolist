import { isFunction, isNumber } from "../../src/guards"
import { returnIf } from "../../src/utils"
import { boolean, fun, number, string } from "../constants"

describe("returnIf", () => {
  test("should return its input for positive guards", () => {
    expect(returnIf(fun, isFunction)).toBe(fun)
    expect(returnIf(number, isNumber)).toBe(number)
  })

  test("should return null for negative guards", () => {
    expect(returnIf(string as any, isFunction)).toBeNull()
    expect(returnIf(boolean as any, isNumber)).toBeNull()
  })
})
