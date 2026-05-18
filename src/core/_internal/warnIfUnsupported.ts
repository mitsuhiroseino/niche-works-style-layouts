const _checkCSSSupport = (property: string, value: string): boolean => {
  if (typeof CSS === 'undefined' || !CSS.supports) return true;
  return CSS.supports(property, value);
};

export default function warnIfUnsupported(
  layout: string,
  checks: [string, string][],
): void {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  checks.forEach(([property, value]) => {
    if (!_checkCSSSupport(property, value)) {
      console.warn(
        `[@niche-works/style-layouts] "${property}: ${value}" is not supported in this browser. The "${layout}" layout may not work as expected.`,
      );
    }
  });
}
