<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element\Wpcli;

use PaulGibbs\WordpressBehatExtension\Driver\Element\BaseElement;
use UnexpectedValueException;
use function PaulGibbs\WordpressBehatExtension\Util\buildCLIArgs;

/**
 * WP-API driver element for managing user accounts.
 */
class WidgetElement extends BaseElement
{

    /**
     * Adds a widget to the sidebar with the specified arguments
     *
     * @param string $widget_name The ID base of the widget (e.g. 'meta', 'calendar'). Case insensitive.
     * @param string $sidebar_id  The ID of the sidebar to the add the widget to
     * @param array  $args        Associative array of widget settings for this widget
     */
    public function addToSidebar($widget_name, $sidebar_id, $args)
    {
        $widget_name = strtolower($widget_name);

        $wpcli_args = array_merge([
                $widget_name,
                $sidebar_id
            ], buildCLIArgs(array_keys($args), $args));

        $this->drivers->getDriver()->wpcli('widget', 'add', $wpcli_args);
    }

    /**
     * Gets a sidebar ID from its human-readable name
     *
     * @param string $sidebar_name The name of the sidebar (e.g. 'Footer', 'Widget Area', 'Right Sidebar')
     *
     * @throws UnexpectedValueException If the sidebar is not registered
     *
     * @return string The sidebar ID
     */
    public function getSidebar($sidebar_name)
    {
        $registered_sidebars = json_decode($this->drivers->getDriver()->wpcli('sidebar', 'list', [
            '--format=json',
        ])['stdout']);

        $sidebar_id = null;

        foreach ($registered_sidebars as $sidebar) {
            if ($sidebar_name === $sidebar->name) {
                $sidebar_id = $sidebar->id;
                break;
            }
        }

        if ($sidebar_id === null) {
            throw new UnexpectedValueException(sprintf('[W506] Sidebar "%s" does not exist', $sidebar_name));
        }

        return $sidebar_id;
    }
}
