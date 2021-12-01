import clsx from "clsx"
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import debounce from "just-debounce-it"
import { Leva, LevaInputs, button, useControls } from "leva"
import { GetStaticProps } from "next"
import { CSSProperties, memo, useCallback, useEffect, useMemo } from "react"
import pkg from "../../../symbolist/package.json"
import { Cell } from "../components/Cell"
import { LEVA_MARGIN, LEVA_WIDTH } from "../constants"
import { isBoolean } from "../guards"
import { useSupportedFont } from "../hooks/use-supported-font"
import { theme } from "../leva/theme"
import { getSymbols } from "../utils/get-symbols"
import styles from "./index.module.scss"

interface Props {
  version: string
}

const APPEARANCE_FOLDER = "Appearance"
const DEBOUNCE_DELAY = 280

interface AppearanceControls {
  color: string
  font: string
  weight: number
}

interface AppearanceControlsProps {
  onChange: (controls: AppearanceControls) => void
}

const symbols = getSymbols()

const fonts = {
  "SF Pro": `"SF Pro", "SF Pro Display", "SF Pro Text", "SF Pro Rounded"`,
  "SF Compact": `"SF Compact", "SF Compact Display", "SF Compact Text", "SF Compact Rounded"`
}

const weights = {
  Ultralight: 100,
  Light: 300,
  Regular: 400,
  Medium: 500,
  Semibold: 600,
  Bold: 700,
  Heavy: 800,
  Black: 900
}

const DEFAULT_COLOR = "#000"
const DEFAULT_FONT = fonts["SF Pro"]
const DEFAULT_WEIGHT = weights.Regular

const AppearanceControls = memo(({ onChange }: AppearanceControlsProps) => {
  const [{ color }, setColor] = useControls(APPEARANCE_FOLDER, () => ({
    color: {
      label: "Color",
      type: LevaInputs.COLOR,
      value: DEFAULT_COLOR
    }
  }))
  const [{ font }, setFont] = useControls(APPEARANCE_FOLDER, () => ({
    font: {
      label: "Font",
      options: fonts,
      type: LevaInputs.SELECT,
      value: DEFAULT_FONT
    }
  }))
  const [{ weight }, setWeight] = useControls(APPEARANCE_FOLDER, () => ({
    weight: {
      label: "Weight",
      options: weights,
      type: LevaInputs.SELECT,
      value: DEFAULT_WEIGHT
    }
  }))
  useControls(APPEARANCE_FOLDER, {
    Reset: button(() => {
      setColor({
        color: DEFAULT_COLOR
      })
      setFont({
        font: DEFAULT_FONT
      })
      setWeight({
        weight: DEFAULT_WEIGHT
      })
    })
  })

  useEffect(() => {
    onChange({
      color,
      font,
      weight
    })
  }, [onChange, color, font, weight])

  return null
})

function Page({ version }: Props) {
  const color = useMotionValue(DEFAULT_COLOR)
  const font = useMotionValue(DEFAULT_FONT)
  const weight = useMotionValue(DEFAULT_WEIGHT)
  const { search } = useControls({
    search: {
      label: "Search",
      type: LevaInputs.STRING,
      value: ""
    }
  })

  const withSFCompact = useSupportedFont(fonts["SF Compact"])
  const withSFPro = useSupportedFont(fonts["SF Pro"])
  const withToast = useMemo(() => {
    return isBoolean(withSFCompact) && isBoolean(withSFPro)
      ? !withSFCompact || !withSFPro
      : false
  }, [withSFCompact, withSFPro])

  const filteredSymbols = useMemo(() => {
    if (!search) return symbols

    return symbols.filter((symbol) =>
      symbol.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleAppearanceChange = useCallback(
    debounce((controls: AppearanceControls) => {
      color.set(controls.color)
      font.set(controls.font)
      weight.set(controls.weight)
    }, DEBOUNCE_DELAY),
    [color, font, weight]
  )
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div
      className={styles.page}
      style={
        {
          "--leva-margin": `${LEVA_MARGIN}px`,
          "--leva-width": `${LEVA_WIDTH}px`
        } as CSSProperties
      }
    >
      <Leva theme={theme} titleBar={false} />
      <AppearanceControls onChange={handleAppearanceChange} />
      <header className={styles.header}>
        <div className={styles.headings}>
          <h1>
            symbolist{" "}
            <a
              className={styles.version}
              href={`https://github.com/marcbouchenoire/symbolist/releases/tag/v${version}`}
              rel="noreferrer"
              target="_blank"
            >
              v{version}
            </a>
          </h1>
          <p>🔣 ️A collection of every symbol from SF Symbols.</p>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <a
                aria-label="GitHub"
                className={clsx(styles.link, styles.github)}
                href="https://github.com/marcbouchenoire/symbolist"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 12c0 9.53-1.03 11.6-8.8 11.94v-4.13c0-1.14-.4-1.88-.85-2.26 2.76-.3 5.65-1.33 5.65-6.02 0-1.33-.48-2.42-1.27-3.27.12-.31.55-1.55-.13-3.23 0 0-1.03-.33-3.4 1.25a12.06 12.06 0 00-6.2 0C6.65 4.7 5.6 5.03 5.6 5.03a4.33 4.33 0 00-.12 3.23 4.68 4.68 0 00-1.27 3.27c0 4.67 2.89 5.72 5.64 6.03-.36.3-.68.84-.79 1.63-.7.31-2.5.85-3.6-1.01 0 0-.65-1.17-1.9-1.26h-.02c-.15 0-1.1.04-.06.74 0 0 .8.38 1.37 1.79 0 0 .72 2.17 4.16 1.44v3.06C1.14 23.65.03 21.65 0 12.33V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="npm"
                className={clsx(styles.link, styles.npm)}
                href="https://www.npmjs.com/package/symbolist"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 12c0 10.7-1.3 12-12 12C1.4 24 .03 22.73 0 12.33V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12zM6.02 6L6 18h6V9h3v9h3V6.02L6.02 6z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="twitter"
                className={clsx(styles.link, styles.twitter)}
                href="https://twitter.com/marcbouchenoire"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 12c0 10.7-1.3 12-12 12C1.4 24 .03 22.73 0 12.33V12C0 1.4 1.27.03 11.67 0H12c10.7 0 12 1.3 12 12zm-6.22-5.33a3.29 3.29 0 00-4.03-.8 3.14 3.14 0 00-1.57 3.73 9.5 9.5 0 01-6.82-3.4 3.26 3.26 0 00.87 4.25c-.46.01-.92-.07-1.35-.24a3.33 3.33 0 002.75 3.13c-.48.14-1 .17-1.5.09a3.37 3.37 0 002.8 2.22 6.97 6.97 0 01-4.68 1.42 9.6 9.6 0 009.8.17A9.17 9.17 0 0018.7 8.8a3.1 3.1 0 001.55-1.66c-.6.28-1.23.46-1.89.52a3.09 3.09 0 001.5-1.8c-.63.4-1.33.68-2.08.8z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <motion.main
        className={styles.main}
        style={
          {
            "--symbol-color": color,
            "--symbol-font": font,
            "--symbol-weight": weight
          } as CSSProperties
        }
      >
        {filteredSymbols.map((symbol, index) => (
          <Cell key={index} {...symbol} />
        ))}
      </motion.main>
      <AnimatePresence>
        {withToast && (
          <motion.div
            animate="visible"
            className={styles.toasts}
            exit="hidden"
            initial="hidden"
          >
            <motion.div
              className={styles.toast}
              transition={{ bounce: 0.2, duration: 0.6, type: "spring" }}
              variants={{
                hidden: {
                  opacity: 0,
                  translateY: 20
                },
                visible: {
                  opacity: 1,
                  translateY: 0
                }
              }}
            >
              <p className={styles.label}>
                SF Symbols aren’t available<span> on your device</span>.
              </p>{" "}
              <a
                className={styles.button}
                href="https://developer.apple.com/fonts/"
                rel="noreferrer"
                target="_blank"
              >
                Learn more
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      version: pkg.version ?? ""
    }
  }
}
