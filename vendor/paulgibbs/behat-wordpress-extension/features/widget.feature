Feature: Widgets
  In order to have confidence that WordHat is reliable for developers
  As a WordHat maintainer
  I want to test managing widgets

  @db
  Scenario: Viewing a widget
    Given I have the "meta" widget in "Blog Sidebar"
      | Title     |
      | My widget |
    And I am on the homepage
    Then I should see "My widget"
