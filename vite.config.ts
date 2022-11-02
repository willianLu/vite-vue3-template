import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from '@nabla/vite-plugin-eslint'
// import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    // 开启pwa，必须https服务支持
    // VitePWA({
    //   injectRegister: 'auto',
    //   manifest: {
    //     name: 'viteApp',
    //     short_name: 'cm20',
    //     description: 'cm20 操作系统',
    //     icons: [
    //       {
    //         src: '/love.png',
    //         sizes: '128x128',
    //         type: 'image/png'
    //       }
    //     ],
    //     background_color: '#ee5353'
    //   },
    //   registerType: 'autoUpdate'
    // }),
    svgLoader()
  ],
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
  },
  build: {
    rollupOptions: {
      output: {
        // chunk代码输入位置
        chunkFileNames: 'js/[name]-[hash].js',
        // 入口文件代码输出位置
        entryFileNames: 'js/[name]-[hash].js',
        // 资源文件输入位置处理
        assetFileNames: assetInfo => {
          const { name } = assetInfo
          const index = name.lastIndexOf('.')
          const ext = name.substring(index + 1)
          // 图片类型文件存放在images文件夹下
          if (/^[png|jpg|gif|jpeg|svg]$/.test(name.toLocaleLowerCase())) {
            return `images/[name]-[hash].${ext}`
          }
          return `${ext}/[name]-[hash].${ext}`
        },
        // code splitting 拆包
        manualChunks(id) {
          // vue相关包放到一起
          if (/node_modules\/(vue|vue-router)/.test(id)) {
            return 'vue-vendor'
          }
          // svg icon 打包到一起
          if (/icons\/(.)\.svg/.test(id)) {
            return 'svg-icons'
          }
          // 第三方modules打包在一起
          if (/node_modules/.test(id)) {
            return 'vendor'
          }
        }
      }
    }
  },
  esbuild: {
    // 打包删除console 和 debugger
    drop: ['console', 'debugger']
  }
})
