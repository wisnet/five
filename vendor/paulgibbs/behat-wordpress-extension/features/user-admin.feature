@db
Feature: Managing users
  In order to have confidence that WordHat is reliable for developers
  As a WordHat maintainer
  I want to test managing users

  Scenario: I can specify a user which already exists and the test should not fail
    Given there are users:
       | user_login | user_pass | user_email       | role   |
       | test       | test      | test@example.com | author |
    And there are users:
       | user_login | user_pass | user_email       | role   |
       | test       | test      | test@example.com | author |
    And I am logged in as test
    When I go to the dashboard
    Then the toolbar should show I am authenticated as test

  Scenario: I can delete a user account
    Given there are users:
       | user_login | user_pass | user_email       | role   |
       | test       | test      | test@example.com | author |
    When I delete the "test" user account
    Then I should not be able to log in as "test"
