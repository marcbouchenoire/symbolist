import { useCallback, useEffect } from "react"

/**
 * Invoke a function when pressing a specific key.
 *
 * @param key - The key to press.
 * @param callback - The function to invoke when pressing the key.
 */
export function useKey(key: string, callback: (event: KeyboardEvent) => void) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event)
      }
    },
    [key, callback]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
}
