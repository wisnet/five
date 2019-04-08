<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context;

use Behat\Mink\Exception\ElementTextException;

/**
 * Provides step definitions for the WordPress Toolbar.
 */
class ToolbarContext extends RawWordpressContext
{
    /**
     * Searches for a term using the toolbar search field
     *
     * Example: When I search for "Hello World" in the toolbar
     *
     * @When I search for :search in the toolbar
     *
     * @param string $search
     */
    public function iSearchUsingTheToolbar(string $search)
    {
        $this->getElement('Toolbar')->search($search);
    }

    /**
     * Clicks the specified link in the toolbar.
     *
     * Example: Then I should see "Howdy, admin" in the toolbar
     *
     * @Then I should see :text in the toolbar
     *
     * @param string $text
     *
     * @throws ElementTextException
     */
    public function iShouldSeeTextInToolbar(string $text)
    {
        $toolbar = $this->getElement('Toolbar');
        $actual  = $toolbar->getText();
        $regex   = '/' . preg_quote($text, '/') . '/ui';

        if (! preg_match($regex, $actual)) {
            $message = sprintf('[W806] The text "%s" was not found in the toolbar', $text);
            throw new ElementTextException($message, $this->getSession()->getDriver(), $toolbar);
        }
    }

    /**
     * Checks the authenticated user show in the toolbar.
     *
     * Example: Then the toolbar should show I am authenticated as admin
     *
     * @Then the toolbar should show I am authenticated as :username
     *
     * @param string $username
     */
    public function theUsernameShouldBe(string $username)
    {
        $toolbar = $this->getElement('Toolbar');
        $actual  = $toolbar->getAuthenticatedUserText();

        if ($username !== $actual) {
            $message = sprintf('[W807] Toolbar shows authenticated user is "%1$s", not "%2$s"', $actual, $username);
            throw new ElementTextException($message, $this->getSession()->getDriver(), $toolbar);
        }
    }

    /**
     * Clicks the specified link in the toolbar.
     *
     * Example: When I follow the toolbar link "New > Page"
     * Example: When I follow the toolbar link "Updates"
     * Example: When I follow the toolbar link "Howdy, admin > Edit My Profile"
     *
     * @When I follow the toolbar link :link
     *
     * @param string $link
     */
    public function iFollowTheToolbarLink(string $link)
    {
        $this->getElement('Toolbar')->clickToolbarLink($link);
    }
}
