describe('It passes health check', () => {
  it('receives a 200 response', () => {
    cy.request('http://localhost:3000/health').then((response) => {
      expect(response.status).to.eq(200)
    })
  })
  it('receives gives the status "OK"', () => {
    cy.request('http://localhost:3000/health').then((response) => {
      const expectedResponse = {
        status: 'OK'
      }

      expect(response.status).to.eq(200)
      expect(response.body).to.eql(expectedResponse)
    })
  })
})