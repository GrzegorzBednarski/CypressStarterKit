import { PAGES } from '../../data/paths';
import { COOKIE_PROMPT, NAVIGATION } from '../../data/selectors';
import { COOKIE_CONSENT } from '../../data/cookies';

describe('Sample functional', () => {
  it('Assert that logo is visible on homepage', () => {
    cy.visit(PAGES.HOMEPAGE);
    cy.get(NAVIGATION.VML_LOGO).should('be.visible');
  });

  it('Cookie banner will disappear after clicking cookie accept button', () => {
    cy.visit(PAGES.HOMEPAGE);
    cy.get(COOKIE_PROMPT.COOKIE_BANNER).should('be.visible');
    cy.get(COOKIE_PROMPT.ACCEPT_ALL_COOKIES_BUTTON).click();
    cy.get(COOKIE_PROMPT.COOKIE_BANNER).should('not.be.visible');
  });

  it('Cookie banner will not appear when we open page with cookie', () => {
    cy.visitWithCookies(PAGES.HOMEPAGE, [COOKIE_CONSENT]);
    cy.get(COOKIE_PROMPT.COOKIE_BANNER).should('not.exist');
  });
});
