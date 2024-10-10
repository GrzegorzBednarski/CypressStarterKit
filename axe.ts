const AXE_CONFIG = {
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa',
      'section508',
    ],
  },
  rules: {
    'color-contrast': { enabled: true }, // Remember to leave detailed info why specific rule was disabled
    'aria-input-field-name': { enabled: false }, // Disabled according to TASK-123, due to accessibility issues in certain browsers
    'nested-interactive': { enabled: false }, // Disabled according to TASK-456, to prevent interaction conflicts
    'frame-title': { enabled: false }, // Disabled according to TASK-789, for SEO optimization purposes
    'select-name': { enabled: false }, // Disabled according to TASK-101, due to accessibility issues in certain browsers
  },
};

export default AXE_CONFIG;
