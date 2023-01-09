import clipboard from "clipboardy"
import type { ListrTask } from "listr"
import { ListrInput } from "./listr-input"

/**
 * A Listr input using the clipboard's content.
 *
 * @param title - The action's message.
 * @param callback - The function to invoke when submitting.
 */
export function ListrClipboard<C>(
  title: string,
  callback: (value: string, context: C) => void
): ListrTask<C> {
  return ListrInput(
    title,
    " ",
    (_, context) => {
      callback(clipboard.readSync(), context)
    },
    "↩",
    "waiting…",
    (value) => value.length > 0
  )
}
