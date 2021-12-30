import clsx from "clsx"
import { Transition, Variants, motion } from "framer-motion"
import { ComponentProps } from "react"
import { useCopy } from "../../hooks/use-copy"
import { springier } from "../../transitions"

interface Props extends ComponentProps<"section"> {
  /**
   * The README list of features formatted as HTML.
   */
  features: string
}

const NPM_INSTALL = "npm i symbolist"

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
 * A section introducing the library.
 *
 * @param props - A set of `section` props.
 * @param props.features - The README list of features formatted as HTML.
 * @param [props.className] - A list of one or more classes.
 */
export function Introduction({ features, className, ...props }: Props) {
  const [clipboardCopied, handleClipboardClick] = useCopy(NPM_INSTALL)

  return (
    <section className={clsx(className, "mt-16 md:mt-20 lg:mt-28")} {...props}>
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
          className="flex flex-none gap-2 justify-center items-center py-2 px-3 pl-2.5 w-full font-medium text-white dark:text-zinc-900 selection:bg-white/30 dark:selection:bg-zinc-900/30 rounded-md shadow-lg transition cursor-pointer sm:w-auto dark:hover:bg-primary-400/80 hover:bg-primary-500/80 hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10"
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
          className="group flex flex-none gap-2 justify-center items-center py-2 px-2.5 w-full font-mono text-sm font-medium rounded-md transition cursor-pointer sm:w-auto hover:bg-primary-500/20 dark:hover:bg-primary-400/30 focusable text-primary-500 bg-primary-500/10 dark:bg-primary-400/20 dark:text-primary-400"
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
      <div className="my-8 md:my-12 lg:my-16">
        <div className="flex gap-2 p-5 pl-4 text-sm rounded-md sm:gap-3 bg-primary-500/10 dark:bg-primary-400/20">
          <svg
            className="flex-none text-primary-500 dark:text-primary-400"
            height="24"
            role="presentation"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M3.773 15.986 10.276 4.93c.774-1.315 2.675-1.315 3.448 0l6.503 11.055C21.011 17.319 20.05 19 18.503 19H5.497c-1.547 0-2.508-1.68-1.724-3.014ZM12 8a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1Zm-1 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <div>
            <small className="font-semibold tracking-widest leading-none uppercase text-primary-500 dark:text-primary-400 text-2xs">
              Seeing missing characters
              <span className="hidden sm:inline"> instead of symbols</span>?
            </small>
            <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-100">
              <a
                className="font-medium link link-primary focusable"
                href="https://developer.apple.com/sf-symbols/"
              >
                SF Symbols
              </a>{" "}
              require San Fransisco—the system font on Apple platforms—installed
              to be visible. Additionally, you’ll also need{" "}
              <a
                className="font-medium link link-primary focusable"
                href="https://developer.apple.com/fonts/"
              >
                SF Pro
              </a>{" "}
              installed when using Chromium-based browsers or Firefox.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
