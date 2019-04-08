<?php
/**
 * File: Util.php
 * Date: 2019-03-11
 * Time: 16:00
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet;

class Util {

	/**
	 * Convert a string to camelCase given the passed separator
	 *
	 * @param $input
	 * @param string|array $separator
	 * @return mixed
	 * @since 0.0.1
	 *
	 */
	public static function camelCase($input, $separator = '_') {
		/**
		 * we cannot take advantage of ucwords second parameter (delimiter)
		 * because WPEngine doesn't like it :'(
		 */
		return ucwords($input, $separator);
	}

	/**
	 * Convert a string to a proper class name
	 *
	 * @param $name
	 * @return mixed
	 * @since 0.0.1
	 *
	 */
	public static function formatClassName($name) {
		$name = str_replace(['-', '_'], '_', $name);
		return str_replace('_', '', self::camelCase($name));
	}

	/**
	 * Checks if the current request is a WP REST API request.
	 *
	 * Case #1: After WP_REST_Request initialisation
	 * Case #2: Support "plain" permalink settings
	 * Case #3: URL Path begins with wp-json/ (your REST prefix)
	 *          Also supports WP installations in subfolders
	 *
	 * @returns boolean
	 * @author matzeeable
	 */
	public static function is_rest() {
		$prefix = rest_get_url_prefix();
		if (defined('REST_REQUEST') && REST_REQUEST // (#1)
			|| isset($_GET['rest_route']) // (#2)
			&& strpos(trim($_GET['rest_route'], '\\/'), $prefix, 0) === 0) {
			return true;
		}

		// (#3)
		$rest_url = wp_parse_url(site_url($prefix));
		$current_url = wp_parse_url(add_query_arg([]));
		return strpos($current_url['path'], $rest_url['path'], 0) === 0;
	}
}
