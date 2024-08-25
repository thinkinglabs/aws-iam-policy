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
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': ['error', {'code': 120}],
    'no-multi-str': 'off',
    'require-jsdoc': 'off',
    'no-unused-vars': 'off',
  },
};
