<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\PageObject\Element;

/**
 * An Element representing the TinyMCE editor on the edit post screen.
 */
class PostContentEditor extends TinyMCEEditor
{
    /**
     * @var array|string $selector
     */
    protected $selector = '#postdivrich';
}
