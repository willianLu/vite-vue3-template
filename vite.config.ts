import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin(), VitePWA(), svgLoader()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 把 @ 指向到 src 目录去
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 集成全局less变量
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            __dirname,
            './src/assets/css/preset.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
