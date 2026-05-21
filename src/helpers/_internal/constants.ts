import type {
  AdjustOptions,
  AlignOptions,
  ChildCountOptions,
  ChildRatioOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
  TracksOptions,
} from '../../core/_types';

export const DIRECTION_OPTIONS_KEYS: (keyof DirectionOptions)[] = [
  'direction',
] as const;
export const ALIGN_OPTIONS_KEYS: (keyof AlignOptions)[] = [
  'alignX',
  'alignY',
] as const;
export const ADJUST_OPTIONS_KEYS: (keyof AdjustOptions)[] = [
  'adjustX',
  'adjustY',
] as const;
export const GAP_OPTIONS_KEYS: (keyof GapOptions)[] = [
  'gap',
  'gapX',
  'gapY',
] as const;
export const CHILD_SIZE_OPTIONS_KEYS: (keyof ChildSizeOptions)[] = [
  'childSizeX',
  'childSizeY',
] as const;
export const CHILD_RATIO_OPTIONS_KEYS: (keyof ChildRatioOptions)[] = [
  'childRatioX',
  'childRatioY',
] as const;
export const CHILD_COUNT_OPTIONS_KEYS: (keyof ChildCountOptions)[] = [
  'childCountX',
  'childCountY',
] as const;
export const TRACKS_OPTIONS_KEYS: (keyof TracksOptions)[] = [
  'tracksX',
  'tracksY',
] as const;
