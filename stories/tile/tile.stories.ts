import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TileLayoutOptions } from '../../src/tile';
import tile from '../../src/tile';
import { ARGS, ARG_TYPES } from '../_internal/constants';
import createRenderer from '../_internal/createRenderer';
import type { DebugOptions } from '../_internal/types';

type LayoutOptions = TileLayoutOptions & DebugOptions;

const meta = {
  title: 'tile',
  render: createRenderer(tile),
} satisfies Meta<LayoutOptions>;

export default meta;
type Story = StoryObj<LayoutOptions>;

export const Default: Story = {
  argTypes: ARG_TYPES.tile,
  args: { sizeType: 'static', posType: 'static' },
};

export const Standard: Story = {
  argTypes: ARG_TYPES.tile,
  args: { ...ARGS.tile },
};
