description: WordHat internal error codes documentation
# Exception error codes

When WordHat is forced to throw a user-facing PHP exception, an error code beginning with "W" will be included at the start of the message. This documentation is provided to help you better understand the error, and in some cases, provide extra information to help you resolve the problem.

The range of valid error codes is `W000` to `W999`:

* [`W000-099`](/recipes/errors/w000-099.md) represent miscellanous internal errors.
* [`W100-199`](/recipes/errors/w100-199.md) represent internal errors related to the WP-CLI driver.
* [`W200-299`](/recipes/errors/w200-299.md) represent internal errors related to the WP-PHP driver.
* `W300-399` are reserved for future use.
* [`W400-499`](/recipes/errors/w400-499.md) represent errors related to [PageObjects](https://packagist.org/packages/sensiolabs/behat-page-object-extension) used by the drivers.
* [`W500-599`](/recipes/errors/w500-599.md) represent errors from the WP-CLI driver.
* [`W600-699`](/recipes/errors/w600-699.md) represent errors from the WP-PHP driver.
* `W700-799` are reserved for future use.
* [`W800-899`](/recipes/errors/w800-899.md) represent errors from Behat contexts (and associated plumbing).
* `W900-999` are reserved for future use.
