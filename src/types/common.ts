import { RouteLocationNormalized } from 'vue-router'
export interface Tabbar {
  title: string
  icon: string
  url: string
}

export interface PageAliveAction {
  type: 'push' | 'replace' | 'go' | 'back' | 'forward'
  delta?: number
}

export type PageAliveRoute = {
  fullPath: string
  href?: string
  name: string
  position: number
}
export interface StorageOptions {
  maxAge?: number | string
  timestamp?: number
}

export type StorageData = {
  value: any
} & StorageOptions
