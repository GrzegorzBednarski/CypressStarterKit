// eslint-disable-next-line import/prefer-default-export
export const CONFIG = {
  thresholds: {
    performance: 50,
    accessibility: 90,
    'best-practices': 80,
    seo: 80,
    pwa: 40,
  },
  options: {},
  cfg: {
    output: 'html',
    extends: 'lighthouse:default',
  },
};
