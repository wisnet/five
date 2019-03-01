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

class Slideshow extends Base {

	protected $name = 'slideshow';
	protected $title = 'Slideshow';
	protected $description = 'A custom slideshow block.';
	protected $category = 'layout';
	protected $icon = 'images-alt2';
	protected $keywords = ['slideshow', 'banner', 'image'];

	public function __construct() {
		add_action('acf/init', [$this, 'register']);
		parent::__construct();
	}
}
