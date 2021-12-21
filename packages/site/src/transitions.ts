import { Spring } from "framer-motion"
import { SetRequired } from "type-fest"

type DurationSpring = SetRequired<Spring, "duration">

export const springy: Spring = {
  type: "spring",
  duration: 0.4,
  bounce: 0.08
}

export const springier: Spring = {
  type: "spring",
  duration: 0.4,
  bounce: 0.2
}

export const springiest: DurationSpring = {
  type: "spring",
  duration: 0.6,
  bounce: 0.6
}
