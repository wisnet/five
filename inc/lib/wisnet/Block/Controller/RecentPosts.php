<?php
/**
 * File: Slideshow.php
 * Date: 2018-12-27
 * Time: 07:06
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\Controller;

class RecentPosts extends Base {
	protected $name = 'recent-posts';
	protected $title = 'Recent Posts';
	protected $description = 'Show recent posts from the selected category.';
	protected $category = 'layout';
	protected $icon = 'admin-post';
	protected $keywords = ['posts', 'news', 'recent'];

	public function __construct() {
		add_action('acf/init', [$this, 'register']);
		parent::__construct();
	}

}
