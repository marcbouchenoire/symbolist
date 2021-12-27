/**
 * Clamp a value within a range.
 *
 * @param value - The value to clamp.
 * @param min - The range's minimum.
 * @param max - The range's maximum.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
