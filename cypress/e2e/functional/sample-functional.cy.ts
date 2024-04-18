describe('Sample functional', () => {
  it('Assert that logo is visible on homepage', () => {
    cy.visit('/');
    cy.get('a[data-action="Header Logo"].logo').should('be.visible');
  });

  it('Cookie banner will disappear after clicking cookie accept button', () => {
    cy.visit('/');
    cy.get('#onetrust-banner-sdk').should('be.visible');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('#onetrust-banner-sdk').should('not.be.visible');
  });
});
