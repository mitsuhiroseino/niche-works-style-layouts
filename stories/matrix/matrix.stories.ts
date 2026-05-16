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

export const Child: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    childCountX: undefined,
    childCountY: undefined,
    childSizeX: undefined,
    childSizeY: undefined,
    childX: '[200, 50, "1fr", 100]' as any,
    childY: '[50, 30, 100]' as any,
  },
};
