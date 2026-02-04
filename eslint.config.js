const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = [
  {
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
      },
    },
  },
  ...compat.extends('universe/native', 'plugin:prettier/recommended'),

  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '*.config.js',
      '**/*.config.cjs',
      'build/**',
      'eslint.config.js',
    ],

    plugins: {
      node: require('eslint-plugin-node'),
      'react-native': require('eslint-plugin-react-native'),
      prettier: require('eslint-plugin-prettier'),
    },

    rules: {
      'node/handle-callback-err': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
      'react-native/no-inline-styles': 'warn',
    },

    settings: {
      'import/resolver': {
        node: {
          paths: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
