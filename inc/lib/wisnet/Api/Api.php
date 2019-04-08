<?php
/**
 * File: Api.php
 * Date: 2019-04-07
 * Time: 08:24
 *
 * @package wisnetfive.dev
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */
namespace Five;

class Api {

	public function __construct() {

		add_action( 'rest_api_init', function () {
			register_rest_route( 'five/v1', '/team/(?P<id>\d+)', array(
				'methods' => 'GET',
				'callback' => [Api::class, 'teamMembers'],
			) );
		} );
	}

}

