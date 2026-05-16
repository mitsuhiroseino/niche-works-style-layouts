import type { Meta, StoryObj } from '@storybook/web-components-vite';
import balance from '../../src/balance';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'test/balance',
  render: createTestRenderer(balance),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';

// direction: x / adjustX
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

// direction: y / adjustY（代表のみ）
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
