describe('the website functions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('then shows the header', () => {
    cy.findByText('Welcome to Astro').should('be.visible')
  })
})