describe('Verificar códigos postales', () => {
    it('Verificar códigos postales', () => {
      cy.fixture('mexico/cp.json').then((cpData) => {
        for (const cp of cpData) {
          cy.request({
            method: 'POST',
            url: 'https://api.envia.com/ship/rate/',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 806f023d658bc2602d6541db0f044ff9b5cbec06b15753d99745051e62546d6d',
            },
            body: {
                "origin": {
                  "number": "",
                  "postalCode":cp,
                  "type": "origin",
                  "company": "envia.com",
                  "name": "Patrizzio Torres",
                  "email": "patrizzio.torres@envia.com",
                  "phone": "8120514803",
                  "country": "MX",
                  "street": "123",
                  "city": "Brownsville",
                  "state": "AG",
                  "address_id": 4229827,
                  "category": 2
                },
                "destination": {
                  "number": "",
                  "postalCode": "20400",
                  "type": "destination",
                  "name": "patrizzio",
                  "email": "noreply@envia.com",
                  "phone": "833749384",
                  "country": "MX",
                  "street": "jstruss",
                  "district": "Centro Histórico",
                  "city": "Rincón de Romos",
                  "state": "AG",
                  "address_id": 4216884,
                  "category": 2
                },
                "packages": [
                  {
                    "type": "pallet",
                    "content": "Electrónicos",
                    "amount": 1,
                    "name": "Electrónicos",
                    "declaredValue": 0,
                    "lengthUnit": "CM",
                    "weightUnit": "KG",
                    "weight": 40,
                    "dimensions": {
                      "length": 80,
                      "width": 80,
                      "height": 90
                    }
                  }
                ],
                "settings": {
                  "currency": "MXN"
                },
                "shipment": {
                  "type": 2,
                  "carrier": "estafeta"
                }
              }
          }).then((response) => { 
            if (response.body && response.body.meta && response.body.meta.toString() === "rateLtl") {
              cy.log(`El código postal ${cp} esta activo`);
            } else {
              cy.log(`El código postal ${cp} esta inactivo`);
            }
          });
        }
      });
    });
  });
  