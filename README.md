# create-canvas-context

🎨 Create a canvas and get a rendering context from it.

[![build](https://github.com/bouchenoiremarc/create-canvas-context/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bouchenoiremarc/create-canvas-context/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/create-canvas-context?color=%230cf)](https://www.npmjs.com/package/create-canvas-context) [![gzipped](https://img.shields.io/bundlephobia/minzip/create-canvas-context?label=gzipped&color=%2385f)](https://www.npmjs.com/package/create-canvas-context) [![license](https://img.shields.io/github/license/bouchenoiremarc/create-canvas-context?color=%23e4b)](https://github.com/bouchenoiremarc/create-canvas-context/blob/main/LICENSE)

## Installation

#### Skypack

```javascript
import { createCanvasContext } from "https://cdn.skypack.dev/create-canvas-context"
```

#### Yarn

```bash
yarn add create-canvas-context
```

#### npm

```bash
npm install create-canvas-context
```

## Usage

Import `createCanvasContext`.

```typescript
import { createCanvasContext } from "create-canvas-context"
```

Invoke it while specifying a context type (`"2d"`, `"bitmaprenderer"`, `"webgl"` or `"webgl2"`) and access in return the specified rendering context and its canvas as a pair.

```typescript
const [context, canvas] = createCanvasContext("2d")

// context: CanvasRenderingContext2D
// canvas: HTMLCanvasElement
```

Optionally override defaults using [options](#options).

```typescript
const [context, canvas] = createCanvasContext("webgl", {
  canvas: document.createElement("canvas"),
  offscreen: true,
  alpha: false
})

// context: WebGLRenderingContext
// canvas: OffscreenCanvas
```

## Options

A secondary `options` argument surfaces all context-specific attributes available using [`HTMLCanvasElement.getContext()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) and adds a few optional settings to tweak the behavior of `createCanvasContext`.

#### `canvas`

```typescript
canvas?: HTMLCanvasElement | OffscreenCanvas
```

Setting `canvas` to an existing canvas (either an `HTMLCanvasElement` or an `OffscreenCanvas`) will provide it instead of creating one.

#### `offscreen`

```typescript
offscreen?: boolean = false
```

Setting `offscreen` to `true` will create an `OffscreenCanvas` instead of an `HTMLCanvasElement`.

If you provided an existing `HTMLCanvasElement` using the `canvas` option, it will get its control transferred to an `OffscreenCanvas` using [`HTMLCanvasElement.transferControlToOffscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen).

#### `width` and `height`

```typescript
width?: number
height?: number
```

Setting `width` and `height` will set specific canvas dimensions and override existing values.
