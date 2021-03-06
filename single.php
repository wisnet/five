<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

use Timber\Timber;

$context = Timber::get_context();

$post = apply_filters('five/context_post/post', get_queried_object());

if (!$post || ($post instanceof WP_Post)) {
	$post = Timber::query_post();
}
$context['post'] = $post;

if (post_password_required($post->ID)) {
	Timber::render('single-password.twig', $context);
}
else {
	Timber::render(['single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig'], $context);
}
