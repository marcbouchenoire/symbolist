import { useCallback, useEffect, useMemo, useState } from "react"
import { clamp } from "../utils/clamp"

export interface Pagination<T> extends PaginationCallbacks {
  /**
   * The elements within the active page.
   */
  content: T[]

  /**
   * The first element's index within the active page.
   */
  leadingIndex: number

  /**
   * The active page index.
   */
  page: number

  /**
   * All page indices.
   */
  pages: number[]

  /**
   * The last element's index within the active page.
   */
  trailingIndex: number
}

export interface PaginationCallbacks {
  /**
   * A function to go to the next page, if it exists.
   */
  goToNextPage: () => void

  /**
   * A function to go to a specific page, if it exists.
   */
  goToPage: (index: number) => void

  /**
   * A function to go to the previous page, if it exists.
   */
  goToPreviousPage: () => void
}

/**
 * Paginate a list of elements.
 *
 * @param elements - The elements to paginate.
 * @param size - The number of elements per page.
 */
export function usePagination<T>(elements: T[], size: number): Pagination<T> {
  const [page, setPage] = useState(0)
  const leadingIndex = useMemo(() => {
    return page * size
  }, [size, page])
  const trailingIndex = useMemo(() => {
    return Math.min(elements.length, size * (page + 1))
  }, [elements, size, page])
  const length = useMemo(
    () => Math.ceil(elements.length / size),
    [elements, size]
  )
  const pages = useMemo(() => {
    return [...Array.from({ length }).keys()]
  }, [length])
  const content = useMemo(
    () => elements.slice(leadingIndex, trailingIndex),
    [elements, leadingIndex, trailingIndex]
  )

  useEffect(() => {
    setPage(0)
  }, [elements])

  const goToPreviousPage = useCallback(() => {
    setPage((currentPage) => clamp(currentPage - 1, 0, length))
  }, [length])

  const goToNextPage = useCallback(() => {
    setPage((currentPage) => clamp(currentPage + 1, 0, length))
  }, [length])

  const goToPage = useCallback(
    (index: number) => {
      setPage(clamp(index, 0, length))
    },
    [length]
  )

  return {
    content,
    page,
    pages,
    leadingIndex,
    trailingIndex,
    goToNextPage,
    goToPreviousPage,
    goToPage
  }
}
