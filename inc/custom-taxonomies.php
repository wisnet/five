<?php
/**
 * File: custom-taxonomies.php
 * Date: 2018-12-28
 * Time: 13:12
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */
//hook into the init action and call create_book_taxonomies when it fires
add_action('init', 'five_register_my_taxonomies', 0);

//create a custom taxonomy name it topics for your posts

function five_register_my_taxonomies()
{
    //five_register_taxonomy('custom-taxonomy', 'Custom Taxonomy', 'Custom Taxonomies', ['custom-post-type']);
}

function five_register_taxonomy($taxonomy, $singular, $plural, $object_type = ['post'], $args = [])
{
    // Add new taxonomy, make it hierarchical like categories
    //first do the translations part for GUI

    $labels = [
        'name' => _x($plural, 'five'),
        'singular_name' => _x($singular, 'five'),
        'search_items' => __('Search '.$plural),
        'all_items' => __('All '.$plural),
        'parent_item' => __('Parent '.$singular),
        'parent_item_colon' => __('Parent '.$singular.':'),
        'edit_item' => __('Edit '.$singular),
        'update_item' => __('Update '.$singular),
        'add_new_item' => __('Add New '.$singular),
        'new_item_name' => __('New '.$singular.' Name'),
        'menu_name' => __($plural),
    ];

    // Now register the taxonomy
    $args = array_merge([
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => ['slug' => $taxonomy],
    ], $args);

    register_taxonomy($taxonomy, $object_type, $args);
}
