import data from "./data/symbols.json"
import { Symbols } from "./types"

export const symbols = data as Symbols

export function getSymbol(name: string): string | undefined {
  return (data as Symbols)[name]
}

export function getSymbolName(symbol: string): string | undefined {
  return Object.keys(data as Symbols).find(
    (name) => (data as Symbols)[name] === symbol
  )
}

export { Symbols } from "./types"
