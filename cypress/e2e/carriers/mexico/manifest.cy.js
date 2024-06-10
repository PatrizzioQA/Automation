describe('POST /ship/manifest', () => {
  it('should verify that the meta field in the response is "manifest"', () => {
    // Define the request body
    const requestBody = {
      trackingNumbers: ["UAT301012935885"]
    };

    // Make the POST request
    cy.request({
      method: 'POST',
      url: 'https://api-test.envia.com/ship/manifest',
      headers: {
        'Authorization': 'Bearer c3e5086b79b9dac2f44a01818bdc30bb665c454e882a3a7879e3ab9d49e0d761',
        'Content-Type': 'application/json'
      },
      body: requestBody
    }).then((response) => {
      // Verify the status code
      expect(response.status).to.eq(200);

      // Verify the meta field in the response body
      expect(response.body.meta).to.eq('manifest');
    });
  });
});
