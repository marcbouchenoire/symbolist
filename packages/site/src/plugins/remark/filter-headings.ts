import { Heading as HeadingNode } from "mdast"
import { toString } from "mdast-util-to-string"
import { Plugin } from "unified"
import { Node, Parent } from "unist"
import { isSomething } from "../../guards"

interface Heading {
  depth?: 1 | 2 | 3 | 4 | 5 | 6
  value?: string
}

interface Options {
  exclude?: Heading[]
  include?: Heading[]
}

function isHeadingNode(node: Node): node is HeadingNode {
  return node.type === "heading"
}

const filterHeadings: Plugin<[Options | undefined], Parent> = (options) => {
  return (tree) => {
    const included = options?.include ?? []
    const excluded = options?.exclude ?? []
    let include = true

    tree.children = tree.children
      .map((node) => {
        if (isHeadingNode(node)) {
          include = true

          for (const { depth, value } of excluded) {
            if (
              (isSomething(depth) && node.depth === depth) ||
              (isSomething(value) && toString(node) === value)
            ) {
              include = false
            }
          }

          for (const { depth, value } of included) {
            if (
              (isSomething(depth) && node.depth === depth) ||
              (isSomething(value) && toString(node) === value)
            ) {
              include = true
            }
          }
        }

        return (include ? node : undefined) as typeof node
      })
      .filter((node) => isSomething(node))
  }
}

export default filterHeadings
