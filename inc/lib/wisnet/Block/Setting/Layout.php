<?php
/**
 * File: Layout.php
 * Date: 2019-01-18
 * Time: 10:54
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Setting;

trait Layout {
	public $container = 'container';
	public $gutters = 'md-gutters';
	public $alignmentHorizontal = 'justify-content-left';
	public $alignmentVertical = 'align-items-start';
	public $fluidItems = true;
	public $columnWidth = 12;
	public $itemsBreakPoint = 'sm';

	public function __construct() {
		// parent::__construct();
	}

	/**
	 * @return string
	 */
	public function getContainer(): string {
		return $this->container;
	}

	/**
	 * @param string $container
	 * @return Layout
	 */
	public function setContainer(string $container): Layout {
		$this->container = $container;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getGutters(): string {
		return $this->gutters;
	}

	/**
	 * @param string $gutters
	 * @return Layout
	 */
	public function setGutters(string $gutters): Layout {
		$this->gutters = $gutters;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getAlignmentHorizontal(): string {
		return $this->alignmentHorizontal;
	}

	/**
	 * @param string $alignmentHorizontal
	 * @return Layout
	 */
	public function setAlignmentHorizontal(string $alignmentHorizontal): Layout {
		$this->alignmentHorizontal = $alignmentHorizontal;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getAlignmentVertical(): string {
		return $this->alignmentVertical;
	}

	/**
	 * @param string $alignmentVertical
	 * @return Layout
	 */
	public function setAlignmentVertical(string $alignmentVertical): Layout {
		$this->alignmentVertical = $alignmentVertical;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function isFluidItems(): bool {
		return $this->fluidItems;
	}

	/**
	 * @param bool $fluidItems
	 * @return Layout
	 */
	public function setFluidItems(bool $fluidItems): Layout {
		$this->fluidItems = $fluidItems;
		return $this;
	}

	/**
	 * @return int
	 */
	public function getColumnWidth(): int {
		return $this->columnWidth;
	}

	/**
	 * @param int $columnWidth
	 * @return Layout
	 */
	public function setColumnWidth(int $columnWidth): Layout {
		$this->columnWidth = $columnWidth;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getItemsBreakPoint(): string {
		return $this->itemsBreakPoint;
	}

	/**
	 * @param string $itemsBreakPoint
	 * @return Layout
	 */
	public function setItemsBreakPoint(string $itemsBreakPoint): Layout {
		$this->itemsBreakPoint = $itemsBreakPoint;
		return $this;
	}

}
