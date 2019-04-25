<?php
/**
 * File: Base.php
 * Date: 2018-12-27
 * Time: 14:43
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\View;

/**
 * Base class for all custom blocks
 *
 * Class Base
 * @package wisnet\Block\View
 */
class Base {
	/** @var array */
	private $block;
	/** @var array */
	protected $fields = [];
	/** @var array */
	protected $settings = [];

	protected $globalSettings = [
		'container' => 'container',
		'equal_height_columns' => 'equal_height_columns',
		'gutters' => 'md-gutters',
		'alignment_horizontal' => 'justify-content-start',
		'alignment_vertical' => 'align-items-start',
		'fluid_items' => true,
		'columns' => 0,
		'items_break_point' => 'col-sm',
	];
	/**
	 * Default settings for blocks
	 * @var array
	 */
	protected $defaultSettings = [];
	protected $booleanSettings = [];

	public function __construct(array $block, array $fields) {
		$this->block = $block;
		$this->mapper($fields);

		$this->init();
	}

	/**
	 * Map the fields to setters
	 *
	 * @since 0.0.1
	 *
	 * @param $fields
	 */
	public function mapper($fields) {
		$this->setFields($fields);
		foreach ($this->getFields() as $key => $val) {
			$method = str_replace(['-', '_'], '', 'set' . $key);
			if (method_exists($this, $method)) {
				call_user_func([$this, $method], $val);
			}
		}
	}

	/**
	 * @since 0.2.0
	 */
	public function init() {
		/**
		 * Add all the default settings to the settings
		 * array. This must be done after the `fields`
		 * in case the `fields` contain a "settings" field
		 */
		$settings = array_merge($this->globalSettings, $this->defaultSettings);
		foreach ($settings as $key => $val) {
			$this->addSetting($key, $val);
		}
		if ($this->block) {
			foreach ($this->block as $key => $val) {
				if (array_key_exists($key, $settings)) {
					$this->addSetting($key, $val);
				}
			}
		}
		if ($this->getFields()) {
			foreach ($this->getFields() as $key => $val) {
				if (array_key_exists($key, $settings)) {
					$this->addSetting($key, $val);
				}
			}
		}
		$this->fixBooleanSettings();
	}

	/**
	 * Gutenberg is having a hard time saving boolean properties to blocks
	 * This method corrects those issues when a string is save as what will
	 * equate to a boolean value
	 *
	 * @see http://php.net/manual/en/filter.filters.validate.php for acceptable TRUE values
	 */
	protected function fixBooleanSettings() {
		foreach ($this->booleanSettings as $setting) {
			$val = $this->getSetting($setting);
			if ($val) {
				$this->addSetting($setting, filter_var($val, FILTER_VALIDATE_BOOLEAN));
			}
		}
	}

	/**
	 * @since 0.0.1
	 *
	 * @return array
	 */
	public function getFields(): array {
		return $this->fields ?? [];
	}

	/**
	 * @since 0.0.1
	 *
	 * @return mixed
	 */
	public function getField($field) {
		return $this->getFields()[$field] ?? null;
	}

	/**
	 * @since 0.0.1
	 *
	 * @param array $fields
	 * @return Base
	 */
	public function setFields(array $fields): Base {
		$this->fields = $fields;
		return $this;
	}

	/**
	 * Retrieve all settings
	 *
	 * @since 0.0.1
	 *
	 * @return array
	 */
	public function getSettings(): array {
		return $this->settings;
	}

	/**
	 * Retrieve setting of given key
	 *
	 * @since 0.0.1
	 *
	 * @param $setting
	 * @return mixed|null returns `null` if setting is not set
	 */
	public function getSetting($setting) {
		return $this->settings[$setting] ?? null;
	}

	/**
	 * @since 0.0.1
	 *
	 * @param $settings
	 * @return Base
	 */
	public function setSettings($settings): Base {
		$this->settings = is_array($settings) ? $settings : [$settings];
		return $this;
	}

	public function getColumns() {
		$columns = $this->getSetting('columns');
		$breakpoint = $this->getSetting('items_break_point');
		//		if($)

	}

	/**
	 * Add a setting to the settings array
	 *
	 * @since 0.0.2
	 *
	 * @param $key
	 * @param $val
	 * @return $this
	 */
	protected function addSetting($key, $val) {
		$settings = $this->getSettings();
		$settings[$key] = $val;
		$this->setSettings($settings);
		return $this;
	}

}
