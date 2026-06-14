import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutTile } from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import applyGap from '../_internal/applyGap';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { TileLayoutOptions } from './types';

/**
 * tileレイアウト
 *
 * - 子要素の高さ・幅を基準にして格子状に並べる
 * - 親要素のサイズが子要素に依存していないことを前提とする
 */
const tile: CreateLayoutStyle<TileLayoutOptions> = (options = {}) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    gap,
    gapX,
    gapY,
    childSizeX,
    childSizeY,
    childRatioX,
    childRatioY,
  } = maybeDefault(
    options,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
    },
    { overwriteNull: true },
  );

  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutTile,
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

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  // 子要素の縦横比
  applyChildRatio(result, childRatioX, childRatioY);

  return result;
};
export default tile;
