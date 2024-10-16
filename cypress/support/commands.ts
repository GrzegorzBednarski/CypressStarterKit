// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    cy: any;

    realHover(): unknown;

    /**
     * Check if spy is called with given object
     *
     * @memberof Chainable
     * @example
     *    cy.checkAnalytics(fixtureFilePath, [
     *      { 'stringToBeReplaced': 'newString1' },
     *      { 'stringToBeReplaced': 'newString2' },
     *      { 'numberToBeReplaced': 42 }
     *    ]);
     *
     * @param {string} fixture - Path to the expected results (under fixture/analytics)
     * @param {Array<Record<string, string | number>>} [replacementValues] - Array of replacement values
     * @returns {void}
     */
    checkAnalytics(fixture: string, replacementValues?): void;

    /**
     * Clears all session storage, local storage and cookies.
     *
     * @memberof Cypress.Chainable
     * @example
     * ```
     * cy.clearSession();
     * ```
     */
    clearSession(): void;

    /**
     * Intercept a request with the specified method and URL, and respond with a fixture.
     *
     * @memberof Chainable
     * @example
     *    cy.interceptWithFixture('GET', '/api/endpoint', '/fixture.json', 'myAlias');
     *    cy.interceptWithFixture('GET', '\\/api\\/endpoint.*', '/fixture_regexp.json', 'myAliasRegexp', true);
     *
     * @param {string} method - The HTTP method of the request to intercept (e.g., 'GET', 'POST')
     * @param {string} url - The URL or URL pattern of the request to intercept
     * @param {string} fixturePath - Path to the fixture file (under /intercept)
     * @param {string} alias - Alias for the intercepted request
     * @param {boolean} [regexp] - Optional flag to indicate if the URL should be treated as a regular expression
     * @returns {void}
     */
    interceptWithFixture(
      method: string,
      url: string,
      fixturePath: string,
      alias: string,
      regexp?: boolean,
      statusCode?: number,
    ): void;

    /**
     * Load a fixture file and replace specified keys with given values
     *
     * @example
     *    cy.loadFixtureWithReplacements('example.json', [
     *      { 'key1': 'newValue1' },
     *      { 'key2': 'newValue2' },
     *      { 'key3': 42 }
     *    ]).then((updatedFixtureData) => {
     *      // Use updatedFixtureData in the test
     *    });
     *
     * @param {string} fixturePath - Path to the fixture file
     * @param {Array<Record<string, string | number>>} [replacementsArray] - Array of replacement key-value pairs (optional)
     * @returns {Cypress.Chainable}
     */
    loadFixtureWithReplacements(
      fixturePath: string,
      replacementsArray?: Array<Record<string, string | number>>,
    ): Chainable;

    /**
     * Set a spy on window.dataLayer.push
     *
     * @memberof Chainable
     * @returns {Chainable<Window>} The Chainable object
     */
    pushDataLayer(): Chainable<Window>;

    /**
     * Yields window with opened url with given cookies
     *
     * @param {string} url Page URL
     * @param {Array<Cypress.Cookie>} cookies List of cookies to add
     * @returns {Chainable<Window>} The Chainable object representing the window
     * @memberof Chainable
     * @example
     *    cy.visitWithCookies("www.example.com", [COOKIE_1, COOKIE_2]);
     */
    visitWithCookies(
      url: string,
      cookies: Array<Cypress.Cookie>,
    ): Chainable<Window>;
  }
}

Cypress.Commands.add('checkAnalytics', (fixture: string, replacementValues) => {
  cy.loadFixtureWithReplacements(`analytics${fixture}`, replacementValues).then(
    finalExpectData => {
      cy.get('@dataL').should('be.calledWithMatch', finalExpectData);
    },
  );
});

Cypress.Commands.add('clearSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then(win => {
    win.sessionStorage.clear();
  });
});

/* eslint-disable @typescript-eslint/default-param-last */
Cypress.Commands.add(
  'interceptWithFixture',
  (method, urlPattern, fixturePath, alias, regexp = false, statusCode) => {
    const urlMatcher = regexp ? new RegExp(urlPattern) : urlPattern;

    cy.fixture(`/intercept${fixturePath}`).then(data => {
      cy.intercept(
        {
          method,
          url: urlMatcher,
          headers: {},
        },
        req => {
          req.reply(res => {
            if (statusCode) {
              res.send(statusCode, data);
            } else {
              res.send(data);
            }
          });
        },
      ).as(alias);
    });
  },
);
/* eslint-enable @typescript-eslint/default-param-last */

Cypress.Commands.add(
  'loadFixtureWithReplacements',
  (fixturePath, replacementsArray) => {
    const applyReplacements = (obj, replacements) => {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
          applyReplacements(obj[key], replacements);
        } else {
          const replacement = replacements.find(
            ({ key: rKey }) => rKey === obj[key],
          );
          if (replacement) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = replacement.value;
          }
        }
      });
    };

    return cy.fixture(fixturePath).then(fixtureData => {
      const updatedFixtureData = { ...fixtureData };

      if (replacementsArray) {
        const replacements = replacementsArray
          .map(Object.entries)
          .map(([[key, value]]) => ({
            key,
            value: typeof value === 'string' ? value.trim() : value,
          }));

        applyReplacements(updatedFixtureData, replacements);
      }

      cy.log(`***Loaded JSON file: ${JSON.stringify(updatedFixtureData)}***`);

      return cy.wrap(updatedFixtureData);
    });
  },
);

Cypress.Commands.add('pushDataLayer', { prevSubject: true }, subject => {
  cy.wrap(subject)
    .its('dataLayer')
    .should('respondTo', 'push')
    .then(dataLayer => {
      cy.spy(dataLayer, 'push').as('dataL');
    });
});

Cypress.Commands.add(
  'visitWithCookies',
  (url: string, cookies: Array<Cypress.Cookie>) => {
    cookies.forEach(cookie => {
      cy.setCookie(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
        sameSite: cookie.sameSite,
      });
    });
    cy.visit(url);
  },
);
