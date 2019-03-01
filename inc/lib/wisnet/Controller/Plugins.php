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
	function register_required_plugins() {
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
				'name' => 'The Events Calendar',
				'slug' => 'the-events-calendar',
				'required' => false,
			],
			[
				'name' => 'Timber',
				'slug' => 'timber-library',
				'required' => true,
			],
			[
				'name' => 'Relevanssi',
				'slug' => 'relevanssi',
				'required' => false,
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
			'default_path' => '',                      // Default absolute path to bundled plugins.
			'menu' => 'tgmpa-install-plugins', // Menu slug.
			'has_notices' => true,                    // Show admin notices or not.
			'dismissable' => false,                    // If false, a user cannot dismiss the nag message.
			'dismiss_msg' => '',                      // If 'dismissable' is false, this message will be output at top of nag.
			'is_automatic' => true,                   // Automatically activate plugins after installation or not.
			'message' => '',                      // Message to output right before the plugins table.

			/*
			'strings'      => array(
				'page_title'                      => __( 'Install Required Plugins', 'wisnet' ),
				'menu_title'                      => __( 'Install Plugins', 'wisnet' ),
				/* translators: %s: plugin name. * /
				'installing'                      => __( 'Installing Plugin: %s', 'wisnet' ),
				/* translators: %s: plugin name. * /
				'updating'                        => __( 'Updating Plugin: %s', 'wisnet' ),
				'oops'                            => __( 'Something went wrong with the plugin API.', 'wisnet' ),
				'notice_can_install_required'     => _n_noop(
					/* translators: 1: plugin name(s). * /
					'This theme requires the following plugin: %1$s.',
					'This theme requires the following plugins: %1$s.',
					'wisnet'
				),
				'notice_can_install_recommended'  => _n_noop(
					/* translators: 1: plugin name(s). * /
					'This theme recommends the following plugin: %1$s.',
					'This theme recommends the following plugins: %1$s.',
					'wisnet'
				),
				'notice_ask_to_update'            => _n_noop(
					/* translators: 1: plugin name(s). * /
					'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.',
					'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.',
					'wisnet'
				),
				'notice_ask_to_update_maybe'      => _n_noop(
					/* translators: 1: plugin name(s). * /
					'There is an update available for: %1$s.',
					'There are updates available for the following plugins: %1$s.',
					'wisnet'
				),
				'notice_can_activate_required'    => _n_noop(
					/* translators: 1: plugin name(s). * /
					'The following required plugin is currently inactive: %1$s.',
					'The following required plugins are currently inactive: %1$s.',
					'wisnet'
				),
				'notice_can_activate_recommended' => _n_noop(
					/* translators: 1: plugin name(s). * /
					'The following recommended plugin is currently inactive: %1$s.',
					'The following recommended plugins are currently inactive: %1$s.',
					'wisnet'
				),
				'install_link'                    => _n_noop(
					'Begin installing plugin',
					'Begin installing plugins',
					'wisnet'
				),
				'update_link' 					  => _n_noop(
					'Begin updating plugin',
					'Begin updating plugins',
					'wisnet'
				),
				'activate_link'                   => _n_noop(
					'Begin activating plugin',
					'Begin activating plugins',
					'wisnet'
				),
				'return'                          => __( 'Return to Required Plugins Installer', 'wisnet' ),
				'plugin_activated'                => __( 'Plugin activated successfully.', 'wisnet' ),
				'activated_successfully'          => __( 'The following plugin was activated successfully:', 'wisnet' ),
				/* translators: 1: plugin name. * /
				'plugin_already_active'           => __( 'No action taken. Plugin %1$s was already active.', 'wisnet' ),
				/* translators: 1: plugin name. * /
				'plugin_needs_higher_version'     => __( 'Plugin not activated. A higher version of %s is needed for this theme. Please update the plugin.', 'wisnet' ),
				/* translators: 1: dashboard link. * /
				'complete'                        => __( 'All plugins installed and activated successfully. %1$s', 'wisnet' ),
				'dismiss'                         => __( 'Dismiss this notice', 'wisnet' ),
				'notice_cannot_install_activate'  => __( 'There are one or more required or recommended plugins to install, update or activate.', 'wisnet' ),
				'contact_admin'                   => __( 'Please contact the administrator of this site for help.', 'wisnet' ),

				'nag_type'                        => '', // Determines admin notice type - can only be one of the typical WP notice classes, such as 'updated', 'update-nag', 'notice-warning', 'notice-info' or 'error'. Some of which may not work as expected in older WP versions.
			),
			*/
		];

		tgmpa($plugins, $config);
	}

}
