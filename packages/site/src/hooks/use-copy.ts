import { useCallback, useRef, useState } from "react"

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
