describe('the website functions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('then works as expected', () => {
    cy.findByText(
      'Hello. I am Matthew Ailes. This will be something at some point.'
    ).should('be.visible');

    cy.findByAltText('Tottenham Hotspur').should('be.visible');
    cy.findByAltText('DC United').should('be.visible');
    cy.findByAltText('Richmond Kickers').should('be.visible');

    cy.visit('/one');
    cy.findByText('This is page one');

    cy.visit('/two');
    cy.findByText('This is page two');
  });
});
