import clsx from "clsx"
import { ComponentProps, useCallback, useMemo } from "react"
import { PaginationCallbacks } from "../../hooks/use-pagination"

export interface PaginationProps
  extends ComponentProps<"nav">,
    PaginationCallbacks {
  /**
   * The active page index.
   */
  page: number

  /**
   * All page indices.
   */
  pages: number[]

  /**
   * The truncation length in pages.
   */
  truncation?: number
}

export interface PaginationPageProps
  extends ComponentProps<"button">,
    Pick<PaginationCallbacks, "goToPage"> {
  /**
   * The page index.
   */
  page: number
}

/**
 * A part of a paginated navigation describing an individual page.
 *
 * @param props - A set of `button` props.
 * @param props.page - The page index.
 * @param props.goToPage - A function to go to a specific page, if it exists.
 */
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

/**
 * A paginated navigation component.
 *
 * @param props - A set of `nav` props.
 * @param props.page - The active page index.
 * @param props.pages - All page indices.
 * @param props.goToPage - A function to go to a specific page, if it exists.
 * @param props.goToPreviousPage - A function to go to the previous page, if it exists.
 * @param props.goToNextPage - A function to go to the next page, if it exists.
 * @param [props.truncation] - The truncation length in pages.
 * @param [props.className] - A list of one or more classes.
 */
export function Pagination({
  page: currentPage,
  pages,
  goToPage,
  goToPreviousPage,
  goToNextPage,
  truncation = 1,
  className,
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
    () => currentPage === pages.length - 1,
    [currentPage, pages]
  )

  return (
    <nav
      aria-label="Pagination"
      className={clsx(
        "flex h-9 items-center justify-center gap-2 text-sm",
        className
      )}
      {...props}
    >
      <button
        aria-label="Previous"
        className="focusable flex h-full w-9 items-center justify-center rounded-md bg-transparent font-medium text-zinc-500 transition hover:bg-zinc-500/10 disabled:!bg-transparent disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-100/10"
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
            className="flex h-full w-9 items-center justify-center font-medium text-zinc-400 dark:text-zinc-500"
            key={`ellipsis-${index}`}
          >
            …
          </span>
        ) : (
          <PaginationPage
            aria-current={currentPage === page ? "page" : false}
            className={clsx(
              "focusable h-full w-9 rounded-md font-medium transition",
              {
                "hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10 hover:bg-primary-500/80 dark:hover:bg-primary-400/80 text-white shadow-lg selection:bg-white/30 dark:text-zinc-900 dark:selection:bg-zinc-900/30":
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
        className="focusable flex h-full w-9 items-center justify-center rounded-md bg-transparent font-medium text-zinc-500 transition hover:bg-zinc-500/10 disabled:!bg-transparent disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-100/10"
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
