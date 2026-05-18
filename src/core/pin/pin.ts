import applyChildSize from '../_internal/applyChildSize';
import { clsLayoutPin } from '../constants';
import type { StyleLayout, StyleLayoutResult } from '../types';
import type { PinLayoutOptions } from './types';

/**
 * pinレイアウト
 *
 * - 子要素のtop,left,bottom,rightに従い配置する
 */
const pin: StyleLayout<PinLayoutOptions> = (options = {}) => {
  const { childSizeX, childSizeY } = options;
  const result: StyleLayoutResult = {
    className: clsLayoutPin,
    style: {},
  };

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  return result;
};
export default pin;
