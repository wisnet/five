<?php
/**
 * File: WPImage.php
 * Date: 2019-02-28
 * Time: 14:36
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Model;

class WPImage {
	public $image;

	public function __construct(array $image) {
		// parent::__construct();
		$this->image = $image;

		return $this;
	}

}
