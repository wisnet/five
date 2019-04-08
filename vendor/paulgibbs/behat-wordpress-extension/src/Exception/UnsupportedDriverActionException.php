<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Exception;

use Exception;

/**
 * Exception to handle unsupported driver actions.
 */
class UnsupportedDriverActionException extends Exception
{
    /**
     * Constructor.
     *
     * @param string     $message       Optional. Exception message.
     * @param int        $code          Optional. User-defined exception code.
     * @param \Throwable|null $previous Optional. If this was a nested exception, the previous exception.
     */
    public function __construct(string $message = '', int $code = 0, \Throwable $previous = null)
    {
        parent::__construct(
            "[W001] No ability to {$message}. Maybe use another driver?",
            $code,
            $previous
        );
    }
}
