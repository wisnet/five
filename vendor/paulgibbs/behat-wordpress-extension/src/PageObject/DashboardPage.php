<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\PageObject;

use Behat\Mink\Exception\ExpectationException;

/**
 * Page object representing the wp-admin "Dashboard" screen.
 */
class DashboardPage extends AdminPage
{
    /**
     * @var string $path
     */
    protected $path = '/wp-admin/index.php';

    /**
     * Asserts the current screen is the Dashboard.
     *
     * @throws ExpectationException
     */
    protected function verifyPage()
    {
        $url = $this->getSession()->getCurrentUrl();

        if (strrpos($url, $this->path) !== false) {
            return;
        }

        throw new ExpectationException(
            sprintf(
                '[W401] Expected screen is the wp-admin dashboard, instead on "%1$s".',
                $url
            ),
            $this->getDriver()
        );
    }
}
