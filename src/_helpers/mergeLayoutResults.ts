import clsx from 'clsx';
import type { LayoutResult } from '../types';

export default function mergeLayoutResults(
  results: LayoutResult[],
): LayoutResult {
  // 全てのクラス&スタイルを統合
  return results.reduce<LayoutResult>((layoutResult, result) => {
    if (result.className) {
      layoutResult.className = clsx(layoutResult.className, result.className);
    }
    if (result.style) {
      layoutResult.style = { ...layoutResult.style, ...result.style };
    }
    return layoutResult;
  }, {} satisfies LayoutResult);
}
