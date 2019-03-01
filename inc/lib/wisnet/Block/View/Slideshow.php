<?php
/**
 * File: Slideshow.php
 * Date: 2019-01-18
 * Time: 11:09
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\View;

class Slideshow extends Base {
	use \wisnet\Block\Setting\Layout;

	public function __construct(array $acfBlock, array $fields = []) {
		$this->defaultSettings['container'] = 'container-fluid';
		$this->defaultSettings['gutters'] = 'no-gutters';
		parent::__construct($acfBlock, $fields);
	}

}
