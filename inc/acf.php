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
	acf_add_options_sub_page(
		[
			'page_title' => 'Team Member Settings',
			'menu_title' => 'Team Member Settings',
			'menu_slug' => 'team-member-settings',
			'capability' => 'manage_options',
			'parent' => 'edit.php?post_type=team_member',
			'redirect' => true,
		]
	);

	acf_add_options_sub_page(
		[
			'page_title' => 'Music Settings',
			'menu_title' => 'Music Settings',
			'menu_slug' => 'music-settings',
			'capability' => 'manage_options',
			'parent' => 'edit.php?post_type=music',
		]
	);

	acf_add_options_page(
		[
			'page_title' => 'Theme Settings',
			'menu_title' => 'Theme Settings',
			'menu_slug' => 'theme-settings',
			'capability' => 'manage_options',
			'redirect' => true,
		]
	);

	acf_add_options_sub_page(
		[
			'page_title' => 'Theme Settings',
			'menu_title' => 'Theme Settings',
			'parent_slug' => 'theme-settings',
		]
	);

	acf_add_options_sub_page(
		[
			'page_title' => 'Admin Restrictions',
			'menu_title' => 'Admin Restrictions',
			'parent_slug' => 'theme-settings',
		]
	);
}
