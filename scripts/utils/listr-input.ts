import chalk from "chalk"
import { ListrTask } from "listr"
import ListrDefaultInput from "listr-input"
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
    title: join(
      title,
      message ? chalk.dim(`(${message})`) : null,
      warning ? chalk.yellow(`(${warning})`) : null
    ),
    task: (context: C) => {
      return ListrDefaultInput(placeholder, {
        autoSubmit,
        done: (value) => {
          callback(value, context)
        }
      })
    }
  }
}
