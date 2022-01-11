/**
 * eslint的配置文件
 */
module.exports = {
  parser: '@typescript-eslint/parser', // 指定ESLint解析器
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // 使用@typescript-eslint/eslint-plugin推荐的规则
    'prettier/@typescript-eslint', // 使用eslint-config-prettier禁用@typescript-eslint/eslint-plugin中的ESLint规则
    'plugin:prettier/recommended',
  ],
  pulgins: [
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2018, // 允许解析现代ECMAScript特性
    sourceType: 'module', // 允许使用 imports 导入
    ecmaFeatures: {
      jsx: true, // 语序解析JSX
    },
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        modifiers: ['const'],
        format: null,
      },
    ],
    '@typescript-eslint/unified-signatures': 0,
    '@typescript-eslint/adjacent-overload-signatures': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-empty-pattern': 0,
    'no-template-curly-in-string': 0,
    'no-return-await': 0,
    'no-console': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-require-imports': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/jsx-wrap-multilines': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-curly-newline': 0,
    'no-param-reassign': ['error', { props: false }],
    'react/display-name': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    '@typescript-eslint/no-empty-function': 0,
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      version: 'detect', // 告诉eslint-plugin-react自动检测要使用的React版本
    },
  },
};
