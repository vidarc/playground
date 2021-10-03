describe('the website functions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('then shows the header', () => {
    cy.findByText('Hello. This will be something at some point.').should(
      'be.visible'
    );
  });
});
