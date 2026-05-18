/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ArgTypes } from '@storybook/web-components-vite';
import type {
  AdjustOptions,
  AlignOptions,
  ChildCountOptions,
  ChildOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
} from '../../src/_types';
import { Adjust, AlignX, AlignY, Direction } from '../../src/constants';
import type { DebugOptions } from './types';

export const DIRECTION_ARG_OPTIONS = Object.values(Direction);

export const ALAGN_X_ARG_OPTIONS = Object.values(AlignX);

export const ALAGN_Y_ARG_OPTIONS = Object.values(AlignY);

export const ADJUST_ARG_OPTIONS = Object.values(Adjust);

export const DIRECTION_ARG_TYPES: ArgTypes<DirectionOptions> = {
  direction: {
    control: 'select',
    options: DIRECTION_ARG_OPTIONS,
  },
};

export const ALIGN_ARG_TYPES: ArgTypes<AlignOptions> = {
  alignX: {
    control: 'select',
    options: ALAGN_X_ARG_OPTIONS,
  },
  alignY: {
    control: 'select',
    options: ALAGN_Y_ARG_OPTIONS,
  },
};

export const ADJUST_ARG_TYPES: ArgTypes<AdjustOptions> = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const ADJUST_DIRECTION_X_ARG_TYPES: ArgTypes<AdjustOptions> = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ['none'],
  },
};

export const ADJUST_DIRECTION_Y_ARG_TYPES: ArgTypes<AdjustOptions> = {
  adjustX: {
    control: 'select',
    options: ['none'],
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const CHILD_SIZE_ARG_TYPES: ArgTypes<ChildSizeOptions> = {
  childSizeX: {
    control: 'text',
  },
  childSizeY: {
    control: 'text',
  },
};

export const GAP_ARG_TYPES: ArgTypes<GapOptions> = {
  gap: {
    control: 'text',
  },
  gapX: {
    control: 'text',
  },
  gapY: {
    control: 'text',
  },
};

export const CHILD_COUNT_ARG_TYPES: ArgTypes<ChildCountOptions> = {
  childCountX: {
    control: 'text',
  },
  childCountY: {
    control: 'text',
  },
};

export const CHILD_ARG_TYPES: ArgTypes<ChildOptions> = {
  tracksX: {
    control: 'text',
  },
  tracksY: {
    control: 'text',
  },
};

export const DEBUG_ARG_TYPES: ArgTypes<DebugOptions> = {
  containerWidth: {
    control: 'text',
  },
  containerHeight: {
    control: 'text',
  },
  childCount: {
    type: 'number',
  },
  sizeType: {
    control: 'select',
    options: ['none', 'rand', 'static'],
  },
  posType: {
    control: 'select',
    options: ['none', 'rand', 'static'],
  },
};

export const ARG_TYPES = {
  balance: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  flow: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  matrix: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pack: {
    ...DIRECTION_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pin: {
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  stack: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  tile: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
} as const;

export const DIRECTION_OPTIONS: DirectionOptions = {
  direction: 'x',
};

export const ALIGN_OPTIONS: AlignOptions = {
  alignX: 'left',
  alignY: 'top',
};

export const ADJUST_OPTIONS: AdjustOptions = {
  adjustX: 'none',
  adjustY: 'none',
};

export const CHILD_OPTIONS: ChildOptions = {
  tracksX: undefined,
  tracksY: undefined,
};

export const CHILD_COUNT_OPTIONS: ChildCountOptions = {
  childCountX: '4' as any,
  childCountY: '3' as any,
};

export const CHILD_SIZE_OPTIONS: ChildSizeOptions = {
  childSizeX: '60',
  childSizeY: '120',
};

export const GAP_OPTIONS: GapOptions = {
  gap: '8',
  gapX: undefined,
  gapY: undefined,
};

export const DEBUG_PARAMS: DebugOptions = {
  containerWidth: '600',
  containerHeight: '450',
  childCount: 12,
  sizeType: 'none',
  posType: 'none',
};

export const ARGS: Record<string, Record<string, any>> = {
  balance: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...CHILD_SIZE_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  flow: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...CHILD_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
  },
  matrix: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...CHILD_OPTIONS,
    ...CHILD_SIZE_OPTIONS,
    ...CHILD_COUNT_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  pin: {
    ...CHILD_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
    posType: 'static',
  },
  pack: {
    ...DIRECTION_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  stack: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...CHILD_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
  },
  tile: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...CHILD_SIZE_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
};

export const ENABLED_ARGS: Record<string, Record<string, any>> = {};
for (const layout in ARGS) {
  ENABLED_ARGS[layout] = {};
  for (const arg in ARGS[layout]) {
    ENABLED_ARGS[layout][arg] = true;
  }
}
