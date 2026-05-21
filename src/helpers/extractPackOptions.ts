import type { PackLayoutOptions } from '../core/pack/types';
import {
  DIRECTION_OPTIONS_KEYS,
  GAP_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<PackLayoutOptions>([
  ...DIRECTION_OPTIONS_KEYS,
  ...GAP_OPTIONS_KEYS,
]);
