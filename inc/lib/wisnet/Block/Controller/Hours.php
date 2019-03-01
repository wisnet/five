<?php
/**
 * File: Hours.php
 * Date: 2018-12-27
 * Time: 14:10
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Controller;

class Hours extends Base {
	protected $name = 'hours';
	protected $title = 'Hours of Operations';
	protected $description = 'A block to display hours of operation.';
	protected $category = 'layout';
	protected $icon = 'clock';
	protected $keywords = ['hours', 'contact', 'open', 'close'];

	public function __construct() {
		add_action('acf/init', [$this, 'register']);
		parent::__construct();
	}
}
