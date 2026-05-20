/**
 * 整列方向
 */
export const Direction = {
  x: 'x',
  y: 'y',
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

const AlignBetween = {
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
} as const;

/**
 * 横位置
 *
 * - left: 左寄せ
 * - center: 中央寄せ
 * - right: 右寄せ
 */
export const AlignXBase = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;
export type AlignXBase = (typeof AlignXBase)[keyof typeof AlignXBase];

/**
 * 横位置
 *
 * - left: 左寄せ
 * - center: 中央寄せ
 * - right: 右寄せ
 * - space-between: 両端揃え
 * - space-around: 両端余白あり均等
 * - space-evenly: 完全均等
 */
export const AlignX = {
  ...AlignXBase,
  ...AlignBetween,
} as const;
export type AlignX = (typeof AlignX)[keyof typeof AlignX];

/**
 * 縦位置
 *
 * - top: 上寄せ
 * - middle: 中央寄せ
 * - bottom: 下寄せ
 */
export const AlignYBase = {
  top: 'top',
  middle: 'middle',
  bottom: 'bottom',
} as const;
export type AlignYBase = (typeof AlignYBase)[keyof typeof AlignYBase];

/**
 * 縦位置
 *
 * - top: 上寄せ
 * - middle: 中央寄せ
 * - bottom: 下寄せ
 * - space-between: 両端揃え
 * - space-around: 両端余白あり均等
 * - space-evenly: 完全均等
 */
export const AlignY = {
  ...AlignYBase,
  ...AlignBetween,
} as const;
export type AlignY = (typeof AlignY)[keyof typeof AlignY];

/**
 * 親要素のサイズを基準にした子要素のサイズ調整
 *
 * - `none`
 *   - 親のサイズに足りないとき: そのまま
 *   - 親のサイズを超えるとき: そのまま
 */
export const AdjustBase = {
  none: 'none',
} as const;
export type AdjustBase = (typeof AdjustBase)[keyof typeof AdjustBase];

/**
 * 親要素のサイズを基準にした子要素のサイズ調整
 *
 * - `none`
 *   - 親のサイズに足りないとき: そのまま
 *   - 親のサイズを超えるとき: そのまま
 * - `fit`
 *   - 親のサイズに足りないとき: 伸ばす
 *   - 親のサイズを超えるとき: 縮める
 * - `grow`
 *   - 親のサイズに足りないとき: 伸ばす
 *   - 親のサイズを超えるとき: そのまま
 * - `shrink`
 *   - 親のサイズに足りないとき: そのまま
 *   - 親のサイズを超えるとき: 縮める
 */
export const Adjust = {
  ...AdjustBase,
  fit: 'fit',
  grow: 'grow',
  shrink: 'shrink',
} as const;
export type Adjust = (typeof Adjust)[keyof typeof Adjust];

// スタイル用のクラス

/**
 * レイアウト種別: stack
 */
export const clsLayoutStack = 'nws-layout-stack';

/**
 * レイアウト種別: flow
 */
export const clsLayoutFlow = 'nws-layout-flow';

/**
 * レイアウト種別: tile
 */
export const clsLayoutTile = 'nws-layout-tile';

/**
 * レイアウト種別: matrix
 */
export const clsLayoutMatrix = 'nws-layout-matrix';

/**
 * レイアウト種別: center
 */
export const clsLayoutCenter = 'nws-layout-center';

/**
 * レイアウト種別: pack
 */
export const clsLayoutPack = 'nws-layout-pack';

/**
 * レイアウト種別: balance
 */
export const clsLayoutBalance = 'nws-layout-balance';

/**
 * レイアウト種別: layer
 */
export const clsLayoutLayer = 'nws-layout-layer';

/**
 * レイアウト種別: pin
 */
export const clsLayoutPin = 'nws-layout-pin';

/**
 * 整列: 横方向
 */
export const clsLayoutDirectionX = 'nws-layout-direction-x';

/**
 * 整列: 縦方向
 */
export const clsLayoutDirectionY = 'nws-layout-direction-y';

/**
 * 横位置: 左
 */
export const clsLayoutAlignXLeft = 'nws-layout-alignX-left';

/**
 * 横位置: 中央
 */
export const clsLayoutAlignXCenter = 'nws-layout-alignX-center';

/**
 * 横位置: 右
 */
export const clsLayoutAlignXRight = 'nws-layout-alignX-right';

/**
 * 横位置: 両端揃え
 */
export const clsLayoutAlignXSpaceBetween = 'nws-layout-alignX-spaceBetween';

/**
 * 横位置: 両端余白あり均等
 */
export const clsLayoutAlignXSpaceAround = 'nws-layout-alignX-spaceAround';

/**
 * 横位置: 完全均等
 */
export const clsLayoutAlignXSpaceEvenly = 'nws-layout-alignX-spaceEvenly';

/**
 * 縦位置: 上
 */
export const clsLayoutAlignYTop = 'nws-layout-alignY-top';

/**
 * 縦位置: 中央
 */
export const clsLayoutAlignYMiddle = 'nws-layout-alignY-middle';

/**
 * 縦位置: 下
 */
export const clsLayoutAlignYBottom = 'nws-layout-alignY-bottom';

/**
 * 縦位置: 両端揃え
 */
export const clsLayoutAlignYSpaceBetween = 'nws-layout-alignY-spaceBetween';

/**
 * 縦位置: 両端余白あり均等
 */
export const clsLayoutAlignYSpaceAround = 'nws-layout-alignY-spaceAround';

/**
 * 縦位置: 完全均等
 */
export const clsLayoutAlignYSpaceEvenly = 'nws-layout-alignY-spaceEvenly';

/**
 * 子要素の幅調整: なし
 */
export const clsLayoutAdjustXNone = 'nws-layout-adjustX-none';

/**
 * 子要素の幅調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustXFit = 'nws-layout-adjustX-fit';

/**
 * 子要素の幅調整: 伸ばす
 */
export const clsLayoutAdjustXExpand = 'nws-layout-adjustX-grow';

/**
 * 子要素の幅調整: 縮める
 */
export const clsLayoutAdjustXShrink = 'nws-layout-adjustX-shrink';

/**
 * 子要素の高さ調整: なし
 */
export const clsLayoutAdjustYNone = 'nws-layout-adjustY-none';

/**
 * 子要素の高さ調整: 伸ばす & 縮める
 */
export const clsLayoutAdjustYFit = 'nws-layout-adjustY-fit';

/**
 * 子要素の高さ調整: 伸ばす
 */
export const clsLayoutAdjustYExpand = 'nws-layout-adjustY-grow';

/**
 * 子要素の高さ調整: 縮める
 */
export const clsLayoutAdjustYShrink = 'nws-layout-adjustY-shrink';

/**
 * 間隔: 横方向
 */
export const clsLayoutGapX = 'nws-layout-gapX';

/**
 * 間隔: 縦方向
 */
export const clsLayoutGapY = 'nws-layout-gapY';

/**
 * 子要素の幅
 */
export const clsLayoutChildSizeX = 'nws-layout-childSizeX';

/**
 * 子要素の高さ
 */
export const clsLayoutChildSizeY = 'nws-layout-childSizeY';

/**
 * 子要素の縦横比
 */
export const clsLayoutChildRatio = 'nws-layout-childRatio';

/**
 * 子要素の横方向の数
 */
export const clsLayoutChildCountX = 'nws-layout-childCountX';

/**
 * 子要素の縦方向の数
 */
export const clsLayoutChildCountY = 'nws-layout-childCountY';

/**
 * 横方向のテンプレート
 */
export const clsLayoutTemplateX = 'nws-layout-templateX';

/**
 * 縦方向のテンプレート
 */
export const clsLayoutTemplateY = 'nws-layout-templateY';

/**
 * 変数\
 * 間隔: 横方向
 */
export const varLayoutGapX = '--nws-layout-gapX';

/**
 * 変数\
 * 間隔: 縦方向
 */
export const varLayoutGapY = '--nws-layout-gapY';

/**
 * 変数\
 * 子要素の幅
 */
export const varLayoutChildSizeX = '--nws-layout-childSizeX';

/**
 * 変数\
 * 子要素の高さ
 */
export const varLayoutChildSizeY = '--nws-layout-childSizeY';

/**
 * 変数\
 * 子要素の縦横比
 */
export const varLayoutChildRatio = '--nws-layout-childRatio';

/**
 * 変数\
 * 子要素の横方向の数
 */
export const varLayoutChildCountX = '--nws-layout-childCountX';

/**
 * 変数\
 * 子要素の縦方向の数
 */
export const varLayoutChildCountY = '--nws-layout-childCountY';

/**
 * 変数\
 * 横方向のテンプレート
 */
export const varLayoutTemplateX = '--nws-layout-templateX';

/**
 * 変数\
 * 縦方向のテンプレート
 */
export const varLayoutTemplateY = '--nws-layout-templateY';
