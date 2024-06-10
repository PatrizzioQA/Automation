describe('Envia Bill of Lading API Test', () => {
  const token = 'ab835cd110f13b4950e9c05c6971923489e56cc358b1014b5c0409ba8683764f';

  it('should create a bill of lading and verify the response', () => {
      cy.request({
          method: 'POST',
          url: 'https://api-test.envia.com/ship/billoflading',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: {
              origin: {
                  name: "Maria Quintanilla",
                  street: "calle",
                  number: "200",
                  district: "Centros Comerciales Desarrollo Atlixcayotl",
                  city: "Heroica Puebla de Zaragoza",
                  state: "PU",
                  country: "MX",
                  postalCode: "72197",
                  reference: "",
                  taxId: ""
              },
              destination: {
                  name: "John Smith",
                  street: "Santa Cruz St",
                  number: "5375 ",
                  district: "",
                  city: "San Antonio",
                  state: "TX",
                  country: "US",
                  postalCode: "78228",
                  reference: "Casa café",
                  taxId: ""
              },
              packages: [
                  {
                      type: "box",
                      content: "Shoes S",
                      amount: 1,
                      name: "Shoes S",
                      declaredValue: 100,
                      lengthUnit: "CM",
                      weightUnit: "KG",
                      weight: 2,
                      dimensions: {
                          length: 4,
                          width: 4,
                          height: 4
                      },
                      items: [
                          {
                              description: "test123",
                              productCode: "999",
                              quantity: 3,
                              countryOfManufacture: "MX",
                              price: 1,
                              currency: "BRL"
                          },  
                          {
                              description: "2test13",
                              productCode: "293136",
                              quantity: 1,
                              countryOfManufacture: "MX",
                              price: 12,
                              currency: "BRL"
                          },
                          {
                              description: "test123",
                              productCode: "845690",
                              quantity: 1,
                              countryOfManufacture: "MX",
                              price: 21,
                              currency: "BRL"
                          }
                      ],
                      cost: 0,
                      cubicMeters: 0.01,
                      totalWeight: 2,
                      currency: "BRL"
                  }
              ],
              settings: {
                  currency: "BRL",
                  printFormat: "PDF",
                  printSize: "PAPER_4X8"
              },
              shipment: {
                  type: 1,
                  carrier: "dhl",
                  trackingNumber: "1665958766"
              }
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.meta).to.eq('billoflading');
          const shipmentData = response.body.data;
          expect(shipmentData.carrier).to.eq('dhl');
          expect(shipmentData.trackingNumber).to.eq('1665958766');
          expect(shipmentData.billOfLading).to.eq('https://s3.us-east-2.amazonaws.com/envia-staging/uploads/dhl_bill_of_lading/1665958766.pdf');
      });
  });
});
