// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
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
