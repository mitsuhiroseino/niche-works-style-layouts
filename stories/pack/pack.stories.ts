import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { PackLayoutOptions } from '../../src/pack';
import pack from '../../src/pack';
import { ARGS, ARG_TYPES } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = PackLayoutOptions & DebugOptions;

const meta = {
  title: 'pack',
  render: createRenderer(pack),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.pack,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.pack,
  args: { ...ARGS.pack },
};
