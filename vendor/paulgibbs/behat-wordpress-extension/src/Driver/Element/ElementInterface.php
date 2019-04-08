<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element;

/**
 * WordPress driver element interface.
 *
 * An element represents a distinct item that a driver promises to implement.
 * An element must be created for each driver that the item is supported in.
 *
 * For example, functionality to do with content, site, or users.
 * In some ways, an element is similar to a collection endpoint in a RESTful API.
 */
interface ElementInterface
{
    /**
     * Create an item for this element.
     *
     * @param array $args Data used to create an object.
     *
     * @return mixed The new item.
     */
    public function create($args);

    /**
     * Retrieve an item for this element.
     *
     * @param int|string $id   Object ID.
     * @param array      $args Optional data used to fetch an object.
     *
     * @return mixed The item.
     */
    public function get($id, $args = []);

    /**
     * Update an item for this element.
     *
     * @param int|string $id   Object ID.
     * @param array      $args Optional data used to update an object.
     *
     * @return void
     */
    public function update($id, $args = []);

    /**
     * Delete an item for this element.
     *
     * @param int|string $id   Object ID.
     * @param array      $args Optional data used to delete an object.
     *
     * @return void
     */
    public function delete($id, $args = []);
}
