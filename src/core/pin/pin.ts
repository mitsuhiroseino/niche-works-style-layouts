import { clsLayoutPin } from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyChildSize from '../_internal/applyChildSize';
import type { StyleLayout, StyleLayoutResult } from '../types';
import type { PinLayoutOptions } from './types';

/**
 * pinレイアウト
 *
 * - 子要素のtop,left,bottom,rightに従い配置する
 */
const pin: StyleLayout<PinLayoutOptions> = (options = {}) => {
  const { childSizeX, childSizeY, childRatioX, childRatioY } = options;
  const result: StyleLayoutResult = {
    className: clsLayoutPin,
    style: {},
  };

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  // 子要素の縦横比
  applyChildRatio(result, childRatioX, childRatioY);

  return result;
};
export default pin;
