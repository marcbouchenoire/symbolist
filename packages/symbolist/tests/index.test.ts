import * as assert from "uvu/assert"
import { getSymbol, getSymbolName } from "../src"
import { describe } from "./helpers"

describe("getSymbol", (it) => {
  it("should return the expected symbol", () => {
    assert.equal(getSymbol("scribble.variable"), "􀤑")
  })

  it("should return undefined for unknown symbols", () => {
    assert.type(getSymbol("scribble.variable.fill" as any), "undefined")
  })
})

describe("getSymbolName", (it) => {
  it("should return the expected symbol name", () => {
    assert.equal(getSymbolName("􀤑"), "scribble.variable")
  })

  it("should return undefined for unknown symbols", () => {
    assert.type(getSymbolName("🥳"), "undefined")
  })
})
