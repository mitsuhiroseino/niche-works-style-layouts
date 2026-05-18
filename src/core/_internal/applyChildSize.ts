import clsx from 'clsx';
import {
  clsLayoutChildSizeX,
  clsLayoutChildSizeY,
  varLayoutChildSizeX,
  varLayoutChildSizeY,
} from '../constants';
import type { StyleLayoutResult } from '../types';
import hasValue from './hasValue';
import unit from './unit';

/**
 * 子要素のサイズに関する設定の適用
 * @param result
 * @param childSizeX
 * @param childSizeY
 */
export default function applyChildSize(
  result: StyleLayoutResult,
  childSizeX: number,
  childSizeY: number,
): void {
  // 子要素のサイズ
  if (hasValue(childSizeX)) {
    result.className = clsx(result.className, clsLayoutChildSizeX);
    result.style[varLayoutChildSizeX] = unit(childSizeX);
  }
  if (hasValue(childSizeY)) {
    result.className = clsx(result.className, clsLayoutChildSizeY);
    result.style[varLayoutChildSizeY] = unit(childSizeY);
  }
}
