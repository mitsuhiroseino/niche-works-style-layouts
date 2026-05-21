import type { Meta, StoryObj } from '@storybook/web-components-vite';
import pack from '../../src/pack';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/pack',
  render: createTestRenderer(pack),
} satisfies Meta;

export default meta;
type Story = StoryObj;

const GAP_SIZE = 20;

export const DirectionX: Story = {
  args: { direction: 'x', childCount: 3 },
};

export const DirectionY: Story = {
  args: { direction: 'y', childCount: 3 },
};

export const DirectionXGapX: Story = {
  args: { direction: 'x', gapX: GAP_SIZE, childCount: 3 },
};

export const DirectionYGapY: Story = {
  args: { direction: 'y', gapY: GAP_SIZE, childCount: 3 },
};
