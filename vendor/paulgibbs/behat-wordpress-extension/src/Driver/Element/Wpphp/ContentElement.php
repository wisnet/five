<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element\Wpphp;

use WP_Query;
use UnexpectedValueException;
use PaulGibbs\WordpressBehatExtension\Driver\Element\BaseElement;

/**
 * WP-API driver element for content (i.e. blog posts).
 */
class ContentElement extends BaseElement
{
    /**
     * Create an item for this element.
     *
     * @param array $args Data used to create an object.
     *
     * @throws \UnexpectedValueException
     *
     * @return \WP_Post The new item.
     */
    public function create($args)
    {
        $args = wp_slash($args);
        $id   = wp_insert_post($args);

        if (is_wp_error($id)) {
            throw new UnexpectedValueException(sprintf('[W603] Failed creating new content: %s', $id->get_error_message()));
        }

        return $this->get($id);
    }

    /**
     * Retrieve an item for this element.
     *
     * @param \WP_Post|string|int $id   Object ID.
     * @param array               $args Optional data used to fetch an object.
     *
     * @throws \UnexpectedValueException
     *
     * @return \WP_Post The item.
     */
    public function get($id, $args = [])
    {
        $post = false;

        if (is_numeric($id) || (is_object($id) && $id instanceof \WP_Post)) {
            $post = get_post($id);
        } else {
            $query = new WP_Query();
            $query = $query->query(array(
                "{$args['by']}"          => $id,
                'ignore_sticky_posts'    => true,
                'no_found_rows'          => true,
                'posts_per_page'         => 1,
                'suppress_filters'       => false,
                'update_post_meta_cache' => false,
                'update_post_term_cache' => false,
            ));

            if ($query) {
                $post = $query[0];
            }
        }

        if (! $post) {
            throw new UnexpectedValueException(sprintf('[W604] Could not find content with ID %d', $id));
        }

        $post->url = get_permalink($post);

        return $post;
    }

    /**
     * Delete an item for this element.
     *
     * @param int   $id   Object ID.
     * @param array $args Optional data used to delete an object.
     *
     * @throws \UnexpectedValueException
     */
    public function delete($id, $args = [])
    {
        $result = wp_delete_post($id, isset($args['force']));

        if (! $result) {
            throw new UnexpectedValueException('[W605] Failed deleting content.');
        }
    }
}
