import type { Meta, StoryObj } from '@storybook/web-components-vite';
import center from '../../src/center';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'test/center',
  render: createTestRenderer(center),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const CHILD_SIZE = '200px';
const GAP_SIZE = 20;

// センタリング（デフォルト）
export const DirectionXCentering: Story = {
  args: { direction: 'x', childSizeX: CHILD_SIZE, childCount: 3 },
};
export const DirectionYCentering: Story = {
  args: { direction: 'y', childSizeY: CHILD_SIZE, childCount: 3 },
};

// direction: x / 主軸adjust
export const DirectionXAdjustXGrow: Story = {
  args: { direction: 'x', adjustX: 'grow', childSizeX: CHILD_SIZE, childCount: 3 },
};
export const DirectionXAdjustXShrink: Story = {
  args: { direction: 'x', adjustX: 'shrink', childSizeX: CHILD_SIZE, childCount: 3 },
};
export const DirectionXAdjustXFit: Story = {
  args: { direction: 'x', adjustX: 'fit', childSizeX: CHILD_SIZE, childCount: 3 },
};
export const DirectionXAdjustXNone: Story = {
  args: { direction: 'x', adjustX: 'none', childSizeX: CHILD_SIZE, childCount: 3 },
};

// direction: x / 交差軸adjust
export const DirectionXAdjustYGrow: Story = {
  args: { direction: 'x', adjustY: 'grow', childCount: 3 },
};
export const DirectionXAdjustYShrink: Story = {
  args: { direction: 'x', adjustY: 'shrink', childSizeY: CHILD_SIZE, childCount: 3 },
};
export const DirectionXAdjustYFit: Story = {
  args: { direction: 'x', adjustY: 'fit', childCount: 3 },
};
export const DirectionXAdjustYNone: Story = {
  args: { direction: 'x', adjustY: 'none', childSizeY: CHILD_SIZE, childCount: 3 },
};

// direction: y / 主軸adjust（代表パターン）
export const DirectionYAdjustYGrow: Story = {
  args: { direction: 'y', adjustY: 'grow', childSizeY: CHILD_SIZE, childCount: 3 },
};
export const DirectionYAdjustYShrink: Story = {
  args: { direction: 'y', adjustY: 'shrink', childSizeY: CHILD_SIZE, childCount: 3 },
};

// gap
export const DirectionXGapX: Story = {
  args: { direction: 'x', gapX: GAP_SIZE, childSizeX: CHILD_SIZE, childCount: 3 },
};
export const DirectionYGapY: Story = {
  args: { direction: 'y', gapY: GAP_SIZE, childSizeY: CHILD_SIZE, childCount: 3 },
};
