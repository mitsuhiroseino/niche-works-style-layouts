import type { Meta, StoryObj } from '@storybook/web-components-vite';
import tile from '../../src/tile';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/tile',
  render: createTestRenderer(tile),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';
const ALIGN_CHILD_SIZE = '100px';
const GAP_SIZE = 20;

// ===== direction:x / adjustX =====

export const AdjustXGrowWithSize: Story = {
  args: { adjustX: 'grow', childSizeX: CHILD_SIZE, childCount: 3 },
};
export const AdjustXShrinkWithSize: Story = {
  args: { adjustX: 'shrink', childSizeX: CHILD_SIZE, childCount: 3 },
};
export const AdjustXFitWithSize: Story = {
  args: { adjustX: 'fit', childSizeX: CHILD_SIZE, childCount: 3 },
};
export const AdjustXNoneWithSize: Story = {
  args: { adjustX: 'none', childSizeX: CHILD_SIZE, childCount: 3 },
};

// ===== direction:y / adjustY =====

export const AdjustYGrowWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'grow',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
export const AdjustYShrinkWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'shrink',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
export const AdjustYFitWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'fit',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};
export const AdjustYNoneWithSize: Story = {
  args: {
    direction: 'y',
    adjustY: 'none',
    childSizeY: CHILD_SIZE,
    childCount: 3,
  },
};

// ===== alignX =====

export const AlignXLeft: Story = {
  args: { alignX: 'left', childSizeX: ALIGN_CHILD_SIZE, childCount: 3 },
};
export const AlignXCenter: Story = {
  args: { alignX: 'center', childSizeX: ALIGN_CHILD_SIZE, childCount: 3 },
};
export const AlignXRight: Story = {
  args: { alignX: 'right', childSizeX: ALIGN_CHILD_SIZE, childCount: 3 },
};

// ===== alignY =====

export const AlignYTop: Story = {
  args: {
    alignY: 'top',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const AlignYMiddle: Story = {
  args: {
    alignY: 'middle',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const AlignYBottom: Story = {
  args: {
    alignY: 'bottom',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== gap =====

export const GapX: Story = {
  args: { gapX: GAP_SIZE, childSizeX: ALIGN_CHILD_SIZE, childCount: 3 },
};
export const GapY: Story = {
  args: {
    direction: 'y',
    gapY: GAP_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== childRatio =====

export const ChildRatio: Story = {
  args: {
    childSizeX: ALIGN_CHILD_SIZE,
    childRatioX: 1,
    childRatioY: 1,
    childCount: 3,
  },
};
