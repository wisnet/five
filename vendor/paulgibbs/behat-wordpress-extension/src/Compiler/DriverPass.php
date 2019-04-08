<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

/**
 * WordpressBehatExtension container compilation pass.
 */
class DriverPass implements CompilerPassInterface
{
    /**
     * Modify the container before Symfony compiles it.
     *
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        $wordpress = $container->getDefinition('wordpress.wordpress');
        if (! $wordpress) {
            return;
        }

        foreach ($container->findTaggedServiceIds('wordpress.driver') as $id => $attributes) {
            foreach ($attributes as $attribute) {
                if (empty($attribute['alias'])) {
                    continue;
                }

                $wordpress->addMethodCall('registerDriver', [$attribute['alias'], new Reference($id)]);
            }
        }

        $wordpress->addMethodCall(
            'setDefaultDriverName',
            [$container->getParameter('wordpress.wordpress.default_driver')]
        );
    }
}
