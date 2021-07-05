import { isSomething } from "../../src/guards"

export function join(...strings: string[]) {
  return strings.filter((string) => isSomething(string)).join(" ")
}
