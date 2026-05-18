import {
  clsLayoutAdjustXExpand,
  clsLayoutAdjustXFit,
  clsLayoutAdjustXNone,
  clsLayoutAdjustXShrink,
  clsLayoutAdjustYExpand,
  clsLayoutAdjustYFit,
  clsLayoutAdjustYNone,
  clsLayoutAdjustYShrink,
  clsLayoutAlignXCenter,
  clsLayoutAlignXLeft,
  clsLayoutAlignXRight,
  clsLayoutAlignXSpaceAround,
  clsLayoutAlignXSpaceBetween,
  clsLayoutAlignXSpaceEvenly,
  clsLayoutAlignYBottom,
  clsLayoutAlignYMiddle,
  clsLayoutAlignYSpaceAround,
  clsLayoutAlignYSpaceBetween,
  clsLayoutAlignYSpaceEvenly,
  clsLayoutAlignYTop,
  clsLayoutChildSizeX,
  clsLayoutChildSizeY,
  clsLayoutDirectionX,
  clsLayoutDirectionY,
  varLayoutChildSizeX,
  varLayoutChildSizeY,
  varLayoutGapX,
  varLayoutGapY,
  varLayoutTemplateX,
  varLayoutTemplateY,
} from './constants';

/**
 * 整列
 */
export const clsLayoutDirection = {
  x: clsLayoutDirectionX,
  y: clsLayoutDirectionY,
} as const;

/**
 * 横位置・縦位置
 */
export const clsLayoutAlign = {
  x: {
    left: clsLayoutAlignXLeft,
    center: clsLayoutAlignXCenter,
    right: clsLayoutAlignXRight,
    'space-between': clsLayoutAlignXSpaceBetween,
    'space-around': clsLayoutAlignXSpaceAround,
    'space-evenly': clsLayoutAlignXSpaceEvenly,
  },
  y: {
    top: clsLayoutAlignYTop,
    middle: clsLayoutAlignYMiddle,
    bottom: clsLayoutAlignYBottom,
    'space-between': clsLayoutAlignYSpaceBetween,
    'space-around': clsLayoutAlignYSpaceAround,
    'space-evenly': clsLayoutAlignYSpaceEvenly,
  },
} as const;

/**
 * 子要素の幅・高さ調整
 */
export const clsLayoutAdjust = {
  x: {
    none: clsLayoutAdjustXNone,
    fit: clsLayoutAdjustXFit,
    grow: clsLayoutAdjustXExpand,
    shrink: clsLayoutAdjustXShrink,
  },
  y: {
    none: clsLayoutAdjustYNone,
    fit: clsLayoutAdjustYFit,
    grow: clsLayoutAdjustYExpand,
    shrink: clsLayoutAdjustYShrink,
  },
} as const;

/**
 * 子要素の幅・高さ
 */
export const clsLayoutChildSize = {
  x: clsLayoutChildSizeX,
  y: clsLayoutChildSizeY,
} as const;

/**
 * 子要素の幅・高さ
 */
export const varLayoutChildSize = {
  x: varLayoutChildSizeX,
  y: varLayoutChildSizeY,
} as const;

/**
 * 子要素のテンプレート
 */
export const varLayoutTemplate = {
  x: varLayoutTemplateX,
  y: varLayoutTemplateY,
} as const;

/**
 * 間隔
 */
export const varLayoutGap = {
  x: varLayoutGapX,
  y: varLayoutGapY,
} as const;

/**
 * 軸に対するサイズプロパティ
 */
export const cssLayoutAxisSizeProp = {
  x: 'width',
  y: 'height',
} as const;
