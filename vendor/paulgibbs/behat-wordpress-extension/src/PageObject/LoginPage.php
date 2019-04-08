<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\PageObject;

use SensioLabs\Behat\PageObjectExtension\PageObject\Element;
use SensioLabs\Behat\PageObjectExtension\PageObject\Page;
use Behat\Mink\Exception\UnsupportedDriverActionException;
use Behat\Mink\Exception\ExpectationException;
use PaulGibbs\WordpressBehatExtension\Context\RawWordpressContext;

/**
 * Page object representing a the WordPress login page.
 *
 * This class houses methods for interacting with the login page and login form
 */
class LoginPage extends Page
{

    /**
     * @var string $path
     */
    protected $path = 'wp-login.php';

    /**
     * Asserts the current screen is the login page.
     *
     * @throws ExpectationException
     */
    protected function verifyLoginPage()
    {

        // Get the session.
        $session = $this->verifySession();

        // Get the url.
        $url = $session->getCurrentUrl();

        // If the login path isn't in the current URL.
        if (false === strrpos($url, $this->path)) {
            // We aren't on the login screen.
            throw new ExpectationException(
                sprintf(
                    'Expected screen is the wp-login form, instead on "%1$s".',
                    $url
                ),
                $this->getDriver()
            );
        }

        // Get the page.
        $page = $session->getPage();

        // Login form CSS selector
        $login_form_selector = '#loginform';

        // Search for the login form exists.
        $login_form = $page->find('css', $login_form_selector);

        // If the login form was not found.
        if (null === $login_form) {
            // We aren't on the login screen.
            throw new ExpectationException(
                sprintf(
                    'Expected to find the login form with the selector "%1$s" at the current URL "%2$s".',
                    $login_form_selector,
                    $url
                ),
                $this->getDriver()
            );
        }
    }

    /**
     * Fills the user_login field of the login form with a given username.
     *
     * @param string $username the username to fill into the login form
     *
     * @throws \Behat\Mink\Exception\ExpectationException
     */
    public function setUserName(string $username)
    {

        // Get the session.
        $session = $this->verifySession();

        // Verify we are on the login page.
        $this->verifyLoginPage();

        // Get the page.
        $page = $session->getPage();

        // Find the user_login field.
        $user_login_field = $page->find('css', '#user_login');

        // Try to focus the user_login field.
        try {
            $user_login_field->focus();
        } catch (UnsupportedDriverActionException $e) {
            // This will fail for GoutteDriver but neither is it necessary.
        }

        // Set the value of $username in the user_login field.
        $user_login_field->setValue($username);
        // The field can be stubborn, so we use fillField also.
        $page->fillField('user_login', $username);

        // Attempt to fill the user_login field with JavaScript.
        try {
            $session->executeScript(
                "document.getElementById('user_login').value='$username'"
            );
        } catch (UnsupportedDriverActionException $e) {
            // This will fail for drivers without JavaScript support
        }

        // Get the actual value of the user_login field.
        $username_actual = $user_login_field->getValue();

        // Verify the username was filled in correctly.
        if ($username_actual !== $username) {
            throw new ExpectationException(
                sprintf(
                    'Expected the username field to be "%1$s", found "%2$s".',
                    $username,
                    $$username_actual
                ),
                $this->getDriver()
            );
        }
    }

    /**
     * Fills the user_pass field of the login form with a given password.
     *
     * @param string $password the password to fill into the login form
     *
     * @throws \Behat\Mink\Exception\ExpectationException
     */
    public function setUserPassword(string $password)
    {

        // Get the session.
        $session = $this->verifySession();

        // Verify we are on the login page.
        $this->verifyLoginPage();

        // Get the page.
        $page = $session->getPage();

        // Find the user_pass field.
        $user_pass_field = $page->find('css', '#user_pass');

        // Try to focus the user_pass field.
        try {
            $user_pass_field->focus();
        } catch (UnsupportedDriverActionException $e) {
            // This will fail for GoutteDriver but neither is it necessary.
        }

        // Set the value of $password in the user_pass field.
        $user_pass_field->setValue($password);
        // The field can be stubborn, so we use fillField also.
        $page->fillField('user_pass', $password);

        // Attempt to fill the user_pass field with JavaScript.
        try {
            $session->executeScript(
                "document.getElementById('user_pass').value='$password'"
            );
        } catch (UnsupportedDriverActionException $e) {
            // This will fail for drivers without JavaScript support
        }

        // Get the actual value of the user_pass field.
        $password_actual = $user_pass_field->getValue();

        // Verify the password was filled in correctly.
        if ($password_actual !== $password) {
            throw new ExpectationException(
                sprintf(
                    'Expected the password field to be "%1$s", found "%2$s".',
                    $password,
                    $$password_actual
                ),
                $this->getDriver()
            );
        }
    }

    /**
     * Submit the WordPress login form
     */
    public function submitLoginForm()
    {

        // Get the session.
        $session = $this->verifySession();

        // Verify we are on the login page.
        $this->verifyLoginPage();

        // Get the page.
        $page = $session->getPage();

        // Find the submit button.
        $submit_button = $page->find('css', '#wp-submit');

        // Try to focus the submit button.
        try {
            $submit_button->focus();
        } catch (UnsupportedDriverActionException $e) {
            // This will fail for GoutteDriver but neither is it necessary.
        }

        // Click the submit button.
        $submit_button->click();
    }

     /**
     * Verify and return a properly started Mink session
     *
     * @return \Behat\Mink\Session Mink session.
     */
    protected function verifySession()
    {
        // Get the session.
        $session = $this->getSession();

        // Start the session if needed.
        if (! $session->isStarted()) {
            $session->start();
        }

        // If we aren't on a valid page
        if ('about:blank' === $session->getCurrentUrl()) {
            // Go to the home page
            $session->visit('/');
        }

        // Return the session.
        return $session;
    }
}
