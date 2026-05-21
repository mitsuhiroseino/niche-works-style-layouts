import type { Meta, StoryObj } from '@storybook/web-components-vite';
import pin from '../../src/pin';
import createTestRenderer from '../_internal/createTestRenderer';

const meta = {
  title: 'spec/pin',
  render: createTestRenderer(pin),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    childCount: 3,
    childPositions: [
      { left: '0px', top: '0px' },
      { left: '100px', top: '50px' },
      { left: '200px', top: '100px' },
    ],
  },
};

export const WithChildSize: Story = {
  args: {
    childSizeX: '100px',
    childSizeY: '80px',
    childCount: 3,
    childPositions: [
      { left: '0px', top: '0px' },
      { left: '150px', top: '100px' },
      { left: '300px', top: '200px' },
    ],
  },
};

export const WithChildRatio: Story = {
  args: {
    childSizeX: '100px',
    childRatioX: 1,
    childRatioY: 1,
    childCount: 3,
    childPositions: [
      { left: '0px', top: '0px' },
      { left: '150px', top: '0px' },
      { left: '300px', top: '0px' },
    ],
  },
};
