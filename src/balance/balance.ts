import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import {
  clsLayoutAdjust,
  clsLayoutAlign,
  clsLayoutDirection,
} from '../_constants';
import applyChildSize from '../_helpers/applyChildSize';
import applySpacing from '../_helpers/applySpacing';
import { clsLayoutBalance } from '../constants';
import type { CreateLayout, LayoutResult } from '../types';
import type { BalanceLayoutOptions } from './types';

/**
 * balanceレイアウト
 *
 * - 子要素を均等に配置する
 */
const balance: CreateLayout<BalanceLayoutOptions> = (options = {}) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    spacing,
    spacingX,
    spacingY,
    childSizeX,
    childSizeY,
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
  const result: LayoutResult = {
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
  applySpacing(result, spacing, spacingX, spacingY);

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  return result;
};
export default balance;
