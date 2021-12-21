import { useCallback, useEffect, useMemo, useState } from "react"
import { clamp } from "../utils/clamp"

export interface Pagination<T> extends PaginationCallbacks {
  content: T[]
  leadingIndex: number
  page: number
  pages: number[]
  trailingIndex: number
}

export interface PaginationCallbacks {
  goToNextPage: () => void
  goToPage: (index: number) => void
  goToPreviousPage: () => void
}

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
