/**
 * 有効な値か
 * @param value
 * @returns
 */
export default function hasValue(
  value: string | number | boolean | null | undefined,
): value is string | number | boolean {
  if (typeof value === 'number') {
    return true;
  } else if (typeof value === 'boolean') {
    return true;
  } else {
    return value !== null && value !== undefined && value !== '';
  }
}
