import type {
  AdjustOptions,
  AlignOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
} from '../_types';
import type { AdjustBase } from '../constants';

/**
 * flowのオプション
 *
 * - `direction='x'` 時: `adjustY` に `fit`,`grow`,`shrink` 指定不可
 * - `direction='y'` 時: `adjustX` に `fit`,`grow`,`shrink` 指定不可
 */
export type FlowLayoutOptions = AlignOptions &
  GapOptions &
  ChildSizeOptions &
  FlowDirectionWithAdjustOptions;

/**
 * direction & adjustのオプション
 */
type FlowDirectionWithAdjustOptions =
  | (DirectionOptions<'x'> &
      Omit<AdjustOptions, 'adjustY'> & { adjustY?: AdjustBase })
  | (DirectionOptions<'y'> &
      Omit<AdjustOptions, 'adjustX'> & { adjustX?: AdjustBase });
