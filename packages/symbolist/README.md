# symbolist

🔣 ️A collection of every symbol from SF Symbols.

[![build](https://github.com/bouchenoiremarc/symbolist/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bouchenoiremarc/symbolist/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/symbolist?color=%230cf)](https://www.npmjs.com/package/symbolist) [![gzipped](https://img.shields.io/bundlephobia/minzip/symbolist?label=gzipped&color=%2385f)](https://www.npmjs.com/package/symbolist) [![license](https://img.shields.io/github/license/bouchenoiremarc/symbolist?color=%23e4b)](https://github.com/bouchenoiremarc/symbolist/blob/main/LICENSE)

🔗 Explore and preview symbols in the [playground](https://marcbouchenoire.com/projects/symbolist).

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
