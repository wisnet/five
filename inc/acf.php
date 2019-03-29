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
			'page_title' => 'Theme Settings',
			'menu_title' => 'Theme Settings',
			'parent' => 'themes.php',
		]
	);

	acf_add_options_sub_page(
		[
			'page_title' => 'Header Settings',
			'menu_title' => 'Header Settings',
			'parent_slug' => 'themes.php',
		]
	);

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
}
