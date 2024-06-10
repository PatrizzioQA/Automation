describe('Prueba de seguimiento de envío', () => {
    it('Verificar respuesta de seguimiento', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.envia.com/ship/generaltrack/',
            body: {
                "trackingNumbers": [
                    "234123",
                    "075580780"
                ]
            }
        }).then((response) => {
            expect(response.status).to.equal(200); 
            expect(response.body.meta).to.equal("generaltrack"); 
            expect(response.body.data).to.be.an('array').that.is.not.empty; 
        });
    });
});
