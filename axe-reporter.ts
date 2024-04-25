export default function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
      violations.length === 1 ? 'was' : 'were'
    } detected`,
  );

  const violationTableData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }),
  );

  const violationLogData = violations.map(
    ({ id, impact, description, tags, nodes, help, helpUrl }) => ({
      id,
      impact,
      description,
      tags,
      target: nodes.map(node => node.target[0]),
      help,
      helpUrl,
    }),
  );

  cy.task('table', violationTableData);
  // cy.task('log', violationLogData);
  cy.url().then(url => {
    cy.task('saveAxeResultsToFile', { data: violationLogData, url });
  });
}
