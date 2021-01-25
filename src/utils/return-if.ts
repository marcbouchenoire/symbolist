import { Guard } from "../types"

export function returnIf<T>(value: T, guard: Guard<NonNullable<T>>) {
  return guard(value) ? value : null
}
