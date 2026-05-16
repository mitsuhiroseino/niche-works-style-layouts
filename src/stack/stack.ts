import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import {
  clsLayoutAdjust,
  clsLayoutAlign,
  clsLayoutChildSize,
  clsLayoutDirection,
  cssLayoutAxisSizeProp,
  varLayoutChildSize,
} from '../_constants';
import applySpacing from '../_helpers/applySpacing';
import hasValue from '../_helpers/hasValue';
import mergeLayoutResults from '../_helpers/mergeLayoutResults';
import unit from '../_helpers/unit';
import type { ChildSize } from '../_types';
import type { Adjust, AlignX, AlignY, Direction } from '../constants';
import { clsLayoutStack } from '../constants';
import type { CreateLayout, LayoutResult } from '../types';
import type { StackLayoutOptions } from './types';

/**
 * stackレイアウト
 *
 * - 子要素を並べて配置する
 */
const stack: CreateLayout<StackLayoutOptions> = (options = {}) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    spacing,
    spacingX = spacing,
    spacingY = spacing,
    childSizeX,
    childSizeY,
  } = maybeDefault(
    options,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
    },
    { overwriteNull: true },
  );

  const result: LayoutResult = {
    // 基本的なクラス
    className: clsx(
      clsLayoutStack,
      clsLayoutDirection[direction],
      clsLayoutAlign.x[alignX],
      clsLayoutAlign.y[alignY],
    ),
    style: {},
  };

  // 間隔の適用
  applySpacing(result, spacing, spacingX, spacingY);

  const resultList: LayoutResult[] = [result];

  if (direction === 'x') {
    // 横並びの場合
    // 主軸(横方向)の設定
    resultList.push(_getStackMainAxisStyle('x', alignX, adjustX, childSizeX));
    // 交差軸(縦方向)の設定
    resultList.push(_getStackClossAxisStyle('y', alignY, adjustY, childSizeY));
  } else {
    // 縦並びの場合
    // 主軸(縦方向)の設定
    resultList.push(_getStackClossAxisStyle('x', alignX, adjustX, childSizeX));
    // 交差軸(横方向)の設定
    resultList.push(_getStackMainAxisStyle('y', alignY, adjustY, childSizeY));
  }

  // 全てのクラス&スタイルを統合
  return mergeLayoutResults(resultList);
};
export default stack;

/**
 * 主軸方向のスタイル
 * @param axis 横 or 縦
 * @param align 位置
 * @param adjust 子要素のサイズの調整
 * @param childSize 子要素のサイズ
 * @returns スタイル
 */
function _getStackMainAxisStyle(
  axis: Direction,
  align: AlignY | AlignX,
  adjust: Adjust,
  childSize: ChildSize,
): LayoutResult {
  const result: LayoutResult = {
    className: clsx(clsLayoutAlign[axis][align], clsLayoutAdjust[axis][adjust]),
  };
  if (hasValue(childSize)) {
    // 高さ or 幅の指定あり
    result.className = clsx(result.className, clsLayoutChildSize[axis]);
    result.style = { [varLayoutChildSize[axis]]: unit(childSize) };
  }

  return result;
}

/**
 * 交差軸方向のクラス
 * @param axis 横 or 縦
 * @param align 位置
 * @param adjust 子要素のサイズの調整
 * @param childSize 子要素のサイズ
 * @returns スタイル
 */
function _getStackClossAxisStyle(
  axis: Direction,
  align: AlignY | AlignX,
  adjust: Adjust,
  childSize: ChildSize,
): LayoutResult {
  if (adjust === 'fit') {
    // fit
    return {
      className: clsx(
        clsLayoutAlign[axis][align],
        clsLayoutAdjust[axis][adjust],
      ),
      style: {
        [`min-${cssLayoutAxisSizeProp[axis]}`]: '100%',
        [varLayoutChildSize[axis]]: `min(0, 100%)`,
      },
    };
  } else if (adjust === 'grow') {
    // grow
    const result: LayoutResult = {
      className: clsx(
        clsLayoutAlign[axis][align],
        clsLayoutAdjust[axis][adjust],
      ),
      style: {
        [`min-${cssLayoutAxisSizeProp[axis]}`]: '100%',
      },
    };
    if (hasValue(childSize)) {
      // 高さ or 幅の指定あり
      result.className = clsx(result.className, clsLayoutChildSize[axis]);
      result.style[varLayoutChildSize[axis]] = unit(childSize);
    }
    return result;
  } else if (adjust === 'shrink') {
    // shrink
    const result: LayoutResult = {
      className: clsx(
        clsLayoutAlign[axis][align],
        clsLayoutAdjust[axis][adjust],
      ),
    };
    if (hasValue(childSize)) {
      // 高さ or 幅の指定あり
      result.className = clsx(result.className, clsLayoutChildSize[axis]);
      result.style = {
        [varLayoutChildSize[axis]]: `min(${unit(childSize)}, 100%)`,
      };
    }
    return result;
  } else {
    // none
    if (hasValue(childSize)) {
      // 指定のサイズ
      return {
        className: clsx(clsLayoutAlign[axis][align], clsLayoutChildSize[axis]),
        style: {
          [varLayoutChildSize[axis]]: unit(childSize),
        },
      };
    } else {
      // 指定なし
      return {
        className: clsx(clsLayoutAlign[axis][align]),
      };
    }
  }
}
