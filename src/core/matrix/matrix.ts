import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import { clsLayout, varLayout } from '../_constants';
import applyChildCount from '../_internal/applyChildCount';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import applyGap from '../_internal/applyGap';
import mergeLayoutResults from '../_internal/mergeLayoutResults';
import unit from '../_internal/unit';
import type {
  AdjustOptions,
  AlignOptions,
  ChildCountOptions,
  ChildRatioOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
  TracksOptions,
} from '../_types';
import { Adjust, clsLayoutMatrix } from '../constants';
import type { StyleLayout, StyleLayoutResult } from '../types';
import type { MatrixLayoutOptions } from './types';

type MatrixLayoutInternalOptions = DirectionOptions &
  AlignOptions &
  AdjustOptions &
  GapOptions &
  ChildCountOptions &
  TracksOptions &
  ChildSizeOptions &
  ChildRatioOptions;

/**
 * matrixレイアウト
 *
 * - 子要素の縦の数、横の数を基準にして格子状に配置する
 */
const matrix: StyleLayout<MatrixLayoutOptions> = (options) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    gap,
    gapX = gap,
    gapY = gap,
    childSizeX,
    childSizeY,
    childRatioX,
    childRatioY,
    childCountX,
    childCountY,
    tracksX,
    tracksY,
  } = maybeDefault(
    options as MatrixLayoutInternalOptions,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
    },
    { overwriteNull: true },
  );
  let result: StyleLayoutResult = {
    className: clsx(
      clsLayoutMatrix,
      clsLayout.direction[direction],
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素の縦横比
  applyChildRatio(result, childRatioX, childRatioY);

  let sizeX;
  let sizeY;
  let countX;
  let countY;
  let trxX;
  let trxY;
  if (Array.isArray(tracksX)) {
    trxX = tracksX;
  } else {
    sizeX = childSizeX;
    countX = childCountX;
  }
  if (Array.isArray(tracksY)) {
    trxY = tracksY;
  } else {
    sizeY = childSizeY;
    countY = childCountY;
  }

  // 子要素のサイズ
  applyChildSize(result, sizeX, sizeY);

  // 子要素の数
  applyChildCount(result, countX, countY);

  if (trxX) {
    // 横方向のテンプレート
    result = mergeLayoutResults([result, _getTemplate('x', adjustX, trxX)]);
  }
  if (trxY) {
    // 縦方向のテンプレート
    result = mergeLayoutResults([result, _getTemplate('y', adjustY, trxY)]);
  }

  return result;
};
export default matrix;

/**
 * gridTemplateColumns / gridTemplateRowsを生成する
 * @param axis 軸
 * @param adjust 子要素のサイズ調整
 * @param childSize 子要素のサイズ
 * @param childCount 子要素数
 * @param tracks 子要素数 & サイズ
 * @returns
 */
function _getTemplate(
  axis: 'x' | 'y',
  adjust: Adjust,
  tracks: (string | number)[],
): StyleLayoutResult {
  // 子要素数 & サイズが指定されている場合
  // px列の合計を計算
  const pxTotal = tracks.reduce<number>((sum, value) => {
    const px = _extractPx(value);
    return px !== null ? sum + px : sum;
  }, 0);
  // テンプレート作成
  const template = tracks
    .map((value) =>
      _applyAdjustToTrack(axis, adjust, value, tracks.length, pxTotal),
    )
    .join(' ');

  return {
    className: clsLayout.template[axis],
    style: { [varLayout.template[axis]]: template },
  };
}

/**
 * tracksX/tracksYの各トラック値にadjustを適用する
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
      const trackSize = `calc((100% - var(${varLayout.gap[axis]}) * ${childCount - 1}) * ${pxValue} / ${pxTotal})`;
      return `minmax(0, max(${trackSize}, ${childSize}))`;
    }
    return isFr ? childSize : `minmax(0, ${childSize})`;
  } else if (adjust === 'grow') {
    // grow
    if (isPx && pxTotal > 0) {
      return `minmax(${childSize}, calc(${pxValue} / ${pxTotal} * (100% - var(${varLayout.gap[axis]}) * ${childCount - 1})))`;
    }
    return isFr ? childSize : `minmax(${childSize}, 1fr)`;
  } else if (adjust === 'shrink') {
    // shrink
    if (isPx && pxTotal > 0) {
      const trackSize = `calc((100% - var(${varLayout.gap[axis]}) * ${childCount - 1}) * ${pxValue} / ${pxTotal})`;
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
