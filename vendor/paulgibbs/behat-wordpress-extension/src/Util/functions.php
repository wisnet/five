<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Util;

use Exception;
use DOMDocument;

/**
 * Wrap a closure in a spin check.
 *
 * This is a technique to accommodate in-progress state changes in a web page (i.e. waiting for new data to load)
 * by retrying the action for a given number of attempts, each delayed by 1/4 second. The closure is expected to
 * throw an exception should the expected state not (yet) exist.
 *
 * To avoid doubt, you should only need to spin when waiting for an AJAX response, after initial page load.
 *
 * @param callable $closure Action to execute.
 * @param int      $wait    Optional. How long to wait before giving up, in seconds.
 * @param int      $step    Optional. How long to wait between attempts, in micro seconds.
 *
 * @throws \Exception Rethrows the exception thrown by the $closure if the expectation
 *                    has not been met after $wait seconds.
 */
function spins(callable $closure, $wait = 60, $step = 250000)
{
    $error     = null;
    $stop_time = time() + $wait;

    while (time() < $stop_time) {
        try {
            $closure();
            return;
        } catch (Exception $e) {
            $error = $e;
        }

        usleep($step);
    }

    throw $error;
}

/**
 * Extracts 'top level' text from HTML.
 *
 * All HTML tags, and their contents are removed.
 *
 * e.g. Some <span>HTML and</span>text  -->  Some text
 *
 * @param string $html Raw HTML. e.g. "Some <span>HTML and</span>text".
 *
 * @return string Extracted text. e.g. "Some text".
 */
function stripTagsAndContent($html)
{
    if (trim($html) === '') {
        return $html;
    }

    $doc = new DOMDocument();
    $doc->loadHTML("<div>{$html}</div>");

    $container = $doc->getElementsByTagName('div')->item(0);

    /*
     * Remove nodes while iterating over them does not work.
     * See http://php.net/manual/en/domnode.removechild.php#90292
     */
    $remove_queue = array();
    foreach ($container->childNodes as $child_node) {
        if ($child_node->nodeType !== XML_TEXT_NODE) {
            $remove_queue[] = $child_node;
        }
    }

    foreach ($remove_queue as $node) {
        $container->removeChild($node);
    }

    return trim($container->textContent);
}

/**
 * Construct arguments for a CLI command.
 *
 * Supports any mixture of assocative and numeric array values.
 *
 * @param array $whitelist Accept only these arguments.
 * @param array $raw_args  Raw argument/value pairs. May be user-supplied.
 *
 * @return array
 */
function buildCLIArgs($whitelist, $raw_args)
{
    $retval = [];

    foreach ($raw_args as $option => $value) {
        // Assocative array key.
        if (! is_numeric($option)) {
            if (! in_array($option, $whitelist, true)) {
                continue;
            }

        // Numeric array key.
        } elseif (! in_array($value, $whitelist, true)) {
            continue;
        }

        if (is_numeric($option)) {
            $retval[] = escapeshellcmd("--{$value}");
        } else {
            $retval[] = sprintf('--%s=%s', $option, escapeshellarg((string) $value));
        }
    }

    return $retval;
}
