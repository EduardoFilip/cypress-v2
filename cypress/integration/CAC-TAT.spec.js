/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    /* TC001 - Verificar o Título da aplicação */

    it('TC001 - Verificar o Título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    /* TC002 - Preenche os campos obrigatórios e envia o formulário */

    it ('TC002 - Preenche os campos obrigatórios e envia o formulário', function() {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    })

    /* TC003 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida */

    it ('TC003 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Filip')
    cy.get('#email').type('teste.email.com')
    cy.get('#open-text-area').type('Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste', {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    })

    /* TC004 - Campo telefone aceitando apenas números */

    it ('TC004 - Campo telefone aceitando apenas números', function (){
    cy.get('#phone')
        .type('Teste sem números')
        .should('be.value','')

    })

    /* TC005 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário */

    it ('TC005 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Filip')
    cy.get('#email').type('teste@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste', {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.error')
    .should('be.visible')

    })


/* TC006 - Preencher e limpar os campos nome, sobrenome, email e telefone */

    it ('TC006 - Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
    .type('Eduardo')
    .should('be.value','Eduardo')
    .clear()

    cy.get('#lastName')
    .type('Filip')
    .should('be.value','Filip')
    .clear()

    cy.get('#email')
    .type('teste@email.com')
    .should('be.value','teste@email.com')
    .clear()

    cy.get('#phone')
    .type('999999999')
    .should('be.value','999999999')
    .clear()

    })

    /* TC007 - Mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios */

    it('TC007 - Mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button','Enviar').click()

        cy.get('.error')
        .should('be.visible')

    })


    /* TC008 - Envia o formuário com sucesso usando um comando customizado */

    it('TC008 - Envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })

    /* TC009 - Seleciona um produto (YouTube) por seu texto */
    it('TC009 - Seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select')
        .select('YouTube')
        .should('have.value','youtube')

    })

    /* TC010 - Marca o tipo de atendimento "Feedback" */
    it('TC010 - Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]')
        .check('feedback')
        .should('have.value','feedback')
        .should('be.checked')

    })

    /* TC011 - Marcar ambos checkboxes, depois desmarca o último */
    it('TC011 - Marcar ambos checkboxes, depois desmarca o último', function(){
    cy.get('#email-checkbox')
    .check()
    .should('have.value','email')
    .should('be.checked')

    cy.get('#phone-checkbox')
    .check()
    .should('have.value','phone')
    .should('be.checked')

    cy.get('input[type="checkbox"]')
    .last()
    .uncheck()
    .should('not.be.checked')

    })

    /* TC012 - Seleciona um arquivo da pasta fixture */
    it('TC012 - Seleciona um arquivo da pasta fixture',function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })

    })

    /* TC013 - Seleciona um arquivo da pasta fixture */
    it ('TC013 - Seleciona um arquivo da pasta fixture',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    
    })
    })

    /* TC014 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias */
    
    it ('TC014 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile') // para usar Alias, tem que colocar  @ antes do nome
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    /* TC015 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique */
    it('TC015 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
       // cy.get('#privacy a')
        .should('have.attr','target','_blank')

    })

    /* TC016 - Acessa a página da política de privacidade removendo o target e então clicando no link */
    it('TC016 - Acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()

        cy.contains('Talking About Testing')
        .should('be.visible')
    })




  })    