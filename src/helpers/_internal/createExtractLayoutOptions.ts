/**
 * レコードからレイアウトオプションとそれ以外のプロパティを分離する関数を作成する
 *
 * @param optionsKeys レイアウトオプションのキー
 */
export default function createExtractLayoutOptions<
  TOptions extends Record<string, unknown>,
>(optionKeys: (keyof TOptions)[]) {
  const keySet = new Set(optionKeys as unknown as string[]);

  /**
   * レコードからレイアウトオプションとそれ以外のプロパティを分離する
   *
   * @param record レイアウトオプションとその他のプロパティを含むレコード
   * @returns `[layoutOptions, rest]` のタプル。`layoutOptions` はレイアウトに対応するプロパティ、`rest` はそれ以外のプロパティ
   */
  return <T extends Record<string, unknown>>(
    record: T,
  ): [TOptions, Omit<T, keyof TOptions>] => {
    const options: Record<string, unknown> = {};
    const rest: Record<string, unknown> = {};
    if (record) {
      for (const [k, v] of Object.entries(record)) {
        (keySet.has(k) ? options : rest)[k] = v;
      }
    }
    return [options as TOptions, rest as Omit<T, keyof TOptions>];
  };
}
