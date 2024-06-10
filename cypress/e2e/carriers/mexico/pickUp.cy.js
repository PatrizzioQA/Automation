describe('Pickup Shipment API Test', () => {
    it('should schedule a pickup successfully', () => {
      const token = '<Token>'; 
      cy.request({
        method: 'POST',
        url: 'https://api.envia.com/ship/pickup/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          origin: {
            name: "Raymundo Salazar",
            company: "Example Company",
            email: "raymundo@example.com",
            phone: "81818181",
            street: "Av Vasconcelos",
            number: "1400",
            district: "Palo Blanco",
            city: "San pedro",
            state: "NL",
            country: "MX",
            postalCode: "66236"
          },
          shipment: {
            carrier: "fedex",
            type: 1,
            pickup: {
              timeFrom: 12,
              timeTo: 16,
              date: "2018-08-21",
              instructions: "Hola",
              totalPackages: 2,
              totalWeight: 2
            }
          },
          settings: {
            currency: "MXN",
            labelFormat: "pdf"
          }
        }
      }).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('meta');
        expect(response.body).to.have.property('data').and.be.an('object');
      });
    });
  });
  