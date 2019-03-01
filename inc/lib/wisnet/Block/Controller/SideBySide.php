<?php
/**
 * File: Slideshow.php
 * Date: 2018-12-27
 * Time: 14:10
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Controller;

class SideBySide extends Base {
	protected $name = 'side-by-side';
	protected $title = 'Side By Side';
	protected $description = 'Image & copy next to each other';
	protected $category = 'layout';
	protected $icon = 'image-flip-horizontal';
	protected $keywords = ['content', 'image', 'text'];

	public function __construct() {
		add_action('acf/init', [$this, 'register']);
		parent::__construct();
	}
}
