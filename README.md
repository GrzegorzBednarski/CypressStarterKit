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
### Husky - [documentation](https://typicode.github.io/husky/#/?id=install)
Husky is a tool that makes Git hooks easy to manage and use. It allows us to run scripts at different stages of the Git workflow.

In this project, we use Husky to trigger lint-staged actions before each commit, ensuring that all staged files are linted and formatted correctly before they are committed.

Husky's configuration is located in the `.husky` directory, where each file represents a specific Git hook. For example, the `pre-commit` file is a script that Husky will run before each commit.

This script will run lint-staged before each commit. If lint-staged passes, the commit will be made; if not, the commit will be aborted.

We are using it to call `Lint-staged` actions before each commit.
### Lint-staged - [documentation](https://github.com/okonet/lint-staged)
This tool runs a set of predefined actions only on files that have been changed and staged in Git before a commit. This ensures that only the changes you've made and are about to commit are checked and processed by the linters and formatters, helping to keep the codebase clean and consistent.

In this project, we use lint-staged to run `ESLint` and `Prettier` on our staged files. The configuration is located in the `package.json` file:
```sh
"lint-staged": {
  "**/*.{js,ts}": [
    "prettier --write",
    "eslint --fix --debug"
  ]
}
```
This configuration tells lint-staged to run Prettier and ESLint on any staged JavaScript or TypeScript files. Prettier will format the code, and ESLint will fix any issues it can and print debug information for any issues it can't automatically fix.
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