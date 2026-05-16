import type { Meta, StoryObj } from '@storybook/web-components-vite';
import flow from '../../src/flow';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'test/flow',
  render: createTestRenderer(flow),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';

// direction: x / 主軸adjust
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

// direction: x / 交差軸（childSizeのみ）
export const DirectionXCrossAxisWithSize: Story = {
  args: { direction: 'x', childSizeY: CHILD_SIZE, childCount: 3 },
};
export const DirectionXCrossAxisWithoutSize: Story = {
  args: { direction: 'x', childCount: 3 },
};

// direction: y / 主軸adjust（代表のみ）
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
