# CypressStarterKit
Cypress framework with pre-configured plugins

# Configuration
### ESLint - [documentation](https://eslint.org/docs/user-guide/configuring/rules)
Linter used for static code analysis. You can change default configuration in `.eslintrc` file.

Prettier is fired automatically before each commit (check `Lint-staged` and `Husky` sections).

If you want to run it manually, type (in cypress main directory):
 ```sh
 npm run cy:eslint
 ```
### Prettier - [documentation](https://prettier.io/docs/en/options.html)
Code formatter tool. You can change default configuration in `.prettierrc` file.

Prettier is fired automatically before each commit (check `Lint-staged` and `Husky` sections).

If you want to run it manually, type (in cypress main directory):
 ```sh
 npm run cy:prettier
 ```
### TypeScript - [documentation](https://www.typescriptlang.org/)
This project utilizes TypeScript, which adds static typing to JavaScript and helps in maintaining clean and understandable code.

The TypeScript configuration is located in the `tsconfig.json` file. This file includes TypeScript compiler options and specifies which files should be included in the compilation process.

For more information about TypeScript in Cypress, see [Cypress & TypeScript](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript).

# Knowledge Base

[Cypress & TypeScript](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript)

[TypeScript](https://www.typescriptlang.org/)