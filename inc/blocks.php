<?php
/**
 * File: blocks.php
 * Date: 2018-12-26
 * Time: 13:52
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

use wisnet\App;
use wisnet\Block;

add_action('init', 'wisnet_acf_blocks', 0, 10);

/**
 * Instantiate and register theme blocks
 */
function wisnet_acf_blocks() {
	foreach (array_values(App::get_acf_blocks()) as $block) {
		$blockClass = 'wisnet\Block\Controller\\' . $block;

		if (class_exists($blockClass)) {
			new $blockClass();
		}
	}
}

add_filter('allowed_block_types', 'wisnet_allowed_block_types');