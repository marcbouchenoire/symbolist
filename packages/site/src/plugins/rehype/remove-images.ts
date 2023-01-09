import type { Plugin } from "unified"
import { remove } from "unist-util-remove"

/**
 * A plugin to remove all image nodes.
 */
const removeImages: Plugin = () => {
  return (tree) => {
    remove(tree, { tagName: "img", type: "element" })
  }
}

export default removeImages
