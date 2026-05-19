import type {
  AdjustOptions,
  ChildRatioOptions,
  ChildSizeOptions,
} from '../_types';
import type { AlignXBase, AlignYBase } from '../constants';

/**
 * layerのオプション
 */
export type LayerLayoutOptions = AdjustOptions &
  ChildSizeOptions &
  ChildRatioOptions & {
    alignX?: AlignXBase;
    alignY?: AlignYBase;
  };
