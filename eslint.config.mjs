import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default {
  root: true, // 指定此配置为根配置文件
  env: {       // 定义环境变量，这里设置为浏览器环境
    browser: globals.browser,
  },
  plugins: [   // 列出所有使用的插件
    ...pluginJs.plugins,
    ...pluginVue.plugins,
    ...simpleImportSort.plugins,
  ],
  extends: [   // 指定继承的配置规则
    pluginJs.configs.recommended, // 继承推荐的 JS 规则
    ...pluginVue.configs["flat/essential"], // 继承 Vue 的基本规则
    "plugin:simple-import-sort/recommended", // 继承导入排序的推荐规则
  ],
  overrides: [ // 覆盖某些文件的规则
    {
      files: ["**/*.{js,mjs,cjs,vue}"], // 指定应用规则的文件类型
      rules: { // 设置具体规则
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
      },
    },
  ],
};