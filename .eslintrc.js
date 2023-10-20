module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended', // 解决ESlint和Prettier冲突
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  // 配置解析vue文件
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'vue/multi-word-component-names': 'off'
  }
};
