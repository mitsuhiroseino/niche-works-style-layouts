# @niche-works/style-layouts

`@niche-works/style-layouts` は、CSSによる子要素のレイアウト制御に特化したニッチなライブラリです。\
オプションに応じたクラス名とCSS変数をオブジェクトとして返します。フレームワーク非依存でSSRにも対応しています。

**[English README is available here](./README.md)**

## 特徴

- フレームワーク非依存（あらゆるJS環境で動作）
- SSR対応（クラス名とインラインスタイルオブジェクトを返すだけ）
- TypeScriptによる完全な型サポート

## インストール

```bash
npm install @niche-works/style-layouts
# または
pnpm add @niche-works/style-layouts
```

## 使い方

各レイアウト関数は `{ className, style }` オブジェクトを返します。コンテナ要素に適用してください。

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

> **注意:** ライブラリのCSSを別途インポートしてください。

```ts
// 全レイアウトをまとめてインポート
import '@niche-works/style-layouts/styles.css';

// 必要なレイアウトのみインポート
import '@niche-works/style-layouts/stack.css';
import '@niche-works/style-layouts/tile.css';
```

## レイアウト種別

### `stack`

子要素を縦または横方向に一列に並べます。

```ts
import { stack } from '@niche-works/style-layouts';

const { className, style } = stack({
  direction: 'x', // 'x' | 'y' — デフォルト: 'x'
  alignX: 'left', // 'left' | 'center' | 'right'
  alignY: 'top', // 'top' | 'middle' | 'bottom'
  adjustX: 'grow', // 'none' | 'grow' | 'shrink' | 'fit'
  childSizeX: '200px',
  spacing: '8px',
});
```

### `flow`

`stack`と同様ですが、コンテナサイズを超えた場合に子要素を折り返します。

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

> 交差軸方向の `adjust` に `grow`、`shrink`、`fit` は指定できません。

### `matrix`

列数・行数を指定して子要素を格子状に並べます。

```ts
import { matrix } from '@niche-works/style-layouts';

const { className, style } = matrix({
  direction: 'x',
  childCountX: 3, // 必須（または childX）
  childCountY: 2, // 必須（または childY）
  childSizeX: '200px',
  adjustX: 'fit',
  spacing: '8px',
});
```

各軸で `childCountX` または `childX` のどちらか一方が必須です（両方は指定不可）。

```ts
// グリッドトラックを直接指定する場合
matrix({
  childX: ['1fr', '2fr', '1fr'],
  childCountY: 3,
});
```

> **注意:** このレイアウトはコンテナのサイズが外部から確定していることを前提としています。`width: max-content` など、子要素によってサイズが決まる親要素では、パーセンテージ値が意図通りに動作しない場合があります。

### `tile`

子要素のサイズを基準にして格子状に並べます。列数は親要素のサイズと子要素のサイズに応じて自動で決まります。

```ts
import { tile } from '@niche-works/style-layouts';

const { className, style } = tile({
  direction: 'x',
  childSizeX: '200px',
  adjustX: 'fit',
  spacing: '8px',
});
```

> **注意:** `matrix` と同様に、コンテナのサイズが外部から確定していることを前提としています。

### `balance`

子要素を一列に均等に並べます。

- `adjust` なし: 子要素のサイズを維持したまま、余白を均等に配分します
- `adjust` あり: 子要素のサイズを調整してコンテナを満たします

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

子要素を親要素のサイズに合わせて均等にサイズ調整し並べます。

```ts
import { pack } from '@niche-works/style-layouts';

const { className, style } = pack({
  direction: 'x', // 'x' | 'y' — デフォルト: 'x'
  spacing: '8px',
});
```

### `pin`

子要素を指定の座標に配置します。子要素は `top` / `left` / `bottom` / `right` スタイルで位置を指定してください。

```ts
import { pin } from '@niche-works/style-layouts';

const { className, style } = pin({
  childSizeX: '100px',
  childSizeY: '80px',
});
```

## オプション

### オプション一覧

| オプション    | 型                       | 説明                         |
| ------------- | ------------------------ | ---------------------------- |
| `direction`   | `'x' \| 'y'`             | 主軸の方向                   |
| `alignX`      | [`AlignX`](#alignx-の値) | 子要素の横位置               |
| `alignY`      | [`AlignY`](#aligny-の値) | 子要素の縦位置               |
| `adjustX`     | [`Adjust`](#adjust-の値) | 子要素の横方向のサイズ調整   |
| `adjustY`     | [`Adjust`](#adjust-の値) | 子要素の縦方向のサイズ調整   |
| `spacing`     | `string \| number`       | 子要素間の余白（横縦共通）   |
| `spacingX`    | `string \| number`       | 子要素間の余白（横方向）     |
| `spacingY`    | `string \| number`       | 子要素間の余白（縦方向）     |
| `childSizeX`  | `string \| number`       | 子要素の幅                   |
| `childSizeY`  | `string \| number`       | 子要素の高さ                 |
| `childCountX` | `string \| number`       | 子要素の横方向の数           |
| `childCountY` | `string \| number`       | 子要素の縦方向の数           |
| `childX`      | `(string \| number)[]`   | 子要素の横方向の個々のサイズ |
| `childY`      | `(string \| number)[]`   | 子要素の縦方向の個々のサイズ |

### `Adjust` の値

| 値       | 子が親より小さい時 | 子が親より大きい時 |
| -------- | ------------------ | ------------------ |
| `none`   | そのまま           | そのまま           |
| `grow`   | 伸びる             | そのまま           |
| `shrink` | そのまま           | 縮む               |
| `fit`    | 伸びる             | 縮む               |

### `AlignX` の値

`'left'` | `'center'` | `'right'` | `'space-between'` | `'space-around'` | `'space-evenly'`

### `AlignY` の値

`'top'` | `'middle'` | `'bottom'` | `'space-between'` | `'space-around'` | `'space-evenly'`

## 戻り値

全てのレイアウト関数は `LayoutResult` を返します。

```ts
type LayoutResult = {
  className?: string;
  style?: {
    [key: string]: string | number | undefined;
    [key: `--${string}`]: string | number | undefined;
  };
};
```

## ライセンス

MIT
