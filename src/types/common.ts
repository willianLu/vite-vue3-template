export type RequiredPick<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}
export interface Tabbar {
  title: string
  icon: string
  path: string
}
