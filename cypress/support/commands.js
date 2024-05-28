/* Variáveis */

const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'

// Comandos

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Filip')
    cy.get('#email').type('teste@email.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button','Enviar').click()
})