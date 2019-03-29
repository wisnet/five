<?php
/**
 * File: Base.php
 * Date: 2018-12-27
 * Time: 14:10
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Controller;

use Timber\Timber;
use wisnet\Util;

class Base {
	/** @var Slug of the block. This will also be the name of the class for the block */
	protected $name;
	/** @var */
	protected $title;
	/** @var */
	protected $description;
	/** @var */
	protected $renderCallback;
	/** @var */
	protected $category;
	/** @var */
	protected $icon;
	/** @var */
	protected $keywords;

	private static $registeredBlocks = [];

	/**
	 * Base constructor.
	 */
	public function __construct() {
		add_action('acf/init', [$this, 'register']);
	}

	/**
	 * @return Slug
	 */
	public function getName(): Slug {
		return $this->name;
	}

	/**
	 * @param Slug $name
	 * @return Base
	 */
	public function setName(Slug $name): Base {
		$this->name = $name;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * @param mixed $title
	 * @return Base
	 */
	public function setTitle($title) {
		$this->title = $title;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * @param mixed $description
	 * @return Base
	 */
	public function setDescription($description) {
		$this->description = $description;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getRenderCallback() {
		return $this->renderCallback;
	}

	/**
	 * @param mixed $renderCallback
	 * @return Base
	 */
	public function setRenderCallback($renderCallback) {
		$this->renderCallback = $renderCallback;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getCategory() {
		return $this->category;
	}

	/**
	 * @param mixed $category
	 * @return Base
	 */
	public function setCategory($category) {
		$this->category = $category;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getIcon() {
		return $this->icon;
	}

	/**
	 * @param mixed $icon
	 * @return Base
	 */
	public function setIcon($icon) {
		$this->icon = $icon;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getKeywords() {
		return $this->keywords;
	}

	/**
	 * @param mixed $keywords
	 * @return Base
	 */
	public function setKeywords($keywords) {
		$this->keywords = $keywords;
		return $this;
	}

	public function get_field($key, $default = null) {
		return get_field($key, $default);
	}

	/**
	 * @return array
	 */
	public static function getRegisteredBlocks(): array {
		return self::$registeredBlocks;
	}

	/**
	 * @param array $registeredBlocks
	 */
	public static function setRegisteredBlocks(array $registeredBlocks) {
		self::$registeredBlocks = $registeredBlocks;
	}

	/**
	 * @param array $block
	 */
	public static function addRegisteredBlock(array $block) {
		$blocks = self::getRegisteredBlocks();

		if (!isset($blocks[$block['name']])) {
			$blocks[$block['name']] = $block;
		}

		self::setRegisteredBlocks($blocks);
	}

	/**
	 * Register an ACF field group as a Gutenberg block
	 */
	public function register() {
		$block = [
			'name' => $this->name ?? '',
			'title' => __($this->title) ?? '',
			'description' => __($this->description) ?? '',
			'render_callback' => $this->renderCallback ?? [$this, 'render'],
			'category' => $this->category ?? 'layout',
			'icon' => $this->icon ?? '',
			'keywords' => $this->keywords ?? [],
		];

		acf_register_block($block);

		self::addRegisteredBlock($block);
	}

	/**
	 * Render an ACF field group as a Gutenberg block
	 *
	 * @param $block
	 */
	public function render($block) {
		global $currentAcfBlock;
		// convert name ("acf/testimonial") into path friendly slug ("testimonial")
		$slug = str_replace(['acf/'], [''], $block['name']);
		// strip extras that would interfere with class naming conventions
		$viewClass = Util::formatClassName($slug);
		// set the full qualified class name
		$viewFullClass = '\wisnet\Block\View\\' . $viewClass;
		// get Timber context so we can add to it before rendering the template
		$context = Timber::get_context();
		// Store block values.
		$context['acf_block'] = $block;
		// Store field values.
		$context['fields'] = get_fields(false, true) ?: [];

		$currentAcfBlock = $block;

		if (class_exists($viewFullClass)) {
			$class = new $viewFullClass($context['acf_block'], $context['fields']);
		}
		else {
			$class = new \wisnet\Block\View\Base($context['acf_block'], $context['fields']);
		}
		$context['block'] = $class;
		$currentAcfBlock = $class;

		// Render the block.
		if (file_exists(get_theme_file_path(ATOMIC_BLOCKS . '/' . $slug . '.twig'))) {
			Timber::render(ATOMIC_BLOCKS . '/' . $slug . '.twig', $context);
		}
	}
}
