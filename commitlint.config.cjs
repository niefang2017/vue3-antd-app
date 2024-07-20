module.exports = {
  extends: ['@commitlint/config-conventional', 'cz'],
  // rules: {
  //   'type-enum': [
  //     2,
  //     'always',
  //     [
  //       'feat', // 新功能
  //       '🐛 fix', // 修复bug
  //       '📦️ build:', // 打包
  //       '⚡️ perf:', // 性能优化
  //       '🎉 release:', // 发布正式版
  //       '💄 style:', // 代码的样式美化
  //       '♻️  refactor:', // 重构
  //       '✏️  docs:', // 文档变更
  //       '✅ test:', // 测试
  //       '⏪️ revert:', // 回退
  //       '🚀 chore:', // 构建/工程依赖/工具
  //       '👷 ci:' // CI related changes
  //     ]
  //   ]
  // }
  prompt: {
    questions: [
      {
        type: 'input',
        name: 'subject',
        message: '请输入commit信息',
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return '请输入commit信息'
          }
        }
      }
    ],
    types: [
      { value: 'feat', name: '✨ feat:     新功能', emoji: ':sparkles:' },
      { value: 'fix', name: '🐛 fix:      修复bug', emoji: ':bug:' },
      { value: 'docs', name: '✏️  docs:     文档变更', emoji: ':memo:' },
      { value: 'style', name: '💄 style:    代码的样式美化', emoji: ':lipstick:' },
      { value: 'refactor', name: '♻️  refactor: 重构', emoji: ':recycle:' },
      { value: 'perf', name: '⚡️ perf:     性能优化', emoji: ':zap:' },
      { value: 'release', name: '🎉 release:  发布正式版', emoji: ':tada:' },
      { value: 'test', name: '✅ test:     测试', emoji: ':white_check_mark:' },
      { value: 'build', name: '📦️ build:    打包', emoji: ':package:' },
      { value: 'ci', name: '👷 ci:       CI相关更改', emoji: ':ferris_wheel:' },
      { value: 'chore', name: '🚀 chore:    构建/工程依赖/工具', emoji: ':hammer:' },
      { value: 'revert', name: '⏪️ revert:   回退', emoji: ':rewind:' }
    ],
    useEmoji: true
  }
}
