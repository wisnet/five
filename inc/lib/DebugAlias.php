<?php
/**
 * File: DebugAliasg.php
 * Date: 2018-12-17
 * Time: 07:50
 *
 * @package wisnet\debugalias
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

class DebugAlias {

	public static function v() {
	}

	public static function p() {
	}

	public static function d() {
	}

	public static function originalCall($backtrace) {
		$file = $backtrace[0]['file'];
		$line = $backtrace[0]['line'];

		return '<p style="color: black; background:white;padding:5px 8px;font-size:14px;"><span>Originally called from: <strong>' . $file . '</strong> on line <strong>' . $line . '</strong></span></p>';
	}

}

/**
 * Custom var_dump
 *
 * @param mixed takes N args
 */
function v() {
	$args = func_get_args();
	echo(DebugAlias::originalCall(debug_backtrace()));

	if (function_exists('xdebug_get_code_coverage')) {
		foreach ($args as $arg) {
			var_dump($arg);
		}
	}
	else {
		foreach ($args as $arg) {
			echo '<pre style="text-align: left !important;">';
			var_dump($arg);
			echo '</pre>';
		}
	}
}

/**
 * Custom print_r
 *
 * @param mixed takes N args
 */
function p() {
	$args = func_get_args();
	echo(DebugAlias::originalCall(debug_backtrace()));
	foreach ($args as $arg) {
		if (!is_array($arg) && !is_object($arg)) {
			echo '<small>Not an Array. Calling v().</small>';
			v($arg);
			continue;
		}
		echo '<pre style="text-align: left !important;"">';
		print_r($arg);
		echo '</pre>';
	}
}

/**
 * Quick debug output
 *
 * @param mixed takes N args
 */
function d() {
	$args = func_get_args();
	echo(DebugAlias::originalCall(debug_backtrace()));
	foreach ($args as $arg) {
		echo '<pre>';
		echo($arg);
		echo '</pre>' . "\n";
	}
}
