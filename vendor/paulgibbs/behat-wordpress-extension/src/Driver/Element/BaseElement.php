<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element;

use PaulGibbs\WordpressBehatExtension\Exception\UnsupportedDriverActionException;
use PaulGibbs\WordpressBehatExtension\WordpressDriverManager;

/**
 * Common base class for WordPress driver elements.
 *
 * An element represents a distinct item that a driver promises to implement.
 */
abstract class BaseElement implements ElementInterface
{
    /**
     * WordPress driver manager.
     *
     * @var WordpressDriverManager
     */
    protected $drivers;

    /**
     * Constructor.
     *
     * @param WordpressDriverManager $drivers
     */
    public function __construct(WordpressDriverManager $drivers)
    {
        $this->drivers = $drivers;
    }

    /**
     * Create an item for this element.
     *
     * @param array $args Data used to create an object.
     *
     * @return mixed The new item.
     *
     * @throws UnsupportedDriverActionException
     */
    public function create($args)
    {
        throw new UnsupportedDriverActionException(sprintf('use the %s element create method', static::class));
    }

    /**
     * Retrieve an item for this element.
     *
     * @param int|string $id Object ID.
     * @param array $args Optional data used to fetch an object.
     *
     * @throws UnsupportedDriverActionException
     *
     * @return mixed The item.
     */
    public function get($id, $args = [])
    {
        throw new UnsupportedDriverActionException(sprintf('use the %s element get method', static::class));
    }

    /**
     * Update an item for this element.
     *
     * @param int|string $id Object ID.
     * @param array $args Optional data used to update an object.
     *
     * @throws UnsupportedDriverActionException
     */
    public function update($id, $args = [])
    {
        throw new UnsupportedDriverActionException(sprintf('use the %s element update method', static::class));
    }

    /**
     * Delete an item for this element.
     *
     * @param int|string $id Object ID.
     * @param array $args Optional data used to delete an object.
     *
     * @throws UnsupportedDriverActionException
     */
    public function delete($id, $args = [])
    {
        throw new UnsupportedDriverActionException(sprintf('use the %s element delete method', static::class));
    }
}
