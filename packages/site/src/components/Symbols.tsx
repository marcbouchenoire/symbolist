import clsx from "clsx"
import { colord } from "colord"
import {
  CSSProperties,
  ChangeEvent,
  ComponentProps,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import { Symbols, symbols } from "symbolist"
import colors from "tailwindcss/colors"
import { useKey } from "../hooks/use-key"
import { PaginationCallbacks, usePagination } from "../hooks/use-pagination"
import { useSystemTheme } from "../hooks/use-system-theme"
import { NamedSymbol } from "../types"
import { ColorPickerPopover } from "./ColorPickerPopover"

type IconProps = ComponentProps<"div"> & NamedSymbol

interface PaginationProps extends ComponentProps<"nav">, PaginationCallbacks {
  page: number
  pages: number[]
  truncation?: number
}

interface PaginationPageProps
  extends ComponentProps<"button">,
    Pick<PaginationCallbacks, "goToPage"> {
  page: number
}

interface Weight {
  name: string
  value: number
}

function getNamedSymbols() {
  const namedSymbols: NamedSymbol[] = []

  for (const name in symbols) {
    namedSymbols.push({
      name,
      symbol: symbols[name as keyof Symbols]
    })
  }

  return namedSymbols
}

const namedSymbols = getNamedSymbols()

const SYMBOLS_LENGTH = namedSymbols.length
const SYMBOLS_PAGE_LENGTH = 42
const DEFAULT_WEIGHT = 400
const DEFAULT_COLOR_LIGHT = colors.zinc[700]
const DEFAULT_COLOR_DARK = colors.zinc[100]

const weights: Weight[] = [
  { name: "Ultralight", value: 100 },
  { name: "Thin", value: 200 },
  { name: "Light", value: 300 },
  { name: "Regular", value: 400 },
  { name: "Medium", value: 500 },
  { name: "Semibold", value: 600 },
  { name: "Bold", value: 700 },
  { name: "Heavy", value: 800 },
  { name: "Black", value: 900 }
]

function Select(props: ComponentProps<"select">) {
  return (
    <select {...props}>
      {weights.map((weight) => (
        <option key={weight.value} value={weight.value}>
          {weight.name}
        </option>
      ))}
    </select>
  )
}

const Symbol = memo(({ symbol, name, className, ...props }: IconProps) => {
  return (
    <div
      className={clsx(
        className,
        "grid grid-flow-col rounded-md border border-zinc-150 dark:border-zinc-800 aspect-square grid-rows-symbol"
      )}
      {...props}
    >
      <div className="flex justify-center items-center">
        <span className="text-4xl select-all symbol font-sf">{symbol}</span>
      </div>
      <div className="flex justify-center p-4 pt-0 min-w-0">
        <code
          className="max-w-full leading-tight select-all text-2xs text-zinc-600 dark:text-zinc-400"
          title={name}
        >
          <span className="block max-w-full truncate">{name}</span>
        </code>
      </div>
    </div>
  )
})

function PaginationPage({ page, goToPage, ...props }: PaginationPageProps) {
  const handleClick = useCallback(() => {
    goToPage(page)
  }, [goToPage, page])

  return (
    <button {...props} onClick={handleClick}>
      {page + 1}
    </button>
  )
}

function Pagination({
  className,
  page: currentPage,
  pages,
  goToPage,
  goToPreviousPage,
  goToNextPage,
  truncation = 1,
  ...props
}: PaginationProps) {
  const truncatedPages = useMemo(() => {
    const leadingTruncation = currentPage - truncation
    const trailingTruncation = currentPage + truncation + 1

    const truncatedPages = pages
      .filter((page) => {
        const isFirstPage = page === 0
        const isLastPage = page === pages.length - 1

        if (currentPage <= truncation + 1) {
          return isLastPage || page <= truncation * 2 + 2
        } else if (currentPage >= pages.length - truncation - 2) {
          return isFirstPage || page >= pages.length - (truncation * 2 + 3)
        } else {
          return (
            isFirstPage ||
            isLastPage ||
            (page >= leadingTruncation && page < trailingTruncation)
          )
        }
      })
      .flatMap((page, index, truncatedPages) => {
        const followingPage = truncatedPages[index + 1]

        return followingPage && Math.abs(page - followingPage) > 1
          ? [page, null]
          : [page]
      })

    return truncatedPages.length === 0 ? [0] : truncatedPages
  }, [currentPage, pages, truncation])
  const isFirstPage = useMemo(() => currentPage === 0, [currentPage])
  const isLastPage = useMemo(
    () => currentPage === truncatedPages.length - 1,
    [currentPage, truncatedPages]
  )

  return (
    <nav
      aria-label="Pagination"
      className={clsx(
        "flex gap-2 justify-center items-center h-9 text-sm",
        className
      )}
      {...props}
    >
      <button
        aria-label="Previous"
        className="flex justify-center items-center w-9 h-full font-medium bg-transparent rounded-md disabled:opacity-40 transition text-zinc-500 dark:text-zinc-400 hover:bg-zinc-500/10 dark:hover:bg-zinc-100/10 disabled:!bg-transparent focusable"
        disabled={isFirstPage}
        onClick={goToPreviousPage}
      >
        <svg height="24" role="presentation" width="24">
          <path
            d="M9.005 10.995l4.593-4.593a.99.99 0 111.4 1.4l-3.9 3.9 3.9 3.9a.99.99 0 01-1.4 1.4L9.005 12.41a1 1 0 010-1.414z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </button>
      {truncatedPages.map((page, index) =>
        page === null ? (
          <span
            className="flex justify-center items-center w-9 h-full font-medium text-zinc-400 dark:text-zinc-500"
            key={`ellipsis-${index}`}
          >
            …
          </span>
        ) : (
          <PaginationPage
            aria-current={currentPage === page ? "page" : false}
            className={clsx(
              "w-9 h-full font-medium rounded-md transition focusable",
              {
                "hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 selection:bg-white/30 dark:selection:bg-zinc-900/30 dark:text-zinc-900 bg-primary-500 dark:bg-primary-400 shadow-lg focusable shadow-primary-500/10 dark:shadow-primary-400/10 text-white hover:bg-opacity-80 dark:hover:bg-opacity-80":
                  currentPage === page,
                "hover:bg-zinc-500/10 dark:hover:bg-zinc-100/10":
                  currentPage !== page
              }
            )}
            goToPage={goToPage}
            key={`${page}-${index}`}
            page={page}
          />
        )
      )}
      <button
        aria-label="Previous"
        className="flex justify-center items-center w-9 h-full font-medium bg-transparent rounded-md disabled:opacity-40 transition text-zinc-500 dark:text-zinc-400 hover:bg-zinc-500/10 dark:hover:bg-zinc-100/10 disabled:!bg-transparent focusable"
        disabled={isLastPage}
        onClick={goToNextPage}
      >
        <svg height="24" role="presentation" width="24">
          <path
            d="M14.995 10.995a1 1 0 010 1.414l-4.593 4.593a.99.99 0 01-1.4-1.4l3.9-3.9-3.9-3.9a.99.99 0 011.4-1.4l4.593 4.593z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  )
}

export function Symbols(props: ComponentProps<"section">) {
  const searchRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState("")
  const [weight, setWeight] = useState(DEFAULT_WEIGHT)
  const [color, setColor] = useState<string | undefined>(undefined)
  const [isSystemColor, setSystemColor] = useState(true)
  const [theme] = useSystemTheme()
  const selectionColor = useMemo(
    () => (color ? colord(color).alpha(0.3).toRgbString() : undefined),
    [color]
  )
  const filteredSymbols = useMemo(() => {
    if (!search) return namedSymbols

    return namedSymbols.filter((symbol) =>
      symbol.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])
  const {
    content: paginatedSymbols,
    page,
    pages,
    goToPage,
    goToPreviousPage,
    goToNextPage
  } = usePagination(filteredSymbols, SYMBOLS_PAGE_LENGTH)

  const handleShortcutKey = useCallback((event) => {
    if (document.activeElement !== searchRef?.current) {
      event?.preventDefault()
    }

    searchRef?.current?.focus()
  }, [])

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
    },
    []
  )

  const handleShowAllClick = useCallback(() => {
    setSearch("")
  }, [])

  const handleWeightChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setWeight(Number(event.target.value))
    },
    []
  )

  const handleColorChange = useCallback((color: string) => {
    setSystemColor(false)
    setColor(color)
  }, [])

  useEffect(() => {
    if (!isSystemColor) return

    setColor(
      theme === "light"
        ? DEFAULT_COLOR_LIGHT
        : theme === "dark"
        ? DEFAULT_COLOR_DARK
        : undefined
    )
  }, [isSystemColor, theme])

  useKey("/", handleShortcutKey)

  return (
    <section {...props}>
      <div className="flex flex-wrap sm:flex-nowrap gap-4 mx-auto mb-8 max-w-sm">
        <div className="relative flex-none sm:flex-1 w-full sm:w-auto h-9 text-zinc-400 hover:text-zinc-450 dark:text-zinc-450 dark:hover:text-zinc-400">
          <svg
            className="absolute top-2 left-2 transition-colors pointer-events-none"
            height="20"
            role="presentation"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M8.5 3a6.5 6.5 0 1 0 3.835 11.749l1.958 1.958a1 1 0 0 0 1.414-1.414l-1.958-1.958A6.5 6.5 0 0 0 8.5 3ZM4 9.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z"
              fill="currentColor"
              fillOpacity={0.6}
              fillRule="evenodd"
            />
          </svg>
          <input
            aria-label="Search (Press / to focus)"
            className="flex flex-none justify-center items-center pr-8 pl-8 w-full h-full text-sm font-medium truncate rounded-md transition appearance-none focusable bg-zinc-100 text-zinc-500 placeholder:text-zinc-500/60 dark:bg-zinc-750 dark:text-zinc-350 dark:placeholder:text-zinc-350/60 hover:bg-zinc-150 dark:hover:bg-zinc-700"
            onChange={handleSearchChange}
            placeholder={`Search ${SYMBOLS_LENGTH} symbols…`}
            ref={searchRef}
            type="search"
            value={search}
          />
          <kbd className="flex absolute top-2 right-2 justify-center items-center w-5 h-5 text-xs font-medium leading-none pointer-events-none select-none bg-zinc-500/10 text-zinc-400 dark:bg-zinc-300/10 dark:text-zinc-450 rounded-[0.2rem]">
            /
          </kbd>
        </div>
        <div className="relative flex-1 sm:flex-none w-auto sm:w-40 h-9 text-zinc-400 hover:text-zinc-450 dark:text-zinc-450 dark:hover:text-zinc-400">
          <svg
            className="absolute top-2 right-1 transition-colors pointer-events-none"
            fill="currentColor"
            height="20"
            role="presentation"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              fillRule="evenodd"
            />
          </svg>
          <Select
            aria-label="Weight"
            className="flex flex-none justify-center items-center pr-7 pl-3 w-full h-full text-sm font-medium truncate rounded-md transition appearance-none cursor-pointer focusable bg-zinc-100 text-zinc-500 dark:bg-zinc-750 dark:text-zinc-350 hover:bg-zinc-150 dark:hover:bg-zinc-700"
            onChange={handleWeightChange}
            value={weight}
          />
        </div>
        <ColorPickerPopover color={color} onChange={handleColorChange}>
          <button
            aria-label="Color"
            className="relative w-14 h-9 rounded-md transition cursor-pointer color-picker focusable bg-zinc-100 dark:bg-zinc-750 hover:bg-zinc-150 dark:hover:bg-zinc-700"
          >
            <span
              className="absolute inset-1.5 rounded-sm bg-zinc-700 dark:bg-zinc-100 color-picker-well"
              style={{ background: color }}
            />
          </button>
        </ColorPickerPopover>
      </div>
      {paginatedSymbols.length > 0 ? (
        <>
          <div
            className="grid gap-4 symbols grid-cols-symbols"
            style={
              {
                "--symbolist-color": color,
                "--symbolist-selection-color": selectionColor,
                "--symbolist-weight": weight
              } as CSSProperties
            }
          >
            {paginatedSymbols.map((symbol, index) => (
              <Symbol key={index} {...symbol} />
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-sm">
            <Pagination
              goToNextPage={goToNextPage}
              goToPage={goToPage}
              goToPreviousPage={goToPreviousPage}
              page={page}
              pages={pages}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6 justify-center items-center my-8 md:my-12 lg:my-16">
          <div className="flex items-center text-zinc-500 dark:text-zinc-400">
            No symbols for “
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
              {search}
            </span>
            ”.
          </div>
          <button
            className="flex flex-none gap-2 justify-center items-center py-2 px-3 w-full sm:w-auto font-medium text-white hover:bg-opacity-80 dark:hover:bg-opacity-80 rounded-md shadow-lg transition cursor-pointer hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 selection:bg-white/30 dark:selection:bg-zinc-900/30 dark:text-zinc-900 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10"
            onClick={handleShowAllClick}
          >
            View all symbols
          </button>
        </div>
      )}
    </section>
  )
}
