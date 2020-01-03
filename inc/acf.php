<?php
/**
 * File: acf.php
 * Date: 2018-12-28
 * Time: 13:11
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */
if (function_exists('acf_add_options_page')) {
	$optionsSubPages = [
		[
			'page_title' => 'Theme Settings',
			'menu_title' => 'Theme Settings',
			'parent' => apply_filters('five/theme_settings/parent', 'themes.php'),
		],
		[
			'page_title' => 'Header Settings',
			'menu_title' => 'Header Settings',
			'parent_slug' => apply_filters('five/theme_settings/parent', 'themes.php'),
		],
		[
			'page_title' => 'Team Member Settings',
			'menu_title' => 'Team Member Settings',
			'menu_slug' => 'team-member-settings',
			'capability' => 'manage_options',
			'parent' => 'edit.php?post_type=team_member',
			'redirect' => true,
		],
	];

	$optionsSubPages = apply_filters('five/option_pages/sub_pages', $optionsSubPages);

	foreach ($optionsSubPages as $subPage) {
		acf_add_options_sub_page($subPage);
	}
}
