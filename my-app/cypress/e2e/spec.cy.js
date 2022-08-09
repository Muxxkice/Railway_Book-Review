
describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });
});

it('visit', () => {
  cy.visit('http://localhost:3000');
})

it('clickButton', () => {
  cy.get('#name').type("test");
  cy.get('#email').type("test");
  cy.get('#password').type("test");
  cy.get('.btn').click();
  cy.get('span').should('not.exist')
})
it('post', () => {
  cy.request('POST', 'https://api-for-missions-and-railways.herokuapp.com/users', { name: "test", email: "aaa", password: "test" })
})

it('emptyInput_click', () => {
  cy.get('#name').clear();
  cy.get('#email').clear();;
  cy.get('#password').clear();
  cy.get('.btn').click();
  cy.get('span')
})

// テストに関わるエコシステム

// apiの挙動はcypresがメイン
// テストの視野をしぼっていく
// jestを使ったテスト





