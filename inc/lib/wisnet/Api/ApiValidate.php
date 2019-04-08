<?php
/**
 * File: ApiValidate.php
 * Date: 2019-04-07
 * Time: 09:12
 *
 * @package wisnetfive.dev
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Api;

class ApiValidate {

	public function __construct() {
		// parent::__construct();
	}

	public static function is_numeric($param, $request, $key) {
		return is_numeric($param);
	}

}
