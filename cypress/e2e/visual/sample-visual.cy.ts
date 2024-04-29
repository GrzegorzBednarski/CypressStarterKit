import { PAGES } from '../../data/paths';
import { COOKIE_CONSENT } from '../../data/cookies';

describe('Sample visual', () => {
  it('Contact Us', () => {
    cy.visitWithCookies(PAGES.CONTACT_US, [COOKIE_CONSENT]);
    cy.percySnapshot('Contact Us');
  });
});
