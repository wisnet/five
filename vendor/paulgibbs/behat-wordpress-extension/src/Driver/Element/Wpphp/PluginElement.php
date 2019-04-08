<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element\Wpphp;

use UnexpectedValueException;
use PaulGibbs\WordpressBehatExtension\Driver\Element\BaseElement;

/**
 * WP-API driver element for plugins.
 */
class PluginElement extends BaseElement
{
    /**
     * Activate or deactivate specified plugin.
     *
     * @param string $id   Path to plugin.
     * @param array  $args Optional data used to update an object.
     */
    public function update($id, $args = [])
    {
        if ($args['status'] === 'activate') {
            activate_plugin($id, '', false, true);
        } elseif ($args['status'] === 'deactivate') {
            deactivate_plugins($id, true, false);
        }
    }


    /*
     * Convenience methods.
     */

    /**
     * Alias of update().
     *
     * @see update()
     *
     * @param string $id   Plugin name to activate.
     * @param array  $args Optional. Not used.
     *
     * @throws \UnexpectedValueException
     */
    public function activate($id, $args = [])
    {
        $plugin = $this->drivers->getDriver()->getPlugin($id);

        if (! $plugin) {
            throw new UnexpectedValueException("[W608] Cannot find the plugin: {$id}.");
        }

        $this->update($plugin, ['status' => 'activate']);
    }

    /**
     * Alias of update().
     *
     * @see update()
     *
     * @param string $id   Plugin name to deactivate.
     * @param array  $args Optional. Not used.
     *
     * @throws \UnexpectedValueException
     */
    public function deactivate($id, $args = [])
    {
        $plugin = $this->drivers->getDriver()->getPlugin($id);

        if (! $plugin) {
            throw new UnexpectedValueException("[W608] Cannot find the plugin: {$id}.");
        }

        $this->update($plugin, ['status' => 'deactivate']);
    }
}
