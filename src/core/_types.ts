import type CSS from 'csstype';
import type { Adjust, AlignX, AlignY, Direction } from './constants';

/**
 * CSS変数を許容するCSSProperties
 */
export type CSSPropertiesWithVars = CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

export type CSSProperties = CSS.Properties<string | number>;

/**
 * 子要素を並べる方向
 */
export type DirectionOptions<D extends Direction = Direction> = {
  /**
   * 並べる方向
   */
  direction?: D | null;
};

/**
 * 子要素の位置
 */
export type AlignOptions = {
  /**
   * 子要素の横位置
   */
  alignX?: AlignX | null;

  /**
   * 子要素の縦位置
   */
  alignY?: AlignY | null;
};

/**
 * 子要素のサイズ調整
 */
export type AdjustOptions = {
  /**
   * 子要素の幅の調整
   * childSizeXを指定した場合に有効
   * デフォルトは`none`
   */
  adjustX?: Adjust | null;

  /**
   * 子要素の高さの調整
   * childSizeYを指定した場合に有効
   * デフォルトは`none`
   */
  adjustY?: Adjust | null;
};

/**
 * 要素間の余白
 */
export type GapOptions = {
  /**
   * 余白
   */
  gap?: number | null;

  /**
   * 横方向の余白
   */
  gapX?: number | null;

  /**
   * 縦方向の余白
   */
  gapY?: number | null;
};

/**
 * 子要素のサイズ
 */
export type ChildSizeOptions = {
  /**
   * 子要素の幅
   */
  childSizeX?: number | null;

  /**
   * 子要素の高さ
   */
  childSizeY?: number | null;
};

/**
 * 子要素のサイズの縦横比
 */
export type ChildRatioOptions = {
  /**
   * 子要素の幅の比
   */
  childRatioX?: number;

  /**
   * 子要素の高さの比
   */
  childRatioY?: number;
};

/**
 * 子要素の数
 */
export type ChildCountOptions = {
  /**
   * 横方向の要素数
   */
  childCountX?: number | null;

  /**
   * 縦方向の要素数
   */
  childCountY?: number | null;
};

/**
 * childのテンプレート
 */
export type ChildOptions = {
  /**
   * 横方向の設定
   * このプロパティが設定されている場合、childCountX,childSizeXは無効
   */
  tracksX?: (string | number)[] | null;

  /**
   * 縦方向の設定
   * このプロパティが設定されている場合、childCountY,childSizeYは無効
   */
  tracksY?: (string | number)[] | null;
};
