export default function mergeClassName(
  ...classNames: (string | null | undefined)[]
): string {
  return classNames
    .reduce((result, className) => {
      if (className) {
        result.push(className);
      }
      return result;
    }, [])
    .join(' ');
}
