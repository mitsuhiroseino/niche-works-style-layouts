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

const SPACING = '10px';

// spacing + adjustX: grow
export const AdjustXGrowWithCountAndSizeAndSpacing: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'grow',
    spacing: SPACING,
    childCount: 3,
  },
};

// spacing + adjustX: shrink
export const AdjustXShrinkWithCountAndSizeAndSpacing: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'shrink',
    spacing: SPACING,
    childCount: 3,
  },
};

// spacing + adjustX: fit
export const AdjustXFitWithCountAndSizeAndSpacing: Story = {
  args: {
    childCountX: 3,
    childCountY: 1,
    childSizeX: '200px',
    adjustX: 'fit',
    spacing: SPACING,
    childCount: 3,
  },
};

// spacing + adjustY: grow
export const AdjustYGrowWithCountAndSizeAndSpacing: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'grow',
    spacing: SPACING,
    childCount: 3,
  },
};

// spacing + adjustY: shrink
export const AdjustYShrinkWithCountAndSizeAndSpacing: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'shrink',
    spacing: SPACING,
    childCount: 3,
  },
};

// spacing + adjustY: fit
export const AdjustYFitWithCountAndSizeAndSpacing: Story = {
  args: {
    childCountX: 1,
    childCountY: 3,
    childSizeY: '200px',
    adjustY: 'fit',
    spacing: SPACING,
    childCount: 3,
  },
};
