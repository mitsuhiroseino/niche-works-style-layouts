import type { CreateLayout } from '../../src/types';
import createContainer from './createContainer';
import type { DebugOptions } from './types';

export default function createRenderer<P extends DebugOptions>(
  layout: CreateLayout<any>,
) {
  return ({
    containerWidth,
    containerHeight,
    childCount,
    posType,
    sizeType,
    ...params
  }: P) =>
    createContainer(layout, params, {
      containerWidth,
      containerHeight,
      childCount,
      posType,
      sizeType,
    });
}
