import type { Meta, StoryObj } from '@storybook/web-components-vite';
import stack from '../../src/stack';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/stack',
  render: createTestRenderer(stack),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';
const ALIGN_CHILD_SIZE = '100px';
const GAP_SIZE = 20;

// ===== direction:x / 主軸(adjustX) =====

export const DirectionXAdjustXGrow: Story = {
  args: {
    direction: 'x',
    adjustX: 'grow',
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAdjustXShrink: Story = {
  args: {
    direction: 'x',
    adjustX: 'shrink',
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAdjustXFit: Story = {
  args: {
    direction: 'x',
    adjustX: 'fit',
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAdjustXNone: Story = {
  args: {
    direction: 'x',
    adjustX: 'none',
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:x / 交差軸(adjustY) =====

export const DirectionXAdjustYGrow: Story = {
  args: { direction: 'x', adjustY: 'grow', childCount: 3 },
};
export const DirectionXAdjustYShrink: Story = {
  args: {
    direction: 'x',
    adjustY: 'shrink',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAdjustYFit: Story = {
  args: { direction: 'x', adjustY: 'fit', childCount: 3 },
};
export const DirectionXAdjustYNone: Story = {
  args: {
    direction: 'x',
    adjustY: 'none',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:x / 主軸 alignX =====

export const DirectionXAlignXLeft: Story = {
  args: {
    direction: 'x',
    alignX: 'left',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAlignXCenter: Story = {
  args: {
    direction: 'x',
    alignX: 'center',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAlignXRight: Story = {
  args: {
    direction: 'x',
    alignX: 'right',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAlignXSpaceBetween: Story = {
  args: {
    direction: 'x',
    alignX: 'space-between',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAlignXSpaceAround: Story = {
  args: {
    direction: 'x',
    alignX: 'space-around',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAlignXSpaceEvenly: Story = {
  args: {
    direction: 'x',
    alignX: 'space-evenly',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:x / 交差軸 alignY =====

export const DirectionXAlignYTop: Story = {
  args: {
    direction: 'x',
    alignY: 'top',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAlignYMiddle: Story = {
  args: {
    direction: 'x',
    alignY: 'middle',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionXAlignYBottom: Story = {
  args: {
    direction: 'x',
    alignY: 'bottom',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:x / gap =====

export const DirectionXGapX: Story = {
  args: {
    direction: 'x',
    gapX: GAP_SIZE,
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:y / 主軸(adjustY) =====

export const DirectionYAdjustYGrow: Story = {
  args: {
    direction: 'y',
    adjustY: 'grow',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAdjustYShrink: Story = {
  args: {
    direction: 'y',
    adjustY: 'shrink',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAdjustYFit: Story = {
  args: {
    direction: 'y',
    adjustY: 'fit',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAdjustYNone: Story = {
  args: {
    direction: 'y',
    adjustY: 'none',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:y / 交差軸(adjustX) =====

export const DirectionYAdjustXGrow: Story = {
  args: { direction: 'y', adjustX: 'grow', childCount: 3 },
};
export const DirectionYAdjustXShrink: Story = {
  args: {
    direction: 'y',
    adjustX: 'shrink',
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAdjustXFit: Story = {
  args: { direction: 'y', adjustX: 'fit', childCount: 3 },
};
export const DirectionYAdjustXNone: Story = {
  args: {
    direction: 'y',
    adjustX: 'none',
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:y / 主軸 alignY =====

export const DirectionYAlignYTop: Story = {
  args: {
    direction: 'y',
    alignY: 'top',
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAlignYMiddle: Story = {
  args: {
    direction: 'y',
    alignY: 'middle',
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAlignYBottom: Story = {
  args: {
    direction: 'y',
    alignY: 'bottom',
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAlignYSpaceBetween: Story = {
  args: {
    direction: 'y',
    alignY: 'space-between',
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAlignYSpaceAround: Story = {
  args: {
    direction: 'y',
    alignY: 'space-around',
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAlignYSpaceEvenly: Story = {
  args: {
    direction: 'y',
    alignY: 'space-evenly',
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:y / 交差軸 alignX =====

export const DirectionYAlignXLeft: Story = {
  args: {
    direction: 'y',
    alignX: 'left',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAlignXCenter: Story = {
  args: {
    direction: 'y',
    alignX: 'center',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYAlignXRight: Story = {
  args: {
    direction: 'y',
    alignX: 'right',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== direction:y / gap =====

export const DirectionYGapY: Story = {
  args: {
    direction: 'y',
    gapY: GAP_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== childRatio =====

export const DirectionXChildRatio: Story = {
  args: {
    direction: 'x',
    childSizeX: ALIGN_CHILD_SIZE,
    childRatioX: 1,
    childRatioY: 1,
    childCount: 3,
  },
};
export const DirectionYChildRatio: Story = {
  args: {
    direction: 'y',
    childSizeX: ALIGN_CHILD_SIZE,
    childRatioX: 1,
    childRatioY: 2,
    childCount: 3,
  },
};
