import type { Content, Root } from "hast"
import { findAndReplace } from "hast-util-find-and-replace"
import type { Plugin } from "unified"

/**
 * A plugin to wrap all SF Symbols within `span` elements with a `data-symbol` attribute.
 */
const wrapSymbols: Plugin<[]> = () => {
  return (tree) => {
    findAndReplace(
      tree as Root,
      /[\u{100000}-\u{10FFFF}]/gmu,
      (symbol: string) => {
        return {
          type: "element",
          tagName: "span",
          properties: { "data-symbol": true },
          children: [{ type: "text", value: symbol }]
        } as Content
      }
    )
  }
}

export default wrapSymbols
