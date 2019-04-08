<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context\Traits;

use PaulGibbs\WordpressBehatExtension\Driver\DriverInterface;

/**
 * Parent class for all awareness traits providing common code.
 */
trait BaseAwarenessTrait
{
    /**
     * Get active WordPress Driver.
     *
     * @param string $name Optional. Name of specific driver to retrieve.
     *
     * @return DriverInterface
     */
    public abstract function getDriver(string $name = ''): DriverInterface;
}
