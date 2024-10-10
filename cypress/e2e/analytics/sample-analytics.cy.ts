import { PAGES } from '../../data/paths';
import { COOKIE_PROMPT } from '../../data/selectors';

describe('Sample analytics', () => {
  it('Check analytics event after clicking accept all cookies button.', () => {
    cy.visit(PAGES.HOMEPAGE).pushDataLayer();
    cy.get(COOKIE_PROMPT.ACCEPT_ALL_COOKIES_BUTTON).click();
    cy.checkAnalytics('/acceptAllCookiesButtonClick');
  });
});
