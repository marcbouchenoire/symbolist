import clsx from "clsx"
import { ComponentProps, forwardRef } from "react"

export interface SelectProps extends ComponentProps<"div"> {
  /**
   * A set of `select` props.
   */
  selectProps?: ComponentProps<"select">
}

/**
 * A custom `select` component.
 *
 * @param props - A set of `div` props.
 * @param [props.children] - A set of children.
 * @param [props.className] - A list of one or more classes.
 * @param [props.selectProps] - A set of `select` props.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, selectProps = {}, ...props }, ref) => (
    <div
      className={clsx(
        className,
        "relative h-9 text-zinc-400 dark:hover:text-zinc-400 hover:text-zinc-450 dark:text-zinc-450"
      )}
      {...props}
    >
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
      {children}
      <select
        {...selectProps}
        className={clsx(
          selectProps?.className,
          "px-3 pr-7 w-full h-full text-sm font-medium text-zinc-500 truncate bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition appearance-none cursor-pointer focusable dark:bg-zinc-750 dark:text-zinc-350 hover:bg-zinc-150"
        )}
        ref={ref}
      />
    </div>
  )
)
