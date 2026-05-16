import clsx from 'clsx';
import type { ChildSpacing } from '../_types';
import {
  clsLayoutSpacingX,
  clsLayoutSpacingY,
  varLayoutSpacingX,
  varLayoutSpacingY,
} from '../constants';
import type { LayoutResult } from '../types';
import hasValue from './hasValue';
import unit from './unit';

/**
 * スペーシングに関する設定の適用
 * @param result
 * @param spacing
 * @param spacingX
 * @param spacingY
 */
export default function applySpacing(
  result: LayoutResult,
  spacing: ChildSpacing,
  spacingX: ChildSpacing,
  spacingY: ChildSpacing,
): void {
  spacingX = spacingX ?? spacing;
  if (hasValue(spacingX)) {
    // 横方向のスペーシング
    result.className = clsx(result.className, clsLayoutSpacingX);
    result.style[varLayoutSpacingX] = unit(spacingX);
  }
  spacingY = spacingY ?? spacing;
  if (hasValue(spacingY)) {
    // 縦方向のスペーシング
    result.className = clsx(result.className, clsLayoutSpacingY);
    result.style[varLayoutSpacingY] = unit(spacingY);
  }
}
