module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    APIError: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    camelcase: 0
  },
  plugins: ["jest"],
  "extends": ["plugin:jest/recommended"]
}
