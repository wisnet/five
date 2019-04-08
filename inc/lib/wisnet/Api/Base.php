<?php
/**
 * File: Base.php
 * Date: 2019-04-07
 * Time: 08:55
 *
 * @package wisnetfive.dev
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Api;

class Base extends \WP_REST_Controller {
	protected $namespace;
	protected $version = 'v1';
	protected $returnMeta = [];
	protected $returnData = [];
	protected $timestamp;
	protected $count;
	protected $resource;

	public function __construct() {
		$this->namespace = 'five/' . $this->version;
	}

	public function compileReturnMeta() {
		$m = [
			'count' => $this->count,
			'resource' => $this->resource,
			'timestamp' => $this->timestamp,
		];

		$this->returnMeta = $m;

		return $this->returnMeta;
	}

	public function prepare_item_for_response($item, $request) {
		$response = [
			'meta' => $this->compileReturnMeta(),
			'data' => $item,
		];

		return $response;
	}

	/**
	 * @return array
	 */
	public function getReturnMeta(): array {
		return $this->returnMeta;
	}

	/**
	 * @param array $returnMeta
	 * @return Base
	 */
	public function setReturnMeta(array $returnMeta): Base {
		$this->returnMeta = $returnMeta;
		return $this;
	}

	/**
	 * @return array
	 */
	public function getReturnData(): array {
		return $this->returnData;
	}

	/**
	 * @param array $returnData
	 * @return Base
	 */
	public function setReturnData(array $returnData): Base {
		$this->returnData = $returnData;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getTimestamp() {
		return $this->timestamp;
	}

	/**
	 * @param mixed $timestamp
	 * @return Base
	 */
	public function setTimestamp($timestamp) {
		$this->timestamp = $timestamp;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getCount() {
		return $this->count;
	}

	/**
	 * @param mixed $count
	 * @return Base
	 */
	public function setCount($count) {
		$this->count = $count;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getResource() {
		return $this->resource;
	}

	/**
	 * @param mixed $resource
	 * @return Base
	 */
	public function setResource($resource) {
		$this->resource = $resource;
		return $this;
	}

}
