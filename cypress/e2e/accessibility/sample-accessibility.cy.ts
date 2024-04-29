import { ACCESSIBILITY } from '../../data/paths';
import AXE_CONFIG from '../../../axe';
import terminalLog from '../../../axe-reporter';

describe(
  'Accessibility scan on:',
  {
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },
  () => {
    Object.values(ACCESSIBILITY).forEach(path =>
      it(`${path}`, () => {
        cy.visit(path);
        cy.injectAxe();
        // @ts-ignore
        cy.checkA11y(null, AXE_CONFIG, terminalLog);
      }),
    );
  },
);
