<?php
/**
 * File: Heading.php
 * Date: 2019-01-02
 * Time: 09:47
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Controller;

class Heading extends Base {
	protected $name = 'heading';
	protected $title = 'Heading';
	protected $description = 'A block to display a heading.';
	protected $category = 'formatting';
	protected $icon = 'editor-bold';
	protected $keywords = ['heading', 'title', 'page title', 'block title'];

	public function __construct() {
		add_action('acf/init', [$this, 'register']);
		parent::__construct();
	}
}
