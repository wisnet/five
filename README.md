# wisnet Five Starter

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
The block controller will reside in `/inc/lib/wisnet/Block/Controller/` and the name of the
file will **need to match the block name** (but without spaces/hyphens/underscores/etc...). The block should also extend the `\wisnet\Block\View\Base` controller class.  

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
		parent::__construct();
	}

}
```
This is all that is needed to register a block with ACF. Next thing to do is create the block fields in ACF. There are no *known* limitations on the fields that can be used.

### Block View. 
_**This is required if any of your fields require advanced processing and cannot be grabbed from the `{{ fields }}` array directly.   
######Example:  
A basic WYSIWYG block does not require another `Block View` class:  

```twig  
<div>{{ fields.content }}</p>
```   

Sometimes the rendering of the block is a little more complex and requires pre-processing. In these
cases we can create a *view* class. This file resides in `/inc/lib/wisnet/Block/View/`
and follows the same naming convention as the controller. The block should also extend the `\wisnet\Block\View\Base` class.

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

### Block Template
The template of the block will always reside in `/src/components/blocks/`. The name of the
file will **always** be the name of the block. The block should be created using Atomic Docs and put in the `blocks` category  

*Example:*  
**Title:** Recent Posts   
**Name:** recent-posts  
**File Name (Twig Template):** `recent-posts.twig` (follows the "Name" of the block)

Inside the Twig template you will have access to any variable that you need for the block.

`{{ block }}` = *BlockClass*  
 _The **class** that helps render advanced fields. You'll want to check that class for what's
 available for the template_  
 
`{{ acf_block }}` = ACF Block  
_**ACF array** information about the block (id, name, description, keywords, etc...)_   

`{{ fields }}` = ACF Fields  
_**ACF fields** that are in that particular block_   


```twig
{% extends 'blocks/block.twig' %}

{% block content %}
    {% embed 'container.twig' %}
        {% block content %}
            {% embed 'row.twig' %}
                {% block content %}
                    <div class="col">
                        <h1>{{ block.title }}</h1>
                    </div>
                {% endblock %}
            {% endembed %}

            {% embed 'row.twig' %}
                {% block content %}
                    {% for post in block.posts %}
                        {% embed 'column.twig' %}
                            {% block content %}
                                <h3>{{ post.title }}</h3>
                                <p>{{ post.preview }}</p>
                            {% endblock %}
                        {% endembed %}
                    {% endfor %}
                {% endblock %}
            {% endembed %}
        {% endblock %}
    {% endembed %}
{% endblock %}
```

## Bootstrap Grid Template
To get the Bootstrap grid setup we can go about it three ways.

* Hand code it all (tedious and a lot of copy/paste):  

```twig  
{% set bp = ('items_break_point' | block_global_setting) %}
{% set col = ('columns' | block_global_setting) %}

{# This could probably be refactored #}
{% if col == 0 and bp != 'col-fluid' %}
    {% set colClass = bp %}
{% elseif col > 0 and bp == 'col-fluid' %}
    {% set colClass = 'col-' ~ col %}
{% else %}
    {% set colClass = (col > 0 ? (bp ~ ' ' ~ bp ~ '-' ~ col) :  'col') %}
{% endif %}

<div class="{{ ['container', 'gutters'] | block_global_setting }}">
    <div class="row {{ ['alignment_vertical', 'alignment_horizontal', 'fluid_items'] | block_global_setting(block) }}">
        <div class="{{ colClass }}" data-columns="{{ ('columns' | block_global_setting) }}">
             <div>Your content goes here!</div>
        </div>
    </div>
</div>
```  
* Take advantage of Twig's **embeds**:  

```twig  
{% embed 'container.twig' %}
    {% block content %}
        {% embed 'row.twig' %}
            {% block content %}
                {% embed 'column.twig' %}
                    {% block content %}
                    	<div>Your content goes here!</div>
                    {% endblock %}
                {% endembed %}
            {% endblock %}
        {% endembed %}
    {% endblock %}
{% endembed %}
```  
It's still a lot of copy/paste, but we don't need to worry about any logic. Also, if the logic changes we don't have to worry about changing all of our templates.  

* Or, if your block doesn't require anything complex, we can use a simplified version of of Twig's **embeds**  

```twig  
{% embed 'crb.twig' %}
	{% block content %}
		<div>Your content goes here!</div>
	{% endblock %}
{% endembed %}
```

## Page Templates
Page templates reside in the `/templates/` directory and follow (for the most part) the same naming convention that WP uses for their `.php` files. Timber does a nice job of connecting these files for us.

## Menu  
The processing of the menu and its items are not handled by the normal `Nav_Walker` class in WP, but is instead using Timber's `Menu` class to get the menu and items. The primary menu is set in `\wisnet\App::add_to_context()` in `/inc/App.php` We then loop through those items in the `/templates/menu.twig` template. From there we check if the item has children or not in `/src/components/molecules/menu-item.twig` and display the appropriate `/src/components/molecules/menu-item-{single|dropdown}.twig` template

## Setting Pages
We are going to keep option pages close to the areas they affect to preven menu item bloat. So we can still have as many option pages as need, but we will attach them to the appropriate admin menu item.
######Example  
The options for the theme doesn't need its own menu item because the `Appearance` menu item already exists so we attach it there  

```php
<?php
if (function_exists('acf_add_options_page')) {
	acf_add_options_sub_page(
		[
			'page_title' => 'Team Member Settings',
			'menu_title' => 'Team Member Settings',
			'menu_slug' => 'team-member-settings',
			'capability' => 'manage_options',
			'parent' => 'edit.php?post_type=team_member',
			'redirect' => true,
		]
	);
}
?>
```