import { clsLayoutChildRatio, varLayoutChildRatio } from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';

/**
 * 子要素の縦横比に関する設定の適用
 * @param result
 * @param childRatioX
 * @param childRatioY
 */
export default function applyChildRatio(
  result: LayoutStyle,
  childRatioX: number | null | undefined,
  childRatioY: number | null | undefined,
): void {
  // 子要素の縦横比
  if (hasValue(childRatioX) || hasValue(childRatioY)) {
    result.className = mergeClassName(result.className, clsLayoutChildRatio);
    result.style[varLayoutChildRatio] =
      `${childRatioX ?? 1} / ${childRatioY ?? 1}`;
  }
}
