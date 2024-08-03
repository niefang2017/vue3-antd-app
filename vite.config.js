import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        }),
        IconsResolver({
          // prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
          // alias: { park: 'icon-park' } 集合的别名
          enabledCollections: ['ep'] // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
        })
      ]
    }),
    Icons({ autoInstall: true, compiler: 'vue3' }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      config: fileURLToPath(new URL('./src/config', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
      service: fileURLToPath(new URL('./src/service', import.meta.url)),
      views: fileURLToPath(new URL('./src/views', import.meta.url)),
      store: fileURLToPath(new URL('./src/stores', import.meta.url)),
      constants: fileURLToPath(new URL('./src/constants', import.meta.url))
    },
    extensions: ['.js', '.vue', '.json', '.scss', '*']
  }
})
