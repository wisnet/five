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
		$this->global_settings['container'] = 'container-fluid';
		$this->global_settings['gutters'] = 'no-gutters';
		$this->default_settings['autoplay'] = true;
		$this->default_settings['interval'] = 7000;
		$this->default_settings['controls'] = true;
		$this->default_settings['indicators'] = true;
		$this->default_settings['pause_on_hover'] = true;
		$this->default_settings['wrap'] = true;
		$this->default_settings['height'] = 0;

		parent::__construct($block, $fields);
	}

}
