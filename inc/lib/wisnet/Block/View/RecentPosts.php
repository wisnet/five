<?php
/**
 * File: Slideshow.php
 * Date: 2018-12-27
 * Time: 07:06
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\View;

use Timber\Post;
use Timber\PostQuery;

class RecentPosts extends Base {
	public $numberOfPosts = 3;
	public $title = 'Recent Posts';
	public $dynamic = true;
	public $category = null;
	public $posts = [];

	public function __construct(array $block, array $fields) {
		parent::__construct($block, $fields);

		$this->findPosts();
	}

	/**
	 * @return int
	 */
	public function getNumberOfPosts(): int {
		return $this->numberOfPosts;
	}

	/**
	 * @param mixed $numberOfPosts
	 * @return RecentPosts
	 */
	public function setNumberOfPosts($numberOfPosts): RecentPosts {
		$this->numberOfPosts = filter_var($numberOfPosts, FILTER_VALIDATE_INT);
		return $this;
	}

	/**
	 * @return string
	 */
	public function getTitle(): string {
		return $this->title;
	}

	/**
	 * @param string $title
	 * @return RecentPosts
	 */
	public function setTitle(string $title): RecentPosts {
		$this->title = $title;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function isDynamic(): bool {
		return $this->dynamic;
	}

	/**
	 * @param bool $dynamic
	 * @return RecentPosts
	 */
	public function setDynamic(bool $dynamic): RecentPosts {
		$this->dynamic = $dynamic;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function isCategory(): bool {
		return $this->category;
	}

	/**
	 * @param mixed $category
	 * @return RecentPosts
	 */
	public function setCategory($category): RecentPosts {
		if (empty($category)) {
			$category = null;
		}
		$this->category = $category;
		return $this;
	}

	/**
	 * @return array
	 */
	public function getPosts(): array {
		return $this->posts ?: [];
	}

	/**
	 * @param mixed $posts
	 * @return RecentPosts
	 */
	public function setPosts($posts): RecentPosts {
		$this->posts = $posts;
		return $this;
	}

	public function findPosts() {
		if ($this->isDynamic()) {
			$args = [
				'post_type' => $this->category ?? 'post',
				'posts_per_page' => $this->getNumberOfPosts(),
			];

			$query = new PostQuery($args);

			$posts = $query->get_posts();
			$this->setPosts($posts);
		}
		else {
			$posts = [];
			foreach ($this->getPosts() as $id) {
				$posts[] = new Post($id);
			}
		}
		$this->setPosts($posts);

		return $this->getPosts();
	}

}
