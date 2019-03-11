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
	 * @since 0.0.1
	 *
	 * @param $input
	 * @param string|array $separator
	 * @return mixed
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
	 * @since 0.0.1
	 *
	 * @param $name
	 * @return mixed
	 */
	public static function formatClassName($name) {
		$name = str_replace(['-', '_'], '_', $name);
		return str_replace('_', '', self::camelCase($name));
	}
}
