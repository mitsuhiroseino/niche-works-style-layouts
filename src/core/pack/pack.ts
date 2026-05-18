import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import { clsLayoutDirection } from '../_constants';
import applyGap from '../_internal/applyGap';
import { clsLayoutPack } from '../constants';
import type { StyleLayout, StyleLayoutResult } from '../types';
import type { PackLayoutOptions } from './types';

/**
 * packレイアウト
 *
 * - 子要素で親要素を満たす
 */
const pack: StyleLayout<PackLayoutOptions> = (options = {}) => {
  const { direction, gap, gapX, gapY } = maybeDefault(
    options,
    { direction: 'x' },
    { overwriteNull: true },
  );
  const result: StyleLayoutResult = {
    className: clsx(clsLayoutPack, clsLayoutDirection[direction]),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  return result;
};
export default pack;
