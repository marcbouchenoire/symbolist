import clsx from "clsx"
import Image from "next/image"
import { ComponentProps } from "react"
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
      <hr className="w-full border-t dark:border-zinc-800 border-zinc-150" />
      <div className="flex items-center py-6 lg:py-8">
        <span className="flex items-center">
          <span>
            © <span className="hidden sm:inline">{date}</span>
          </span>
          <span className="text-zinc-300 dark:text-zinc-600 whitespace-pre">
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
        <span className="flex items-center ml-auto">
          <span className="hidden whitespace-pre sm:inline">Made by </span>
          <a
            className="inline-flex items-center link"
            href="https://marcbouchenoire.com"
          >
            <span className="mr-2 ml-1.5 w-4 h-4 portrait">
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
