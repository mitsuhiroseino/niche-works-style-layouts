import type {
  AdjustOptions,
  AlignOptions,
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
  ChildSizeOptions;
