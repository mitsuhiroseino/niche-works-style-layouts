import type { StyleResult } from '@niche-works/style-utils';
import type { LooseDictionary } from '@niche-works/types';

/**
 * レイアウトを作る関数
 */
export type CreateLayoutStyle<O = LooseDictionary> = (
  options?: O,
) => LayoutStyle;

/**
 * レイアウト
 */
export type LayoutStyle = StyleResult;
