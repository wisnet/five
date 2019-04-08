<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context\Traits;

/**
 * Provides driver agnostic logic (helper methods) relating to posts and content.
 */
trait ContentAwareContextTrait
{
    use BaseAwarenessTrait;

    /**
     * Create content.
     *
     * @param array $args Set the values of the new content item.
     *
     * @return array {
     *             @type int    $id   Content ID.
     *             @type string $slug Content slug.
     *             @type string $url  Content permalink.
     *         }
     */
    public function createContent(array $args): array
    {
        $post = $this->getDriver()->content->create($args);

        return array(
            'id'   => (int) $post->ID,
            'slug' => $post->post_name,
            'url'  => $post->url,
        );
    }

    /**
     * Get content from its title.
     *
     * @param string $title     The title of the content to get.
     * @param string $post_type Post type(s) to consider when searching for the content.
     *
     * @return array {
     *             @type int    $id   Content ID.
     *             @type string $slug Content slug.
     *             @type string $url  Content url.
     *         }
     */
    public function getContentFromTitle(string $title, string $post_type = ''): array
    {
        $post = $this->getDriver()->content->get($title, ['by' => 'title', 'post_type' => $post_type]);

        return array(
            'id'   => (int) $post->ID,
            'slug' => $post->post_name,
            'url'  => $post->url,
        );
    }

    /**
     * Delete specified content.
     *
     * @param int   $content_id ID of content to delete.
     * @param array $args       Optional. Extra parameters to pass to WordPress.
     */
    public function deleteContent(int $content_id, array $args = [])
    {
        $this->getDriver()->content->delete($content_id, $args);
    }
}
