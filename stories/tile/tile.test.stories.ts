// stories/tile/tile.test.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import tile from '../../src/tile';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'test/tile',
  render: createTestRenderer(tile),
} satisfies Meta;

export default meta;
type Story = StoryObj;

// adjustX: grow
export const AdjustXGrowWithSize: Story = {
  args: {
    childSizeX: '200px',
    adjustX: 'grow',
    childCount: 3,
  },
};

// adjustX: shrink
export const AdjustXShrinkWithSize: Story = {
  args: {
    childSizeX: '200px',
    adjustX: 'shrink',
    childCount: 3,
  },
};

// adjustX: fit
export const AdjustXFitWithSize: Story = {
  args: {
    childSizeX: '200px',
    adjustX: 'fit',
    childCount: 3,
  },
};

// adjustX: none
export const AdjustXNoneWithSize: Story = {
  args: {
    childSizeX: '200px',
    adjustX: 'none',
    childCount: 3,
  },
};

// adjustY: grow
export const AdjustYGrowWithSize: Story = {
  args: {
    direction: 'y',
    childSizeY: '200px',
    adjustY: 'grow',
    childCount: 3,
  },
};

// adjustY: shrink
export const AdjustYShrinkWithSize: Story = {
  args: {
    direction: 'y',
    childSizeY: '200px',
    adjustY: 'shrink',
    childCount: 3,
  },
};

// adjustY: fit
export const AdjustYFitWithSize: Story = {
  args: {
    direction: 'y',
    childSizeY: '200px',
    adjustY: 'fit',
    childCount: 3,
  },
};

// adjustY: none
export const AdjustYNoneWithSize: Story = {
  args: {
    direction: 'y',
    childSizeY: '200px',
    adjustY: 'none',
    childCount: 3,
  },
};
