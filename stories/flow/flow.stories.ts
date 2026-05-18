import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { FlowLayoutOptions } from '../../src/flow';
import flow from '../../src/flow';
import { ARG_TYPES, ARGS } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = FlowLayoutOptions & DebugOptions;

const meta = {
  title: 'flow',
  render: createRenderer(flow),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.flow,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.flow,
  args: { ...ARGS.flow },
};

export const IndividualSizes: Story = {
  argTypes: ARG_TYPES.flow,
  args: {
    ...ARGS.flow,
    sizeType: 'static',
    childSizeX: undefined,
    childSizeY: undefined,
  },
};
