export const toCamelCase = (s: string) =>
  s
    .split('')
    .map((ss, i) => (i === 0 ? ss.toUpperCase() : ss))
    .join('')
