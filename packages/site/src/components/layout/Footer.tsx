import { clsx } from "clsx"
import Image from "next/image"
import type { ComponentProps } from "react"
import portrait from "../../../public/portrait.jpg"
import { useData } from "../../hooks/use-data"

/**
 * A footer section with credits.
 *
 * @param props - A set of `footer` props.
 * @param [props.className] - A list of one or more classes.
 */
export function Footer({ className, ...props }: ComponentProps<"footer">) {
  const { date } = useData()

  return (
    <footer
      className={clsx(
        "flex flex-col font-medium text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props}
    >
      <hr className="border-zinc-150 w-full border-t dark:border-zinc-800" />
      <div className="flex items-center py-6 lg:py-8">
        <span className="flex items-center">
          <span>
            ©{" "}
            <time className="hidden sm:inline" dateTime={String(date)}>
              {date}
            </time>
          </span>
          <span className="whitespace-pre text-zinc-300 dark:text-zinc-600">
            {" "}
            —{" "}
          </span>
          <a
            className="link"
            href="https://github.com/marcbouchenoire/symbolist/blob/main/LICENSE"
          >
            MIT License
          </a>
        </span>
        <span className="ml-auto flex items-center">
          <span className="hidden whitespace-pre sm:inline">Made by </span>
          <a
            className="link inline-flex items-center"
            href="https://marcbouchenoire.com"
          >
            <span className="portrait mr-2 ml-1.5 h-4 w-4">
              <Image
                alt="Portrait of Marc Bouchenoire"
                height="20"
                layout="fixed"
                src={portrait}
                width="20"
              />
            </span>{" "}
            Marc Bouchenoire
          </a>
        </span>
      </div>
    </footer>
  )
}
