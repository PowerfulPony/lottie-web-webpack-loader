const path = require('path');

const OFF = 'off';
const ERROR = 'error';
const PRODUCTION = 'production';
const READONLY = 'readonly';

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  plugins: ["import"],
  extends: [
    "airbnb-base",
    "plugin:sonarjs/recommended",
  ],
  rules: {
    'no-console': process.env.NODE_ENV === PRODUCTION ? ERROR : OFF,
    'no-debugger': process.env.NODE_ENV === PRODUCTION ? ERROR : OFF,
    'import/no-extraneous-dependencies': OFF,
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};
