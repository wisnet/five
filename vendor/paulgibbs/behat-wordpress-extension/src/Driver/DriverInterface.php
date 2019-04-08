<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver;

/**
 * WordPress driver interface.
 *
 * A driver represents and manages the connection between the Behat environment and a WordPress site.
 */
interface DriverInterface
{
    /**
     * Has the driver has been bootstrapped?
     *
     * @return bool
     */
    public function isBootstrapped(): bool;

    /**
     * Set up anything required for the driver.
     *
     * Called when the driver is used for the first time.
     *
     * @return void
     */
    public function bootstrap();
}
