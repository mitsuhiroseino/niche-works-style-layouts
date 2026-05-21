import type { Meta, StoryObj } from '@storybook/web-components-vite';
import layer from '../../src/layer';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/layer',
  render: createTestRenderer(layer),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';
const CHILD_SIZE_SMALL = '100px';

// ===== 重ね合わせ確認 =====

export const Stacking: Story = {
  args: {
    childSizeX: CHILD_SIZE_SMALL,
    childSizeY: CHILD_SIZE_SMALL,
    childCount: 3,
  },
};

// ===== alignX =====

export const AlignXLeft: Story = {
  args: {
    alignX: 'left',
    childSizeX: CHILD_SIZE,
    childSizeY: CHILD_SIZE_SMALL,
    childCount: 1,
  },
};
export const AlignXCenter: Story = {
  args: {
    alignX: 'center',
    childSizeX: CHILD_SIZE,
    childSizeY: CHILD_SIZE_SMALL,
    childCount: 1,
  },
};
export const AlignXRight: Story = {
  args: {
    alignX: 'right',
    childSizeX: CHILD_SIZE,
    childSizeY: CHILD_SIZE_SMALL,
    childCount: 1,
  },
};

// ===== alignY =====

export const AlignYTop: Story = {
  args: {
    alignY: 'top',
    childSizeX: CHILD_SIZE_SMALL,
    childSizeY: CHILD_SIZE,
    childCount: 1,
  },
};
export const AlignYMiddle: Story = {
  args: {
    alignY: 'middle',
    childSizeX: CHILD_SIZE_SMALL,
    childSizeY: CHILD_SIZE,
    childCount: 1,
  },
};
export const AlignYBottom: Story = {
  args: {
    alignY: 'bottom',
    childSizeX: CHILD_SIZE_SMALL,
    childSizeY: CHILD_SIZE,
    childCount: 1,
  },
};

// ===== adjustX =====

export const AdjustXGrow: Story = {
  args: { adjustX: 'grow', childSizeX: CHILD_SIZE, childCount: 1 },
};
export const AdjustXShrink: Story = {
  args: { adjustX: 'shrink', childSizeX: CHILD_SIZE, childCount: 1 },
};
export const AdjustXFit: Story = {
  args: { adjustX: 'fit', childCount: 1 },
};

// ===== adjustY =====

export const AdjustYGrow: Story = {
  args: { adjustY: 'grow', childSizeY: CHILD_SIZE, childCount: 1 },
};
export const AdjustYShrink: Story = {
  args: { adjustY: 'shrink', childSizeY: CHILD_SIZE, childCount: 1 },
};
export const AdjustYFit: Story = {
  args: { adjustY: 'fit', childCount: 1 },
};

// ===== childRatio =====

export const ChildRatio: Story = {
  args: {
    childSizeX: CHILD_SIZE_SMALL,
    childRatioX: 1,
    childRatioY: 1,
    childCount: 1,
  },
};
