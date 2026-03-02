module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 可选：自定义提交类型（适配你的项目场景）
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'revert']
    ]
  }
};