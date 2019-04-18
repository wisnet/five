<?php
/**
 * File: TeamMember.php
 * Date: 2019-04-07
 * Time: 08:46
 *
 * @package wisnetfive.dev
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Api;

use WP_REST_Request;

class TeamMember extends Base {
	private $endpoint = 'team';

	public function __construct() {
		$this->register_routes();
		parent::__construct();
	}

	public function register_routes() {
		register_rest_route($this->namespace, '/' . $this->endpoint . '/(?P<slug>[a-z]+)', [
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'get'],
			'args' => [
				//				'id' => [
				//					'validate_callback' => [ApiValidate::class, 'is_numeric'],
				//				],
			],
			'permission_callback' => [$this, 'get_permission'],
		]);
		register_rest_route($this->namespace, '/' . $this->endpoint . '/', [
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'getAll'],
			'args' => [
				//				'id' => [
				//					'validate_callback' => [ApiValidate::class, 'is_numeric'],
				//				],
			],
			'permission_callback' => [$this, 'get_permission'],
		]);
	}

	public function get(WP_REST_Request $request) {
		$args = [
			'post_type' => 'team_member',
			'name' => $request->get_param('slug'),
			'posts_per_page' => 1,
		];
		$post = get_posts($args)[0] ?? null;

		return parent::prepare_item_for_response($this->prepare_item_for_response($post, $request), $request);
	}

	public function getAll(WP_REST_Request $request) {
		$args = [
			'post_type' => 'team_member',
			'name' => $request->get_param('slug'),
		];
		$posts = get_posts($args) ?? null;

		return parent::prepare_item_for_response($this->prepare_items_for_response($posts, $request), $request);
	}

	public function get_permission(WP_REST_Request $request) {
		return true;
		return current_user_can('list_users');
	}

	public function prepare_item_for_response($item, $request) {
		if (!($item instanceof \WP_Post) || !$item->ID) {
			return parent::prepare_item_for_response($item, $request);
		}
		$this->setCount(1)
		     ->setResource('team')
		     ->setTimestamp(time());

		return $item;
	}

	public function prepare_items_for_response($items, $request) {
		if (!(($items[0] ?? null) instanceof \WP_Post) || !$items[0]->ID) {
			return parent::prepare_item_for_response(null, $request);
		}
		$this->setCount(count($items))
		     ->setResource('team')
		     ->setTimestamp(time());

		return $items;
	}

	public function prepare_item_for_database($request) {
	}

	public function prepare_response_for_collection($response) {
	}
}
