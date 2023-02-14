/**
 * Generate a random integer within a given range.
 *
 * @param [minimum] - The minimum value.
 * @param [maximum] - The maximum value.
 */
export function random(minimum = 0, maximum = 1) {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum)
}
