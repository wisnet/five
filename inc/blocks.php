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

function wisnet_acf_blocks() {
	foreach (array_values(App::get_acf_blocks()) as $block) {
		$class = 'wisnet\Block\Controller\\' . $block;
		if (class_exists($class)) {
			new $class();
		}
		else {
			new wisnet\Block\Controller\Butt();
		}
	}
}

add_filter('allowed_block_types', 'wisnet_allowed_block_types');

function wisnet_allowed_block_types($allowed_blocks) {
	$allowed = array_merge([
		'core/image',
		'core/paragraph',
		'core/heading',
		'core/list',
		'atomic-blocks/ab-accordion',
		'atomic-blocks/ab-testimonial',
	], array_keys(App::get_acf_blocks()));
	//	return $allowed;
	return $allowed;
}
