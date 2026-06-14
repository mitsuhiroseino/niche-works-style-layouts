import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutBalance } from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import applyGap from '../_internal/applyGap';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { BalanceLayoutOptions } from './types';

/**
 * balanceレイアウト
 *
 * - 子要素を均等に配置する
 * - `adjust`が効いていない場合は、子要素のサイズを維持したまま、余白を均等に配分する
 * - `adjust`が効いている場合は、子要素のサイズを調整してコンテナを満たす
 */
const balance: CreateLayoutStyle<BalanceLayoutOptions> = (options = {}) => {
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
  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutBalance,
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
export default balance;
