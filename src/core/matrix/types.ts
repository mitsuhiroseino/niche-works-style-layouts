import type {
  AdjustOptions,
  AlignOptions,
  ChildCountOptions,
  ChildRatioOptions,
  ChildSizeOptions,
  DirectionOptions,
  GapOptions,
  TracksOptions,
} from '../_types';

export type MatrixLayoutOptions = DirectionOptions &
  AlignOptions &
  AdjustOptions &
  ChildRatioOptions &
  GapOptions &
  MatrixAxisXOptions &
  MatrixAxisYOptions;

/**
 * 横軸、要素数指定
 */
type MatrixAxisXWithCountOptions = {
  childCountX: ChildCountOptions['childCountX'];
  childSizeX?: ChildSizeOptions['childSizeX'];
  tracksX?: never;
};

/**
 * 横軸、テンプレート指定
 */
type MatrixAxisXWithTemplateOptions = {
  childCountX?: never;
  childSizeX?: never;
  tracksX: TracksOptions['tracksX'];
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
  tracksY?: never;
};

/**
 * 縦軸、テンプレート指定
 */
type MatrixAxisYWithTemplateOptions = {
  childCountY?: never;
  childSizeY?: never;
  tracksY: TracksOptions['tracksY'];
};

/**
 * 縦軸用オプション
 */
type MatrixAxisYOptions =
  | MatrixAxisYWithCountOptions
  | MatrixAxisYWithTemplateOptions;
