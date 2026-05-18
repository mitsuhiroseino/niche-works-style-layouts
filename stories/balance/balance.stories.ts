import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { BalanceLayoutOptions } from '../../src/balance';
import balance from '../../src/balance';
import { ARGS, ARG_TYPES } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = BalanceLayoutOptions & DebugOptions;

const meta = {
  title: 'balance',
  render: createRenderer(balance),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.balance,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.balance,
  args: { ...ARGS.balance },
};

export const IndividualSizes: Story = {
  argTypes: ARG_TYPES.balance,
  args: {
    ...ARGS.balance,
    sizeType: 'static',
    childSizeX: undefined,
    childSizeY: undefined,
  },
};
