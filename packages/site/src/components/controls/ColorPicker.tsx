import { Arrow, Content, Root, Trigger } from "@radix-ui/react-popover"
import type { Transition } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { ComponentProps } from "react"
import { memo, useState } from "react"
import { HexColorPicker } from "react-colorful"

export type ColorPickerProps = ComponentProps<typeof HexColorPicker>

const transition: Transition = {
  default: {
    type: "spring",
    stiffness: 400,
    damping: 28
  },
  opacity: {
    type: "spring",
    stiffness: 360,
    damping: 30
  }
}

/**
 * A color picker within a popover.
 *
 * @param props - A set of props.
 * @param props.color - The selected color value.
 * @param props.children - The popover's trigger content.
 */
export const ColorPicker = memo(
  ({ color, children, ...props }: ColorPickerProps) => {
    const [open, setOpen] = useState(false)

    return (
      <Root onOpenChange={setOpen} open={open}>
        <Trigger asChild>{children}</Trigger>
        <AnimatePresence>
          {open && (
            <Content asChild forceMount side="top" sideOffset={8}>
              <div className="relative text-white dark:text-zinc-800 z-50">
                <motion.div
                  animate="visible"
                  className="color-picker shadow-popover rounded-lg bg-current p-2.5"
                  exit="hidden"
                  initial="hidden"
                  transition={transition}
                  variants={{
                    hidden: { scale: 0.2, opacity: 0 },
                    visible: { scale: 1, opacity: 1 }
                  }}
                >
                  <HexColorPicker color={color} {...props} />
                </motion.div>
                <Arrow asChild>
                  <motion.svg
                    animate="visible"
                    className="color-picker-arrow"
                    exit="hidden"
                    height="8"
                    initial="hidden"
                    role="presentation"
                    transition={transition}
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1 }
                    }}
                    viewBox="0 0 46 8"
                    width="46"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.833 7.411c.148.186.328.335.529.436.2.102.418.154.638.153a1.49 1.49 0 0 0 1.167-.589l2.845-3.614C28.911 1.384 31.654 0 34.538 0H37 9h2.462c2.884 0 5.627 1.384 7.526 3.797l2.845 3.614Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </Arrow>
              </div>
            </Content>
          )}
        </AnimatePresence>
      </Root>
    )
  }
)
