import chroma from 'chroma-js';
import type { StyleLayout } from '../../src/types';
import assignStyle from './assignStyle';

export default function createTestRenderer(layout: StyleLayout) {
  return ({
    childCount = 3,
    childPositions,
    ...params
  }: Record<string, unknown> & { childCount?: number }) => {
    const colors = chroma.scale(['d9ed92', '184e77']).colors(childCount);
    const positions: { left: string; top: string }[] =
      (childPositions as any) ??
      Array.from({ length: childCount }).map((_, index) => ({
        left: `${80 * index}px`,
        top: `${120 * index}px`,
      }));
    const { className, style } = layout(params);

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.boxSizing = 'border-box';
    container.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
    if (className) container.className = className;
    if (style) assignStyle(container, style);

    for (let i = 0; i < childCount; i++) {
      const child = document.createElement('div');
      child.textContent = String(i + 1);
      child.style.backgroundColor = colors[i];
      child.style.left = positions[i].left;
      child.style.top = positions[i].top;
      container.appendChild(child);
    }

    return container;
  };
}
