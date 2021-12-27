import { ListrTask } from "listr"
import pc from "picocolors"
import { join } from "./join"

/**
 * A Listr message.
 *
 * @param title - The action's message.
 * @param [detail] - The action's secondary detail.
 */
export function ListrMessage(title: string, detail?: string): ListrTask {
  return {
    task: () => {},
    title: join(title, detail ? pc.dim(`(${detail})`) : null)
  }
}
