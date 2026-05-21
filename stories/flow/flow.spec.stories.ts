import type { Meta, StoryObj } from '@storybook/web-components-vite';
import flow from '../../src/flow';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/flow',
  render: createTestRenderer(flow),
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

// ===== direction:x / 交差軸(childSizeYのみ) =====

export const DirectionXCrossAxisWithSize: Story = {
  args: { direction: 'x', childSizeY: CHILD_SIZE, childCount: 3 },
};
export const DirectionXCrossAxisWithoutSize: Story = {
  args: { direction: 'x', childCount: 3 },
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

// ===== direction:y / 交差軸(childSizeXのみ) =====

export const DirectionYCrossAxisWithSize: Story = {
  args: { direction: 'y', childSizeX: CHILD_SIZE, childCount: 3 },
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
