import type { Heading as HeadingNode } from "mdast"
import { toString } from "mdast-util-to-string"
import type { Plugin } from "unified"
import type { Node, Parent } from "unist"
import { isSomething } from "../../guards"

interface Heading {
  /**
   * The heading's scale.
   */
  depth?: 1 | 2 | 3 | 4 | 5 | 6

  /**
   * The heading's content.
   */
  value?: string
}

interface Options {
  /**
   * A list of headings to exclude.
   */
  exclude?: Heading[]

  /**
   * A list of headings to include.
   */
  include?: Heading[]
}

/**
 * Whether the node is a `HeadingNode`.
 *
 * @param node - The heading to check.
 */
function isHeadingNode(node: Node): node is HeadingNode {
  return node.type === "heading"
}

/**
 * A plugin to filter out headings and their sections.
 *
 * @param [options] - An optional set of settings.
 * @param [options.include] - A list of headings to include.
 * @param [options.exclude] - A list of headings to exclude.
 */
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
