module.exports = {
  'root': true,
  'ignorePatterns': ['!.*rc.js'],
  'env': {
    'browser': true,
    'es2021': true,
    'mocha': true,
  },
  'extends': [
    'google',
    'plugin:json/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'json',
  ],
  'rules': {
    'max-len': ['error', {'code': 120}],
    'no-multi-str': 'off',
    'require-jsdoc': 'off',
  },
};
