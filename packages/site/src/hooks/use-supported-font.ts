import { useEffect, useState } from "react"
import { isSupportedFont } from "../utils/is-supported-font"

export function useSupportedFont(font: string) {
  const [isSupported, setSupported] = useState<boolean | null>(null)

  useEffect(() => {
    const getSupported = async () => {
      const support = await isSupportedFont(font)

      setSupported(support)
    }

    getSupported()
  }, [font])

  return isSupported
}
