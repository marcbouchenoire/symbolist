import type { Test } from "uvu"
import { suite } from "uvu"

type Describer = (test: Test) => Promise<void> | void

/**
 * Run multiple tests as a named suite.
 *
 * @param name - The name of the suite.
 * @param callback - The suite as a function.
 */
export function describe(name: string, callback: Describer): void {
  const test = suite(name)
  callback(test)

  test.run()
}
