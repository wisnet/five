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
	/** @var string */
	public $content;
	/** @var array */
	public $buttons = [];
	/** @var string */
	public $contentPosition = 'left';

	public function __construct(array $acfBlock, array $fields) {
		$this->global_settings['container'] = 'container-fluid';
		$this->global_settings['content_alignment'] = 'self-align-top';

		// pull the image out of the fields to set it properly
		$image = $fields['image'] ?? false;
		unset($fields['image']);

		if (!$fields['buttons']) {
			$fields['buttons'] = [];
		}

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

	/**
	 * @return array
	 */
	public function getButtons(): array {
		return $this->buttons;
	}

	/**
	 * @param array $buttons
	 * @return SideBySide
	 */
	public function setButtons(array $buttons): SideBySide {
		$this->buttons = $buttons;
		return $this;
	}

	/**
	 * Add a button to the buttons array
	 *
	 * @param $button
	 * @return $this
	 */
	public function addButton($button) {
		$buttons = $this->getButtons();
		$buttons[] = $button;
		$this->setButtons($buttons);

		return $this;
	}

	/**
	 * @return string
	 */
	public function getContentPosition(): string {
		return $this->contentPosition;
	}

	/**
	 * @param string $contentPosition
	 * @return SideBySide
	 */
	public function setContentPosition(string $contentPosition): SideBySide {
		$this->contentPosition = $contentPosition;
		return $this;
	}

}
