import type {
  AdjustOptions,
  ChildRatioOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
} from '../_types';

/**
 * centerのオプション
 */
export type CenterLayoutOptions = DirectionOptions &
  AdjustOptions &
  GapOptions &
  ChildSizeOptions &
  ChildRatioOptions;
