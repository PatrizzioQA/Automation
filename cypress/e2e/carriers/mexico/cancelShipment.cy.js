describe('Envia Shipping API Tests', () => {
  const token = 'ab835cd110f13b4950e9c05c6971923489e56cc358b1014b5c0409ba8683764f';

  it('should create and cancel a shipment', () => {
      // Crear una guía
      cy.request({
          method: 'POST',
          url: 'https://api-test.envia.com/ship/generate',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: {
              origin: {
                  number: " 431",
                  postalCode: "66056",
                  type: "origin",
                  company: "ARTBOT",
                  name: "Patrizzio",
                  email: "noreply@envia.com",
                  phone: "9381717689",
                  country: "MX",
                  street: "Villas de brasil 307, Villa de Escobedo",
                  district: "Villas de Brasil",
                  city: "General Escobedo",
                  state: "NL",
                  address_id: 273487
              },
              destination: {
                  number: "",
                  postalCode: "66056",
                  type: "destination",
                  company: "Demo",
                  name: "ErwinDDD",
                  email: "erwin@e.com",
                  phone: "8899938384",
                  country: "MX",
                  street: "jazmines",
                  district: "Agropecuario Andrés Caballero M. (Fomerrey)",
                  city: "Ciudad General Escobedo",
                  state: "RM",
                  address_id: 3817692
              },
              packages: [
                  {
                      type: "box",
                      content: "Cajas",
                      amount: 1,
                      name: "Cajas",
                      declaredValue: 0,
                      lengthUnit: "CM",
                      weightUnit: "KG",
                      weight: 6,
                      dimensions: {
                          length: 30,
                          width: 20,
                          height: 20
                      }
                  }
              ],
              settings: {
                  currency: "BRL",
                  printFormat: "ZPL",
                  printSize: "STOCK_4X6"
              },
              shipment: {
                  carrier: "bigLogistics",
                  service: "same_day",
                  reverse_pickup: 0,
                  type: 1
              }
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.meta).to.eq('generate');
          const shipmentData = response.body.data[0];
          expect(shipmentData.carrier).to.eq('bigLogistics');
          expect(shipmentData.service).to.eq('same_day');
          const trackingNumber = shipmentData.trackingNumber;

          // Cancelar la guía
          cy.request({
              method: 'POST',
              url: 'https://api-test.envia.com/ship/cancel',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: {
                  carrier: 'bigLogistics',
                  trackingNumber: trackingNumber,
                  folio: ''
              }
          }).then((cancelResponse) => {
              expect(cancelResponse.status).to.eq(200);
              expect(cancelResponse.body.meta).to.eq('cancel');
              const cancelData = cancelResponse.body.data[0];
              expect(cancelData.carrier).to.eq('bigLogistics');
              expect(cancelData.trackingNumber).to.eq(trackingNumber);
          });
      });
  });
});
