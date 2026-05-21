import type { Meta, StoryObj } from '@storybook/web-components-vite';
import balance from '../../src/balance';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/balance',
  render: createTestRenderer(balance),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';
const ALIGN_CHILD_SIZE = '100px';
const GAP_SIZE = 20;

// ===== direction:x / adjustX =====

export const DirectionXAdjustXNone: Story = {
  args: {
    direction: 'x',
    adjustX: 'none',
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};
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

// ===== direction:y / adjustY =====

export const DirectionYAdjustYNone: Story = {
  args: {
    direction: 'y',
    adjustY: 'none',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
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

// ===== direction:x / alignY（交差軸・個別アイテムの縦位置） =====

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

// ===== direction:y / alignX（交差軸・個別アイテムの横位置） =====

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

// ===== gap =====

// childSizeあり: gapが無視され、子要素サイズが維持されつつ余白が均等配分される
export const DirectionXGapX: Story = {
  args: {
    direction: 'x',
    gapX: GAP_SIZE,
    childSizeX: CHILD_SIZE,
    childCount: 3,
  },
};
export const DirectionYGapY: Story = {
  args: {
    direction: 'y',
    gapY: GAP_SIZE,
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};

// childSizeなし: gapが実際の余白として維持される
export const DirectionXGapXWithoutSize: Story = {
  args: { direction: 'x', gapX: GAP_SIZE, childCount: 3 },
};
export const DirectionYGapYWithoutSize: Story = {
  args: { direction: 'y', gapY: GAP_SIZE, childCount: 3 },
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
