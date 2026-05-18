import clsx from 'clsx';
import type { StyleLayoutResult } from '../types';

export default function mergeLayoutResults(
  results: StyleLayoutResult[],
): StyleLayoutResult {
  // 全てのクラス&スタイルを統合
  return results.reduce<StyleLayoutResult>((layoutResult, result) => {
    if (result.className) {
      layoutResult.className = clsx(layoutResult.className, result.className);
    }
    if (result.style) {
      layoutResult.style = { ...layoutResult.style, ...result.style };
    }
    return layoutResult;
  }, {} satisfies StyleLayoutResult);
}
