/** @type {import('eslint').Linter.Config} */
export default {
  root: true,
  extends: ['@zapal/dx/eslint#svelteESLintConfig'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
}
