# ios-symbols

🔣 ️A collection of every symbol from SF Symbols.

[![build](https://github.com/bouchenoiremarc/ios-symbols/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bouchenoiremarc/ios-symbols/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/ios-symbols?color=%230cf)](https://www.npmjs.com/package/ios-symbols) [![gzipped](https://img.shields.io/bundlephobia/minzip/ios-symbols?label=gzipped&color=%2385f)](https://www.npmjs.com/package/ios-symbols) [![license](https://img.shields.io/github/license/bouchenoiremarc/ios-symbols?color=%23e4b)](https://github.com/bouchenoiremarc/ios-symbols/blob/main/LICENSE)

## Introduction

[SF Symbols](https://developer.apple.com/sf-symbols/) is a library of iconography from Apple, integrated into the San Francisco system fonts.

## Installation

#### Skypack

```html
<script type="module">
  import { symbols } from "https://cdn.skypack.dev/ios-symbols"
</script>
```

#### Yarn

```sh
yarn add ios-symbols
```

#### npm

```sh
npm install ios-symbols
```

## Usage

#### `symbols`

Import `symbols`.

```tsx
import { symbols } from "ios-symbols"

// symbols: {"0.circle": "􀀸", "0.circle.fill": "􀀹", ...}
```

#### `getSymbol`

Import `getSymbol`.

```tsx
import { getSymbol } from "ios-symbols"
```

Given a symbol name, `getSymbol` will return its symbol (or `undefined` for unknown symbols).

```tsx
const symbol = getSymbol("scribble.variable")

// symbol: "􀤑"
```

#### `getSymbolName`

Import `getSymbolName`.

```tsx
import { getSymbolName } from "ios-symbols"
```

Given a symbol, `getSymbolName` will return its name (or `undefined` for unknown symbols).

```tsx
const name = getSymbolName("􀣳")

// name: "lasso.sparkles"
```

## Automation

Symbols are extracted with the `generate` command—using the [SF Symbols](https://developer.apple.com/sf-symbols/) app.

<img src=".github/generate@2x.png" width="620" height="296">

#### Types

`generate` prepares types along its symbols which means `getSymbol` and `getSymbolName` will validate symbol names when using TypeScript.

<img src=".github/types@2x.png" width="620" height="296">

## Related

[📏 ios-dimensions](https://github.com/bouchenoiremarc/ios-dimensions): A collection of dimensions from iOS.
