<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver;

use RuntimeException;
use UnexpectedValueException;

/**
 * Connect Behat to WordPress using WP-CLI.
 */
class WpcliDriver extends BaseDriver
{
    /**
     * The name of a WP-CLI alias for tests requiring shell access.
     *
     * @var string
     */
    protected $alias = '';

    /**
     * Path to WordPress' files.
     *
     * @var string
     */
    protected $path = '';

    /**
     * WordPress site URL.
     *
     * @var string
     */
    protected $url = '';

    /**
     * Binary for WP-CLI.
     *
     * Defaults to "wp".
     *
     * @var string
     */
    protected $binary = 'wp';

    /**
     * Constructor.
     *
     * @param string      $alias  WP-CLI alias. This or $path must be not falsey.
     * @param string      $url    WordPress site URL.
     * @param string|null $binary Path to the WP-CLI binary.
     * @param string      $path   Optional. Path to WordPress site's files. This or $alias must be not falsey.
     */
    public function __construct(string $alias, string $url, string $binary = null, string $path = '')
    {
        $this->alias  = ltrim($alias, '@');
        $this->path   = $path;
        $this->url    = rtrim(filter_var($url, FILTER_SANITIZE_URL), '/');
        $this->binary = $binary;
    }

    /**
     * Set up anything required for the driver.
     *
     * Called when the driver is used for the first time.
     * Checks `core is-installed`, and the version number.
     *
     * @throws \RuntimeException
     */
    public function bootstrap()
    {
        $version = '';

        preg_match('#^WP-CLI (.*)$#', $this->wpcli('cli', 'version')['stdout'], $match);
        if (! empty($match)) {
            $version = array_pop($match);
        }

        if (! version_compare($version, '1.5.0', '>=')) {
            throw new RuntimeException('[W100] Your WP-CLI is too old; version 1.5.0 or newer is required.');
        }

        $status = $this->wpcli('core', 'is-installed')['exit_code'];
        if ($status !== 0) {
            throw new RuntimeException('[W101] WordPress does not seem to be installed. Check "path" and/or "alias" settings in behat.yml.');
        }

        putenv('WP_CLI_STRICT_ARGS_MODE=1');

        $this->is_bootstrapped = true;
    }

    /**
     * Execute a WP-CLI command.
     *
     * @param string   $command       Command name.
     * @param string   $subcommand    Subcommand name.
     * @param string[] $raw_arguments Optional. Associative array of arguments for the command.
     *
     * @throws \UnexpectedValueException
     *
     * @return array {
     *     WP-CLI command results.
     *
     *     @type string $stdout    Response text from WP-CLI.
     *     @type int    $exit_code Returned status code of the executed command.
     * }
     */
    public function wpcli(string $command, string $subcommand, array $raw_arguments = []): array
    {
        $arguments = implode(' ', $raw_arguments);
        $config    = sprintf('--url=%s', escapeshellarg($this->url));

        if ($this->path) {
            $config .= sprintf(' --path=%s', escapeshellarg($this->path));
        }

        // Support WP-CLI environment aliases.
        if ($this->alias) {
            $config = "@{$this->alias}";
        }

        $command = "{$this->binary} {$config} --no-color {$command} {$subcommand} {$arguments}";

        // Query WP-CLI.
        $proc = proc_open(
            $command,
            array(
                1 => ['pipe', 'w'],
                2 => ['pipe', 'w'],
            ),
            $pipes
        );

        $stdout = trim(stream_get_contents($pipes[1]));
        $stderr = trim(stream_get_contents($pipes[2]));
        fclose($pipes[1]);
        fclose($pipes[2]);
        $exit_code = proc_close($proc);

        // Sometimes the error message is in stderr.
        if (! $stdout && $stderr) {
            $stdout = $stderr;
        }

        if ($exit_code || strpos($stdout, 'Warning: ') === 0 || strpos($stdout, 'Error: ') === 0) {
            if ($exit_code === 255 && ! $stdout) {
                $stdout = 'Unable to connect to server via SSH. Is it on?';
            }

            throw new UnexpectedValueException(
                sprintf(
                    "[W102] WP-CLI driver failure in method %1\$s():\n\n%2\$s.\n\nTried to run: %3\$s\n(%4\$s)",
                    debug_backtrace()[1]['function'],
                    $stdout,
                    $command,
                    $exit_code
                )
            );
        }

        return compact('stdout', 'exit_code');
    }
}
