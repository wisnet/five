<?php
/**
 * File: Api.php
 * Date: 2019-04-07
 * Time: 08:24
 *
 * @package wisnetfive.dev
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Api;

class Api {

	public function __construct() {
		/**
		 * Disable the API for non-logged in users
		 */
//		add_filter('rest_pre_dispatch', function () {
//			if (!is_user_logged_in()) {
//				return new \WP_Error('not-logged-in', 'API Requests are only supported for authenticated requests', ['status' => 401]);
//			}
//		});

		new TeamMember();
	}

}

