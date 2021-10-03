describe('the website functions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  test('stuff shows up', () => {
    cy.findByText('Welcome to Astro').should('be.visible')
  })
})