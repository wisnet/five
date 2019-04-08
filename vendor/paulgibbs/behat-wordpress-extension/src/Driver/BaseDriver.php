<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver;

use PaulGibbs\WordpressBehatExtension\Exception\UnsupportedDriverActionException;
use PaulGibbs\WordpressBehatExtension\Driver\Element\ElementInterface;

/**
 * Common base class for WordPress drivers.
 *
 * A driver represents and manages the connection between the Behat environment and a WordPress site.
 *
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $cache
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $comment
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $content
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $database
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $plugin
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $term
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $theme
 * @property \PaulGibbs\WordpressBehatExtension\Driver\ElementInterface $user
 */
abstract class BaseDriver implements DriverInterface
{
    /**
     * Track driver bootstrapping.
     *
     * @var bool
     */
    protected $is_bootstrapped = false;

    /**
     * Registered driver elements.
     *
     * @var \PaulGibbs\WordpressBehatExtension\Driver\Element\ElementInterface[]
     */
    protected $elements = [];

    /**
     * Expose $elements as public properties.
     *
     * @param string $name Element name.
     *
     * @throws UnsupportedDriverActionException
     *
     * @return null|\PaulGibbs\WordpressBehatExtension\Driver\Element\ElementInterface Return element object.
     */
    public function __get(string $name)
    {
        if (isset($this->elements[$name])) {
            return $this->elements[$name];
        }

        throw new UnsupportedDriverActionException(sprintf('use the %s element', static::class));
    }

    /**
     * Has the driver has been bootstrapped?
     *
     * @return bool
     */
    public function isBootstrapped() : bool
    {
        return $this->is_bootstrapped;
    }

    /**
     * Set up anything required for the driver.
     *
     * Called when the driver is used for the first time.
     */
    public function bootstrap()
    {
        $this->is_bootstrapped = true;
    }

    /**
     * Register an element for the driver.
     *
     * @param string           $name    Driver name.
     * @param ElementInterface $element An instance of a ElementInterface.
     */
    public function registerElement($name, ElementInterface $element)
    {
        $this->elements[$name] = $element;
    }
}
