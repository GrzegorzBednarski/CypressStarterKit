# CypressStarterKit
Cypress framework with pre-configured plugins

# Prerequisites
- NPM (tested on 10.5.0) [documentation](https://www.npmjs.com/package/npm)
- Node.js (tested on 20.12.2) [documentation](https://nodejs.org/)

# Installation
Execute following lines in your console:
```sh
npm install
```

# Environment files
In this project, we use environment configuration files to manage settings that may vary between different environments (like dev, stage, prod). 
These files are located at `cypress/environments/` and contain placeholders for keys, credentials, and other environment-specific values.

Each environment file is a JSON file with a structure like this:
```json
{
  "baseUrl": "https://www.example.com",
  "env": {
    "api_key": "${api-key}",
    "user1": {
      "username": "sampleUserName",
      "password": "${dev-user1-password}"
    }
  }
}
```
The placeholders are formatted as `${environment-key}` and need to be replaced with actual values before running the tests. 
For example, you might replace `${prod-api-key}` with the actual API key for your application for the prod environment.

### How to create a new environment file?
To create an environment configuration for a specific environment, make a copy of the corresponding `.example.env.json` file, change name and remove the dot from the filename. 
For example, copy `.example.env.json` to `dev.env.json`.

### Where to find the actual values?
The actual values for sensitive data placeholders should be securely stored in a secret management system, such as a Secret Server, AWS Secrets Manager, or Azure Key Vault. 
The exact location of these values will depend on your specific project and infrastructure setup. 
Please refer to your project's documentation or consult with your team to find out where these values are stored.

Please note: Never hard-code sensitive information, such as passwords or API keys, directly into your code or commit them to your version control system. Always use secure methods for storing and accessing sensitive data.

### How to replace the placeholders?
Once you have the actual values, simply replace each placeholder in the JSON files with its corresponding value. 
Make sure to keep the double quotes `"` around the values to ensure the JSON syntax is correct.

For example, if the actual API key for the development environment is 123456, you would replace {api-key} with 123456 in the dev.env.json file:
```json
{
  "baseUrl": "https://www.example.com",
  "env": {
    "api_key": "123456",
    "user1": {
      "username": "sampleUserName",
      "password": "${dev-user1-password}"
    }
  }
}
```
Please note: Do not commit these updated files to the repository to avoid exposing sensitive data. Consider adding the environment configuration files to your .gitignore file to prevent them from being accidentally committed.

### Scripts to run tests
Once you've created your new environment file, you can add scripts to your `package.json` file to run tests with this specific environment configuration. 
These scripts should use the `--env` option to specify the environmentName that corresponds to your new environment file.

Here's an example of how you can add scripts to run functional tests in the dev environment:
```json
{
  "scripts": {
    "cy:run:functional:dev": "cypress run --spec 'cypress/e2e/functional/**/*' --env environmentName=dev",
    "cy:open:dev": "cypress open --env environmentName=dev"
  }
}
```        
In the `cy:run:functional:dev` script, we use the `--spec` option to specify which tests to run. 
In this case, it's all tests inside the `cypress/e2e/functional/` directory. 

The `--env` option is used to specify that we want to use the `dev.env.json` file for the environment configuration.

The `cy:open:dev` script opens the Cypress GUI with the `dev` environment configuration. No path is specified here, you will pick tests to open manually.

You can choose between the `open` or `run` commands depending on whether you want to use the Cypress GUI  or run the tests in the command line, respectively.

# Running

### Cypress GUI Runner
Run it locally on your system with Cypress GUI runner. Note that runner will use browsers installed on your OS.

Example for prod:
 ```sh
 npm run cy:open:prod
 ```

### Run tests headlessly
Run it locally and headlessly on Chrome:
 ```sh
 npm run cy:run:prod
 ```

### Different types of tests
It's worth to group test types in separate scripts:
```sh
npm run cy:run:accessibility:prod
```
```sh
npm run cy:run:analytics:prod
```
```sh
npm run cy:run:api:prod
```
```shell
npm run cy:run:lighthouse:prod
```
```sh
npm run cy:run:functional:prod
```
```sh
npm run cy:run:visual:prod
```

# Configuration

### Main config - [documentation](https://docs.cypress.io/guides/references/configuration#cypress-json)
General configuration is set in `cypress.config.js` file.

### Overwriting config values - [documentation](https://docs.cypress.io/guides/guides/command-line#How-to-run-commands)
You can overwrite specific configuration parameters by passing them via the command line interface (CLI). This allows you to change settings for a single test run without modifying the configuration files.

In addition, you can use a specific environment configuration file to overwrite settings for different environments (see the `Environment Files` section for more details). 
This is useful for managing settings that vary between development, staging, and production environments.

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

If you want to run it manually, type code mentioned below (in cypress main directory):
 ```sh
 npm run cy:prettier
 ```

### TypeScript - [documentation](https://www.typescriptlang.org/)
This project utilizes TypeScript, which adds static typing to JavaScript and helps in maintaining clean and understandable code.

The TypeScript configuration is located in the `tsconfig.json` file. This file includes TypeScript compiler options and specifies which files should be included in the compilation process.

For more information about TypeScript in Cypress, see [Cypress & TypeScript](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript).

# Usage

### Accessibility tests
We are using [cypress-axe](https://github.com/component-driven/cypress-axe) for accessibility testing.

We recommend putting your config in the `cypress/axe.ts` file.

The reporter configuration can be found in the `cypress/axe-reporter.ts` file.


Sample `config file`:
```ts
const AXE_CONFIG = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'section508'],
  },
  rules: {
    'color-contrast': { enabled: false } // this rule will be ignored
  }
}

export default AXE_CONFIG;
```

Sample usage:
- Using settings from the config file
```ts
//import config files
import AXE_CONFIG from "../../../axe";
import terminalLog from "../../../axe-reporter";
//...
    cy.injectAxe();
    cy.checkA11y(null, AXE_CONFIG, terminalLog);
//...
```
- Manually setting the config

```ts
//import config file
import terminalLog from "../../../axe-reporter";
//...
cy.checkA11y(
  null,
  {
    runOnly: {
      type: 'tag',
      values: ['wcag2aa']
    },
    rules: {
      'color-contrast': { enabled: false } // this rule will be ignored
    }
  },
  terminalLog
);
//...
```

The report will be created under `build/axe/axe-report.json`

For more details, refer to the following resources:
- [Documentation](https://www.deque.com/axe/core-documentation/api-documentation/)

### Analytics
We have two custom Cypress commands that allow us to verify if spy is called with a given object.

The first command, `pushDataLayer`, starts spying on dataLayer events and needs to be used before the second command. You can skip using it if you are only checking pageLoad analytics.

The second command, `checkAnalytics`, compares the expected results with the data from dataLayer.

Example usage:
```ts
it('Check analytics after click at logo', () => {
   cy.visit('http://www.example.com').pushDataLayer();
   cy.get('#logo').click()
   cy.checkAnalytics('/clicks/logo');
});
```
In the example above, we first visit a web page and use the `pushDataLayer` command to start spying on dataLayer events. Then, we perform any necessary actions for the test. Finally, we use the `checkAnalytics` command, passing the path to the file with expected results located under `fixtures/analytics`

Example fixture file with expected results:
```json
{
  "event": "pageEvent",
  "actionType": "click",
  "clickType": "internal",
  "pageElement": {
    "siteSection": "MastHead TopNav",
    "elementLayer1": "top-navigation",
    "elementLayer2": "image",
    "itemIdentifier": "Brand logo"
  }
}
```
If you have dynamic elements in your expected results (e.g., URL or element name), you can replace them with placeholders. Multiple elements can be passed in an array.

Example fixture file with dynamic elements:
```json
{
  "event": "pageEvent",
  "actionType": "click",
  "clickType": "internal",
  "pageElement": {
    "siteSection": "MastHead MegaMenu",
    "elementLayer1": "snippet reference-megamenu-v2-tablet-variant-disabled",
    "elementLayer2": "megamenu",
    "elementLayer3": "richtext",
    "itemIdentifier": "%NAME%",
    "internalDestination": "%URL%"
  }
}
```
Usage:
```ts
  it('Check analytics after click at link with dynamic title', () => {
    cy.get('a.dynamicTitle')
        .trigger('click')
        .invoke('attr', 'href')
        .then(url => {
            cy.get('a.dynamicTitle')
                .invoke('text')
                .then(title => {
                    cy.checkAnalytics('/clicks/dynamic-title', [
                        { '%URL%': url },
                        { '%NAME%': title },
                    ]);
                });
        });
});
```
In the example above, we simulate a click on a link with a dynamic title. We extract the URL and title, and then use the `checkAnalytics` command, passing the path to the file with expected results and an array of replacements for the dynamic elements.

### Cookies
We can open pages with some predefined cookies.
First define cookie in `data/cookies.ts`
Sample cookies.ts file:
```ts
export const COOKIE_CONSENT: Cypress.Cookie = {
    name: 'OptanonAlertBoxClosed',
    value: '2023-03-27T15:33:07.230Z',
    path: '/',
    domain: '.www.vml.com',
    httpOnly: false,
    secure: false,
};
```
Test usage:
```ts
import { COOKIE_CONSENT } from '../../data/cookies';
cy.setCookies([COOKIE_CONSENT]);
cy.visit(PAGES.COMPONENTS);
```

### Cypress-Real-Events [documentation](https://github.com/dmtrKovalenko/cypress-real-events)
Fires a real native events.

Example:
```ts
cy.get('button').realHover({ position: 'bottomLeft' }); // hovers over the bottom left corner of button
```

### Filtering out console errors
To filter out specific console error, just paste code below into `support/e2e.ts` file.

```ts
Cypress.on(
'uncaught:exception',
err => !(err.message.includes('Sample error text') || err.message.includes('Another error text')),
);
```

### iFrames
We are using [cypress-iframe](https://gitlab.com/kgroat/cypress-iframe) plugin.

Sample usage:
```ts
cy.frameLoaded('#iFrameID');
    cy.enter('#iFrameID').then(getBody => {
        getBody().find('#sampleInput')
            .type('name');
        getBody().find('#sampleButton')
            .click();
        getBody().percySnapshot('Snapshot_Name');
    })
```

### Passwords (Environment variables)
In this project, we use environment variables to manage sensitive data, such as usernames, passwords, and API keys. 
These values are stored in the environment configuration files (see the `Environment files` section for more details) and can be accessed via `Cypress.env()`.

Here's how you can log the `username` and `password` for the `admin` user, as well as the `api-key`, to the console:
```ts
cy.log(Cypress.env('admin').username);
cy.log(Cypress.env('admin').password);
cy.log(Cypress.env('api-key'));
```
In these examples, `Cypress.env('admin')` returns the `admin` object from the environment configuration.
The `.username` and `.password` access the `username` and `password` properties of this object. 

`Cypress.env('api-key')` returns the value of the `api-key` from the environment configuration.

### Paths
We can store all needed paths to pages that we will use during our tests in `data/paths.ts` file.

```ts
export const PAGES = {
  HOMEPAGE: '/',
  ABOUT: '/about-us',
};
```
Then use it in our test-spec file e.g.
```ts
import { PAGES } from '../../data/paths';
//...
    cy.visit(PAGES.HOMEPAGE);
//...
```
### Selectors
We can store all selectors used in our tests in `data/selectors.ts` file.

```ts
export const COOKIE_BANNER = {
  ACCEPT_ALL_COOKIES_BUTTON: '#onetrust-accept-btn-handler',
  COOKIE_BANNER: '#onetrust-banner-sdk',
};

export const NAVIGATION = {
  WT_LOGO: '.wt-logo',
};
```
Then use it in our test-spec file e.g.
```ts
//import only sections that you will use in specific test-spec
import { COOKIE_BANNER, NAVIGATION } from '../../data/selectors';
//...
     cy.get(NAVIGATION.WT_LOGO)
        .should('be.visible');
     cy.get(COOKIE_BANNER.COOKIE_BANNER)
        .should('be.visible');
//...
```

### Visual tests
For visual comparison, we are using [percy](https://docs.percy.io/docs).

We are using `.percy.json` file as our global config.

To authenticate project with Percy, you need to provide Percy token. You have to log in to https://percy.io, project token you can find in Project settings.
Open your terminal and navigate to your project's directory.
Use the following command to set the PERCY_TOKEN environment variable with Percy token:

Windows:    
`$Env:PERCY_TOKEN = "token"`

MacOS, Linux (also Windows Bash console):    
`export PERCY_TOKEN=token`

Dealing with lazy loading:
```ts
cy.visit('https://example.com')
    .scrollTo('bottom',{
        duration: 1000
    });
```
Ignoring some elements:
```ts
cy.percySnapshot("Region ignoring", {
      percyCSS: "iframe {display: none; }"
  });
```
Replacing dynamic text (e.g. search result titles):
```ts
cy.get('#elementID').each((title) =>{
    cy.wrap(title).invoke('text', 'Lorem ipsum');
});
```
Replacing images:
```ts
cy.get('#elementID').each((image) => {
    cy.wrap(image).invoke('attr', 'src', 'https://image.url.com');
});
```
Report can be found at [percy projects](https://percy.io/) page.

Please note that Percy only captures screenshots when run in command line mode. It does not capture screenshots in GUI mode.

More details here:
- [documentation](https://docs.percy.io/docs/cypress)
- [global configuration](https://docs.percy.io/docs/sdk-configuration)

# Knowledge Base

[Chai assertions](https://www.chaijs.com/api/bdd/)