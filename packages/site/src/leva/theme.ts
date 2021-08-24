import { Leva } from "leva"
import { ComponentProps } from "react"
import { LEVA_WIDTH } from "../constants"

type Theme = ComponentProps<typeof Leva>["theme"]

export const theme: Theme = {
  colors: {
    accent1: "#e8e8e8",
    accent2: "$accent1",
    accent3: "$accent1",
    elevation1: "#f3f3f3",
    elevation2: "#fff",
    elevation3: "$elevation1",
    highlight1: "#999",
    highlight2: "#666",
    highlight3: "#333",
    vivid1: "$accent1"
  },
  radii: { sm: "5px" },
  shadows: {
    level1: "0px 2px 6px rgba(0, 0, 0, 0.04), 0px 4px 24px rgba(0, 0, 0, 0.02)",
    level2: "$level1"
  },
  sizes: {
    rootWidth: `${LEVA_WIDTH}px`,
    rowHeight: "26px"
  },
  space: {
    colGap: "$sm",
    md: "$sm",
    rowGap: "$sm",
    sm: "10px"
  }
}
