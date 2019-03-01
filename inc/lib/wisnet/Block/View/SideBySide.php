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

use wisnet\Block\Model\WPImage;

class SideBySide extends Base {
	/** @var WPImage */
	public $image;
	public $content;

	public function __construct(array $acfBlock, array $fields) {
		$this->defaultSettings['container'] = 'container-fluid';
		$this->defaultSettings['content_alignment'] = 'self-align-top';

		// pull the image out of the fields to set it properly
		$image = $fields['image'] ?? false;
		unset($fields['image']);

		parent::__construct($acfBlock, $fields);

		if (($image ?? false)) {
			$image = new WPImage($image);
			$this->setImage($image);
		}
	}

	/**
	 * @return WPImage
	 */
	public function getImage(): WPImage {
		if (!$this->image) {
			$image = new WPImage([]);
			$this->setImage($image);
		}
		return $this->image;
	}

	/**
	 * @param WPImage $image
	 * @return SideBySide
	 */
	public function setImage(WPImage $image): SideBySide {
		$this->image = $image;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getContent() {
		return $this->content;
	}

	/**
	 * @param mixed $content
	 * @return SideBySide
	 */
	public function setContent($content) {
		$this->content = $content;
		return $this;
	}

}
