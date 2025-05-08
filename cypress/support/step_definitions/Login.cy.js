import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

class Dashboard {
  static mockCategoryRequest() {
    cy.intercept('GET', '/api/category', {
      message: 'Categories received',
      data: { categories: [] },
    }).as('categories');
  }

  static mockGroupRequest() {
    cy.intercept('GET', '/api/group', {
      data: { users: [] },
    }).as('group');
  }

  static mockItemsRequest() {
    cy.intercept('GET', '/api/item*', {
      message: 'Items received',
      data: { count: 0, rows: [] },
    }).as('items');
  }

  static mockMessageRequest() {
    cy.intercept('GET', '/api/message', {
      data: { messages: [] },
    }).as('messages');
  }

  static mockBackgroundRequests() {
    this.mockCategoryRequest();
    this.mockGroupRequest();
    this.mockItemsRequest();
    this.mockMessageRequest();
  }
}

class Login {
  static visit() {
    cy.visit('http://localhost:8080/login');
  }

  static typeEmail(email) {
    cy.getByCy('login-form-email-input').type(email);
  }

  static typePassword(pwd) {
    cy.getByCy('login-form-password-input').type(pwd);
  }

  static clickSubmit() {
    cy.getByCy('login-form-submit-btn').click();
  }

  static blurEmail() {
    cy.getByCy('login-form-email-input').focus().blur();
  }

  static blurPassword() {
    cy.getByCy('login-form-password-input').focus().blur();
  }

  static mockLoginRequest() {
    cy.intercept('POST', '/api/user/login', {
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
    }).as('login');
  }
}

Given('I visit the login page', () => {
  Login.visit();
});

When('I enter a valid email and password', () => {
  Login.typeEmail('email@email.com');
  cy.wait(500);
  Login.typePassword('111111');
  cy.wait(500);

  Login.mockLoginRequest();
  Dashboard.mockBackgroundRequests();
});

When('I click the login button', () => {
  Login.clickSubmit();
  cy.wait(500);
});

Then('I should be logged in successfully', () => {
  // cy.url().should('not.include', '/login');
});

When('I blur the email field without input', () => {
  Login.blurEmail();
  cy.wait(500);
});

Then('I should see {string} error', (message) => {
  cy.get('form').should('contain.text', message);
});

When('I type invalid email', () => {
  Login.typeEmail('e');
  cy.getByCy('login-form-email-input').blur();
});

When('I type a valid email', () => {
  cy.getByCy('login-form-email-input').clear().type('test@test.com').blur();
});

Then('I should not see the email format error', () => {
  cy.get('form').should('not.contain.text', 'Email should be in the format "test@test.com"');
});

When('I blur the password field without input', () => {
  Login.blurPassword();
});

