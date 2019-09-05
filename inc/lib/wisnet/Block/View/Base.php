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

	protected $global_settings = [
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
	protected $default_settings = [];
	protected $boolean_settings = [];

	public function __construct(array $block, array $fields) {
		$this->block = $block;
		$this->mapper($fields);

		$this->init();
	}

	/**
	 * Map the fields to setters
	 *
	 * @param $fields
	 * @since 0.0.1
	 *
	 */
	public function mapper($fields) {
		$this->set_fields($fields);
		foreach ($this->get_fields() as $key => $val) {
			$method = apply_filters('block_mapper_method', str_replace(['-', '_'], '', 'set' . $key), $key);
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
		$settings = array_merge($this->global_settings, $this->default_settings);
		foreach ($settings as $key => $val) {
			$this->add_setting($key, $val);
		}
		if ($this->block) {
			foreach ($this->block as $key => $val) {
				if (array_key_exists($key, $settings)) {
					$this->add_setting($key, $val);
				}
			}
		}
		if ($this->get_fields()) {
			foreach ($this->get_fields() as $key => $val) {
				if (array_key_exists($key, $settings)) {
					$this->add_setting($key, $val);
				}
			}
		}
		$this->fix_boolean_settings();
	}

	/**
	 * Gutenberg is having a hard time saving boolean properties to blocks
	 * This method corrects those issues when a string is save as what will
	 * equate to a boolean value
	 *
	 * @see http://php.net/manual/en/filter.filters.validate.php for acceptable TRUE values
	 */
	protected function fix_boolean_settings() {
		foreach ($this->boolean_settings as $setting) {
			$val = $this->get_setting($setting);
			if ($val) {
				$this->add_setting($setting, filter_var($val, FILTER_VALIDATE_BOOLEAN));
			}
		}
	}

	/**
	 * @deprecated
	 * @see Base::fix_boolean_settings();
	 */
	protected function fixBooleanSettings() {
		$this->fix_boolean_settings();
	}

	/**
	 * @return array
	 * @since 0.8.0
	 *
	 */
	public function get_fields(): array {
		return $this->fields ?? [];
	}

	/**
	 * @deprecated
	 * @see Base::fix_boolean_settings();
	 * @since 0.0.1
	 */
	public function getFields(): array {
		return $this->get_fields();
	}

	/**
	 * @param $field
	 * @return mixed
	 * @since 0.8.0
	 */
	public function get_field($field) {
		return $this->get_fields()[$field] ?? null;
	}

	/**
	 * @param $field
	 * @return mixed
	 * @deprecated @see Base::get_field()
	 * @since 0.0.1
	 */
	public function getField($field) {
		return $this->get_field($field);
	}

	/**
	 * @param array $fields
	 * @return Base
	 * @since 0.8.0
	 *
	 */
	public function set_fields(array $fields): Base {
		$this->fields = $fields;
		return $this;
	}

	/**
	 * @param $fields
	 * @return Base
	 * @deprecated @see Base::get_field()
	 * @since 0.0.1
	 */
	public function setFields(array $fields): Base {
		return $this->set_fields($fields);
	}

	/**
	 * Retrieve all settings
	 *
	 * @return array
	 * @since 0.8.0
	 *
	 */
	public function get_settings(): array {
		return $this->settings;
	}

	/**
	 * @return array
	 * @deprecated @see Base::get_settings()
	 * @since 0.0.1
	 */
	public function getSettings(): array {
		return $this->get_settings();
	}

	/**
	 * Retrieve setting of given key
	 *
	 * @param $setting
	 * @return mixed|null returns `null` if setting is not set
	 * @since 0.0.1
	 *
	 */
	public function get_setting($setting) {
		return $this->settings[$setting] ?? null;
	}

	/**
	 * @param $setting
	 * @return Base
	 * @deprecated @see Base::get_setting()
	 * @since 0.0.1
	 */
	public function getSetting($setting) {
		return $this->get_setting($setting);
	}

	/**
	 * @param $settings
	 * @return Base
	 * @since 0.8.0
	 *
	 */
	public function set_settings($settings): Base {
		$this->settings = is_array($settings) ? $settings : [$settings];
		return $this;
	}

	/**
	 * @param $settings
	 * @return Base
	 * @since 0.0.1
	 * @deprecated @see Base::get_setting()
	 */
	public function setSettings($settings): Base {
		return $this->set_setting($settings);
	}

	/**
	 * @since 0.8.0
	 * @deprecated
	 */
	public function get_columns() {
		$columns = $this->getSetting('columns');
		$breakpoint = $this->getSetting('items_break_point');
	}

	/**
	 * @return void
	 * @since 0.0.1
	 * @deprecated @see Base::get_setting()
	 */
	public function getColumns() {
		return $this->get_columns();
	}

	/**
	 * Add a setting to the settings array
	 *
	 * @param $key
	 * @param $val
	 * @return $this
	 * @since 0.8.0
	 *
	 */
	protected function add_setting($key, $val) {
		$settings = $this->get_settings();
		$settings[$key] = $val;
		$this->set_settings($settings);
		return $this;
	}

	/**
	 * @param $key
	 * @param $val
	 * @return Base
	 * @deprecated
	 * @since 0.0.2
	 */
	protected function addSetting($key, $val) {
		return $this->add_setting($key, $val);
	}
}
