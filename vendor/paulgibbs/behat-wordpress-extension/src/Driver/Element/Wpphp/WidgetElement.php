<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element\Wpphp;

use PaulGibbs\WordpressBehatExtension\Driver\Element\BaseElement;
use UnexpectedValueException;

/**
 * WP-API driver element for managing user accounts.
 */
class WidgetElement extends BaseElement
{

    /**
     * Adds a widget to the sidebar with the specified arguments
     *
     * @param string $widget_name The ID base of the widget (e.g. 'meta', 'calendar'). Case insensitive.
     * @param string $sidebar_id The ID of the sidebar to the add the widget to
     * @param array $args Associative array of widget settings for this widget
     *
     * @throws UnexpectedValueException If the widget is not registered.
     */
    public function addToSidebar($widget_name, $sidebar_id, $args)
    {
        global $wp_widget_factory;

        $widget_name = strtolower($widget_name);
        $widget = wp_filter_object_list($wp_widget_factory->widgets, array('id_base' => $widget_name));

        if (! $widget) {
            throw new UnexpectedValueException(sprintf('[W613] Widget "%s" does not exist', $widget_name));
        }

        $widget         = array_pop($widget);
        $widget_options = get_option('widget_' . $widget_name, []);
        if (! isset($widget_options['_multiwidget'])) {
            $widget_options['_multiwidget'] = 1;
        }

        $option_keys = $widget_options;
        unset($option_keys['_multiwidget']);
        $option_keys = array_keys($option_keys);

        // Get the widgets 'counter'
        $last_key = array_pop($option_keys);
        $counter = $last_key + 1;

        // Create widget instance
        $widget_options[$counter] = $widget->update($args, array());
        update_option('widget_' . $widget_name, $widget_options);
        $widget_id = $widget_name . '-' . $counter;

        // Add widget to sidebar
        $active_widgets = get_option('sidebars_widgets', array());
        array_unshift($active_widgets[$sidebar_id], $widget_id);
        update_option('sidebars_widgets', $active_widgets);
    }

    /**
     * Gets a sidebar ID from its human-readable name.
     *
     * @param string $sidebar_name The name of the sidebar (e.g. 'Footer', 'Widget Area', 'Right Sidebar').
     *
     * @return string The sidebar ID.
     *
     * @throws UnexpectedValueException If the sidebar is not registered.
     */
    public function getSidebar($sidebar_name)
    {
        global $wp_registered_sidebars;

        $sidebar_id = null;

        foreach ($wp_registered_sidebars as $registered_sidebar_id => $registered_sidebar) {
            if ($sidebar_name === $registered_sidebar['name']) {
                $sidebar_id = $registered_sidebar_id;
                break;
            }
        }

        if ($sidebar_id === null) {
            throw new UnexpectedValueException(sprintf('[W614] Sidebar "%s" does not exist', $sidebar_name));
        }

        return $sidebar_id;
    }
}
