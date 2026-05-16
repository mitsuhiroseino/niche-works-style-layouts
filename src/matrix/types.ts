import type {
  AdjustOptions,
  AlignOptions,
  ChildCountOptions,
  ChildOptions,
  ChildSizeOptions,
  DirectionOptions,
  SpacingOptions,
} from '../_types';

export type MatrixLayoutOptions = AdjustOptions &
  AlignOptions &
  DirectionOptions &
  MatrixAxisXOptions &
  MatrixAxisYOptions &
  SpacingOptions;

/**
 * 横軸、要素数指定
 */
type MatrixAxisXWithCountOptions = {
  childCountX: ChildCountOptions['childCountX'];
  childSizeX?: ChildSizeOptions['childSizeX'];
  childX?: never;
};

/**
 * 横軸、テンプレート指定
 */
type MatrixAxisXWithTemplateOptions = {
  childCountX?: never;
  childSizeX?: never;
  chilsX: ChildOptions['childX'];
};

/**
 * 横軸用オプション
 */
type MatrixAxisXOptions =
  | MatrixAxisXWithCountOptions
  | MatrixAxisXWithTemplateOptions;

/**
 * 縦軸、要素数指定
 */
type MatrixAxisYWithCountOptions = {
  childCountY: ChildCountOptions['childCountY'];
  childSizeY?: ChildSizeOptions['childSizeY'];
  childY?: never;
};

/**
 * 縦軸、テンプレート指定
 */
type MatrixAxisYWithTemplateOptions = {
  childCountY?: never;
  childSizeY?: never;
  childY: ChildOptions['childY'];
};

/**
 * 縦軸用オプション
 */
type MatrixAxisYOptions =
  | MatrixAxisYWithCountOptions
  | MatrixAxisYWithTemplateOptions;
