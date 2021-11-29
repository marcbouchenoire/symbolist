import { ListrTask } from "listr"
import pc from "picocolors"
import { join } from "./join"

export function ListrMessage(title: string, detail?: string): ListrTask {
  return {
    task: () => {},
    title: join(title, detail ? pc.dim(`(${detail})`) : null)
  }
}
