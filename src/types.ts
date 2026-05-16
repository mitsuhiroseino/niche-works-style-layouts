import type { LooseDictionary } from '@niche-works/types';
import type { CSSPropertiesWithVars } from './_types';

/**
 * レイアウトを作る関数
 */
export type CreateLayout<O = LooseDictionary> = (options?: O) => LayoutResult;

/**
 * レイアウト
 */
export type LayoutResult = {
  /**
   * クラス
   */
  className?: string;

  /**
   * スタイル
   */
  style?: CSSPropertiesWithVars;
};
