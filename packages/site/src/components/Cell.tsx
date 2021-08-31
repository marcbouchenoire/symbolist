import clsx from "clsx"
import { ComponentPropsWithoutRef, memo } from "react"
import { NamedSymbol } from "../types"
import styles from "./Cell.module.scss"

type Props = ComponentPropsWithoutRef<"div"> & NamedSymbol

export const Cell = memo(({ symbol, name, className, ...props }: Props) => {
  return (
    <div className={clsx(className, styles.cell)} {...props}>
      <div className={styles.content}>
        <div className={styles.symbol}>
          <span>{symbol}</span>
        </div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
})
