import { useCallback, useEffect } from "react"

export const useKey = (
  key: string,
  callback: (event?: KeyboardEvent) => void
) => {
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
