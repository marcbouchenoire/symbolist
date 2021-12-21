import { Plugin } from "unified"
import { remove } from "unist-util-remove"

const removeImages: Plugin = () => {
  return (tree) => {
    remove(tree, { tagName: "img", type: "element" })
  }
}

export default removeImages
