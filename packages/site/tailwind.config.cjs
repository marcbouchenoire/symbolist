const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

const paddingSafe = plugin(({ addUtilities, config, e }) => {
  const paddings = config("theme.padding", {})
  const variants = config("variants.padding", {})

  const utilities = Object.entries(paddings).flatMap(([modifier, size]) => ({
    [`.${e(`p-${modifier}-safe`)}`]: {
      "padding-top": `max(${size}, env(safe-area-inset-top))`,
      "padding-bottom": `max(${size}, env(safe-area-inset-bottom))`,
      "padding-left": `max(${size}, env(safe-area-inset-left))`,
      "padding-right": `max(${size}, env(safe-area-inset-right))`
    },
    [`.${e(`py-${modifier}-safe`)}`]: {
      "padding-top": `max(${size}, env(safe-area-inset-top))`,
      "padding-bottom": `max(${size}, env(safe-area-inset-bottom))`
    },
    [`.${e(`px-${modifier}-safe`)}`]: {
      "padding-left": `max(${size}, env(safe-area-inset-left))`,
      "padding-right": `max(${size}, env(safe-area-inset-right))`
    },
    [`.${e(`pt-${modifier}-safe`)}`]: {
      "padding-top": `max(${size}, env(safe-area-inset-top))`
    },
    [`.${e(`pr-${modifier}-safe`)}`]: {
      "padding-right": `max(${size}, env(safe-area-inset-right))`
    },
    [`.${e(`pb-${modifier}-safe`)}`]: {
      "padding-bottom": `max(${size}, env(safe-area-inset-bottom))`
    },
    [`.${e(`pl-${modifier}-safe`)}`]: {
      "padding-left": `max(${size}, env(safe-area-inset-left))`
    }
  }))

  addUtilities(utilities, variants)
})

module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        popover:
          "0px 2px 8px rgba(0, 0, 0, 0.08), 0px 6px 32px rgba(0, 0, 0, 0.08), 0px 8px 64px rgba(0, 0, 0, 0.06)"
      },
      colors: {
        primary: {
          50: "#fef1f5",
          100: "#fee5ec",
          200: "#fdcedd",
          300: "#fba6c1",
          400: "#f8719d",
          500: "#f1437b",
          600: "#de225f",
          700: "#be154c",
          800: "#9e1543",
          900: "#86163d"
        },
        zinc: {
          150: "#ececee",
          250: "#dcdce0",
          350: "#bbbbc1",
          450: "#898992",
          550: "#62626b",
          650: "#494951",
          750: "#333338",
          850: "#202023",
          950: "#121215"
        }
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        sf: `"SF Pro", "SF Pro Display", "SF Pro Text"`
      },
      fontSize: {
        "2xs": [
          "0.65rem",
          {
            lineHeight: 1
          }
        ]
      },
      gridTemplateColumns: {
        symbols: "repeat(auto-fill, minmax(120px, 1fr))",
        symbol: "1fr auto"
      },
      gridTemplateRows: {
        symbol: "1fr auto"
      },
      maxWidth: {
        sm: "37.5rem"
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null,
            pre: {
              color: null,
              backgroundColor: null
            },
            "code::before": null,
            "code::after": null,
            ol: {
              paddingLeft: "1.25em"
            },
            ul: {
              listStyleType: "none",
              paddingLeft: "1.25em"
            },
            li: {
              position: "relative"
            },
            "ul > li::marker": null,
            "ul > li::before": {
              content: `""`,
              position: "absolute",
              backgroundColor: "var(--tw-prose-bullets)",
              borderRadius: "100px",
              width: "0.75em",
              height: "0.125em",
              top: "0.8125em",
              left: "-1.25em"
            }
          }
        }
      },
      transitionProperty: {
        DEFAULT:
          "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, text-decoration-color"
      },
      zIndex: {
        negative: -1
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), paddingSafe]
}
