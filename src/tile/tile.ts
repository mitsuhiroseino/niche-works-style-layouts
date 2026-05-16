import maybeDefault from '@niche-works/utils/object/maybeDefault';
import clsx from 'clsx';
import {
  clsLayoutAdjust,
  clsLayoutAlign,
  clsLayoutDirection,
} from '../_constants';
import applyChildSize from '../_helpers/applyChildSize';
import applySpacing from '../_helpers/applySpacing';
import hasValue from '../_helpers/hasValue';
import mergeLayoutResults from '../_helpers/mergeLayoutResults';
import unit from '../_helpers/unit';
import type { ChildSize } from '../_types';
import type { Adjust, Direction } from '../constants';
import {
  clsLayoutTile,
  varLayoutAutoTracX,
  varLayoutAutoTracY,
  varLayoutTemplateX,
  varLayoutTemplateY,
} from '../constants';
import type { CreateLayout, LayoutResult } from '../types';
import type { TileLayoutOptions } from './types';

/**
 * tileレイアウト
 *
 * - 子要素の高さ・幅を基準にして格子状に並べる
 * - 親要素のサイズが子要素に依存していないことを前提とする
 */
const tile: CreateLayout<TileLayoutOptions> = (options = {}) => {
  const {
    direction,
    alignX,
    alignY,
    adjustX,
    adjustY,
    spacing,
    spacingX,
    spacingY,
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
    className: clsx(
      clsLayoutTile,
      clsLayoutDirection[direction],
      clsLayoutAlign.x[alignX],
      clsLayoutAlign.y[alignY],
      clsLayoutAdjust.x[adjustX],
      clsLayoutAdjust.y[adjustY],
    ),
    style: {},
  };

  // 間隔の適用
  applySpacing(result, spacing, spacingX, spacingY);

  // 子要素のサイズ
  applyChildSize(result, childSizeX, childSizeY);

  return mergeLayoutResults([
    result,
    _getLayoutResultByDirection[direction](options),
  ]);
};
export default tile;

/**
 * 並べる方向によるスタイル
 */
const _getLayoutResultByDirection: {
  [direction in Direction]: (options: TileLayoutOptions) => LayoutResult;
} = {
  x: ({ adjustX, adjustY, childSizeX, childSizeY }) => {
    return mergeLayoutResults([
      _getGridMainAxisTemplate(adjustX, childSizeX, varLayoutTemplateX),
      _getGridClossAxisAuto(adjustY, childSizeY, varLayoutAutoTracY),
    ]);
  },
  y: ({ adjustX, adjustY, childSizeY, childSizeX }) => {
    return mergeLayoutResults([
      _getGridClossAxisAuto(adjustX, childSizeX, varLayoutAutoTracX),
      _getGridMainAxisTemplate(adjustY, childSizeY, varLayoutTemplateY),
    ]);
  },
};

/**
 * direction方向の子要素のサイズを指定するためのテンプレート
 * @param align 子要素の配置
 * @param childSize 子要素のサイズ
 * @returns
 */
function _getGridMainAxisTemplate(
  adjust: Adjust,
  childSize: ChildSize,
  varName: string,
): LayoutResult {
  const hasChildSize = hasValue(childSize);
  const style: LayoutResult['style'] = {};
  if (adjust === 'fit') {
    // fit
    if (hasChildSize) {
      style[varName] =
        `repeat(auto-fit, minmax(clamp(0px, 100%, ${unit(childSize)}), 1fr))`;
    } else {
      style[varName] = 'repeat(auto-fit, minmax(0, 1fr))';
    }
  } else if (adjust === 'grow') {
    // grow
    if (hasChildSize) {
      style[varName] = `repeat(auto-fit, minmax(${unit(childSize)}, 1fr))`;
    } else {
      style[varName] = 'repeat(auto-fit, minmax(0, 1fr))';
    }
  } else if (adjust === 'shrink') {
    // shrink
    if (hasChildSize) {
      style[varName] = `repeat(auto-fit, minmax(0, ${unit(childSize)}))`;
    } else {
      style[varName] = 'repeat(auto-fit, minmax(0, 1fr))';
    }
  } else {
    // none
    if (hasChildSize) {
      style[varName] = `repeat(auto-fit, ${unit(childSize)})`;
    } else {
      style[varName] = 'repeat(auto-fit, minmax(max-content, 100%))';
    }
  }

  return { style };
}

/**
 * 交差軸方向
 * @param adjust
 * @param childSize
 * @returns
 */
function _getGridClossAxisAuto(
  adjust: Adjust,
  childSize: ChildSize,
  varName: string,
): LayoutResult {
  const hasChildSize = hasValue(childSize);
  const style: LayoutResult['style'] = {};
  if (adjust === 'fit') {
    // fit
    if (hasChildSize) {
      style[varName] = `minmax(0, 100%)`;
    } else {
      style[varName] = `minmax(0, 100%)`;
    }
  } else if (adjust === 'grow') {
    // grow
    if (hasChildSize) {
      style[varName] = `minmax(${unit(childSize)}, 100%)`;
    } else {
      style[varName] = `minmax(auto, 100%)`;
    }
  } else if (adjust === 'shrink') {
    // shrink
    if (hasChildSize) {
      style[varName] = `minmax(0, ${unit(childSize)})`;
    } else {
      style[varName] = `minmax(0, auto)`;
    }
  }

  return { style };
}
