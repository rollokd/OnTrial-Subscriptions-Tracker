module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js}'
      ],
      parserOptions: {
        sourceType: 'script'

      }
    }
  ],
  parserOptions: {
    // project: 'tsconfig.json',
    // tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-misused-promises': 0
  },
  ignorePatterns: ['dist/**/*', 'babel.config.cjs', 'jest.config.ts']
}
