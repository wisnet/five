<?php
/**
 * File: Ajax.php
 * Date: 2018-12-28
 * Time: 13:20
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Controller;

class Ajax {

	public function __construct() {
		// parent::__construct();
	}


	/**
	 * @param      $action
	 * @param      $callback
	 * @param null $class
	 */
	public function add_ajax_action($action, $callback, $class = null, $requireLogin = true) {
		if ($class) {
			$callback = [$class, $callback];
		}

		if ((is_callable($callback)) || (!$class && ($callback instanceof Closure))) {
			add_action('wp_ajax_' . $action, $callback);
			if (!$requireLogin) {
				add_action('wp_ajax_nopriv_' . $action, $callback);
			}
		}
		else {
			add_action('wp_ajax_' . $action, [$this, 'invalid_method']);
			if (!$requireLogin) {
				add_action('wp_ajax_nopriv_' . $action, [$this, 'invalid_method']);
			}
		}
	}

	/**
	 * @param $callback
	 */
	public function invalid_method($callback) {
		wp_send_json(['status' => false, 'message' => 'Invalid method call for action: ' . $_GET['action']]);

		wp_die();
	}

	public function register_ajax_routes(){
		$this->add_ajax_action('test', ['AjaxController', 'test']);
	}
}
