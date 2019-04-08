description: Questions and answers about managing database content
# Database content

Your tests will probably create WordPress content during their execution, and you need to remove that content from the database after each test. It is important to distinguish between persistent and non-persistent database content:

* When Behat starts, that initial state of the database is persisted through all tests.
* Database modifications made during a test, on the other hand, are not persistent. This means that database operations performed from within a test, such as the creation of posts or users, *should* be discarded after each test.

When you write tests that create, update, or delete content in the database, mark the scenario or feature with the `@db` [tag](http://behat.org/en/latest/user_guide/organizing.html#tags).


## Non-persistent content

You can either take care of removing non-persistent content yourself, perhaps by using a [Behat hook](http://behat.org/en/latest/user_guide/context/hooks.html) in a custom context class, or by scripting it into a <a href="https://en.wikipedia.org/wiki/Continuous_integration"><abbr title="continuous integration">CI</abbr></a> process, or by letting WordHat do this for you.

Setting [`database.restore_after_test`](/configuration/settings.md) in your `behat.yml` to `true` will have WordHat back up the database when first invoked, and then restore the database from that back up after each scenario. We strongly recommend using the [WP-CLI driver](faq.md#drivers) when this is enabled.


## Persistent content

You can optionally add [`database.backup_path`](/configuration/settings.md) to your `behat.yml`. If its value is a file path, WordHat will use it as the back up to restore the database from. You could use this to create a "seed" database, ensuring an identical environment each time, and facilitating convenient pre-configuration (i.e. active plugins, theme, site options, and so on).

If set with a directory path, when WordHat creates its back up of the database when first invoked, the back up will be stored in this location.

If the path is invalid or the option has not been explictly set, WordHat will choose its own temporary directory (e.g. `/tmp/` on a Linux or MacOS).
