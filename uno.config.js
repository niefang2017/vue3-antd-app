// import presetIcons from '@unocss/preset-icons/browser'
import { defineConfig } from 'vite'
import { presetIcons } from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetIcons({
      customizations: {
        transform(svg, collection, icon) {
          // do not apply fill to this icons on this collection
          if (collection === 'custom' && icon === 'my-icon') return svg
          return svg.replace(/#fff/, 'currentColor')
        }
      },
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then((i) => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default),
        antd: () => import('@iconify-json/ant-design/icons.json').then((i) => i.default)
      }
    })
  ]
})
