<?php

namespace duncan3dc\Laravel\Drivers;

use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverCapabilities;

interface DriverInterface
{

    /**
     * Set the capabilities for this browser.
     *
     * @return void
     */
    public function setCapabilities(WebDriverCapabilities $capabilities): void;

    /**
     * Get the web driver instance for this browser.
     *
     * @return RemoteWebDriver
     */
    public function getDriver(): RemoteWebDriver;
}
