import { clsx } from "clsx"
import type { Transition, Variants } from "framer-motion"
import { motion, wrap } from "framer-motion"
import type { ComponentProps } from "react"
import { useCallback, useRef, useState } from "react"
import { springier } from "../../transitions"
import { ScrambledText } from "../miscellaneous/ScrambledText"

const INSTALL_COMMANDS = ["npm i", "yarn add", "pnpm i"]
const ANIMATION_DELAY = 3000

const transition: Transition = {
  default: {
    ...springier,
    delay: 0.1
  },
  opacity: {
    type: "spring",
    duration: springier.duration,
    bounce: 0
  }
}

const variants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1
  }
}

function useInstallCommand() {
  const index = useRef(0)
  const [command, setCommand] = useState(INSTALL_COMMANDS[index.current])
  const [previousCommand, setPreviousCommand] = useState<string>()

  const cycleCommand = useCallback(() => {
    setPreviousCommand(INSTALL_COMMANDS[index.current])

    index.current = wrap(0, INSTALL_COMMANDS.length, index.current + 1)

    setCommand(INSTALL_COMMANDS[index.current])
  }, [])

  return [command, previousCommand, cycleCommand] as const
}

/**
 * A `button` which copies install commands to the clipboard.
 *
 * @param props - A set of `button` props.
 * @param [props.className] - A list of one or more classes.
 */
export function InstallButton({
  className,
  ...props
}: ComponentProps<"button">) {
  const timeout = useRef<number>(0)
  const [command, previousCommand, cycleCommand] = useInstallCommand()
  const [isCopied, setCopied] = useState(false)

  const handleClick = useCallback(() => {
    window.clearTimeout(timeout.current)

    navigator.clipboard.writeText(`${command} symbolist`).then(() => {
      setCopied(true)

      timeout.current = window.setTimeout(() => {
        setCopied(false)
      }, ANIMATION_DELAY)
    })

    cycleCommand()
  }, [command, cycleCommand])

  return (
    <button
      className={clsx(
        className,
        "hover:bg-primary-500/20 dark:hover:bg-primary-400/30 focusable text-primary-500 bg-primary-500/10 dark:bg-primary-400/20 dark:text-primary-400 group flex cursor-pointer items-center justify-center gap-2 rounded-md py-2 px-2.5 font-mono text-sm transition"
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <svg
        className="flex-none"
        height="24"
        role="presentation"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M4.003 17.99A2 2 0 0 0 6 19.992l4.999.007a1 1 0 0 0 1.001-1V9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v10a1 1 0 0 0 1 1h.991a2 2 0 0 0 2-1.999l.008-11.982A2 2 0 0 0 18 4.018l-11.98-.015A2 2 0 0 0 4.018 6l-.015 11.99Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <span>
        <ScrambledText from={previousCommand} key={command} to={command} />{" "}
        symbolist
      </span>
      <svg
        className="flex-none opacity-30 dark:opacity-50"
        height="24"
        role="presentation"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipRule="evenodd" fill="currentColor" fillRule="evenodd">
          <path d="M3 6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3 1 1 0 1 1-2 0 1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1 1 1 0 1 1 0 2 3 3 0 0 1-3-3V6Z" />
          <path d="M9 12a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3v-6Z" />
        </g>
        <motion.path
          animate={isCopied ? "visible" : "hidden"}
          className="stroke-white dark:stroke-zinc-800"
          d="M12 15.222 13.846 17 18 13"
          fill="none"
          initial="hidden"
          key={command}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          transition={transition}
          variants={variants}
        />
      </svg>
    </button>
  )
}
