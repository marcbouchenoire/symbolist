import { Content, Node, findAndReplace } from "hast-util-find-and-replace"
import { Plugin } from "unified"

const wrapSymbols: Plugin<[]> = () => {
  return (tree) => {
    findAndReplace(tree as Node, /[\u{100000}-\u{10FFFF}]/gmu, (symbol) => {
      return {
        type: "element",
        tagName: "span",
        properties: { "data-symbol": true },
        children: [{ type: "text", value: symbol }]
      } as Content
    })
  }
}

export default wrapSymbols
