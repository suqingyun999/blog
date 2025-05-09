import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    // 自定义规则配置
    rules: {
      'no-multiple-empty-lines': [
        'warn',
        {
          // 最多允许 1 个空行
          max: 1,
        },
      ],

      // 禁用在单行元素中将HTML内容与元素标签必须放在同一行。
      'vue/singleline-html-element-content-newline': 'off',

      // 禁用 vue/require-v-for-key 规则
      'vue/require-v-for-key': 'off',

      // 禁用语句末尾的分号
      semi: ['off', 'never'],

      // 关闭禁止未使用的表达式
      '@typescript-eslint/no-unused-expressions': 'off',
      // 关闭对非空断言的检查
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // 关闭 any 类型的检查
      '@typescript-eslint/no-explicit-any': 'off',

      // 关闭对 emit 的显式定义要求
      'vue/require-explicit-emits': 'off',

      // 关闭多单词组件名称的要求
      'vue/multi-word-component-names': 'off',

      // 关闭修改 props 的警告
      'vue/no-mutating-props': 'off',

      // 关闭未使用变量的检查
      'no-unused-vars': 'off',

      // 未使用的导入会报错
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',

          // 忽略下划线开头的变量
          argsIgnorePattern: '^_',
        },
      ],

      // 关闭对 setup 中解构 props 的检查
      'vue/no-setup-props-destructure': 'off',

      // 关闭未解析的导入警告
      'import/no-unresolved': 'off',

      // 关闭将导出标记为默认导出的警告
      'import/no-named-as-default': 'off',
    },
  },
]
