<?php
/**
 * File: custom-post-types.php
 * Date: 2018-12-28
 * Time: 13:12
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

function cptui_register_my_cpts() {
	/**
	 * Post Type: Team Members.
	 */

	$labels = [
		'name' => __('Team Members', 'custom-post-type-ui'),
		'singular_name' => __('Team Member', 'custom-post-type-ui'),
		'edit_item' => __('Edit Team Member', 'custom-post-type-ui'),
		'new_item' => __('New Team Member', 'custom-post-type-ui'),
		'view_item' => __('View Team Member', 'custom-post-type-ui'),
		'view_items' => __('View Team Members', 'custom-post-type-ui'),
		'all_items' => __('All Team Members', 'custom-post-type-ui'),
		'add_new_item' => __('Add Team Member', 'custom-post-type-ui'),
		'add_new' => __('Add Team Member', 'custom-post-type-ui'),
	];

	$args = [
		'label' => __('Team Members', 'custom-post-type-ui'),
		'labels' => $labels,
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
		'rewrite' => ['slug' => 'team', 'with_front' => true],
		'query_var' => true,
		'supports' => ['title', 'editor', 'thumbnail', 'comments'],
	];

	register_post_type('team_member', $args);
}

add_action('init', 'cptui_register_my_cpts');
