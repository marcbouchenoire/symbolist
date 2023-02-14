import { clsx } from "clsx"
import type { ComponentProps } from "react"
import { memo, useMemo, useReducer } from "react"
import type { SetOptional } from "type-fest"
import { useInterval } from "../../hooks/use-interval"
import { random } from "../../utils/random"

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&()*+-./:;<=>?@[]^_{}~"
const SIZE_PERCENTAGE = 0.8
const DEFAULT_INTERVAL = 30
const INTERVAL_RANDOMNESS = 10

interface Props extends Omit<ComponentProps<"span">, "children"> {
  /**
   * The string to start from.
   */
  from: string

  /**
   * The update interval in milliseconds.
   */
  interval?: number

  /**
   * The string to end with.
   */
  to: string
}

/**
 * Scramble a string while keeping whitespace.
 *
 * @param value - The string to scramble.
 */
function scrambleText(value: string) {
  return [...value]
    .map((character) => {
      if (/^\s$/.test(character)) {
        return character
      }

      return ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
    })
    .join("")
}

/**
 * A component that transitions from one
 * string to another using scrambled text.
 *
 * @param props - A set of `span` props.
 * @param props.from - The string to start from.
 * @param props.to - The string to end with.
 * @param [props.interval] - The update interval in milliseconds.
 * @param [props.className] - A list of one or more classes.
 */
function StrictScrambledText({
  from,
  to,
  interval = DEFAULT_INTERVAL,
  className,
  ...props
}: Props) {
  const size = useMemo(() => {
    const average = (from.length + to.length) / 2

    return Math.round(average * SIZE_PERCENTAGE)
  }, [from, to])
  const minimum = useMemo(() => -size, [size])
  const maximum = useMemo(() => Math.max(from.length, to.length), [from, to])
  const [index, increment] = useReducer((index: number) => index + 1, minimum)
  const scrambledText = useMemo(() => {
    const longest = from.length > to.length ? from : to

    const leading = to.slice(0, Math.max(0, index))
    const scrambled = scrambleText(
      longest.slice(Math.max(0, index), index + size)
    )
    const trailing = from.slice(index + size, maximum)

    return leading + scrambled + trailing
  }, [from, index, size, to, maximum])
  const randomizedInterval = useMemo(() => {
    return interval + random(-INTERVAL_RANDOMNESS, INTERVAL_RANDOMNESS)
  }, [index, interval]) // eslint-disable-line react-hooks/exhaustive-deps

  useInterval(
    increment,
    index > Math.max(from.length, to.length) ? null : randomizedInterval
  )

  return (
    <span className={clsx(className, "whitespace-pre-wrap")} {...props}>
      {scrambledText}
    </span>
  )
}

/**
 * A component that transitions from one
 * string to another using scrambled text.
 *
 * @param props - A set of `span` props.
 * @param props.from - The string to start from.
 * @param props.to - The string to end with.
 * @param [props.interval] - The update interval in milliseconds.
 * @param [props.className] - A list of one or more classes.
 */
export const ScrambledText = memo(
  ({
    from,
    to,
    interval = DEFAULT_INTERVAL,
    ...props
  }: SetOptional<Props, "from">) => {
    return from ? (
      <StrictScrambledText from={from} interval={interval} to={to} {...props} />
    ) : (
      <span {...props}>{to}</span>
    )
  }
)
