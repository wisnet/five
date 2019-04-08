<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context;

use UnexpectedValueException;
use RuntimeException;
use Behat\Gherkin\Node\TableNode;
use PaulGibbs\WordpressBehatExtension\Context\Traits\ContentAwareContextTrait;
use PaulGibbs\WordpressBehatExtension\Context\Traits\UserAwareContextTrait;

/**
 * Provides step definitions for creating content: post types, comments, and terms.
 */
class ContentContext extends RawWordpressContext
{
    use ContentAwareContextTrait, UserAwareContextTrait;

    /**
     * Create content of the given type.
     *
     * Example: Given there are posts:
     *     | post_type | post_title | post_content | post_status |
     *     | page      | Test Post   | Hello World  | publish     |
     *
     * @Given /^(?:there are|there is a) posts?:/
     *
     * @param TableNode $posts
     */
    public function thereArePosts(TableNode $posts)
    {
        foreach ($posts->getHash() as $post) {
            $this->createContent($this->parseArgs($post));
        }
    }

    /**
     * Create content, and go to it in the browser.
     *
     * Example: Given I am viewing a post:
     *     | post_type | post_title | post_content | post_status |
     *     | page      | Test Post   | Hello World  | publish     |
     * Example: Given I am viewing the post: "Test Post"
     *
     * @Given /^(?:I am|they are) viewing (?:a|the)(?: blog)? post(?: "([^"]+)"|:)/
     *
     * @param TableNode|string $post_data_or_title
     *
     * @throws \UnexpectedValueException
     */
    public function iAmViewingBlogPost($post_data_or_title)
    {
        // Retrieve the first row only.
        if ($post_data_or_title instanceof TableNode) {
            $post_data_hash = $post_data_or_title->getHash();

            if (count($post_data_hash) > 1) {
                throw new UnexpectedValueException('[W810] "Given I am viewing a post:" step must only contain one post');
            }

            $post = $this->createContent($this->parseArgs($post_data_hash[0]));
        } else {
            $post = $this->getContentFromTitle($post_data_or_title);
        }

        $this->visitPath($post['url']);
    }

    /**
     * Converts data from TableNode into a format understood by Driver\DriverInterface;
     * i.e. converts public identifiers (such as slugs, log-ins) to internal identifiers
     * (such as database IDs).
     *
     * @param array $post_data
     *
     * @return array
     */
    protected function parseArgs(array $post_data): array
    {
        if (isset($post_data['post_author'])) {
            $post_data['post_author'] = $this->getUserIdFromLogin($post_data['post_author']);
        }

        return $post_data;
    }

    /**
     * @Given I delete the post :post_title
     */
    public function iDeleteThePost($post_title)
    {
        $post = $this->getContentFromTitle($post_title);
        $this->deleteContent($post['id'], ['force' => true]);
    }

    /**
     * @Then I should not be able to view the post :post_title
     *
     * @throws RuntimeException
     */
    public function iShouldNotBeAbleToViewThePost($post_title)
    {
        try {
            $this->getContentFromTitle($post_title);
        } catch (UnexpectedValueException $e) {
            // This is expected to fail.
            return;
        }

        throw new RuntimeException(sprintf('[W811] Content "%s" exists, but it should not.', $post_title));
    }
}
