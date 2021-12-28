import data from "../.data.json"

interface Data {
  /**
   * The current year.
   */
  date: string

  /**
   * The latest package version.
   */
  version: string
}

/**
 * Fetch a static data object.
 */
export function useData(): Partial<Data> {
  return (data as Data) ?? {}
}
