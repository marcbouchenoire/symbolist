import clsx from "clsx"
import Image from "next/image"
import { ComponentProps } from "react"
import avatar from "../../public/avatar.jpg"

interface Props extends ComponentProps<"footer"> {
  date: string
}

export function Footer({ className, date, ...props }: Props) {
  return (
    <footer
      className={clsx(
        "font-medium text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props}
    >
      <span className="whitespace-pre">
        © <span className="hidden sm:inline">{date} </span>
        <span className="text-zinc-300 dark:text-zinc-600">—</span>{" "}
      </span>
      <a
        className="link"
        href="https://github.com/marcbouchenoire/symbolist/blob/main/LICENSE"
      >
        MIT License
      </a>
      <div className="flex items-center ml-auto">
        <span className="hidden sm:inline whitespace-pre">Made by </span>
        <a
          className="inline-flex items-center link"
          href="https://marcbouchenoire.com"
        >
          <span className="mr-2 ml-1.5 w-4 h-4 avatar">
            <Image
              alt="Portrait of Marc Bouchenoire"
              height="20"
              layout="fixed"
              src={avatar}
              width="20"
            />
          </span>{" "}
          Marc Bouchenoire
        </a>
      </div>
    </footer>
  )
}
