import chalk from "chalk"
import { ListrTask } from "listr"
import { join } from "./join"

export function ListrMessage(title: string, detail?: string): ListrTask {
  return {
    title: join(title, detail ? chalk.dim(`(${detail})`) : null),
    task: () => {}
  }
}
