import type { Meta, StoryObj } from '@storybook/web-components-vite';
import matrix from '../../src/matrix';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/matrix',
  render: createTestRenderer(matrix),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';
const ALIGN_CHILD_SIZE = '100px';
const GAP = '10px';

// ===== adjustX =====

export const AdjustXGrowWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: CHILD_SIZE,
    adjustX: 'grow',
    childCount: 3,
  },
};
export const AdjustXShrinkWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: CHILD_SIZE,
    adjustX: 'shrink',
    childCount: 3,
  },
};
export const AdjustXFitWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: CHILD_SIZE,
    adjustX: 'fit',
    childCount: 3,
  },
};
export const AdjustXNoneWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: CHILD_SIZE,
    adjustX: 'none',
    childCount: 3,
  },
};

// ===== adjustY =====

export const AdjustYGrowWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: CHILD_SIZE,
    adjustY: 'grow',
    childCount: 3,
  },
};
export const AdjustYShrinkWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: CHILD_SIZE,
    adjustY: 'shrink',
    childCount: 3,
  },
};
export const AdjustYFitWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: CHILD_SIZE,
    adjustY: 'fit',
    childCount: 3,
  },
};
export const AdjustYNoneWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: CHILD_SIZE,
    adjustY: 'none',
    childCount: 3,
  },
};

// ===== gap + adjustX =====

export const AdjustXGrowWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: CHILD_SIZE,
    adjustX: 'grow',
    gap: GAP,
    childCount: 3,
  },
};
export const AdjustXShrinkWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: CHILD_SIZE,
    adjustX: 'shrink',
    gap: GAP,
    childCount: 3,
  },
};
export const AdjustXFitWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: CHILD_SIZE,
    adjustX: 'fit',
    gap: GAP,
    childCount: 3,
  },
};

// ===== gap + adjustY =====

export const AdjustYGrowWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: CHILD_SIZE,
    adjustY: 'grow',
    gap: GAP,
    childCount: 3,
  },
};
export const AdjustYShrinkWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: CHILD_SIZE,
    adjustY: 'shrink',
    gap: GAP,
    childCount: 3,
  },
};
export const AdjustYFitWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: CHILD_SIZE,
    adjustY: 'fit',
    gap: GAP,
    childCount: 3,
  },
};

// ===== alignX =====

export const AlignXLeft: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    alignX: 'left',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const AlignXCenter: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    alignX: 'center',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const AlignXRight: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    alignX: 'right',
    childSizeX: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== alignY =====

export const AlignYTop: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    alignY: 'top',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const AlignYMiddle: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    alignY: 'middle',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};
export const AlignYBottom: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    alignY: 'bottom',
    childSizeX: ALIGN_CHILD_SIZE,
    childSizeY: ALIGN_CHILD_SIZE,
    childCount: 3,
  },
};

// ===== childRatio =====

export const ChildRatio: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: ALIGN_CHILD_SIZE,
    childRatioX: 1,
    childRatioY: 1,
    childCount: 3,
  },
};
