import { useEffect, useRef } from "react"

/**
 * Repeatedly call a function at a given time interval.
 *
 * @param callback - The function to invoke repeatedly.
 * @param interval - The interval in milliseconds.
 */
export function useInterval(
  callback: (...args: any[]) => void,
  interval: number | null
) {
  const latestCallback = useRef(callback)

  useEffect(() => {
    latestCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (interval !== null) {
      const intervalId = setInterval(
        (...args: any[]) => latestCallback.current(...args),
        interval
      )

      return () => clearInterval(intervalId)
    }

    return
  }, [interval])
}
