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
  gap: 16,
});

// className: "nws-layout-stack nws-layout-direction-x ..."
// style: { "--nws-layout-gapX": "16px", ... }
```

```html
<div class="nws-layout-stack ..." style="--nws-layout-gapX: 16px; ...">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### CSSの読み込み

デフォルトのインポートではCSSが自動的に読み込まれます。

```ts
import { stack } from '@niche-works/style-layouts';
```

CSSと関数を個別に管理したい場合は `core` ディレクトリ配下のモジュールを使用してください。

```ts
import { stack } from '@niche-works/style-layouts/core';

// 全レイアウトをまとめてインポート
import '@niche-works/style-layouts/core/styles.css';

// 必要なレイアウトのみインポート
import '@niche-works/style-layouts/core/stack.css';
import '@niche-works/style-layouts/core/tile.css';
```

## レイアウト種別

### `stack`

子要素を縦または横方向に一列に並べます。

```ts
import { stack } from '@niche-works/style-layouts';

const { className, style } = stack({
  direction: 'x',
  alignX: 'left',
  alignY: 'top',
  adjustX: 'grow',
  gap: 8,
  childSizeX: 200,
});
```

### `flow`

`stack`と同様ですが、コンテナサイズを超えた場合に子要素を折り返します。

> 交差軸方向の `adjustX` / `adjustY` に `grow`、`shrink`、`fit` は指定できません。

```ts
import { flow } from '@niche-works/style-layouts';

const { className, style } = flow({
  direction: 'x',
  alignX: 'left',
  alignY: 'top',
  adjustX: 'fit',
  gap: 8,
  childSizeX: 200,
});
```

### `tile`

子要素のサイズを基準にして格子状に並べます。列数は親要素のサイズと子要素のサイズに応じて自動で決まります。

> **注意:** このレイアウトはコンテナのサイズが外部から確定していることを前提としています。`width: max-content` など、子要素によってサイズが決まる親要素では、パーセンテージ値が意図通りに動作しない場合があります。

```ts
import { tile } from '@niche-works/style-layouts';

const { className, style } = tile({
  direction: 'x',
  adjustX: 'fit',
  gap: 8,
  childSizeX: 200,
});
```

### `matrix`

列数・行数を指定して子要素を格子状に並べます。

各軸で `childCount` または `tracks` のどちらか一方が必須です（両方は指定不可）。

> **注意:** `tile` と同様に、コンテナのサイズが外部から確定していることを前提としています。

```ts
import { matrix } from '@niche-works/style-layouts';

const { className, style } = matrix({
  direction: 'x',
  adjustX: 'fit',
  gap: 8,
  childSizeX: 200,
  childCountX: 3,
  childCountY: 2,
});

// グリッドトラックを直接指定する場合
matrix({
  tracksX: ['1fr', '2fr', '1fr'],
  childCountY: 3,
});
```

### `center`

子要素を親要素の中央に配置します。\
親要素が子要素より小さくなった場合でも、先頭の子要素が親要素の外にはみ出さずに表示されます。

```ts
import { center } from '@niche-works/style-layouts';

const { className, style } = center({
  direction: 'x',
  adjustX: 'shrink',
  gap: 8,
  childSizeY: 200,
  childRatioX: 1.6,
});
```

### `pack`

子要素を親要素のサイズに合わせて均等にサイズ調整し並べます。

```ts
import { pack } from '@niche-works/style-layouts';

const { className, style } = pack({
  direction: 'x',
  gap: 8,
});
```

### `balance`

子要素を一列に均等に並べます。

- `adjust` なし: 子要素のサイズを維持したまま、余白を均等に配分します
- `adjust` あり: 子要素のサイズを調整してコンテナを満たします

```ts
import { balance } from '@niche-works/style-layouts';

const { className, style } = balance({
  direction: 'x',
  adjustX: 'grow',
  childSizeX: 200,
  gap: 8,
});
```

### `layer`

子要素を重ねて全て同じ位置に配置します。

> `alignX` / `alignY` に `space-between`、`space-around`、`space-evenly` は指定できません。

```ts
import { layer } from '@niche-works/style-layouts';

const { className, style } = layer({
  alignX: 'center',
  adjustX: 'shrink',
  childSizeY: 200,
  childRatioX: 1.6,
});
```

### `pin`

子要素を指定の座標に配置します。子要素は `top` / `left` / `bottom` / `right` スタイルで位置を指定してください。

```ts
import { pin } from '@niche-works/style-layouts';

const { className, style } = pin({
  childSizeX: 100,
  childSizeY: 80,
});
```

## オプション

### レイアウト別対応表

| オプション    | stack | flow | tile | matrix | center | pack | balance | layer | pin |
| ------------- | :---: | :--: | :--: | :----: | :----: | :--: | :-----: | :---: | :-: |
| `direction`   |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `alignX`      |   ✓   |  ✓   |  ✓   |   ✓    |   —    |  —   |    ✓    |   ✓   |  —  |
| `alignY`      |   ✓   |  ✓   |  ✓   |   ✓    |   —    |  —   |    ✓    |   ✓   |  —  |
| `adjustX`     |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  —  |
| `adjustY`     |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  —  |
| `gap`         |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `gapX`        |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `gapY`        |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  ✓   |    ✓    |   —   |  —  |
| `childSizeX`  |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `childSizeY`  |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `childRatioX` |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `childRatioY` |   ✓   |  ✓   |  ✓   |   ✓    |   ✓    |  —   |    ✓    |   ✓   |  ✓  |
| `childCountX` |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `childCountY` |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `tracksX`     |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |
| `tracksY`     |   —   |  —   |  —   |   ✓    |   —    |  —   |    —    |   —   |  —  |

### オプション一覧

| オプション     | 型                       | 説明                                             |
| -------------- | ------------------------ | ------------------------------------------------ |
| `direction?`   | `'x' \| 'y'`             | 主軸の方向 (デフォルト `'x'`)                    |
| `alignX?`      | [`AlignX`](#alignx-の値) | 子要素の横位置 (デフォルト `'left'`)             |
| `alignY?`      | [`AlignY`](#aligny-の値) | 子要素の縦位置 (デフォルト `'top'`)              |
| `adjustX?`     | [`Adjust`](#adjust-の値) | 子要素の横方向のサイズ調整 (デフォルト `'none'`) |
| `adjustY?`     | [`Adjust`](#adjust-の値) | 子要素の縦方向のサイズ調整 (デフォルト `'none'`) |
| `gap?`         | `number`                 | 子要素間の余白 (px,横縦共通)                     |
| `gapX?`        | `number`                 | 子要素間の余白 (px,横方向)                       |
| `gapY?`        | `number`                 | 子要素間の余白 (px,縦方向)                       |
| `childSizeX?`  | `number`                 | 子要素の幅 (px)                                  |
| `childSizeY?`  | `number`                 | 子要素の高さ (px)                                |
| `childRatioX?` | `number`                 | 子要素の幅の比                                   |
| `childRatioY?` | `number`                 | 子要素の高さの比                                 |
| `childCountX?` | `number`                 | 子要素の横方向の数                               |
| `childCountY?` | `number`                 | 子要素の縦方向の数                               |
| `tracksX?`     | `(string \| number)[]`   | 子要素の横方向の個々のサイズ                     |
| `tracksY?`     | `(string \| number)[]`   | 子要素の縦方向の個々のサイズ                     |

### `AlignX` の値

| 値                | 横方向の位置     |
| ----------------- | ---------------- |
| `'left'`          | 左寄せ           |
| `'center'`        | 中央寄せ         |
| `'right'`         | 右寄せ           |
| `'space-between'` | 両端揃え         |
| `'space-around'`  | 両端余白あり均等 |
| `'space-evenly'`  | 完全均等         |

### `AlignY` の値

| 値                | 縦方向の位置     |
| ----------------- | ---------------- |
| `'top'`           | 上寄せ           |
| `'middle'`        | 中央寄せ         |
| `'bottom'`        | 下寄せ           |
| `'space-between'` | 両端揃え         |
| `'space-around'`  | 両端余白あり均等 |
| `'space-evenly'`  | 完全均等         |

### `Adjust` の値

| 値         | 子が親より小さい時 | 子が親より大きい時 |
| ---------- | ------------------ | ------------------ |
| `'none'`   | そのまま           | そのまま           |
| `'grow'`   | 伸びる             | そのまま           |
| `'shrink'` | そのまま           | 縮む               |
| `'fit'`    | 伸びる             | 縮む               |

> **注意:** 子要素に個別の幅や高さが設定されている場合、その値が優先されるため上記の動作にならないことがあります。

## 戻り値

全てのレイアウト関数は `StyleLayoutResult` を返します。

```ts
type StyleLayoutResult = {
  className?: string;
  style?: {
    [key: `--${string}`]: string | number | undefined;
  };
};
```

## ライセンス

MIT
