import type { PinLayoutOptions } from '../core/pin/types';
import {
  CHILD_RATIO_OPTIONS_KEYS,
  CHILD_SIZE_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<PinLayoutOptions>([
  ...CHILD_SIZE_OPTIONS_KEYS,
  ...CHILD_RATIO_OPTIONS_KEYS,
]);
