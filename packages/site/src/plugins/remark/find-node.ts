import { Plugin } from "unified"
import { Parent } from "unist"
import { select } from "unist-util-select"

const findNode: Plugin<[string], Parent> = (selector) => {
  return (tree) => {
    const node = select(selector, tree)
    tree.children = []

    if (node) {
      tree.children.push(node)
    }
  }
}

export default findNode
