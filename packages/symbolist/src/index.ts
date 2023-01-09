import data from "./data/symbols.json"
import type { SymbolName } from "./data/types"
import type { Symbols } from "./types"

/**
 * A collection of all symbols.
 *
 * @example
 *
 * ```js
 * import { symbols } from "symbolist"
 *
 * // symbols: {"0.circle": "􀀸", "0.circle.fill": "􀀹", ...}
 * ```
 */
export const symbols = data as Symbols

/**
 * Get a symbol from its name.
 *
 * @param name - The name of the symbol to get.
 * @returns The symbol.
 *
 * @example
 *
 * ```js
 * const symbol = getSymbol("scribble.variable")
 *
 * // symbol: "􀤑"
 * ```
 */
export function getSymbol(name: SymbolName): string | undefined {
  return (data as Symbols)[name]
}

/**
 * Get the name of a symbol.
 *
 * @param symbol - The symbol to get the name of.
 * @returns The symbol's name.
 *
 * @example
 *
 * ```js
 * const name = getSymbolName("􀣳")
 *
 * // name: "lasso.and.sparkles"
 * ```
 */
export function getSymbolName(symbol: string): SymbolName | undefined {
  return Object.keys(data as Symbols).find(
    (name) => (data as Symbols)[name as SymbolName] === symbol
  ) as SymbolName | undefined
}

export { SymbolName } from "./data/types"
export { Symbols } from "./types"
