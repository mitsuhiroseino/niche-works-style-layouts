import maybeDefault from '@niche-works/utils/object/maybeDefault';
import { clsLayout, clsLayoutLayer } from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import mergeClassName from '../_internal/mergeClassName';
import type { StyleLayout, StyleLayoutResult } from '../types';
import type { LayerLayoutOptions } from './types';

/**
 * layerレイアウト
 *
 * - 子要素を重ねて配置する
 * - alignX / alignY で重なる位置を制御する
 * - 子要素の重なり順はDOM順に従う
 */
const layer: StyleLayout<LayerLayoutOptions> = (options = {}) => {
  const {
    alignX,
    alignY,
    adjustX,
    adjustY,
    childSizeX,
    childSizeY,
    childRatioX,
    childRatioY,
  } = maybeDefault(
    options,
    {
      alignX: 'left',
      alignY: 'top',
    },
    { overwriteNull: true },
  );

  const result: StyleLayoutResult = {
    className: mergeClassName(
      clsLayoutLayer,
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
      clsLayout.adjust.x[adjustX],
      clsLayout.adjust.y[adjustY],
    ),
    style: {},
  };

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  // 子要素のアスペクト比
  applyChildRatio(result, childRatioX, childRatioY);

  return result;
};
export default layer;
