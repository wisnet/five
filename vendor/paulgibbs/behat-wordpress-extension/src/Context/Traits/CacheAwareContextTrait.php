<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context\Traits;

/**
 * Provides driver agnostic logic (helper methods) relating to caching.
 */
trait CacheAwareContextTrait
{
    use BaseAwarenessTrait;

    /**
     * Clear object cache.
     */
    public function clearCache()
    {
        $this->getDriver()->cache->clear();
    }
}
