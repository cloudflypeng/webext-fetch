// 库模式打包src/main.ts
import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outputDir: 'dist/types',  // 声明文件的输出目录
      include: ['src/**/*.ts'], // 包含的文件
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'WebextFetch',
      fileName: (format) => `webext-fetch.${format}.js`,
    },



  },
})
