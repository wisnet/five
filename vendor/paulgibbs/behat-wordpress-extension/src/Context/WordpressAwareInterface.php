<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context;

use Behat\Behat\Context\Context;
use PaulGibbs\WordpressBehatExtension\WordpressDriverManager;

/**
 * Common interface for Behat contexts.
 */
interface WordpressAwareInterface extends Context
{
    /**
     * Set WordPress driver manager instance.
     *
     * @param WordpressDriverManager $wordpress
     *
     * @return void
     */
    public function setWordpress(WordpressDriverManager $wordpress);

    /**
     * Get WordPress driver manager instance.
     *
     * @return WordpressDriverManager
     */
    public function getWordpress(): WordpressDriverManager;

    /**
     * Sets parameters provided for WordPress.
     *
     * @param array $parameters
     *
     * @return void
     */
    public function setWordpressParameters(array $parameters);

    /**
     * Get a specific WordPress parameter.
     *
     * @param string $name Parameter name.
     *
     * @return mixed
     */
    public function getWordpressParameter(string $name);
}
