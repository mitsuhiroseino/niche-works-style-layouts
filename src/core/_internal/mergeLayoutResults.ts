import type { StyleLayoutResult } from '../types';
import mergeClassName from './mergeClassName';

export default function mergeLayoutResults(
  results: StyleLayoutResult[],
): StyleLayoutResult {
  // 全てのクラス&スタイルを統合
  return results.reduce<StyleLayoutResult>((layoutResult, result) => {
    if (result.className) {
      layoutResult.className = mergeClassName(
        layoutResult.className,
        result.className,
      );
    }
    if (result.style) {
      layoutResult.style = { ...layoutResult.style, ...result.style };
    }
    return layoutResult;
  }, {} satisfies StyleLayoutResult);
}
