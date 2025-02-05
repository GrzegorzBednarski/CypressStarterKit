import { PAGES } from '../../data/paths';
import { CONFIG } from '../../config/lighthouse';

describe(
  'Sample lighthouse',
  {
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },
  () => {
    it('Homepage', () => {
      cy.visit(PAGES.HOMEPAGE);
      cy.lighthouse(CONFIG.thresholds, CONFIG.options, CONFIG.cfg);
    });
    it('Contact Us', () => {
      cy.visit(PAGES.CONTACT_US);
      cy.lighthouse(
        { 'best-practices': 80, seo: 80 },
        CONFIG.options,
        CONFIG.cfg,
      );
    });
  },
);
