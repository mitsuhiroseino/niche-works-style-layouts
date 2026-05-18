import type { LooseDictionary } from '@niche-works/types';
import type { CSSPropertiesWithVars } from './_types';

/**
 * レイアウトを作る関数
 */
export type StyleLayout<O = LooseDictionary> = (
  options?: O,
) => StyleLayoutResult;

/**
 * レイアウト
 */
export type StyleLayoutResult = {
  /**
   * クラス
   */
  className?: string;

  /**
   * スタイル
   */
  style?: CSSPropertiesWithVars;
};
