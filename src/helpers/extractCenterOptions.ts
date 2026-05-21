import type { CenterLayoutOptions } from '../core/center/types';
import {
  ADJUST_OPTIONS_KEYS,
  CHILD_RATIO_OPTIONS_KEYS,
  CHILD_SIZE_OPTIONS_KEYS,
  DIRECTION_OPTIONS_KEYS,
  GAP_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<CenterLayoutOptions>([
  ...DIRECTION_OPTIONS_KEYS,
  ...ADJUST_OPTIONS_KEYS,
  ...GAP_OPTIONS_KEYS,
  ...CHILD_SIZE_OPTIONS_KEYS,
  ...CHILD_RATIO_OPTIONS_KEYS,
]);
