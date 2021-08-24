import chalk from "chalk"
import { ListrTask } from "listr"
import { join } from "./join"

export function ListrMessage(title: string, detail?: string): ListrTask {
  return {
    task: () => {},
    title: join(title, detail ? chalk.dim(`(${detail})`) : null)
  }
}
