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
import { useKey } from "../../hooks/use-key"
import { usePagination } from "../../hooks/use-pagination"
import { useSystemTheme } from "../../hooks/use-system-theme"
import { NamedSymbol } from "../../types"
import { ColorPicker } from "../controls/ColorPicker"
import { Input } from "../controls/Input"
import { Pagination } from "../controls/Pagination"
import { Select } from "../controls/Select"

type IconProps = ComponentProps<"div"> & NamedSymbol

interface Weight {
  /**
   * The weight's common name.
   */
  name: string

  /**
   * The weight's numbered value.
   */
  value: number
}

/**
 * Get all symbols along their names.
 */
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

const weightOptions = weights.map((weight) => (
  <option key={weight.value} value={weight.value}>
    {weight.name}
  </option>
))

const SYMBOLS_LENGTH = namedSymbols.length
const SYMBOLS_PAGE_LENGTH = 42
const DEFAULT_WEIGHT = 400
const DEFAULT_COLOR_LIGHT = colors.zinc[700]
const DEFAULT_COLOR_DARK = colors.zinc[100]

/**
 * A single symbol component.
 *
 * @param props - A set of `div` props.
 * @param props.symbol - The symbol's character.
 * @param props.name - The symbol's name.
 * @param [props.className] - A list of one or more classes.
 */
const Symbol = memo(({ symbol, name, className, ...props }: IconProps) => {
  return (
    <div
      className={clsx(
        className,
        "aspect-square grid grid-flow-col rounded-lg border dark:border-zinc-800 border-zinc-150 grid-rows-symbol"
      )}
      {...props}
    >
      <div className="flex justify-center items-center">
        <span className="text-4xl select-all symbol font-sf">{symbol}</span>
      </div>
      <div className="flex justify-center p-4 pt-0 min-w-0">
        <code
          className="max-w-full leading-tight text-zinc-600 dark:text-zinc-400 select-all text-2xs"
          title={name}
        >
          <span className="block max-w-full truncate">{name}</span>
        </code>
      </div>
    </div>
  )
})

/**
 * An interactive section to explore all symbols.
 *
 * @param props - A set of `section` props.
 */
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

  const handleShortcutKey = useCallback((event: KeyboardEvent) => {
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
      <div className="flex flex-wrap gap-4 mx-auto mb-8 max-w-sm sm:flex-nowrap">
        <Input
          className="flex-none w-full sm:flex-1 sm:w-auto"
          inputProps={{
            "aria-label": "Search (Press / to focus)",
            className: "pr-8 pl-8",
            onChange: handleSearchChange,
            placeholder: `Search ${SYMBOLS_LENGTH} symbols…`,
            type: "search",
            value: search
          }}
          ref={searchRef}
        >
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
          <kbd className="flex absolute top-2 right-2 justify-center items-center w-5 h-5 text-xs font-medium leading-none text-zinc-400 bg-zinc-500/10 dark:bg-zinc-300/10 rounded-[0.2rem] pointer-events-none select-none dark:text-zinc-450">
            /
          </kbd>
        </Input>
        <Select
          className="flex-1 w-auto sm:flex-none sm:w-40"
          selectProps={{
            "aria-label": "Weight",
            children: weightOptions,
            onChange: handleWeightChange,
            value: weight
          }}
        />
        <ColorPicker color={color} onChange={handleColorChange}>
          <button
            aria-label="Color"
            className="relative w-14 h-9 bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition cursor-pointer color-picker focusable dark:bg-zinc-750 hover:bg-zinc-150"
          >
            <span
              className="absolute inset-1.5 bg-zinc-700 dark:bg-zinc-100 rounded-sm highlight dark:highlight-invert"
              style={{ background: color }}
            />
          </button>
        </ColorPicker>
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
            className="flex flex-none gap-2 justify-center items-center py-2 px-3 w-full font-medium text-white dark:text-zinc-900 selection:bg-white/30 dark:selection:bg-zinc-900/30 rounded-md shadow-lg transition cursor-pointer sm:w-auto hover:bg-primary-500/80 dark:hover:bg-primary-400/80 hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10"
            onClick={handleShowAllClick}
          >
            View all symbols
          </button>
        </div>
      )}
    </section>
  )
}
