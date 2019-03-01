#wisnet Five Starter

## Requirements
* PHP 7.2
* Composer
* NPM

## Technologies
* PHP 7.2
* WP >5.0
* [Timber](https://www.upstatement.com/timber/) (Plugin)
* Advanced Custom Fields >5.8.0-beta3 (Plugin)
* Composer
* NPM
* Webpack
* ES2015
* HTML5
* CSS3
* [Bootstrap 4.2](https://getbootstrap.com/docs/4.2/getting-started/introduction/)


## Blocks
With the introduction of Gutenberg, WordPress is shifting away from **shortcodes** and moving towards **blocks**.
Instead of building blocks the WP way, we'll instead take advantage of *Advanced Customs Fields* to handle
all of the heavy lifting for us. [ACF Blocks](https://www.advancedcustomfields.com/blog/acf-5-8-introducing-acf-blocks-for-gutenberg/) allows us to quickly build new blocks that can be used
anywhere in the Gutenberg editor.  

There are a few files that we need for a block to be successfully registered and rendered.

#### Block Controller
The block controller will reside in `/wp-content/themes/wisnet/inc/lib/wisnet/Block/Controller/` and the name of the
file will **need to match the block name** (but without spaces/hyphens/underscores/etc...).  

*Example:*  
If we have a block for recent posts  
**Title:** Recent Posts   
**Name:** recent-posts  
**File Name (Controller):** `RecentPosts.php` (follows the "Name" of the template but uses [Upper Camel Case](http://wiki.c2.com/?UpperCamelCase))  


```php
<?php
/**
 * File: RecentPosts.php
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
```
### Block Template
The template of the block will always reside in `//wp-content/themes/wisnet/src/components/blocks/`. The name of the
file will **always** be the name of the block.  

*Example:*  
**Title:** Recent Posts   
**Name:** recent-posts  
**File Name (Twig Template):** `recent-posts.php` (follows the "Name" of the block)

Inside the Twig template you will have access to any variable that you need for the block.

`{{ acf_block }}` = ACF Block  
*Information about the block (id, name, description, keywords, etc...)*  

`{{ fields }}` = ACF Fields  
*ACF fields that are in that particular block*   

`{{ block }}` = *BlockClass*  
 *The *class* that helps render advanced fields. You'll want to check that class for what's
 available for the template*

```twig
<!-- src/components/blocks/recent-posts.twig -->
<section class="container">
    <div class="row">
        <div class="col">
            <h1>{{ block.title }}</h1>
        </div>
    </div>

    <div class="row {{ block.settings.alignment.horizontal }}">
        {% for post in block.posts %}
            <section class="{% if block.settings.fluid_items %}{{ block.settings.items_break_point }}{% else %}{{ block.settings.items_break_point }}-{{ block.settings.column_width }}{% endif %}">
                <h3>{{ post.title }}</h3>
                <p>{{ post.preview }}</p>
            </section>
        {% endfor %}
    </div>
</section>

```
### Block View
Sometimes the rendering of the block is a little more complex and requires pre-processing. In these
cases we can create a *view* class. This file resides in `/wp-content/themes/wisnet/inc/lib/wisnet/Block/View/`
and follows the same naming convention as the controller.

```php
<?php
/**
 * File: RecentPosts.php
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

	public function __construct(array $fields) {
		parent::__construct($fields);

		$this->findPosts();
	}

	...

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
```

## Menus
