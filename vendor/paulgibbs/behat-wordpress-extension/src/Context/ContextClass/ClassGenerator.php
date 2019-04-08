<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Context\ContextClass;

use Behat\Behat\Context\ContextClass\ClassGenerator as BehatContextGenerator;
use Behat\Testwork\Suite\Suite;

/**
 * Generate a sample Behat context class template.
 */
class ClassGenerator implements BehatContextGenerator
{
    /**
     * @var string
     */
    protected static $template = <<<'PHP'
<?php
{namespace}use PaulGibbs\WordpressBehatExtension\Context\RawWordpressContext;

use Behat\Behat\Tester\Exception\PendingException;

/**
 * Define application features from the specific context.
 */
class {class_name} extends RawWordpressContext {

    /**
     * Initialise context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the context constructor through behat.yml.
     */
    public function __construct() {
        parent::__construct();
    }
}

PHP;

    /**
     * Check if generator supports provided context class.
     *
     * @param Suite  $suite
     * @param string $context_class
     *
     * @return bool
     */
    public function supportsSuiteAndClass(Suite $suite, $context_class)
    {
        return true;
    }

    /**
     * Generate context class code.
     *
     * @param Suite  $suite
     * @param string $context_class
     *
     * @return string The context class source code.
     */
    public function generateClass(Suite $suite, $context_class)
    {
        $fqn       = $context_class;
        $namespace = '';
        $pos       = strrpos($fqn, '\\');

        if ($pos) {
            $context_class = substr($fqn, $pos + 1);
            $namespace     = sprintf('namespace %s;%s', substr($fqn, 0, $pos), PHP_EOL . PHP_EOL);
        }

        return strtr(
            static::$template,
            array(
                '{namespace}'  => $namespace,
                '{class_name}' => $context_class,
            )
        );
    }
}
