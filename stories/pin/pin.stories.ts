import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { PinLayoutOptions } from '../../src/pin';
import pin from '../../src/pin';
import { ARGS, ARG_TYPES } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = PinLayoutOptions & DebugOptions;

const meta = {
  title: 'pin',
  render: createRenderer(pin),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.pin,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.pin,
  args: { ...ARGS.pin },
};
