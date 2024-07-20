# vue3-antd-app

This template should help get you started developing with Vue 3 in Vite.
node >=18

```sh
npm i -g pnpm
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### install

```sh
pnpm add  husky -D
npm pkg set scripts.prepare="husky install"
pnpm prepare
npx husky init
npx husky add .husky/pre-commit "pnpm lint"
pnpm eslint --init
# 安装 commitlint
# pnpm add @commitlint/cli @commitlint/config-conventional -D

# pnpm install commitlint-config-cz -D
pnpm install commitizen cz-conventional-changelog @commitlint/config-conventional @commitlint/cli commitlint-config-cz cz-customizable -D
# /下新建文件 commitlint.config.cjs
module.exports = {
extends: ["cz"]
}
# pageage.json	配置cs

"config": {
	"commitizen": {
		"path": "./node_modules/cz-customizable"
	},
	"cz-customizable": {
		"config": ".cz-config.cjs"
	}
}
"scripts":{
	...,
	"commit": "git add . && git cz"
}
# 配置 .cz-config.cjs
module.exports = {
	types: [
		{
			value: '✨ feat: ',
			name: '✨ feat:     新功能'
		},
		{
			value: '🐛 fix:',
			name: '🐛 fix:      修复bug'
		},
		{
			value: '📦️ build:',
			name: '📦️ build:    打包'
		},
		{
			value: '⚡️ perf:',
			name: '⚡️ perf:     性能优化'
		}, {
			value: '🎉 release:',
			name: '🎉 release:  发布正式版'
		}, {
			value: '💄 style:',
			name: '💄 style:    代码的样式美化'
		}, {
			value: '♻️  refactor:',
			name: '♻️  refactor: 重构'
		}, {
			value: '✏️  docs:',
			name: '✏️  docs:     文档变更'
		}, {
			value: '✅ test:',
			name: '✅ test:     测试'
		}, {
			value: '⏪️ revert:',
			name: '⏪️ revert:   回退'
		}, {
			value: '🚀 chore:',
			name: '🚀 chore:    构建/工程依赖/工具'
		}, {
			value: '👷 ci:',
			name: '👷 ci:       CI related changes'
		}
	],
	messages: {
		type: '请选择提交类型(必填)',
		customScope: '请输入文件修改范围(可选)',
		subject: '请简要描述提交(必填)',
		body: '请输入详细描述(可选)',
		breaking: '列出任何BREAKING CHANGES(可选)',
		footer: '请输入要关闭的issue(可选)',
		confirmCommit: '确定提交此说明吗？'
	},
	allowCustomScopes: true,
	// 跳过问题
	skipQuestions: ['body', 'footer'],
	subjectLimit: 72
}



# module.exports = {
#   extends: ["@commitlint/config-conventional"]
# }
npx husky add .husky/commit-msg 'npx --no-install commitlint -e "$HUSKY_GIT_PARAMS"'

echo "npx --no -- commitlint --edit $1" > .husky/commit-msg

# npx husky add .husky/commit-msg "npx --no-install commitlint --edit "
# pre-commit 内容
echo "🚀 pre-commit"
echo "npx --no-install lint-staged"
npx --no-install lint-staged

# commit-msg 内容
echo "🚀 commit-msg"
echo "npx --no-install commitlint --edit"
npx --no-install commitlint --edit "$1"


# 依赖自动排序
pnpm add eslint-plugin-simple-import-sort -D

```

### 安装 stylelint

```sh
# stylelint
pnpm install stylelint stylelint-config-standard -D
# 提示 stylelint-declaration-block-no-ignored-properties
pnpm install stylelint-declaration-block-no-ignored-properties -D
# 新增 .stylelintrc.cjs	文件
module.exports = {
	// 从标准配置中继承规则
	extends: ['stylelint-config-standard'],

	// 规则配置
	rules: {
	  // 禁用注释前的空行规则
	  'comment-empty-line-before': null,
	  // 禁用声明前的空行规则
	  'declaration-empty-line-before': null,
	  // 指定函数名的大小写为小写
	  'function-name-case': 'lower',
	  // 禁用选择器特异性递减规则
	  'no-descending-specificity': null,
	  // 禁用无效的双斜杠注释规则
	  'no-invalid-double-slash-comments': null,
	  // 指定规则前需要空行
	  'rule-empty-line-before': 'always',
	},

	// 忽略检查的文件或文件夹
	ignoreFiles: ['node_modules/**/*', 'build/**/*',, 'dist/**/*'],
  };

#	新增 .stylelintrc	文件
{
  "plugins": ["stylelint-declaration-block-no-ignored-properties"],
  "rules": {
    "plugin/declaration-block-no-ignored-properties": true
  }
}
#新增
```

### eslint

```sh
pnpm install @eslint/js globals eslint-plugin-vue eslint-plugin-simple-import-sort -D

# scripts
{
	scripts: {
		...,
		"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
    "format": "prettier --write src/",
    "lint:lint-staged": "lint-staged",
    "lint:stylelint": "stylelint src/ --fix --ignore-path .gitignore",
    "prepare": "husky install",
    "commit": "git add . && git cz"
	}
}

# 配置 eslintt.config.cjs
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

```

###

npx commitizen init cz-conventional-changelog --save-dev --save-exact
