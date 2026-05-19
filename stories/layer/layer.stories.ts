import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { LayerLayoutOptions } from '../../src/layer';
import layer from '../../src/layer';
import { ARGS, ARG_TYPES } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = LayerLayoutOptions & DebugOptions;

const meta = {
  title: 'layer',
  render: createRenderer(layer),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.layer,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.layer,
  args: { ...ARGS.layer },
};
