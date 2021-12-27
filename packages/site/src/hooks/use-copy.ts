import { useCallback, useRef, useState } from "react"

/**
 * Copy a value to the clipboard and get a confirmation state.
 *
 * @param content - The value to copy.
 * @param duration - The duration after which to reset the confirmation state.
 */
export function useCopy(
  content: string,
  duration = 3000
): [boolean, () => void] {
  const timeout = useRef<number>(0)
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    window.clearTimeout(timeout.current)

    navigator.clipboard.writeText(content).then(function () {
      setCopied(true)

      timeout.current = window.setTimeout(() => {
        setCopied(false)
      }, duration)
    })
  }, [content, duration])

  return [copied, copy]
}
