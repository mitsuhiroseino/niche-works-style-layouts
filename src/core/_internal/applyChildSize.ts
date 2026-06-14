import {
  clsLayoutChildSizeX,
  clsLayoutChildSizeY,
  varLayoutChildSizeX,
  varLayoutChildSizeY,
} from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';
import unit from './unit';

/**
 * 子要素のサイズに関する設定の適用
 * @param result
 * @param childSizeX
 * @param childSizeY
 */
export default function applyChildSize(
  result: LayoutStyle,
  childSizeX: number | null | undefined,
  childSizeY: number | null | undefined,
): void {
  // 子要素のサイズ
  if (hasValue(childSizeX)) {
    result.className = mergeClassName(result.className, clsLayoutChildSizeX);
    result.style[varLayoutChildSizeX] = unit(childSizeX);
  }
  if (hasValue(childSizeY)) {
    result.className = mergeClassName(result.className, clsLayoutChildSizeY);
    result.style[varLayoutChildSizeY] = unit(childSizeY);
  }
}
