import type { LooseDictionary } from '@niche-works/types';
import type { StyleResult } from '@niche-works/style-utils';

/**
 * レイアウトを作る関数
 */
export type StyleLayout<O = LooseDictionary> = (
  options?: O,
) => StyleLayoutResult;

/**
 * レイアウト
 */
export type StyleLayoutResult = StyleResult;
