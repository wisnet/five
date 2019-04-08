<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context\Traits;

/**
 * Provides driver agnostic logic (helper methods) relating to terms.
 */
trait TermAwareContextTrait
{
    use BaseAwarenessTrait;

    /**
     * Create a term in a taxonomy.
     *
     * @param string $term
     * @param string $taxonomy
     * @param array  $args     Optional. Set the values of the new term.
     *
     * @return array {
     *             @type int $id Term ID.
     *             @type string $slug Term slug.
     *         }
     */
    public function createTerm(string $term, string $taxonomy, array $args = []): array
    {
        $args['taxonomy'] = $taxonomy;
        $args['term'] = $term;

        $term = $this->getDriver()->term->create($args);

        return array(
            'id'   => $term->term_id,
            'slug' => $term->slug
        );
    }

    /**
     * Delete a term from a taxonomy.
     *
     * @param int    $term_id
     * @param string $taxonomy
     */
    public function deleteTerm(int $term_id, string $taxonomy)
    {
        $this->getDriver()->term->delete($term_id, compact($taxonomy));
    }
}
