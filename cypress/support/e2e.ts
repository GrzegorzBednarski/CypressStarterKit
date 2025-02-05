/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
/* eslint-disable import/no-extraneous-dependencies */
import './commands';
import '@percy/cypress';
import 'cypress-axe';
import 'cypress-iframe';
import 'cypress-real-events/support';
import '@cypress-audit/lighthouse/commands';
/* eslint-enable import/no-extraneous-dependencies */

declare global {
  interface Window {
    dataLayer: unknown[];
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {}
  }
}
Cypress.on('uncaught:exception', err => false);
