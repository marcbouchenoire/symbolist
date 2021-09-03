import { isSomething } from "../../src/guards"

export function join(...strings: (string | null)[]) {
  return strings.filter((string) => isSomething(string)).join(" ")
}
