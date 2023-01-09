import type { ListrTask } from "listr"
import ListrDefaultInput from "listr-input"
import pc from "picocolors"
import { join } from "./join"

/**
 * A Listr input.
 *
 * @param title - The action's message.
 * @param placeholder - The input's placeholder.
 * @param callback - The function to invoke when submitting.
 * @param [message] - The action's secondary message.
 * @param [warning] - The action's warning.
 * @param [autoSubmit] - A function to decide whether to submit the current value.
 */
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
