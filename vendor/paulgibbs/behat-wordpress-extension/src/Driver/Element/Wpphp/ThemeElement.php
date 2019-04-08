<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element\Wpphp;

use PaulGibbs\WordpressBehatExtension\Driver\Element\BaseElement;
use UnexpectedValueException;

/**
 * WP-API driver element for themes.
 */
class ThemeElement extends BaseElement
{
    /**
     * Switch active theme.
     *
     * @param string $id Theme name to switch to.
     * @param array $args Not used.
     *
     * @throws \UnexpectedValueException
     */
    public function update($id, $args = [])
    {
        $theme = wp_get_theme($id);

        if (! $theme->exists()) {
            throw new UnexpectedValueException(sprintf('[W612] Could not find theme %s', $id));
        }

        switch_theme($theme->get_template());
    }


    /*
     * Convenience methods.
     */

    /**
     * Alias of update().
     *
     * @see update()
     *
     * @param string $id   Theme name to switch to.
     * @param array  $args Not used.
     */
    public function change($id, $args = [])
    {
        $this->update($id, $args);
    }
}
