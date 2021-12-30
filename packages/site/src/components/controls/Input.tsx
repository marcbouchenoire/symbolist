import clsx from "clsx"
import { ComponentProps, forwardRef } from "react"

export interface InputProps extends ComponentProps<"div"> {
  /**
   * A set of `input` props.
   */
  inputProps?: ComponentProps<"input">
}

/**
 * A custom `input` component.
 *
 * @param props - A set of `div` props.
 * @param [props.children] - A set of children.
 * @param [props.className] - A list of one or more classes.
 * @param [props.inputProps] - A set of `input` props.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, inputProps = {}, ...props }, ref) => (
    <div
      className={clsx(
        className,
        "relative h-9 text-zinc-400 dark:hover:text-zinc-400 hover:text-zinc-450 dark:text-zinc-450"
      )}
      {...props}
    >
      {children}
      <input
        {...inputProps}
        className={clsx(
          inputProps?.className,
          "px-3 w-full h-full text-sm font-medium text-zinc-500 placeholder:text-zinc-500/60 truncate bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition appearance-none focusable dark:bg-zinc-750 dark:text-zinc-350 dark:placeholder:text-zinc-350/60 hover:bg-zinc-150"
        )}
        ref={ref}
      />
    </div>
  )
)
