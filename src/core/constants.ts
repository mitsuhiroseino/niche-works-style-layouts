/**
 * 整列方向
 *
 * - x: 横方向
 * - y: 縦方向
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
