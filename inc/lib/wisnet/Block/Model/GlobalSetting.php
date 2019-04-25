<?php
/**
 * File: Setting.php
 * Date: 2019-01-09
 * Time: 20:40
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Model;

class GlobalSetting {
	public $block;
	private $container;
	private $gutters;
	private $alignment_vertical;
	private $alignment_horizontal;
	private $fluid_items;
	private $items_break_point;
	private $column_width;

	private $defaultGlobalSettings = [
		'container' => 'container',
		'gutters' => 'md-gutters',
		'alignment_vertical' => 'align-items-start',
		'alignment_horizontal' => 'justify-content-start',
		'fluid_items' => true,
		'items_break_point' => 'col',
		'column_width' => 12,
	];

	public function __construct() {
		// parent::__construct();
	}

	public function __get($key) {
		$method = str_replace('_', '', 'get' . $key);

		if (method_exists($this, $method)) {
			return $this->{$method};
		}
	}

	/**
	 * @return mixed
	 */
	public function getBlock() {
		return $this->block;
	}

	/**
	 * @param mixed $block
	 * @return GlobalSetting
	 */
	public function setBlock($block) {
		$this->block = $block;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getContainer() {
		if (!$this->container) {
			$this->setContainer('container');
		}
		return $this->container;
	}

	/**
	 * @param mixed $container
	 * @return GlobalSetting
	 */
	public function setContainer($container) {
		$this->container = $container;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getGutters() {
		if (!$this->gutters) {
			$this->setGutters('md-gutters');
		}
		return $this->gutters;
	}

	/**
	 * @param mixed $gutter
	 * @return GlobalSetting
	 */
	public function setGutters($gutters) {
		$this->gutters = $gutters;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getAlignmentVertical() {
		if (!$this->alignment_vertical) {
			$this->setAlignmentVertical('align-items-start');
		}
		return $this->alignment_vertical;
	}

	/**
	 * @param mixed $alignment_vertical
	 * @return GlobalSetting
	 */
	public function setAlignmentVertical($alignment_vertical) {
		$this->alignment_vertical = $alignment_vertical;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getAlignmentHorizontal() {
		if (!$this->alignment_horizontal) {
			$this->setAlignmentHorizontal('justify-content-start');
		}
		return $this->alignment_horizontal;
	}

	/**
	 * @param mixed $alignment_horizontal
	 * @return GlobalSetting
	 */
	public function setAlignmentHorizontal($alignment_horizontal) {
		$this->alignment_horizontal = $alignment_horizontal;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getFluidItems() {
		if (!$this->fluid_items) {
			$this->setFluidItems(true);
		}
		return $this->fluid_items;
	}

	/**
	 * @param mixed $fluid_items
	 * @return GlobalSetting
	 */
	public function setFluidItems($fluid_items) {
		$this->fluid_items = $fluid_items;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getItemsBreakPoint() {
		if (!$this->items_break_point) {
			$this->setItemsBreakPoint('');
		}
		return $this->items_break_point;
	}

	/**
	 * @param mixed $items_break_point
	 * @return GlobalSetting
	 */
	public function setItemsBreakPoint($items_break_point) {
		$this->items_break_point = $items_break_point;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getColumnWidth() {
		if (!$this->column_width) {
			$this->setColumnWidth(12);
		}
		return $this->column_width;
	}

	/**
	 * @param mixed $column_width
	 * @return GlobalSetting
	 */
	public function setColumnWidth($column_width) {
		$this->column_width = $column_width;
		return $this;
	}

	public function blockLayoutAttributes($block) {
		if (strpos(($block['name'] ?? false), 'acf/') < 0) {
			return '';
		}

		$data = '';

		foreach ($this->defaultGlobalSettings as $key => $default) {
			$data .= 'block-' . $key . '="' . ($block[$key] ?? $default) . '" ';
		}

		return $data;
	}

	/**
	 * Retrieve a setting (or multiple) from the global block settings
	 * If the setting is not set, the default setting will be used.
	 * Some settings should not be retrieved with other settings,
	 * a good example of this would be the `column_width` because
	 * that is going to need to be prefixed with `col-md-` in your template.
	 *
	 * @param $setting
	 * @param $block
	 * @param string $prefix Prefix the setting. Only works when retrieving and single setting
	 * @return string
	 */
	public function getGlobalBlockSetting($setting, $block = null, $prefix = ''): string {
		global $currentAcfBlock;
		$found = [];

		if (!$block) {
			$block = $currentAcfBlock;
		}

		$this->setBlock($block);

		if (is_array($setting)) {
			foreach ($setting as $s) {
				if (!empty($block->getSetting($s))) {
					$found[] = $block->getSetting($s);
				}
				else if (!empty($this->{$s})) {
					$found[] = $this->{$s};
				}
			}
		}
		else {
			if (!empty($block->getSetting($setting))) {
				$found[] = $prefix . $block->getSetting($setting);
			}
			else if (!empty($this->{$setting})) {
				$found[] = $prefix . $this->{$setting};
			}
		}

		return implode(' ', $found);
	}

}
