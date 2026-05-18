import type {
  AdjustOptions,
  AlignOptions,
  ChildRatioOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
} from '../_types';

/**
 * tileのオプション
 */

export type TileLayoutOptions = DirectionOptions &
  AlignOptions &
  AdjustOptions &
  GapOptions &
  ChildSizeOptions &
  ChildRatioOptions;
