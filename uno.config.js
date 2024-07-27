// import presetIcons from '@unocss/preset-icons/browser'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-base': 'bg-[#f0f0f0] dark:bg-[#20202a]',
    'card-base': 'bg-[#ffffff] dark:bg-[#1a1a1a]',
    'text-base': 'text-[#20202a] dark:text-[#f0f0f0]',
    'switch-label-base': 'bg-gray-200 dark:bg-gray-800',
    'switch-span-base': 'bg-white dark:bg-gray-300',
    'color-base': 'text-[#999999] dark:text-[#333333]',
    'color-primary': 'text-[#1677ff] dark:text-[#1668dc]',
    'section-search': 'card-base p-16 ml-10 mr-10',
    'section-content': 'card-base p-16 ml-10 mr-10'
  },
  presets: [
    presetUno(),
    presetTypography(),
    presetAttributify(),
    presetRemToPx({
      baseFontSize: 4 // 默认16
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      },
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
