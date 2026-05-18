import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import {
  clsLayoutAdjust,
  clsLayoutAlign,
  clsLayoutDirection,
} from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import applyGap from '../_internal/applyGap';
import { clsLayoutBalance } from '../constants';
import type { StyleLayout, StyleLayoutResult } from '../types';
import type { BalanceLayoutOptions } from './types';

/**
 * balanceレイアウト
 *
 * - 子要素を均等に配置する
 */
const balance: StyleLayout<BalanceLayoutOptions> = (options = {}) => {
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
    {
      overwriteNull: true,
    },
  );
  const result: StyleLayoutResult = {
    className: clsx(
      clsLayoutBalance,
      clsLayoutDirection[direction],
      clsLayoutAlign.x[alignX],
      clsLayoutAlign.y[alignY],
      clsLayoutAdjust.x[adjustX],
      clsLayoutAdjust.y[adjustY],
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
export default balance;
