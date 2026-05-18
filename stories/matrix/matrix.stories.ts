import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { MatrixLayoutOptions } from '../../src/matrix';
import matrix from '../../src/matrix';
import { ARGS, ARG_TYPES } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = MatrixLayoutOptions & DebugOptions;

const meta = {
  title: 'matrix',
  render: createRenderer(matrix),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.matrix,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.matrix,
  args: { ...ARGS.matrix },
};

export const Tracks: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    childCountX: undefined,
    childCountY: undefined,
    childSizeX: undefined,
    childSizeY: undefined,
    tracksX: '[200, 50, "1fr", 100]' as any,
    tracksY: '[50, 30, 100]' as any,
  },
};

export const IndividualSizes: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    sizeType: 'static',
    childSizeX: undefined,
    childSizeY: undefined,
  },
};
