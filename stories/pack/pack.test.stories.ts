import type { Meta, StoryObj } from '@storybook/web-components-vite';
import pack from '../../src/pack';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'test/pack',
  render: createTestRenderer(pack),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DirectionX: Story = {
  args: { direction: 'x', childCount: 3 },
};

export const DirectionY: Story = {
  args: { direction: 'y', childCount: 3 },
};
