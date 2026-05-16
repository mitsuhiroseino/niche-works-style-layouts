import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import { clsLayoutDirection } from '../_constants';
import applySpacing from '../_helpers/applySpacing';
import { clsLayoutPack } from '../constants';
import type { CreateLayout, LayoutResult } from '../types';
import type { PackLayoutOptions } from './types';

/**
 * packレイアウト
 *
 * - 子要素で親要素を満たす
 */
const pack: CreateLayout<PackLayoutOptions> = (options = {}) => {
  const { direction, spacing, spacingX, spacingY } = maybeDefault(
    options,
    { direction: 'x' },
    { overwriteNull: true },
  );
  const result: LayoutResult = {
    className: clsx(clsLayoutPack, clsLayoutDirection[direction]),
    style: {},
  };

  // 間隔の適用
  applySpacing(result, spacing, spacingX, spacingY);

  return result;
};
export default pack;
