import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { CenterLayoutOptions } from '../../src/center';
import center from '../../src/center';
import { ARGS, ARG_TYPES } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = CenterLayoutOptions & DebugOptions;

const meta = {
  title: 'center',
  render: createRenderer(center),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.center,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.center,
  args: { ...ARGS.center, childCount: 6 },
};
