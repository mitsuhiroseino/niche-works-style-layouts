import type {
  AdjustOptions,
  AlignOptions,
  ChildSizeOptions,
  DirectionOptions,
  SpacingOptions,
} from '../_types';

/**
 * tileのオプション
 */

export type TileLayoutOptions = AdjustOptions &
  AlignOptions &
  ChildSizeOptions &
  DirectionOptions &
  SpacingOptions;
