// 库模式打包src/main.ts
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'WebextFetch',
      fileName: (format) => `webext-fetch.${format}.js`,
    },
    rollupOptions: {
      external: ['chrome'],
      output: {
        globals: {
          chrome: 'chrome',
        },
        // 添加以下配置以生成声明文件
        sourcemap: true,
      },
    },
    // 添加以下配置以生成声明文件
    // declaration: true,
  },
})
