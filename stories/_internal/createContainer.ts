import type { LooseDictionary } from '@niche-works/types';
import chroma from 'chroma-js';
import type { StyleLayout } from '../../src/types';
import assignStyle from './assignStyle';
import createResizableElement from './createResizableElement';
import toAttributesObj from './toAttributesObj';
import type { DebugOptions } from './types';

function _random(scale: number) {
  const value = Math.random();
  return Math.floor(value * scale);
}

export default function createContainer(
  layout: StyleLayout,
  options: LooseDictionary,
  debugOptions: DebugOptions,
) {
  const { className, style } = layout(toAttributesObj(options));
  const {
    containerWidth = 800,
    containerHeight = 600,
    childCount = 12,
    sizeType = 'none',
    posType = 'none',
  } = toAttributesObj(debugOptions);
  const colors = chroma.scale(['d9ed92', '184e77']).colors(childCount);
  const sizeStyles = (() => {
    const list = Array.from({ length: childCount });
    if (sizeType === 'rand') {
      return list.map(() => ({
        height: _random(100),
        width: _random(200),
      }));
    } else if (sizeType === 'none') {
      return list.map(() => ({}));
    } else {
      return list.map(() => ({
        height: 80,
        width: 120,
      }));
    }
  })();
  const positionStyles = (() => {
    const list = Array.from({ length: childCount });
    if (posType === 'rand') {
      return list.map(() => ({
        top: _random(600),
        left: _random(800),
      }));
    } else if (posType === 'none') {
      return list.map(() => ({}));
    } else {
      return list.map((item, index) => ({
        top: 40 * index,
        left: 40 * index,
      }));
    }
  })();
  const container = document.createElement('div');
  if (className) {
    container.className = className;
  }
  assignStyle(
    container,
    toAttributesObj(
      {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: 'rgba(245, 230, 232, 0.3)',
        resize: 'horizontal',
        ...style,
      },
      { unit: true },
    ),
  );
  colors.forEach((color, index) => {
    const child = document.createElement('div');
    child.innerText = String(index + 1);
    assignStyle(
      child,
      toAttributesObj(
        {
          ...sizeStyles[index],
          ...positionStyles[index],
          backgroundColor: color,
          color: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        { unit: true },
      ),
    );
    container.appendChild(child);
  });

  const { wrapper } = createResizableElement({
    element: container,
    initialWidth: containerWidth,
    initialHeight: containerHeight,
  });
  return wrapper;
}
