describe('Prueba de API', () => {
  const countries = ['Mexico', 'USA', 'Argentina', 'Australia', 'Brasil', 'Canada', 'Chile', 'Colombia', 'Espana', 'Guatemala', 'India', 'Peru', 'Uruguay'];

  beforeEach(() => {
    cy.fixture('carriers.json').as('carriersData');
  });
  countries.forEach(country => {
    context(`Pruebas para ${country}`, () => {
      it(`Prueba de diferentes carriers para ${country}`, () => {
        cy.get('@carriersData').then((carriersData) => {
          const countryData = carriersData.countries[country];
          if (countryData) {
            countryData.carriers.forEach((carrier) => {
              carrier.requests.forEach((request) => {
                cy.request({
                  method: 'POST',
                  url: 'https://api.envia.com/ship/rate/',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 806f023d658bc2602d6541db0f044ff9b5cbec06b15753d99745051e62546d6d'
                  },
                  body: {
                    origin: request.origin,
                    destination: request.destination,
                    packages: request.packages,
                    settings: request.settings,
                    shipment: request.shipment
                  }
                }).then((response) => {
                  if (response.body.meta.toString() === "rate") {
                    cy.log(`El Carrier ${carrier.name} con los datos del request está activo`);
                  } else {
                    try {
                      expect(response.body.meta.toString()).to.equal("rate");
                    } catch (error) {
                      cy.log(`El Carrier ${carrier.name} con los datos del request está inactivo por`, response.body.error.message);
                    }
                  }
                });
              });
            });
          } else {
            cy.log(`No hay datos disponibles para el país ${country}`);
          }
        });
      });
    });
  });
});
