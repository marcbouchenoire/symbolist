import { isSomething } from "../../src/guards"

/**
 * Join strings together while filtering empty gaps.
 *
 * @param strings - The strings to join.
 */
export function join(...strings: (string | null)[]) {
  return strings.filter((string) => isSomething(string)).join(" ")
}
