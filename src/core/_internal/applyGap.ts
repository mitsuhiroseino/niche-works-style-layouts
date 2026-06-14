import {
  clsLayoutGapX,
  clsLayoutGapY,
  varLayoutGapX,
  varLayoutGapY,
} from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import mergeClassName from './mergeClassName';
import unit from './unit';

/**
 * スペーシングに関する設定の適用
 * @param result
 * @param gap
 * @param gapX
 * @param gapY
 */
export default function applyGap(
  result: LayoutStyle,
  gap: number | null | undefined,
  gapX: number | null | undefined,
  gapY: number | null | undefined,
): void {
  gapX = gapX ?? gap;
  if (hasValue(gapX)) {
    // 横方向のスペーシング
    result.className = mergeClassName(result.className, clsLayoutGapX);
    result.style[varLayoutGapX] = unit(gapX);
  }
  gapY = gapY ?? gap;
  if (hasValue(gapY)) {
    // 縦方向のスペーシング
    result.className = mergeClassName(result.className, clsLayoutGapY);
    result.style[varLayoutGapY] = unit(gapY);
  }
}
