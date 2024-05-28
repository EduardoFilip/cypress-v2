   /* TC001 - Testa a página da política de privacidade de forma independente */
   it.only('TC017 - Testa a página da política de privacidade de forma independente', function (){
cy.visit('./src/privacy.html')

    cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino. Talking About Testing')
    .should('be.visible')

})