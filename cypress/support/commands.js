/* Variáveis */

const longText = Cypress._.repeat('Teste ',100)

// Comandos

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Filip')
    cy.get('#email').type('teste@email.com')
    cy.get('#open-text-area').invoke('val', longText)
    cy.contains('button','Enviar').click()
})