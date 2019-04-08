<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context;

use PaulGibbs\WordpressBehatExtension\PageObject\DashboardPage;

/**
 * Provides step definitions that are specific to the WordPress dashboard (wp-admin).
 */
class DashboardContext extends RawWordpressContext
{
    /**
     * Dashboard page object.
     *
     * @var DashboardPage
     */
    protected $admin_page;

    /**
     * Constructor.
     *
     * @param DashboardPage $admin_page
     */
    public function __construct(DashboardPage $admin_page)
    {
        parent::__construct();

        $this->admin_page = $admin_page;
    }

    /**
     * Open the dashboard.
     *
     * Example: Given I am on the dashboard
     * Example: Given I am in wp-admin
     * Example: When I go to the dashboard
     * Example: When I go to wp-admin
     *
     * @Given /^(?:I am|they are) on the dashboard/
     * @Given /^(?:I am|they are) in wp-admin/
     * @When /^(?:I|they) go to the dashboard/
     * @When /^(?:I|they) go to wp-admin/
     */
    public function iAmOnDashboard()
    {
        $this->admin_page->open();
    }

    /**
     * Click a link within the screen header tag.
     *
     * Example: When I click on the "Add New" link in the header
     *
     * @When I click on the :link link in the header
     *
     * @param string $link
     */
    public function iClickOnHeaderLink(string $link)
    {
        $this->admin_page->clickLinkInHeader($link);
    }

    /**
     * Assert the text in the screen header tag matches the given string.
     *
     * Example: Then I should be on the "Posts" screen
     *
     * @Then I should be on the :admin_screen screen
     *
     * @param string $admin_screen
     */
    public function iShouldBeOnTheScreen(string $admin_screen)
    {
        $this->admin_page->assertHasHeader($admin_screen);
    }

    /**
     * Go to a given screen on the admin menu.
     *
     * Example: Given I go to the "Users" menu
     * Example: Given I go to the menu "Settings > Reading"
     *
     * @Given I go to the menu :item
     * @Given I go to the :item menu
     *
     * @param string $item
     */
    public function iGoToMenuItem(string $item)
    {
        $adminMenu = $this->admin_page->getMenu();
        $adminMenu->clickMenuItem($item);
    }

    /**
     * Check the specified notification is on-screen.
     *
     * Example: Then I should see a status message that says "Post published"
     *
     * @Then /^(?:I|they) should see an? (error|status) message that says "([^"]+)"$/
     *
     * @param string $type    Message type. Either "error" or "status".
     * @param string $message Text to search for.
     */
    public function iShouldSeeMessageThatSays(string $type, string $message)
    {
        $selector = 'div.notice';

        if ($type === 'error') {
            $selector .= '.error';
        } else {
            $selector .= '.updated';
        }

        $this->assertSession()->elementTextContains('css', $selector, $message);
    }
}
