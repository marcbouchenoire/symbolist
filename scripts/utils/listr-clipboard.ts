import { readSync as readClipboard } from "clipboardy"
import { ListrTask } from "listr"
import { ListrInput } from "./listr-input"

export function ListrClipboard<C>(
  title: string,
  callback: (value: string, context: C) => void
): ListrTask<C> {
  return ListrInput(
    title,
    " ",
    (_, context) => {
      callback(readClipboard(), context)
    },
    "↩",
    "waiting…",
    (value) => value.length > 0
  )
}
