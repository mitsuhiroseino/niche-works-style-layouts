import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import { clsLayout, varLayout } from '../_constants';
import applyChildRatio from '../_internal/applyChildRatio';
import applyGap from '../_internal/applyGap';
import hasValue from '../_internal/hasValue';
import mergeLayoutResults from '../_internal/mergeLayoutResults';
import unit from '../_internal/unit';
import type { Adjust, AlignX, AlignY } from '../constants';
import { clsLayoutFlow } from '../constants';
import type { StyleLayout, StyleLayoutResult } from '../types';
import type { FlowLayoutOptions } from './types';

/**
 * flowレイアウト
 *
 * - 子要素を並べて配置し、親要素のサイズに達したら折り返す
 * - stackとの違いは flex-wrap: wrap が常に有効な点
 */
const flow: StyleLayout<FlowLayoutOptions> = (options = {}) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    gap,
    gapX = gap,
    gapY = gap,
    childSizeX,
    childSizeY,
    childRatioX,
    childRatioY,
  } = maybeDefault(
    options,
    {
      direction: 'x',
      alignX: 'left',
      alignY: 'top',
    },
    { overwriteNull: true },
  );

  const result: StyleLayoutResult = {
    className: clsx(
      clsLayoutFlow,
      clsLayout.direction[direction],
      clsLayout.align.x[alignX],
      clsLayout.align.y[alignY],
    ),
    style: {},
  };

  // 間隔の適用
  applyGap(result, gap, gapX, gapY);

  // 子要素の縦横比
  applyChildRatio(result, childRatioX, childRatioY);

  const resultList: StyleLayoutResult[] = [result];

  if (direction === 'x') {
    // 横並びの場合
    // 主軸（横方向）の設定
    resultList.push(_getFlowMainAxisStyle('x', alignX, adjustX, childSizeX));
    // 交差軸（縦方向）の設定
    resultList.push(_getFlowCrossAxisStyle('y', alignY, childSizeY));
  } else {
    // 縦並びの場合
    // 交差軸（横方向）の設定
    resultList.push(_getFlowCrossAxisStyle('x', alignX, childSizeX));
    // 主軸（縦方向）の設定
    resultList.push(_getFlowMainAxisStyle('y', alignY, adjustY, childSizeY));
  }

  return mergeLayoutResults(resultList);
};
export default flow;

/**
 * 主軸方向のスタイル
 *
 * stackの _getStackMainAxisStyle に相当。flowでは主軸の挙動はstackと同じ。
 */
function _getFlowMainAxisStyle(
  axis: 'x' | 'y',
  align: AlignX | AlignY,
  adjust: Adjust,
  childSize: number,
): StyleLayoutResult {
  const result: StyleLayoutResult = {
    className: clsx(
      clsLayout.align[axis][align],
      clsLayout.adjust[axis][adjust],
    ),
  };
  if (hasValue(childSize)) {
    result.className = clsx(result.className, clsLayout.childSize[axis]);
    result.style = { [varLayout.childSize[axis]]: unit(childSize) };
  }

  return result;
}

/**
 * 交差軸方向のスタイル
 *
 * stackの _getStackClossAxisStyle に相当。
 * flowは交差軸方向のadjustはできないため、常にnoneのスタイルを返す
 */
function _getFlowCrossAxisStyle(
  axis: 'x' | 'y',
  align: AlignX | AlignY,
  childSize: number,
): StyleLayoutResult {
  // none
  if (hasValue(childSize)) {
    return {
      className: clsx(clsLayout.align[axis][align], clsLayout.childSize[axis]),
      style: {
        [varLayout.childSize[axis]]: unit(childSize),
      },
    };
  } else {
    return {
      className: clsLayout.align[axis][align],
    };
  }
}
