import { getSymbol, getSymbolName } from "../src"

describe("getSymbol", () => {
  test("should return the expected symbol", () => {
    expect(getSymbol("scribble.variable")).toBe("􀤑")
  })

  test("should return undefined for unknown symbols", () => {
    expect(getSymbol("scribble.variable.fill" as any)).toBeUndefined()
  })
})

describe("getSymbolName", () => {
  test("should return the expected symbol name", () => {
    expect(getSymbolName("􀤑")).toBe("scribble.variable")
  })

  test("should return undefined for unknown symbols", () => {
    expect(getSymbolName("🥳")).toBeUndefined()
  })
})
