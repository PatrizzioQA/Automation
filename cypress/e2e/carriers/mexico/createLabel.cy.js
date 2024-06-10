describe('Prueba de API - Generar envío', () => {
    it('Generar envío y verificar respuesta', () => {
      const requestBody = {
        "origin": {
            "number": "10",
            "postalCode": "43740",
            "type": "origin",
            "company": "artbot",
            "name": "Kamerlingh - 1883",
            "email": "kamerlingh96@gmail.com",
            "phone": "7751109122",
            "country": "MX",
            "street": "Sor Juana Inés de la Cruz",
            "district": "Distrito Federal",
            "city": "Cuautepec de Hinojosa",
            "state": "HG",
            "address_id": 273180,
            "identificationNumber": "050021"
        },
        "destination": {
            "number": "12",
            "postalCode": "81910",
            "type": "destination",
            "company": "Envia",
            "name": "Jess-test",
            "email": "noreply@envia.com",
            "phone": "7751109122",
            "country": "MX",
            "street": "Gabriel Leyva, 81910 Sinaloa de Leyva, Sin.",
            "district": "Sinaloa de Leyva Centro",
            "city": "Sinaloa de Leyva",
            "state": "SI",
            "address_id": 3817436
        },
        "packages": [
            {
                "type": "box",
                "content": "Cajas",
                "amount": 1,
                "name": "Cajas",
                "declaredValue": 0,
                "lengthUnit": "CM",
                "weightUnit": "KG",
                "weight": 1,
                "dimensions": {
                    "length": 1,
                    "width": 1,
                    "height": 1
                }
            }
        ],
        "settings": {
            "currency": "BRL",
            "printFormat": "PDF",
            "printSize": "PAPER_7X4.75"
        },
        "shipment": {
            "carrier": "estafeta",
            "service": "ground",
            "reverse_pickup": 0,
            "type": 1
        }
      };
      cy.request({
        method: 'POST',
        url: 'https://api-test.envia.com/ship/generate/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 75b6356c082e3f72081c6674efabaf1447c9aa7d3d8748fdd114e5c1a4e2c781'
        },
        body: requestBody
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.meta).to.eq('generate');
        expect(response.body.data).to.have.lengthOf(1);
      });
    });
  });
  