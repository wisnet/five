<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element\Wpphp;

use PaulGibbs\WordpressBehatExtension\Driver\Element\BaseElement;
use UnexpectedValueException;

/**
 * WP-API driver element for taxonomy terms.
 */
class TermElement extends BaseElement
{
    /**
     * Create an item for this element.
     *
     * @param array $args Data used to create an object.
     *
     * @throws \UnexpectedValueException
     *
     * @return \WP_Term The new item.
     */
    public function create($args)
    {
        $args = wp_slash($args);
        $term = wp_insert_term($args['term'], $args['taxonomy'], $args);

        if (is_wordpress_error($term)) {
            throw new UnexpectedValueException(sprintf('[W609] Failed creating a new term: %s', $term->get_error_message()));
        }

        return $this->get($term['term_id']);
    }

    /**
     * Retrieve an item for this element.
     *
     * @param int $id Object ID.
     * @param array $args Optional data used to fetch an object.
     *
     * @throws \UnexpectedValueException
     *
     * @return \WP_Term The item.
     */
    public function get($id, $args = [])
    {
        $term = get_term($id, $args['taxonomy']);

        if (! $term) {
            throw new UnexpectedValueException(sprintf('[W610] Could not find term with ID %d', $id));
        } elseif (is_wp_error($term)) {
            throw new UnexpectedValueException(
                sprintf('[W610] Could not find term with ID %d: %s', $id, $term->get_error_message())
            );
        }

        return $term;
    }

    /**
     * Delete an item for this element.
     *
     * @param int $id Object ID.
     * @param array $args Optional data used to delete an object.
     *
     * @throws \UnexpectedValueException
     */
    public function delete($id, $args = [])
    {
        $result = wp_delete_term($id, $args['taxonomy']);

        if (is_wordpress_error($result)) {
            throw new UnexpectedValueException(
                sprintf('[W611] Failed deleting a term: %s', $result->get_error_message())
            );
        }
    }
}
