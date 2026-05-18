import type { Meta, StoryObj } from '@storybook/web-components-vite';
import matrix from '../../src/matrix';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'test/matrix',
  render: createTestRenderer(matrix),
} satisfies Meta;

export default meta;
type Story = StoryObj;

// adjustX: grow
export const AdjustXGrowWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'grow',
    childCount: 3,
  },
};

// adjustX: shrink
export const AdjustXShrinkWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'shrink',
    childCount: 3,
  },
};

// adjustX: fit
export const AdjustXFitWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'fit',
    childCount: 3,
  },
};

// adjustX: none
export const AdjustXNoneWithCountAndSize: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'none',
    childCount: 3,
  },
};

// adjustY: grow
export const AdjustYGrowWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'grow',
    childCount: 3,
  },
};

// adjustY: shrink
export const AdjustYShrinkWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'shrink',
    childCount: 3,
  },
};

// adjustY: fit
export const AdjustYFitWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'fit',
    childCount: 3,
  },
};

// adjustY: none
export const AdjustYNoneWithCountAndSize: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'none',
    childCount: 3,
  },
};

const GAP = '10px';

// gap + adjustX: grow
export const AdjustXGrowWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'grow',
    gap: GAP,
    childCount: 3,
  },
};

// gap + adjustX: shrink
export const AdjustXShrinkWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'shrink',
    gap: GAP,
    childCount: 3,
  },
};

// gap + adjustX: fit
export const AdjustXFitWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'fit',
    gap: GAP,
    childCount: 3,
  },
};

// gap + adjustY: grow
export const AdjustYGrowWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'grow',
    gap: GAP,
    childCount: 3,
  },
};

// gap + adjustY: shrink
export const AdjustYShrinkWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'shrink',
    gap: GAP,
    childCount: 3,
  },
};

// gap + adjustY: fit
export const AdjustYFitWithCountAndSizeAndGap: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'fit',
    gap: GAP,
    childCount: 3,
  },
};
