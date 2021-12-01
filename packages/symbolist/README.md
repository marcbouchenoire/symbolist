# <a href="https://marcbouchenoire.com/projects/symbolist"><img src="https://raw.githubusercontent.com/marcbouchenoire/symbolist/main/.github/logo.svg" height="40" alt="Symbolist" /></a>

🔣 ️A collection of every symbol from SF Symbols.

[![version](https://img.shields.io/badge/SF%20Symbols%203.1-message?color=%23e27)](https://developer.apple.com/sf-symbols/)
[![build](https://img.shields.io/github/workflow/status/marcbouchenoire/symbolist/CI?color=%23e27)](https://github.com/marcbouchenoire/symbolist/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/symbolist?color=%23e27)](https://www.npmjs.com/package/symbolist)
[![size](https://img.shields.io/bundlephobia/minzip/symbolist?label=size&color=%23e27)](https://bundlephobia.com/package/symbolist)
[![coverage](https://img.shields.io/codecov/c/github/marcbouchenoire/symbolist?color=%23e27)](https://codecov.io/gh/marcbouchenoire/symbolist)
[![license](https://img.shields.io/github/license/marcbouchenoire/symbolist?color=%23e27)](https://github.com/marcbouchenoire/symbolist/blob/main/LICENSE)

- [🤖 **Automated**](#automation): Authored and updated automatically
- 🧪 **Reliable**: Fully tested with [100% code coverage](https://codecov.io/gh/marcbouchenoire/symbolist)
- 📦 **Typed**: Written in [TypeScript](https://www.typescriptlang.org/) and includes definitions out-of-the-box
- 💨 **Zero dependencies**

## Introduction

[SF Symbols](https://developer.apple.com/sf-symbols/) is a library of iconography from Apple, integrated into the San Francisco system fonts.

## Installation

#### Skypack

```javascript
import { symbols } from "https://cdn.skypack.dev/symbolist"
```

#### Yarn

```bash
yarn add symbolist
```

#### npm

```bash
npm install symbolist
```

## Usage

#### `symbols`

Import `symbols`.

```typescript
import { symbols } from "symbolist"

// symbols: {"0.circle": "􀀸", "0.circle.fill": "􀀹", ...}
```

#### `getSymbol`

Import `getSymbol`.

```typescript
import { getSymbol } from "symbolist"
```

Given a symbol name, `getSymbol` will return its symbol (or `undefined` for unknown symbols).

```typescript
const symbol = getSymbol("scribble.variable")

// symbol: "􀤑"
```

#### `getSymbolName`

Import `getSymbolName`.

```typescript
import { getSymbolName } from "symbolist"
```

Given a symbol, `getSymbolName` will return its name (or `undefined` for unknown symbols).

```typescript
const name = getSymbolName("􀣳")

// name: "lasso.sparkles"
```

## Automation

Symbols are extracted with the `generate` command—using the [SF Symbols](https://developer.apple.com/sf-symbols/) app.

#### Types

`generate` prepares types along its symbols which means `getSymbol` and `getSymbolName` will validate symbol names when using TypeScript.
