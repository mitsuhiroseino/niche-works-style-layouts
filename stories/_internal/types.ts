export type DebugOptions = {
  /**
   * コンテナーの幅
   */
  containerWidth?: number | string;

  /**
   * コンテナーの高さ
   */
  containerHeight?: number | string;

  /**
   * 子要素の数
   */
  childCount?: number;

  /**
   * 子要素の幅・高さの決め方
   */
  sizeType?: 'none' | 'rand' | 'static';

  /**
   * 子要素の位置に決め方
   */
  posType?: 'none' | 'rand' | 'static';

  /**
   * コンテナーのオーバーフロー
   */
  overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'none';
};
