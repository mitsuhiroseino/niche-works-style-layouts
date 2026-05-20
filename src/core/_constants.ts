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
  clsLayoutTemplateX,
  clsLayoutTemplateY,
  varLayoutChildSizeX,
  varLayoutChildSizeY,
  varLayoutGapX,
  varLayoutGapY,
  varLayoutTemplateX,
  varLayoutTemplateY,
} from './constants';

/**
 * axis毎のクラス
 */
export const clsLayout = {
  direction: {
    x: clsLayoutDirectionX,
    y: clsLayoutDirectionY,
  },
  align: {
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
  },
  adjust: {
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
  },
  childSize: {
    x: clsLayoutChildSizeX,
    y: clsLayoutChildSizeY,
  },
  template: {
    x: clsLayoutTemplateX,
    y: clsLayoutTemplateY,
  },
} as const;

/**
 * axis毎の変数
 */
export const varLayout = {
  childSize: {
    x: varLayoutChildSizeX,
    y: varLayoutChildSizeY,
  },
  template: {
    x: varLayoutTemplateX,
    y: varLayoutTemplateY,
  },
  gap: {
    x: varLayoutGapX,
    y: varLayoutGapY,
  },
};
