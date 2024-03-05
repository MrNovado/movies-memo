module.exports = {
  plugins: ['solid'],
  extends: [
    'eslint:recommended',
    'plugin:solid/typescript',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
