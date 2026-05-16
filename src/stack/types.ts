import type {
  AdjustOptions,
  AlignOptions,
  ChildSizeOptions,
  DirectionOptions,
  SpacingOptions,
} from '../_types';
import type { AlignXBase, AlignYBase } from '../constants';

/**
 * stackのオプション
 *
 * - `direction='x'` 時: `alignY` に `space-between`,`space-around`,`space-evenly` 指定不可
 * - `direction='y'` 時: `alignX` に `space-between`,`space-around`,`space-evenly` 指定不可
 */
export type StackLayoutOptions = AdjustOptions &
  ChildSizeOptions &
  SpacingOptions &
  StackDirectionWithAlignOptions;

/**
 * direction & alignのオプション
 */
type StackDirectionWithAlignOptions =
  | (DirectionOptions<'x'> &
      Omit<AlignOptions, 'alignY'> & { alignY?: AlignYBase })
  | (DirectionOptions<'y'> &
      Omit<AlignOptions, 'alignX'> & { alignX?: AlignXBase });
