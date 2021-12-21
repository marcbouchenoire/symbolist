declare module "tailwindcss/colors" {
  interface ColorGroup {
    readonly 100: string
    readonly 200: string
    readonly 300: string
    readonly 400: string
    readonly 50: string
    readonly 500: string
    readonly 600: string
    readonly 700: string
    readonly 800: string
    readonly 900: string
  }

  interface Colors {
    amber: ColorGroup
    black: string
    blue: ColorGroup
    cyan: ColorGroup
    emerald: ColorGroup
    fuchsia: ColorGroup
    gray: ColorGroup
    green: ColorGroup
    indigo: ColorGroup
    inherit: string
    lime: ColorGroup
    neutral: ColorGroup
    orange: ColorGroup
    pink: ColorGroup
    purple: ColorGroup
    red: ColorGroup
    rose: ColorGroup
    sky: ColorGroup
    slate: ColorGroup
    stone: ColorGroup
    teal: ColorGroup
    transparent: string
    violet: ColorGroup
    white: string
    yellow: ColorGroup
    zinc: ColorGroup
  }

  declare const colors: Colors

  export = colors
}
