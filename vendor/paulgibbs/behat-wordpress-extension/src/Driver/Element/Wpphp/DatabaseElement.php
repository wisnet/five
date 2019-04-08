<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Driver\Element\Wpphp;

use RuntimeException;
use PaulGibbs\WordpressBehatExtension\Driver\Element\BaseElement;

/**
 * WP-API driver element for manipulating the database directly.
 */
class DatabaseElement extends BaseElement
{
    /**
     * Export site database.
     *
     * @param int   $id   Not used.
     * @param array $args
     *
     * @return string Path to the database dump.
     */
    public function get($id, $args = [])
    {
        if (empty($args['path'])) {
            $args['path'] = sys_get_temp_dir();
        }

        $bin          = '';
        $path         = tempnam($args['path'], 'wordhat');
        $command_args = sprintf(
            '--no-defaults %1$s --add-drop-table --result-file=%2$s --host=%3$s --user=%4$s',
            DB_NAME,
            $path,
            DB_HOST,
            DB_USER
        );

        $old_pwd = getenv('MYSQL_PWD');
        putenv('MYSQL_PWD=' . DB_PASSWORD);

        // Support Windows.
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $bin = '/usr/bin/env ';
        }

        // Export DB via mysqldump.
        $proc = proc_open(
            "{$bin}mysqldump {$command_args}",
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
        putenv('MYSQL_PWD=' . $old_pwd);

        // Sometimes the error message is in stderr.
        if (! $stdout && $stderr) {
            $stdout = $stderr;
        }

        if ($exit_code || strpos($stdout, 'Warning: ') === 0 || strpos($stdout, 'Error: ') === 0) {
            throw new RuntimeException(
                sprintf(
                    "[W606] Could not export database in method %1\$s(): \n\n%2\$s.\n(%3\$s)",
                    debug_backtrace()[1]['function'],
                    $stdout,
                    $exit_code
                )
            );
        }

        return $path;
    }

    /**
     * Import site database.
     *
     * @param int   $id   Not used.
     * @param array $args
     */
    public function update($id, $args = [])
    {
        $bin          = '';
        $command_args = sprintf(
            '--no-defaults --no-auto-rehash --host=%1$s --user=%2$s --database=%3$s --execute=%4$s',
            DB_HOST,
            DB_USER,
            DB_NAME,
            escapeshellarg(sprintf(
                'SET autocommit = 0; SET unique_checks = 0; SET foreign_key_checks = 0; SOURCE %1$s; COMMIT;',
                $args['path']
            ))
        );

        $old_pwd = getenv('MYSQL_PWD');
        putenv('MYSQL_PWD=' . DB_PASSWORD);

        // Support Windows.
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $bin = '/usr/bin/env ';
        }

        // Import DB via mysql-cli.
        $proc = proc_open(
            "{$bin}mysql {$command_args}",
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
        putenv('MYSQL_PWD=' . $old_pwd);

        // Sometimes the error message is in stderr.
        if (! $stdout && $stderr) {
            $stdout = $stderr;
        }

        if ($exit_code || strpos($stdout, 'Warning: ') === 0 || strpos($stdout, 'Error: ') === 0) {
            throw new RuntimeException(
                sprintf(
                    "[W607] Could not import database in method %1\$s(): \n\n%2\$s.\n(%3\$s)",
                    debug_backtrace()[1]['function'],
                    $stdout,
                    $exit_code
                )
            );
        }

        /*
         * clear the cache after restoration - this is probably only necessary
         * because of some kind of global state issue - the WPCLI driver doensn't
         * need it. There is some discussion about it here:
         *
         * https://github.com/paulgibbs/behat-wordpress-extension/pull/150
         */
        \wp_cache_flush();
    }


    /*
     * Convenience methods.
     */

    /**
     * Alias of get().
     *
     * @see get()
     *
     * @param int   $id   Not used.
     * @param array $args
     *
     * @return string Path to the export file.
     */
    public function export($id, $args = [])
    {
        return $this->get($id, $args);
    }

    /**
     * Alias of update().
     *
     * @see update()
     *
     * @param int   $id   Not used.
     * @param array $args
     */
    public function import($id, $args = [])
    {
        $this->update($id, $args);
    }
}
