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
     * Hide fetch requests from the Cypress command log.
     *
     * @memberof Chainable
     * @example
     *    cy.hideFetch();
     * @returns {void}
     */
    hideFetch(): void;

    /**
     * Intercept a request with the specified method and URL, optionally modify data using replacement values, and respond with a fixture.
     *
     * @memberof Chainable
     * @example
     *    cy.interceptWithFixture('GET', '/api/endpoint', '/fixture.json', 'myAlias');
     *    cy.interceptWithFixture('GET', '\\/api\\/endpoint.*', '/fixture_regexp.json', 'myAliasRegexp', true);
     *    cy.interceptWithFixture('POST', '/api/submit', '/submit_fixture.json', 'submitAlias', false, 201, [{ '%key%': 'value' }, { '%key2%': 'value2' }]);
     *
     * @param {string} method - The HTTP method of the request to intercept (e.g., 'GET', 'POST')
     * @param {string} url - The URL or URL pattern of the request to intercept
     * @param {string} fixturePath - Path to the fixture file (under /intercept)
     * @param {string} alias - Alias for the intercepted request
     * @param {boolean} [regexp] - Optional flag to indicate if the URL should be treated as a regular expression (default: false)
     * @param {number} [statusCode] - Optional HTTP status code for the response (default: 200)
     * @param {Array<Record<string, string>>} [replacementArray] - Optional array of replacements to modify fixture data
     * @returns {void}
     */
    interceptWithFixture(
      method: string,
      url: string | RegExp,
      fixturePath: string,
      alias: string,
      regexp?: boolean,
      statusCode?: number,
      replacementArray?: Array<Record<string, string>>,
    ): void;

    /**
     * Runs a lighthouse audit
     * @example
     * cy.lighthouse(thresholds,opts,config)
     */
    lighthouse(thresholds?: unknown, opts?: unknown, config?: unknown);

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
     * Replace the text content of elements matching the selector.
     *
     * @memberof Chainable
     * @example
     *    cy.replaceText('.selector', 'new text');
     * @param {string} selector - The selector for the elements.
     * @param {string} text - The new text to set.
     * @returns {Chainable<JQuery<HTMLElement>>}
     */
    replaceText(selector: string, text: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Set given cookies
     *
     * @param {Array<Cypress.Cookie>} cookies List of cookies to add
     * @returns {void}
     * @memberof Chainable
     * @example
     *    cy.setCookies([COOKIE_1, COOKIE_2]);
     */
    setCookies(cookies: Array<Cypress.Cookie>): void;
  }
}
