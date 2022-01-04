import clsx from "clsx"
import { Transition, Variants, motion } from "framer-motion"
import Image from "next/image"
import { ComponentProps } from "react"
import portrait from "../../../public/portrait.jpg"
import { useData } from "../../hooks/use-data"
import { useSystemTheme } from "../../hooks/use-system-theme"
import { springiest } from "../../transitions"

const themeTransition: Transition = {
  default: springiest,
  opacity: {
    type: "spring",
    duration: springiest.duration - springiest.duration / 2,
    bounce: 0
  }
}

const themeVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ...themeTransition,
      delay: springiest.duration / 2
    }
  }
}

/**
 * A header section.
 *
 * @param props - A set of `header` props.
 * @param [props.className] - A list of one or more classes.
 */
export function Header({ className, ...props }: ComponentProps<"header">) {
  const [theme, toggleTheme] = useSystemTheme()
  const { version } = useData()

  return (
    <header className={clsx(className, "pt-6 lg:pt-8")} {...props}>
      <div className="flex items-center text-zinc-700 dark:text-zinc-100">
        <p className="flex items-center leading-none whitespace-pre">
          <a
            aria-label="marcbouchenoire.com"
            className="mr-0.5 w-5 h-5 hover:opacity-60 transition focusable portrait"
            href="https://marcbouchenoire.com"
          >
            <Image
              alt="Portrait of Marc Bouchenoire"
              height="20"
              layout="fixed"
              src={portrait}
              width="20"
            />
          </a>{" "}
          <svg
            className="mx-1.5"
            height="20"
            role="presentation"
            width="10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M7.275 2.038a1 1 0 0 1 .687 1.237l-4 14a1 1 0 1 1-1.924-.55l4-14a1 1 0 0 1 1.237-.687Z"
              fill="currentColor"
              fillOpacity={0.3}
              fillRule="evenodd"
            />
          </svg>
          <strong>Symbolist</strong>
          <a
            className="py-1 px-1.5 ml-1.5 font-semibold rounded-full transition cursor-pointer text-2xs focusable hover:bg-primary-500/20 dark:hover:bg-primary-400/30 text-primary-500 bg-primary-500/10 dark:bg-primary-400/20 dark:text-primary-400"
            href="https://github.com/marcbouchenoire/symbolist/releases"
          >
            v{version}
          </a>
        </p>
        <div className="ml-auto">
          <button
            aria-label="Toggle Theme"
            className="p-1.5 bg-transparent rounded-md transition hover:bg-primary-500/10 dark:hover:bg-primary-400/20 focusable"
            onClick={toggleTheme}
          >
            <svg
              className="flex-none transition-colors"
              height="24"
              role="presentation"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.g
                animate={theme === "light" ? "visible" : "hidden"}
                fill="currentColor"
                initial="hidden"
                transition={themeTransition}
                variants={themeVariants}
              >
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path
                  clipRule="evenodd"
                  d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1ZM19.071 4.929a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.415-1.414l1.415-1.414a1 1 0 0 1 1.414 0ZM16.243 16.243a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414ZM7.757 16.243a1 1 0 0 1 0 1.414L6.343 19.07a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0ZM4.929 4.929a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414L4.93 6.343a1 1 0 0 1 0-1.414ZM12 18a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1ZM18 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1ZM2 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Z"
                  fillRule="evenodd"
                />
              </motion.g>
              <motion.path
                animate={theme === "dark" ? "visible" : "hidden"}
                clipRule="evenodd"
                d="M18.846 13.396c.473-.212 1.053.141.92.642a8.018 8.018 0 0 1-13.418 3.614A8.017 8.017 0 0 1 9.962 4.234c.5-.133.854.447.642.92a6.236 6.236 0 0 0 8.242 8.242Z"
                fill="currentColor"
                fillRule="evenodd"
                initial="hidden"
                transition={themeTransition}
                variants={themeVariants}
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
