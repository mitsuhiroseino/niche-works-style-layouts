import type {
  AdjustOptions,
  AlignOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
} from '../_types';
import type { AlignXBase, AlignYBase } from '../constants';

/**
 * balanceのオプション
 *
 * - `direction='x'` 時: `alignY` に `space-between`,`space-around`,`space-evenly` 指定不可
 * - `direction='y'` 時: `alignX` に `space-between`,`space-around`,`space-evenly` 指定不可
 */
export type BalanceLayoutOptions = AdjustOptions &
  GapOptions &
  ChildSizeOptions &
  BalanceDirectionWithAlignOptions;

/**
 * direction & alignのオプション
 */
type BalanceDirectionWithAlignOptions =
  | (DirectionOptions<'x'> &
      Omit<AlignOptions, 'alignY'> & { alignY?: AlignYBase })
  | (DirectionOptions<'y'> &
      Omit<AlignOptions, 'alignX'> & { alignX?: AlignXBase });
