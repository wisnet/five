<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context;

use Behat\Gherkin\Node\TableNode;
use PaulGibbs\WordpressBehatExtension\Context\Traits\WidgetAwareContextTrait;

/**
 * Provides step definitions relating to widgets.
 */
class WidgetContext extends RawWordpressContext
{
    use WidgetAwareContextTrait;

    /**
     * Adds a widget (identified by its ID base) to the sidebar (identified by it's human-readable name, e.g. 'Widget
     * Area', 'Right Sidebar', or 'Footer') with the given arguments.
     *
     * Example: Given I have the "Meta" widget in "Widget Area
     * Example: Given I have the "RSS" widget in "Widget Area"
     *            | Title   | Url                              | Items   |
     *            | My feed | https://wordpress.org/news/feed/ | 3       |
     *
     * @Given I have the :widget_name widget in :sidebar_name
     *
     * @param string    $widget_name
     * @param string    $sidebar_name
     * @param TableNode $widget_settings
     */
    public function iHaveTheMetaWidgetIn(string $widget_name, string $sidebar_name, TableNode $widget_settings)
    {
        $sidebar = $this->getWidgetSidebar($sidebar_name);
        $keys    = array_map('strtolower', $widget_settings->getRow(0));
        $values  = $widget_settings->getRow(1);  // We only support one widget for now.
        $args    = array_combine($keys, $values);

        $this->addWidgetToSidebar($widget_name, $sidebar, $args);
    }
}
