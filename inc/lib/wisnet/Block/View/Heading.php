<?php
/**
 * File: Heading.php
 * Date: 2019-01-02
 * Time: 09:50
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\View;

class Heading extends Base {
	public $text;
	public $size;

	public function __construct(array $acfBlock, array $fields) {
		// 'heading' should always be wrapped in a group called 'heading'
		parent::__construct($acfBlock, $fields);
	}

	/**
	 * @return mixed
	 */
	public function getText() {
		return $this->text;
	}

	/**
	 * @param mixed $text
	 * @return Heading
	 */
	public function setText($text) {
		$this->text = $text;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getSize() {
		return $this->size;
	}

	/**
	 * @param mixed $size
	 * @return Heading
	 */
	public function setSize($size) {
		$this->size = $size;
		return $this;
	}

}
