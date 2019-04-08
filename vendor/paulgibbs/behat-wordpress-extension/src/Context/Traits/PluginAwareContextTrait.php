<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context\Traits;

/**
 * Provides driver agnostic logic (helper methods) relating to plugins.
 */
trait PluginAwareContextTrait
{
    use BaseAwarenessTrait;

    /**
     * Activate a plugin.
     *
     * @param string $plugin
     */
    public function activatePlugin(string $plugin)
    {
        $this->getDriver()->plugin->activate($plugin);
    }

    /**
     * Deactivate a plugin.
     *
     * @param string $plugin
     */
    public function deactivatePlugin(string $plugin)
    {
        $this->getDriver()->plugin->deactivate($plugin);
    }
}
