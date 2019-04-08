<?php

namespace PaulGibbs\WordpressBehatExtension\Context\Traits;

use RuntimeException;
use SensioLabs\Behat\PageObjectExtension\PageObject\Factory as PageObjectFactory;
use SensioLabs\Behat\PageObjectExtension\PageObject\Page;
use SensioLabs\Behat\PageObjectExtension\PageObject\Element;

trait PageObjectAwareContextTrait
{
    /**
     * @var PageObjectFactory
     */
    private $page_object_factory;

    /**
     * Creates a page object from its name.
     *
     * @param string $name The name of the page object e.g 'Admin page'.
     *
     * @throws \RuntimeException
     *
     * @return Page
     */
    public function getPage(string $name): Page
    {
        if ($this->page_object_factory === null) {
            throw new RuntimeException('[W406] To create pages you need to pass a factory with setPageObjectFactory()');
        }

        return $this->page_object_factory->createPage($name);
    }

    /**
     * Creates a page object element from its name.
     *
     * @param string $name The name of the page object element e.g 'Toolbar'
     *
     * @throws \RuntimeException
     *
     * @return Element
     */
    public function getElement(string $name): Element
    {
        if ($this->page_object_factory === null) {
            throw new RuntimeException('[W406] To create elements you need to pass a factory with setPageObjectFactory()');
        }

        return $this->page_object_factory->createElement($name);
    }

    /**
     * Sets the factory for creating page and element objects.
     *
     * @param PageObjectFactory $page_object_factory
     */
    public function setPageObjectFactory(PageObjectFactory $page_object_factory)
    {
        $this->page_object_factory = $page_object_factory;
    }

    /**
     * Returns the factory used for creating page and element objects.
     *
     * @throws \RuntimeException
     *
     * @return PageObjectFactory
     */
    public function getPageObjectFactory(): PageObjectFactory
    {
        if ($this->page_object_factory === null) {
            throw new RuntimeException(
                '[W406] To access the page factory you need to pass it first with setPageObjectFactory()'
            );
        }

        return $this->page_object_factory;
    }
}
