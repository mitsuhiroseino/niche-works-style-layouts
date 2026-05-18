import clsx from 'clsx';
import {
  clsLayoutGapX,
  clsLayoutGapY,
  varLayoutGapX,
  varLayoutGapY,
} from '../constants';
import type { StyleLayoutResult } from '../types';
import hasValue from './hasValue';
import unit from './unit';

/**
 * スペーシングに関する設定の適用
 * @param result
 * @param gap
 * @param gapX
 * @param gapY
 */
export default function applyGap(
  result: StyleLayoutResult,
  gap: number,
  gapX: number,
  gapY: number,
): void {
  gapX = gapX ?? gap;
  if (hasValue(gapX)) {
    // 横方向のスペーシング
    result.className = clsx(result.className, clsLayoutGapX);
    result.style[varLayoutGapX] = unit(gapX);
  }
  gapY = gapY ?? gap;
  if (hasValue(gapY)) {
    // 縦方向のスペーシング
    result.className = clsx(result.className, clsLayoutGapY);
    result.style[varLayoutGapY] = unit(gapY);
  }
}
