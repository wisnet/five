<?php
/**
 * File: ACFImage.php
 * Date: 2019-01-04
 * Time: 09:35
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Controller;

/**
 * Class ACFImage
 * @package wisnet\Controller
 */
class ACFImage {
	public $url;
	public $image;

	public function __construct(array $image = null) {
		if ($image) {
			$this->image = $image;
		}
	}

	/**
	 * Get a specific size of an image
	 * from the ACF image array
	 *
	 * This can be called in your `twig` templates using:
	 *
	 * {{ acf_field_name | acf_image('desired_size')
	 *
	 * @param $image
	 * @param string $size
	 * @return string
	 */
	public function getUrl($image, $size = 'large') {
		if (!$image) {
			$image = $this->image;
		}
		return $image['sizes'][$size] ?? ($image['url'] ?: '');
	}

}
