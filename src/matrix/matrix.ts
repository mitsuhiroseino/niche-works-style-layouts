import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import {
  clsLayoutAdjust,
  clsLayoutAlign,
  clsLayoutDirection,
  varLayoutSpacing,
  varLayoutTemplate,
} from '../_constants';
import applySpacing from '../_helpers/applySpacing';
import hasValue from '../_helpers/hasValue';
import mergeLayoutResults from '../_helpers/mergeLayoutResults';
import unit from '../_helpers/unit';
import type {
  AdjustOptions,
  AlignOptions,
  ChildCountOptions,
  ChildOptions,
  ChildSize,
  ChildSizeOptions,
  DirectionOptions,
  SpacingOptions,
} from '../_types';
import { Adjust, clsLayoutMatrix } from '../constants';
import type { CreateLayout, LayoutResult } from '../types';
import type { MatrixLayoutOptions } from './types';

type MatrixLayoutInternalOptions = AdjustOptions &
  AlignOptions &
  ChildCountOptions &
  ChildOptions &
  ChildSizeOptions &
  DirectionOptions &
  SpacingOptions;

/**
 * matrixレイアウト
 *
 * - 子要素の縦の数、横の数を基準にして格子状に配置する
 */
const matrix: CreateLayout<MatrixLayoutOptions> = (options) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    spacing,
    spacingX = spacing,
    spacingY = spacing,
    childSizeX,
    childSizeY,
    childCountX,
    childCountY,
    childX,
    childY,
  } = maybeDefault(
    options as MatrixLayoutInternalOptions,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
    },
    { overwriteNull: true },
  );
  const result: LayoutResult = {
    className: clsx(
      clsLayoutMatrix,
      clsLayoutDirection[direction],
      clsLayoutAlign.x[alignX],
      clsLayoutAlign.y[alignY],
      clsLayoutAdjust.x[adjustX],
      clsLayoutAdjust.y[adjustY],
    ),
    style: {},
  };

  // 間隔の適用
  applySpacing(result, spacing, spacingX, spacingY);

  return mergeLayoutResults([
    result,
    _getGridTemplate('x', adjustX, childSizeX, childCountX, childX),
    _getGridTemplate('y', adjustY, childSizeY, childCountY, childY),
  ]);
};
export default matrix;

/**
 * gridTemplateColumns / gridTemplateRowsを生成する
 * @param axis 軸
 * @param adjust 子要素のサイズ調整
 * @param childSize 子要素のサイズ
 * @param childCount 子要素数
 * @param child 子要素数 & サイズ
 * @returns
 */
function _getGridTemplate(
  axis: 'x' | 'y',
  adjust: Adjust,
  childSize: ChildSize,
  childCount: number,
  child: (string | number)[],
): LayoutResult {
  let template: string;

  if (Array.isArray(child)) {
    // 子要素数 & サイズが指定されている場合
    // px列の合計を計算
    const pxTotal = child.reduce<number>((sum, value) => {
      const px = _extractPx(value);
      return px !== null ? sum + px : sum;
    }, 0);
    // テンプレート作成
    template = child
      .map((value) =>
        _applyAdjustToTrack(axis, adjust, value, child.length, pxTotal),
      )
      .join(' ');
  } else {
    // 上記以外の場合
    const hasChildSize = hasValue(childSize);
    const hasCount = hasValue(childCount);
    if (adjust === 'fit') {
      // fit
      if (hasChildSize && hasCount) {
        const trackSize = `calc((100% - var(${varLayoutSpacing[axis]}) * (${childCount} - 1)) / ${childCount})`;
        template = `repeat(${childCount}, minmax(clamp(0px, ${trackSize}, ${unit(childSize)}), 1fr))`;
      } else if (hasChildSize) {
        template = `repeat(auto-fit, minmax(clamp(0px, 100%, ${unit(childSize)}), 1fr))`;
      } else if (hasCount) {
        template = `repeat(${childCount}, 1fr)`;
      } else {
        template = 'repeat(auto-fit, 1fr)';
      }
    } else if (adjust === 'grow') {
      // grow
      if (hasChildSize && hasCount) {
        template = `repeat(${childCount}, minmax(${unit(childSize)}, 1fr))`;
      } else if (hasChildSize) {
        template = `repeat(auto-fit, minmax(${unit(childSize)}, 1fr))`;
      } else if (hasCount) {
        template = `repeat(${childCount}, 1fr)`;
      } else {
        template = 'repeat(auto-fit, 1fr)';
      }
    } else if (adjust === 'shrink') {
      // shrink
      if (hasChildSize && hasCount) {
        template = `repeat(${childCount}, minmax(0, ${unit(childSize)}))`;
      } else if (hasChildSize) {
        template = `repeat(auto-fit, minmax(0, ${unit(childSize)}))`;
      } else if (hasCount) {
        template = `repeat(${childCount}, auto)`;
      } else {
        template = 'repeat(auto-fit, auto)';
      }
    } else {
      // none
      if (hasChildSize && hasCount) {
        template = `repeat(${childCount}, ${unit(childSize)})`;
      } else if (hasChildSize) {
        template = `repeat(auto-fit, ${unit(childSize)})`;
      } else if (hasCount) {
        template = `repeat(${childCount}, auto)`;
      } else {
        template = 'repeat(auto-fit, auto)';
      }
    }
  }

  return { style: { [varLayoutTemplate[axis]]: template } };
}

/**
 * childX/childYの各トラック値にadjustを適用する
 * fr単位の値はminmax()のminに使えないため特別扱いになり、
 * 伸縮の比率には影響しない
 */
function _applyAdjustToTrack(
  axis: 'x' | 'y',
  adjust: Adjust,
  size: string | number,
  childCount: number,
  pxTotal: number,
): string {
  const childSize = unit(size);
  const isFr = typeof size === 'string' && size.trim().endsWith('fr');
  const pxValue = _extractPx(size);
  const isPx = pxValue !== null;

  if (adjust === 'fit') {
    // fit
    if (isPx && pxTotal > 0) {
      const trackSize = `calc((100% - var(${varLayoutSpacing[axis]}) * (${childCount} - 1)) * ${pxValue} / ${pxTotal})`;
      return `minmax(0, max(${trackSize}, ${childSize}))`;
    }
    return isFr ? childSize : `minmax(0, ${childSize})`;
  } else if (adjust === 'grow') {
    // grow
    if (isPx && pxTotal > 0) {
      return `minmax(${childSize}, calc(${pxValue} / ${pxTotal} * (100% - var(${varLayoutSpacing[axis]}) * (${childCount} - 1))))`;
    }
    return isFr ? childSize : `minmax(${childSize}, 1fr)`;
  } else if (adjust === 'shrink') {
    // shrink
    if (isPx && pxTotal > 0) {
      const trackSize = `calc((100% - var(${varLayoutSpacing[axis]}) * (${childCount} - 1)) * ${pxValue} / ${pxTotal})`;
      return `minmax(0, min(${trackSize}, ${childSize}))`;
    }
    return isFr ? childSize : `minmax(0, ${childSize})`;
  }
  return childSize;
}

/**
 * px値を数値として抽出する
 * px以外の単位はnullを返す
 */
function _extractPx(childSize: string | number): number | null {
  if (typeof childSize === 'number') {
    return childSize;
  }
  const match = childSize.trim().match(/^([\d.]+)px$/);
  return match ? parseFloat(match[1]) : null;
}
