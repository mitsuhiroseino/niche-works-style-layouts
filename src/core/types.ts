import type { LooseDictionary } from '@niche-works/types';

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
  style?: CSSCustomProperties;
};

/**
 * CSSカスタムプロパティ(変数)
 */
export type CSSCustomProperties = {
  [key: `--${string}`]: string | undefined;
};
