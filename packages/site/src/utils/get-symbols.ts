import { symbols } from "ios-symbols"
import { NamedSymbol } from "../types"

export function getSymbols() {
  const namedSymbols: NamedSymbol[] = []

  for (const [name, symbol] of Object.entries(symbols)) {
    namedSymbols.push({
      name,
      symbol
    })
  }

  return namedSymbols
}
