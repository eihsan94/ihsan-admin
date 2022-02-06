export type Dictionary = {
  [key: string]: any
}
export const makeDict = <T>(arr: T[], key: (k: T) => string): Dictionary => {
  return arr.reduce((acc, cur) => {
    const k = key(cur) as string
    (acc as any)[k] = cur
    return acc
  }, {})
}
