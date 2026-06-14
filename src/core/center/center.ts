import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutCenter } from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import applyGap from '../_internal/applyGap';
import mergeClassName from '../_internal/mergeClassName';
import type { CreateLayoutStyle, LayoutStyle } from '../types';
import type { CenterLayoutOptions } from './types';

/**
 * centerレイアウト
 *
 * - 子要素を中央に配置する
 * - 親要素が子要素のサイズよりも小さくなっても左上が親要素内に収まる
 */
const center: CreateLayoutStyle<CenterLayoutOptions> = (options = {}) => {
  const {
    direction,
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
    },
    { overwriteNull: true },
  );

  const result: LayoutStyle = {
    className: mergeClassName(
      clsLayoutCenter,
      clsLayout.direction[direction],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  // 子要素のアスペクト比
  applyChildRatio(result, childRatioX, childRatioY);

  return result;
};
export default center;
