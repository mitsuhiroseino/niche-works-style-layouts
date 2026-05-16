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
  direction?: D;
};

/**
 * 子要素の位置
 */
export type AlignOptions = {
  /**
   * 子要素の横位置
   */
  alignX?: AlignX;

  /**
   * 子要素の縦位置
   */
  alignY?: AlignY;
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
  adjustX?: Adjust;

  /**
   * 子要素の高さの調整
   * childSizeYを指定した場合に有効
   * デフォルトは`none`
   */
  adjustY?: Adjust;
};

/**
 * 要素間の余白
 */
export type SpacingOptions = {
  /**
   * 余白
   */
  spacing?: ChildSpacing;

  /**
   * 横方向の余白
   */
  spacingX?: ChildSpacing;

  /**
   * 縦方向の余白
   */
  spacingY?: ChildSpacing;
};

/**
 * 子要素のサイズ
 */
export type ChildSizeOptions = {
  /**
   * 子要素の幅
   */
  childSizeX?: ChildSize;

  /**
   * 子要素の高さ
   */
  childSizeY?: ChildSize;
};

/**
 * 子要素の数
 */
export type ChildCountOptions = {
  /**
   * 横方向の要素数
   */
  childCountX?: number;

  /**
   * 縦方向の要素数
   */
  childCountY?: number;
};

/**
 * childのテンプレート
 */
export type ChildOptions = {
  /**
   * 横方向の設定
   * このプロパティが設定されている場合、childCountX,childSizeXは無効
   */
  childX?: (string | number)[];

  /**
   * 縦方向の設定
   * このプロパティが設定されている場合、childCountY,childSizeYは無効
   */
  childY?: (string | number)[];
};

/**
 * 子要素の高さ or 幅
 */
export type ChildSize = CSSProperties['flexBasis'];

/**
 * 余白
 */
export type ChildSpacing = CSSProperties['gap'];
