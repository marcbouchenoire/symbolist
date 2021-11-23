import * as assert from "uvu/assert"
import { isFunction, isNumber } from "../../src/guards"
import { returnIf } from "../../src/utils/return-if"
import { boolean, fun, number, string } from "../constants"

describe("returnIf", () => {
  it("should return its input for positive guards", () => {
    assert.equal(returnIf(fun, isFunction), fun)
    assert.equal(returnIf(number, isNumber), number)
  })

  it("should return null for negative guards", () => {
    assert.equal(returnIf(string as any, isFunction), null)
    assert.equal(returnIf(boolean as any, isNumber), null)
  })
})
