Feature: User authentication
  In order to have confidence that WordHat is reliable for developers
  As a WordHat maintainer
  I want to test user authentication

  @javascript
  Scenario: I can log-in and out with javascript
    Given I am logged in as an administrator
    And I am on the dashboard
    Then I should see "Howdy"
    When I log out
    Then I should not see "Howdy"

  Scenario: I can log-in and out without javascript
    Given I am logged in as an administrator
    And I am on the dashboard
    Then I should see "Howdy"
    When I log out
    Then I should not see "Howdy"

  @db
  Scenario: I can log in as a newly-created user with an explicitly-set password.
    Given there are users:
      | user_login | user_pass | user_email       | role   |
      | test       | test      | test@example.com | author |
    And I am logged in as test
    When I go to the dashboard
    Then the toolbar should show I am authenticated as test

  @db
  Scenario: I can log in as a newly-created user with an auto-generated password.
    Given there are users:
      | user_login | user_email       | role   |
      | test       | test@example.com | author |
    And I am logged in as test
    When I go to the dashboard
    Then the toolbar should show I am authenticated as test
