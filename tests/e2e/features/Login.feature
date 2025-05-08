Feature: User login

  Scenario: Successful login
    Given I visit the login page
    When I enter a valid email and password
    And I click the login button
    Then I should be logged in successfully

  Scenario: Input validation
    Given I visit the login page
    When I type invalid email
    Then I should see "Email should be in the format \"test@test.com\"" error
    When I type a valid email
    Then I should not see the email format error
