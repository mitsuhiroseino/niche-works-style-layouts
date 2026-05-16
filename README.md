# @niche-works/style-layouts

`@niche-works/style-layouts` is a niche library specialized in controlling child element layout with CSS.
It returns class names and CSS custom properties as an object based on the given options. Framework-agnostic and SSR-compatible.

**[日本語のREADMEはこちら](./README.ja.md)**

## Features

- Framework-agnostic (works with any JS environment)
- SSR-compatible (returns plain class names and inline style objects)
- Fully typed with TypeScript

## Installation

```bash
npm install @niche-works/style-layouts
# or
pnpm add @niche-works/style-layouts
```

## Usage

Each layout function returns a `{ className, style }` object. Apply them to a container element.

```ts
import { stack } from '@niche-works/style-layouts';

const { className, style } = stack({
  direction: 'x',
  alignX: 'center',
  alignY: 'middle',
  spacing: '16px',
});

// className: "nws-layout-stack nws-layout-direction-x ..."
// style: { "--nws-layout-spacingX": "16px", ... }
```

```html
<div class="nws-layout-stack ..." style="--nws-layout-spacingX: 16px; ...">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

> **Note:** You need to import the CSS separately.

```ts
// Import all layouts at once
import '@niche-works/style-layouts/styles.css';

// Or import only what you need
import '@niche-works/style-layouts/stack.css';
import '@niche-works/style-layouts/tile.css';
```

## Layout Types

### `stack`

Arranges child elements in a single row or column.

```ts
import { stack } from '@niche-works/style-layouts';

const { className, style } = stack({
  direction: 'x', // 'x' | 'y' — default: 'x'
  alignX: 'left', // 'left' | 'center' | 'right'
  alignY: 'top', // 'top' | 'middle' | 'bottom'
  adjustX: 'grow', // 'none' | 'grow' | 'shrink' | 'fit'
  childSizeX: '200px',
  spacing: '8px',
});
```

### `flow`

Like `stack`, but wraps child elements when they exceed the container size.

```ts
import { flow } from '@niche-works/style-layouts';

const { className, style } = flow({
  direction: 'x',
  alignX: 'left',
  alignY: 'top',
  adjustX: 'fit',
  childSizeX: '200px',
  spacing: '8px',
});
```

> `grow`, `shrink`, and `fit` cannot be specified for `adjust` on the cross axis.

### `matrix`

Arranges child elements in a grid with explicit column and row counts.

```ts
import { matrix } from '@niche-works/style-layouts';

const { className, style } = matrix({
  direction: 'x',
  childCountX: 3, // required (or childX)
  childCountY: 2, // required (or childY)
  childSizeX: '200px',
  adjustX: 'fit',
  spacing: '8px',
});
```

Either `childCountX` or `childX` is required per axis (not both).

```ts
// Using explicit track templates
matrix({
  childX: ['1fr', '2fr', '1fr'],
  childCountY: 3,
});
```

> **Note:** This layout assumes the container size is determined externally. Containers sized by their own content (e.g. `width: max-content`) may cause unexpected behavior with percentage-based values.

### `tile`

Arranges child elements in a grid based on child element size. The number of columns is determined automatically based on the container and child sizes.

```ts
import { tile } from '@niche-works/style-layouts';

const { className, style } = tile({
  direction: 'x',
  childSizeX: '200px',
  adjustX: 'fit',
  spacing: '8px',
});
```

> **Note:** Like `matrix`, this layout assumes the container size is determined externally.

### `balance`

Arranges child elements evenly in a single row or column.

- Without `adjust`: maintains child size and distributes space evenly between items
- With `adjust`: adjusts child size to fill the container evenly

```ts
import { balance } from '@niche-works/style-layouts';

const { className, style } = balance({
  direction: 'x',
  adjustX: 'grow',
  childSizeX: '200px',
  spacing: '8px',
});
```

### `pack`

Sizes child elements equally to fill the container.

```ts
import { pack } from '@niche-works/style-layouts';

const { className, style } = pack({
  direction: 'x', // 'x' | 'y' — default: 'x'
  spacing: '8px',
});
```

### `pin`

Positions child elements at specified coordinates. Each child element should have its position set via `top` / `left` / `bottom` / `right` styles.

```ts
import { pin } from '@niche-works/style-layouts';

const { className, style } = pin({
  childSizeX: '100px',
  childSizeY: '80px',
});
```

## Options

### Options Reference

| Option        | Type                       | Description                                |
| ------------- | -------------------------- | ------------------------------------------ |
| `direction`   | `'x' \| 'y'`               | Main axis direction                        |
| `alignX`      | [`AlignX`](#alignx-values) | Horizontal alignment of children           |
| `alignY`      | [`AlignY`](#aligny-values) | Vertical alignment of children             |
| `adjustX`     | [`Adjust`](#adjust-values) | Horizontal size adjustment of children     |
| `adjustY`     | [`Adjust`](#adjust-values) | Vertical size adjustment of children       |
| `spacing`     | `string \| number`         | Gap between children (both axes)           |
| `spacingX`    | `string \| number`         | Gap between children (horizontal)          |
| `spacingY`    | `string \| number`         | Gap between children (vertical)            |
| `childSizeX`  | `string \| number`         | Width of child elements                    |
| `childSizeY`  | `string \| number`         | Height of child elements                   |
| `childCountX` | `number`                   | Number of children in horizontal direction |
| `childCountY` | `number`                   | Number of children in vertical direction   |
| `childX`      | `(string \| number)[]`     | Individual sizes of children (horizontal)  |
| `childY`      | `(string \| number)[]`     | Individual sizes of children (vertical)    |

### `Adjust` Values

| Value    | Child smaller than parent | Child larger than parent |
| -------- | ------------------------- | ------------------------ |
| `none`   | No change                 | No change                |
| `grow`   | Grows to fill             | No change                |
| `shrink` | No change                 | Shrinks to fit           |
| `fit`    | Grows to fill             | Shrinks to fit           |

### `AlignX` Values

`'left'` | `'center'` | `'right'` | `'space-between'` | `'space-around'` | `'space-evenly'`

### `AlignY` Values

`'top'` | `'middle'` | `'bottom'` | `'space-between'` | `'space-around'` | `'space-evenly'`

## Return Value

All layout functions return a `LayoutResult`:

```ts
type LayoutResult = {
  className?: string;
  style?: {
    [key: string]: string | number | undefined;
    [key: `--${string}`]: string | number | undefined;
  };
};
```

## License

MIT
