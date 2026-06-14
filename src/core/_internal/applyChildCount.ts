import {
  clsLayoutChildCountX,
  clsLayoutChildCountY,
  varLayoutChildCountX,
  varLayoutChildCountY,
} from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';

/**
 * 子要素の数に関する設定の適用
 * @param result
 * @param childCountX
 * @param childCountY
 */
export default function applyChildCount(
  result: LayoutStyle,
  childCountX: number | null | undefined,
  childCountY: number | null | undefined,
): void {
  // 子要素の数
  if (hasValue(childCountX)) {
    result.className = mergeClassName(result.className, clsLayoutChildCountX);
    result.style[varLayoutChildCountX] = `${childCountX}`;
  }
  if (hasValue(childCountY)) {
    result.className = mergeClassName(result.className, clsLayoutChildCountY);
    result.style[varLayoutChildCountY] = `${childCountY}`;
  }
}
