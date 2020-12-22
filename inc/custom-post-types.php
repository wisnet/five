<?php
/**
 * File: custom-post-types.php
 * Date: 2018-12-28
 * Time: 13:12
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

add_action('init', 'five_register_my_cpts');

function five_register_my_cpts()
{
    /**
     * Team Members
     */
    five_register_post_type('team-members', 'Team Member', 'Team Members');
}

function five_register_post_type($postType, $singular, $plural, $args = [])
{
    $labels = [
        'name' => __($plural, 'custom-post-type-ui'),
        'singular_name' => __($singular, 'custom-post-type-ui'),
        'edit_item' => __('Edit '.$singular, 'custom-post-type-ui'),
        'new_item' => __('New '.$singular, 'custom-post-type-ui'),
        'view_item' => __('View '.$singular, 'custom-post-type-ui'),
        'view_items' => __('View '.$singular, 'custom-post-type-ui'),
        'all_items' => __('All '.$plural, 'custom-post-type-ui'),
        'add_new_item' => __('Add '.$singular, 'custom-post-type-ui'),
        'add_new' => __('Add '.$singular, 'custom-post-type-ui'),
    ];

    $args = array_merge([
        'label' => __($plural, 'five'),
        'description' => '',
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'delete_with_user' => false,
        'show_in_rest' => true,
        'rest_base' => '',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'has_archive' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'exclude_from_search' => false,
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'hierarchical' => false,
        'rewrite' => ['slug' => sanitize_title($plural), 'with_front' => true],
        'query_var' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'comments', 'page-attributes'],
    ], $args);

    $args['labels'] = $labels;

    register_post_type($postType, $args);
}
