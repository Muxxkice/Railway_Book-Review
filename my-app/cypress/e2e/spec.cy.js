
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
  cy.get('alert');
  cy.get('input').clear();

})

it('emptyInput_click', () => {
  cy.get('#name');
  cy.get('#email');
  cy.get('#password');
  cy.get('.btn').click();
  cy.get('span')
})


  //   ユーザーの行動を定義する。

  // 名前だけが入力されなかたった
  // パスワードだけが入力されなかたった
  // メールアドレスだけが入力されなかたった
  // 送信ボタンが押されたら結果が表示される。

  // 正常にログインログインできた。




  // it("ボタンを押すとuser情報をPOSTできる", () => {
  //   cy.intercept('POST', 'https://api-for-missions-and-railways.herokuapp.com').as('post_req')
  // })

  // 入力する
  // メンテナンスコストがかかる


