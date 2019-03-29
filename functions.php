<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

use wisnet\App;

/** @var string App Version */
define('PARENT_THEME_VERSION', wp_get_theme()->parent()->Version);

/**
 * Path to Atomic docs
 */
define('ATOMIC', 'src/components/');
define('ATOMIC_ORGANISM', ATOMIC . 'organisms');
define('ATOMIC_MOLECULE', ATOMIC . 'molecules');
define('ATOMIC_ATOM', ATOMIC . 'atoms');
define('ATOMIC_SIDEBARS', ATOMIC . 'sidebars');
define('ATOMIC_SIDEBAR', ATOMIC_SIDEBARS);
define('ATOMIC_LAYOUT', ATOMIC . 'layout');
define('ATOMIC_BLOCKS', ATOMIC . 'blocks');

if (!class_exists('Timber')) {
	add_action('admin_notices', function () {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
	});

	add_filter('template_include', function ($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = apply_filters('wisnet/register_timber_directory', ['templates', 'views', 'src/components', 'src/components/embeds']);

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;

require_once(__DIR__ . '/inc/App.php');
require_once(__DIR__ . '/inc/Util.php');
require_once(__DIR__ . '/vendor/autoload.php');
require_once(__DIR__ . '/inc/lib/DebugAlias.php');
require_once(__DIR__ . '/inc/lib/class-tgm-plugin-activation.php');
require_once(__DIR__ . '/inc/acf.php');
require_once(__DIR__ . '/inc/custom-post-types.php');
require_once(__DIR__ . '/inc/custom-taxonomies.php');

$debug = new DebugAlias();
$site = new App();

if (!is_admin() || wp_doing_ajax()) {
	$site->frontend();
}
else {
	$site->backend();
}

require_once('inc/blocks.php');

