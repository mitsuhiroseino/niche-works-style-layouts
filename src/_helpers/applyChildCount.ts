import clsx from 'clsx';
import type { ChildSpacing } from '../_types';
import {
  clsLayoutChildCountX,
  clsLayoutChildCountY,
  varLayoutChildCountX,
  varLayoutChildCountY,
} from '../constants';
import type { LayoutResult } from '../types';
import hasValue from './hasValue';

/**
 * 子要素の数に関する設定の適用
 * @param result
 * @param childCountX
 * @param childCountY
 */
export default function applyChildCount(
  result: LayoutResult,
  childCountX: ChildSpacing,
  childCountY: ChildSpacing,
): void {
  // 子要素の数
  if (hasValue(childCountX)) {
    result.className = clsx(result.className, clsLayoutChildCountX);
    result.style[varLayoutChildCountX] = childCountX;
  }
  if (hasValue(childCountY)) {
    result.className = clsx(result.className, clsLayoutChildCountY);
    result.style[varLayoutChildCountY] = childCountY;
  }
}
