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

/**
 * We have to explicitly let WP know which blocks are allowed
 *
 * @param $allowed_blocks
 * @return array
 */
function wisnet_allowed_block_types($allowed_blocks) {
	$allowed = array_merge([
		'core/paragraph',
		'core/image',
		'core/heading',
		'core/gallery',
		'core/list',
		'core/quote',
		'core/shortcode',
		'core/archives',
		'core/audio',
		'core/button',
		'core/categories',
		'core/code',
		'core/columns',
		'core/column',
		'core/cover',
		'core/embed',
		'core-embed/twitter',
		'core-embed/youtube',
		'core-embed/facebook',
		'core-embed/instagram',
		'core-embed/wordpress',
		'core-embed/soundcloud',
		'core-embed/spotify',
		'core-embed/flickr',
		'core-embed/vimeo',
		'core-embed/animoto',
		'core-embed/cloudup',
		'core-embed/collegehumor',
		'core-embed/crowdsignal',
		'core-embed/dailymotion',
		'core-embed/funnyordie',
		'core-embed/hulu',
		'core-embed/imgur',
		'core-embed/issuu',
		'core-embed/kickstarter',
		'core-embed/meetup-com',
		'core-embed/mixcloud',
		'core-embed/photobucket',
		'core-embed/polldaddy',
		'core-embed/reddit',
		'core-embed/reverbnation',
		'core-embed/screencast',
		'core-embed/scribd',
		'core-embed/slideshare',
		'core-embed/smugmug',
		'core-embed/speaker',
		'core-embed/speaker-deck',
		'core-embed/ted',
		'core-embed/tumblr',
		'core-embed/videopress',
		'core-embed/wordpress-tv',
		'core/file',
		'core/freeform',
		'core/html',
		//		'core/media-text',
		'core/latest-comments',
		'core/latest-posts',
		'core/missing',
		'core/more',
		'core/nextpage',
		'core/preformatted',
		'core/pullquote',
		'core/separator',
		'core/block',
		'core/spacer',
		'core/subhead',
		'core/table',
		'core/template',
		'core/text-columns',
		'core/verse',
		'core/video',
	], array_keys(App::get_acf_blocks()));

	/**
	 * Hopefully they allow this in the future
	 */
	$disallowed = [
		'core/media-text',
	];

	//	$allowed = array_diff($disallowed, $allowed_blocks);
	//
	//	p($allowed_blocks, $disallowed, $allowed);

	//	return $allowed;
	return $allowed;
}
