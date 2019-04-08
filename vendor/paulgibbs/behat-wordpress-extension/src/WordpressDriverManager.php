<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension;

use PaulGibbs\WordpressBehatExtension\Driver\DriverInterface;
use PaulGibbs\WordpressBehatExtension\Driver\Element\ElementInterface;

use InvalidArgumentException;

/**
 * Manages driver registration.
 *
 * A driver represents and manages the connection between the Behat and WordPress environments.
 */
class WordpressDriverManager
{
    /**
     * The name of the default driver.
     *
     * @var string $default_driver
     */
    protected $default_driver = '';

    /**
     * All registered drivers.
     *
     * @var DriverInterface[]
     */
    protected $drivers = [];

    /**
     * Persistent settings storage.
     *
     * Internal use only.
     *
     * @var array
     */
    protected $settings = [];

    /**
     * Initialise the driver manager.
     *
     * @param DriverInterface[] $drivers An array of drivers to register.
     */
    public function __construct(array $drivers = [])
    {
        foreach ($drivers as $name => $driver) {
            $this->registerDriver($name, $driver);
        }
    }

    /**
     * Register a new driver.
     *
     * @param string          $name   Driver name.
     * @param DriverInterface $driver An instance of a DriverInterface.
     */
    public function registerDriver(string $name, DriverInterface $driver)
    {
        $name = strtolower($name);
        $this->drivers[$name] = $driver;
    }

    /**
     * Register a new driver element.
     *
     * @since 1.1.0 Added $driver_name parameter.
     *
     * @param string           $name        Element name.
     * @param ElementInterface $element     An instance of a ElementInterface.
     * @param string           $driver_name Driver name.
     */
    public function registerDriverElement(string $name, ElementInterface $element, string $driver_name)
    {
        $this->getDriver($driver_name, 'skip bootstrap')->registerElement($name, $element);
    }

    /**
     * Return a registered driver by name (defaults to the default driver).
     *
     * @since 1.1.0 Added $bootstrap parameter.
     *
     * @param string $name      Optional. The name of the driver to return. If omitted, the default driver is returned.
     * @param string $bootstrap Optional. If "skip bootstrap", driver bootstrap is skipped. Default: "do bootstrap".
     *
     * @return DriverInterface The requested driver.
     *
     * @throws \InvalidArgumentException
     */
    public function getDriver(string $name = '', string $bootstrap = 'do bootstrap'): DriverInterface
    {
        $do_bootstrap = ($bootstrap === 'do bootstrap');
        $name         = $name ? strtolower($name) : $this->default_driver;

        if (! isset($this->drivers[$name])) {
            throw new InvalidArgumentException("[W002] Driver '{$name}' is not registered.");
        }

        $driver = $this->drivers[$name];

        // Bootstrap driver if needed.
        if ($do_bootstrap && ! $driver->isBootstrapped()) {
            $driver->bootstrap();
        }

        return $driver;
    }

    /**
     * Returns all registered drivers.
     *
     * @return DriverInterface[] An array of drivers.
     */
    public function getDrivers()
    {
        return $this->drivers;
    }

    /**
     * Set the default driver name.
     *
     * @param string $name Default driver name to set.
     *
     * @throws \InvalidArgumentException
     */
    public function setDefaultDriverName($name)
    {
        $name = strtolower($name);

        if (! isset($this->drivers[$name])) {
            throw new InvalidArgumentException("[W002] Driver '{$name}' is not registered.");
        }

        $this->default_driver = $name;
    }

    /**
     * Return the value of an internal setting.
     *
     * Internal use only.
     * This value persists across Contexts, unlike getWordpressParameter().
     *
     * @param string $name Setting name.
     *
     * @return mixed
     */
    public function getSetting($name)
    {
        return ! empty($this->settings[$name]) ? $this->settings[$name] : null;
    }

    /**
     * Return the value of an internal setting.
     *
     * Internal use only.
     * This value persists across Contexts, unlike getWordpressParameter().
     *
     * @param string $name  Setting name.
     * @param mixed  $value Setting value.
     */
    public function setSetting($name, $value)
    {
        $this->settings[$name] = $value;
    }
}
