/* eslint-disable */
class Dashboard {
  static mockCategoryRequest() {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/category',
      },
      {
        message: 'Cagories received',
        data: {
          categories: [],
        },
      },
    ).as('categories');
  }

  static mockGroupRequest() {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/group',
      },
      {
        data: {
          users: [],
        },
      },
    ).as('group');
  }

  static mockItemsRequest() {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/item*',
      },
      {
        message: 'Items received',
        data: {
          count: 0,
          rows: [],
        },
      },
    ).as('items');
  }

  static mockMessageRequest() {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/message',
      },
      {
        data: {
          messages: [],
        },
      },
    ).as('messages');
  }

  static mockBackgroundRequests() {
    Dashboard.mockCategoryRequest();
    Dashboard.mockGroupRequest();
    Dashboard.mockItemsRequest();
    Dashboard.mockMessageRequest();
  }
}

class Login {
  static ELEMENTS = {
    emailInput: () => cy.getByCy('login-form-email-input'),
    passwordInput: () => cy.getByCy('login-form-password-input'),
    submitButton: () => cy.getByCy('login-form-submit-btn'),
  };

  static visit() {
    cy.visit('/login');
  }

  static mockLoginRequest() {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/user/login',
      },
      {
        message: 'User logged in',
        data: {
          user: {
            id: 2,
            name: 'test',
            password: 'test',
            email: 'email@email.com',
            avatar: null,
          },
          token: 'test',
        },
      },
    ).as('login');
  }
}

describe('Login', () => {
  it('should authorize user successfuly', () => {
    Login.visit();
    Login.ELEMENTS.emailInput().type('email@email.com');
    cy.wait(1000);
    Login.ELEMENTS.passwordInput().type('111111');
    cy.wait(1000);

    Login.mockLoginRequest();
    cy.wait(1000);
    Dashboard.mockBackgroundRequests();

    Login.ELEMENTS.submitButton().click();
  });

  it('should validate user input and show error message on blur', () => {
    Login.visit();

    Login.ELEMENTS.emailInput().focus();
    cy.wait(1000);
    Login.ELEMENTS.emailInput().blur();
    cy.wait(1000);
    cy.get('form').should('contain.text', 'Field is required');

    Login.ELEMENTS.emailInput().type('e').blur();
    cy.wait(1000);
    cy.get('form')
      .should('not.contain.text', 'Field is required')
      .should('contain.text', 'Email should be in the format "test@test.com"');

    Login.ELEMENTS.emailInput().type('test@test.com').blur();
    cy.get('form').should('not.contain.text', 'Email should be in the format "test@test.com"');

    Login.ELEMENTS.passwordInput().focus();
    cy.wait(1000);
    Login.ELEMENTS.passwordInput().blur();
    cy.wait(1000);
    cy.get('form').should('contain.text', 'Field is required');
  });
});
