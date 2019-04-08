@db
Feature: Viewing content
  In order to have confidence that WordHat is reliable for developers
  As a WordHat maintainer
  I want to test viewing content on a website

    Background:
        Given there are posts:
            | post_title      | post_content              | post_status | post_author |
            | Just my article | The content of my article | publish     | admin       |
            | My draft        | This is just a draft      | draft       | admin       |

    Scenario: Deleting an existing post
        Given I delete the post "Just my article"
        Then I should not be able to view the post "Just my article"

    Scenario: Viewing a single page
        Given I am viewing a post:
           | post_type | post_title      | post_content    | post_status |
           | page      | My about page   | About this site | publish     |
        Then I should see "My about page"
        And I should see "About this site"

    Scenario: Viewing an existing post
        Given I am viewing the post "Just my article"
        Then I should see "Just my article"
        And I should see "The content of my article"


