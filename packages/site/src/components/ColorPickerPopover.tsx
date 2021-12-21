import { Arrow, Content, Root, Trigger } from "@radix-ui/react-popover"
import { AnimatePresence, motion } from "framer-motion"
import { ComponentProps, memo, useState } from "react"
import { HexColorPicker } from "react-colorful"
import { springier } from "../transitions"

type Props = ComponentProps<typeof HexColorPicker>

export const ColorPickerPopover = memo(
  ({ color, children, ...props }: Props) => {
    const [open, setOpen] = useState(false)

    return (
      <Root onOpenChange={setOpen} open={open}>
        <Trigger asChild>{children}</Trigger>
        <AnimatePresence>
          {open && (
            <Content asChild forceMount side="top" sideOffset={4}>
              <motion.div
                animate="visible"
                className="color-picker-popover will-change-transform"
                exit="hidden"
                initial="hidden"
                transition={springier}
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1 }
                }}
              >
                <HexColorPicker color={color} {...props} />
                <Arrow asChild>
                  <svg
                    height="8"
                    role="presentation"
                    viewBox="0 0 46 8"
                    width="46"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.833 7.411c.148.186.328.335.529.436.2.102.418.154.638.153a1.49 1.49 0 0 0 1.167-.589l2.845-3.614C28.911 1.384 31.654 0 34.538 0H37 9h2.462c2.884 0 5.627 1.384 7.526 3.797l2.845 3.614Z"
                      fill="currentColor"
                    />
                  </svg>
                </Arrow>
              </motion.div>
            </Content>
          )}
        </AnimatePresence>
      </Root>
    )
  }
)
