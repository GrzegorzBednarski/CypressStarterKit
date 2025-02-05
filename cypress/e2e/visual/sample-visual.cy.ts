import { PAGES } from '../../data/paths';
import { COOKIE_CONSENT } from '../../data/cookies';

describe('Sample visual', () => {
  it('Contact Us', () => {
    cy.setCookies([COOKIE_CONSENT]);
    cy.visit(PAGES.CONTACT_US);
    cy.percySnapshot('Contact Us');
  });
});
