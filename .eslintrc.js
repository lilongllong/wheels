module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/essential',
    '@vue/typescript',
    '@tencent/eslint-config-tencent',
    '@tencent/eslint-config-tencent/ts',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'max-len': ['error', { code: 120, ignoreStrings: true, ignoreUrls: true,  ignoreRegExpLiterals: true, ignoreTemplateLiterals: true }],
    'no-underscore-dangle': ['warn'],
    'spaced-comment': ['warn'],
    'no-param-reassign': ['warn', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex
      ]
    }],
    'no-unused-vars': ['warn', {
      vars: 'all',
      args: 'none',
      ignoreRestSiblings: false,
    }],
    'camelcase': ['warn'],
    'color-hex-length': 'off',
    'color-hex-case': ['off'],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ['self'], // Allow `const self = this`; `[]` by default
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
