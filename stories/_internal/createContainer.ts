import type { LooseDictionary } from '@niche-works/types';
import chroma from 'chroma-js';
import type { StyleLayout } from '../../src/types';
import assignStyle from './assignStyle';
import { CONTAINER_STYLE } from './constants';
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
    containerWidth = CONTAINER_STYLE.width,
    containerHeight = CONTAINER_STYLE.height,
    childCount = 12,
    sizeType = 'none',
    posType = 'none',
    overflow = 'hidden',
  } = toAttributesObj(debugOptions);
  const colors = chroma.scale(['#a9c6cf', '#ed8a0f']).colors(childCount);
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
        top: _random(CONTAINER_STYLE.height),
        left: _random(CONTAINER_STYLE.width),
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
        backgroundColor: '#f9fbfc',
        resize: 'horizontal',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '4px',
        boxSizing: 'content-box',
        overflow,
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
          fontSize: '16px',
          fontFamily: 'sans-serif',
          borderRadius: '4px',
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
  assignStyle(
    wrapper,
    toAttributesObj({
      padding: '8px',
    }),
  );
  return wrapper;
}
