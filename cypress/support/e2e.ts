/* eslint-disable @typescript-eslint/no-unused-vars */
import './commands';
import '@percy/cypress';
import 'cypress-axe';
import 'cypress-iframe';
import 'cypress-real-events/support';

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
