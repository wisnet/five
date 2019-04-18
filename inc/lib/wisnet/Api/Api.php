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
	/** @var array */
	private $apis = [];

	public function __construct() {
		/**
		 * Disable the API for non-logged in users
		 */
		//		add_filter('rest_pre_dispatch', function () {
		//			if (!is_user_logged_in()) {
		//				return new \WP_Error('not-logged-in', 'API Requests are only supported for authenticated requests', ['status' => 401]);
		//			}
		//		});

		$this->addApi(new TeamMember());
	}

	/**
	 * @return array
	 */
	public function getApis(): array {
		return $this->apis;
	}

	/**
	 * @param array $apis
	 * @return Api
	 */
	public function setApis(array $apis): Api {
		$this->apis = $apis;
		return $this;
	}

	public function addApi($api) {
		if (get_parent_class($api) === Base::class) {
			$apis = $this->getApis();
			$apis[get_class($api)] = $api;
			$this->setApis($apis);
		}

		return $this;
	}

}

