<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context;

/**
 * Provides step definitions for managing plugins and themes.
 */
class SiteContext extends RawWordpressContext
{
    use Traits\CacheAwareContextTrait, Traits\PluginAwareContextTrait, Traits\ThemeAwareContextTrait;

    /**
     * Clear object cache.
     *
     * Example: When the cache is cleared
     * Example: Given the cache has been cleared
     *
     * @When the cache is cleared
     * @Given the cache has been cleared
     */
    public function cacheIsCleared()
    {
        $this->clearCache();
    }

    /**
     * Active a plugin.
     *
     * Example: When I activate the "hello" plugin
     * Example: Given the "hello" plugin is active
     *
     * @Given the :name plugin is active
     * @When I activate the :name plugin
     */
    public function iActivateThePlugin($name)
    {
        $this->activatePlugin($name);
    }

    /**
     * Deactivate a plugin.
     *
     * Example: When I deactivate the "hello" plugin
     *
     * @When I deactivate the :name plugin
     */
    public function iDeactivateThePlugin($name)
    {
        $this->deactivatePlugin($name);
    }

    /**
     * @When I switch the theme to :name
     */
    public function iSwitchTheThemeTo($name)
    {
        $this->switchTheme($name);
    }
}
