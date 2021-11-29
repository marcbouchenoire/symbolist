import { ListrTask } from "listr"
import ListrDefaultInput from "listr-input"
import pc from "picocolors"
import { join } from "./join"

export function ListrInput<C>(
  title: string,
  placeholder: string,
  callback: (value: string, context: C) => void,
  message?: string,
  warning = "waiting on input…",
  autoSubmit: (value: string) => boolean = () => false
): ListrTask<C> {
  return {
    task: (context: C) => {
      return ListrDefaultInput(placeholder, {
        autoSubmit,
        done: (value) => {
          callback(value, context)
        }
      })
    },
    title: join(
      title,
      message ? pc.dim(`(${message})`) : null,
      warning ? pc.yellow(`(${warning})`) : null
    )
  }
}
