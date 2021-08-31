export function isBoolean(value: boolean | unknown): value is boolean {
  return typeof value === "boolean"
}
