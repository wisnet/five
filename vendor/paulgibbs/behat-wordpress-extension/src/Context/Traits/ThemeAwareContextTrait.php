<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context\Traits;

/**
 * Provides driver agnostic logic (helper methods) relating to themes.
 */
trait ThemeAwareContextTrait
{
    use BaseAwarenessTrait;

    /**
     * Switch active theme.
     *
     * @param string $theme
     */
    public function switchTheme(string $theme)
    {
        $this->getDriver()->theme->change($theme);
    }
}
