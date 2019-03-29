<?php
/**
 * File: Plugins.php
 * Date: 2019-03-01
 * Time: 13:15
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Controller;

class Plugins {

	public function __construct() {
		// parent::__construct();
	}

	/**
	 * Register the required plugins for this theme.
	 *
	 * In this example, we register five plugins:
	 * - one included with the TGMPA library
	 * - two from an external source, one from an arbitrary source, one from a GitHub repository
	 * - two from the .org repo, where one demonstrates the use of the `is_callable` argument
	 *
	 * The variables passed to the `tgmpa()` function should be:
	 * - an array of plugin arrays;
	 * - optionally a configuration array.
	 * If you are not changing anything in the configuration array, you can remove the array and remove the
	 * variable from the function call: `tgmpa( $plugins );`.
	 * In that case, the TGMPA default settings will be used.
	 *
	 * This function is hooked into `tgmpa_register`, which is fired on the WP `init` action on priority 10.
	 */
	static function register_required_plugins() {
		/*
		 * Array of plugin arrays. Required keys are name and slug.
		 * If the source is NOT from the .org repo, then source is also required.
		 */
		$plugins = [
			[
				'name' => 'Advanced Custom Fields', // The plugin name.
				'slug' => 'advanced-custom-fields-pro', // The plugin slug (typically the folder name).
				'required' => true, // If false, the plugin is only 'recommended' instead of required.
			],
			[
				'name' => 'Atomic Blocks', // The plugin name.
				'slug' => 'atomic-blocks', // The plugin slug (typically the folder name).
				'required' => false, // If false, the plugin is only 'recommended' instead of required.
			],
			[
				'name' => 'Autoptimize', // The plugin name.
				'slug' => 'autoptimize', // The plugin slug (typically the folder name).
				'required' => false, // If false, the plugin is only 'recommended' instead of required.
			],
			[
				'name' => 'Custom Post Type UI', // The plugin name.
				'slug' => 'custom-post-type-ui', // The plugin slug (typically the folder name).
				'required' => true, // If false, the plugin is only 'recommended' instead of required.
			],
			[
				'name' => 'Google Analyics',
				'slug' => 'google-analytics-for-wordpress',
				'required' => false,
			],
			[
				'name' => 'Relevanssi',
				'slug' => 'relevanssi',
				'required' => false,
				'source' => 'https://github.com/wisnet/five-plugins/raw/master/relevanssi.zip',
			],
			[
				'name' => 'The Events Calendar',
				'slug' => 'the - events - calendar',
				'required' => false,
			],
			[
				'name' => 'Timber',
				'slug' => 'timber - library',
				'required' => true,
			],
			[
				'name' => 'WP Pusher',
				'slug' => 'wppusher',
				'required' => false,
				'source' => 'https://dashboard.wppusher.com/download/latest',
				'external_url' => 'https://wppusher.com/',
			],
			[
				'name' => 'Gravity Forms Pro',
				'slug' => 'gravityforms',
				'required' => false,
				'source' => 'https://github.com/wisnet/five-plugins/raw/master/gravityforms.zip',
			],
			// This is an example of the use of 'is_callable' functionality. A user could - for instance -
			// have WPSEO installed *or* WPSEO Premium. The slug would in that last case be different, i.e.
			// 'wordpress-seo-premium'.
			// By setting 'is_callable' to either a function from that plugin or a class method
			// `array( 'class', 'method' )` similar to how you hook in to actions and filters, TGMPA can still
			// recognize the plugin as being installed.
			[
				'name' => 'WordPress SEO by Yoast',
				'slug' => 'wordpress-seo',
				'is_callable' => 'wpseo_init',
			],

		];

		/*
		 * Array of configuration settings. Amend each line as needed.
		 *
		 * TGMPA will start providing localized text strings soon. If you already have translations of our standard
		 * strings available, please help us make TGMPA even better by giving us access to these translations or by
		 * sending in a pull-request with .po file(s) with the translations.
		 *
		 * Only uncomment the strings in the config array if you want to customize the strings.
		 */
		$config = [
			'id' => 'wisnet',                 // Unique ID for hashing notices for multiple instances of TGMPA.
			'default_path' => get_template_directory() . '/bundled-plugins/',                      // Default absolute path to bundled plugins.
			'has_notices' => false,                    // Show admin notices or not.
			'dismissable' => false,                    // If false, a user cannot dismiss the nag message.
			'dismiss_msg' => '',                      // If 'dismissable' is false, this message will be output at top of nag.
			'is_automatic' => true,                   // Automatically activate plugins after installation or not.
			'message' => '',                      // Message to output right before the plugins table.
			'menu' => 'tgmpa-install-plugins', // Menu slug.
			'parent_slug' => 'plugins.php',
			'strings' => [
				'page_title' => __('Recommended Plugins', 'five'),
				'menu_title' => __('Recommended Plugins', 'five'),
			],
		];

		tgmpa($plugins, $config);
	}

}
