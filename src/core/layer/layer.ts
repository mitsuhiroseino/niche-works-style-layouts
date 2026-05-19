import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import { clsLayoutAdjust, clsLayoutAlign } from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import { clsLayoutLayer } from '../constants';
import type { StyleLayout, StyleLayoutResult } from '../types';
import './styles.scss';
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
    className: clsx(
      clsLayoutLayer,
      clsLayoutAlign.x[alignX],
      clsLayoutAlign.y[alignY],
      clsLayoutAdjust.x[adjustX],
      clsLayoutAdjust.y[adjustY],
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
