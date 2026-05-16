import applyChildSize from '../_helpers/applyChildSize';
import { clsLayoutPin } from '../constants';
import type { CreateLayout, LayoutResult } from '../types';
import type { PinLayoutOptions } from './types';

/**
 * pinレイアウト
 *
 * - 子要素のtop,left,bottom,rightに従い配置する
 */
const pin: CreateLayout<PinLayoutOptions> = (options = {}) => {
  const { childSizeX, childSizeY } = options;
  const result: LayoutResult = {
    className: clsLayoutPin,
    style: {},
  };

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  return result;
};
export default pin;
