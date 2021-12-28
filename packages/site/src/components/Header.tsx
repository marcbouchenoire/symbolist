import { Transition, Variants, motion } from "framer-motion"
import Image from "next/image"
import { ComponentProps } from "react"
import avatar from "../../public/avatar.jpg"
import { useCopy } from "../hooks/use-copy"
import { useSystemTheme } from "../hooks/use-system-theme"
import { springier, springiest } from "../transitions"

interface Props extends ComponentProps<"header"> {
  /**
   * The README list of features formatted as HTML.
   */
  features: string

  /**
   * The latest package version.
   */
  version: string
}

const NPM_INSTALL = "npm i symbolist"

const themeTransition: Transition = {
  default: springiest,
  opacity: {
    type: "spring",
    duration: springiest.duration - springiest.duration / 2,
    bounce: 0
  }
}

const clipboardTransition: Transition = {
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

const clipboardVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1
  }
}

/**
 * A header section introducing the library.
 *
 * @param props - A set of `header` props.
 * @param props.features - The README list of features formatted as HTML.
 * @param props.version - The latest package version.
 */
export function Header({ features, version, ...props }: Props) {
  const [theme, toggleTheme] = useSystemTheme()
  const [clipboardCopied, handleClipboardClick] = useCopy(NPM_INSTALL)

  return (
    <header {...props}>
      <nav className="flex items-center text-zinc-700 dark:text-zinc-100">
        <p className="flex items-center leading-none whitespace-pre">
          <a
            aria-label="marcbouchenoire.com"
            className="mr-0.5 w-5 h-5 hover:opacity-60 transition focusable avatar"
            href="https://marcbouchenoire.com"
          >
            <Image
              alt="Portrait of Marc Bouchenoire"
              height="20"
              layout="fixed"
              src={avatar}
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
      </nav>
      <section className="mt-16 md:mt-20 lg:mt-28">
        <h1 className="text-4xl font-bold md:text-5xl logo">
          <img alt="Symbolist" height="80" src="/logo.svg" width="609" />
        </h1>
        <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300 md:text-xl">
          A collection of every symbol from SF Symbols.
        </p>
        <div
          className="mt-6 prose prose-zinc prose-primary dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: features }}
        />
        <div className="flex flex-wrap gap-4 mt-8 text-center">
          <a
            className="flex flex-none gap-2 justify-center items-center py-2 px-3 pl-2.5 w-full font-medium text-white dark:text-zinc-900 selection:bg-white/30 dark:selection:bg-zinc-900/30 rounded-md shadow-lg transition cursor-pointer sm:w-auto hover:bg-primary-500/80 dark:hover:bg-primary-400/80 hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10"
            href="https://github.com/marcbouchenoire/symbolist"
          >
            <svg
              height="24"
              role="presentation"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12 2C6.475 2 2 6.47 2 11.988c0 4.42 2.862 8.153 6.838 9.476.5.087.687-.212.687-.474 0-.238-.013-1.024-.013-1.86C7 19.59 6.35 18.517 6.15 17.955c-.113-.287-.6-1.174-1.025-1.411-.35-.187-.85-.65-.013-.662.788-.012 1.35.724 1.538 1.024.9 1.51 2.338 1.086 2.912.824.088-.65.35-1.086.638-1.336-2.225-.25-4.55-1.111-4.55-4.931 0-1.087.387-1.986 1.025-2.685-.1-.25-.45-1.273.1-2.646 0 0 .837-.263 2.75 1.023a9.29 9.29 0 0 1 2.5-.337c.85 0 1.7.113 2.5.337 1.912-1.298 2.75-1.023 2.75-1.023.55 1.373.2 2.397.1 2.646.637.7 1.025 1.586 1.025 2.685 0 3.832-2.337 4.681-4.562 4.931.362.312.675.912.675 1.848 0 1.336-.013 2.41-.013 2.747 0 .262.188.574.688.474C19.137 20.141 22 16.395 22 11.988 22 6.47 17.525 2 12 2Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <span>View on GitHub</span>
          </a>
          <button
            className="group flex flex-none gap-2 justify-center items-center py-2 px-2.5 pr-2.5 w-full font-mono text-sm font-medium rounded-md transition cursor-pointer sm:w-auto hover:bg-primary-500/20 dark:hover:bg-primary-400/30 focusable text-primary-500 bg-primary-500/10 dark:bg-primary-400/20 dark:text-primary-400"
            onClick={handleClipboardClick}
            type="button"
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
            <span className="truncate">{NPM_INSTALL}</span>
            <svg
              className="flex-none opacity-30 dark:opacity-50 transition-opacity"
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
                animate={clipboardCopied ? "visible" : "hidden"}
                className="stroke-white dark:stroke-zinc-800"
                d="M12 15.222 13.846 17 18 13"
                fill="none"
                initial="hidden"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                transition={clipboardTransition}
                variants={clipboardVariants}
              />
            </svg>
          </button>
        </div>
      </section>
    </header>
  )
}
