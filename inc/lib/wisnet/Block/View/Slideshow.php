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

	//	protected $booleanSettings = [
	//		'autoplay',
	//		'controls',
	//		'indicators',
	//		'pause_on_hover',
	//		'wrap',
	//	];

	public function __construct(array $block, array $fields = []) {
		$this->globalSettings['container'] = 'container-fluid';
		$this->globalSettings['gutters'] = 'no-gutters';
		$this->defaultSettings['autoplay'] = true;
		$this->defaultSettings['interval'] = 7000;
		$this->defaultSettings['controls'] = true;
		$this->defaultSettings['indicators'] = true;
		$this->defaultSettings['pause_on_hover'] = true;
		$this->defaultSettings['wrap'] = true;
		$this->defaultSettings['height'] = 0;

		parent::__construct($block, $fields);
	}

}
