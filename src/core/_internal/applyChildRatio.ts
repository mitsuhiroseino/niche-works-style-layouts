import clsx from 'clsx';
import { clsLayoutChildRatio, varLayoutChildRatio } from '../constants';
import type { StyleLayoutResult } from '../types';
import hasValue from './hasValue';

/**
 * 子要素の縦横比に関する設定の適用
 * @param result
 * @param childRatioX
 * @param childRatioY
 */
export default function applyChildRatio(
  result: StyleLayoutResult,
  childRatioX: number | null | undefined,
  childRatioY: number | null | undefined,
): void {
  // 子要素の縦横比
  if (hasValue(childRatioX) || hasValue(childRatioY)) {
    result.className = clsx(result.className, clsLayoutChildRatio);
    result.style[varLayoutChildRatio] =
      `${childRatioX ?? 1} / ${childRatioY ?? 1}`;
  }
}
