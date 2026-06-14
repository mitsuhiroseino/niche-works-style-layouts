import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutPack } from '../_constants';
import applyGap from '../_internal/applyGap';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { PackLayoutOptions } from './types';

/**
 * packレイアウト
 *
 * - 子要素で親要素を満たす
 */
const pack: CreateLayoutStyle<PackLayoutOptions> = (options = {}) => {
  const { direction, gap, gapX, gapY } = maybeDefault(
    options,
    { direction: 'x' },
    { overwriteNull: true },
  );
  const result: LayoutStyle = {
    className: mergeClassName(clsLayoutPack, clsLayout.direction[direction]),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  return result;
};
export default pack;
