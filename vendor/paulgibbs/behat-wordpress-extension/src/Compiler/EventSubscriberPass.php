<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Compiler;

use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

/**
 * Event subscribers pass.
 *
 * Register all available event subscribers.
 */
class EventSubscriberPass implements CompilerPassInterface
{
    /**
     * Processes container.
     *
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        if (! $container->hasDefinition('wordpress.event_dispatcher')) {
            return;
        }

        $dispatcher = $container->getDefinition('wordpress.event_dispatcher');

        foreach ($container->findTaggedServiceIds('wordpress.event_subscriber') as $id => $attributes) {
            foreach ($attributes as $attribute) {
                $priority = isset($attribute['priority']) ? intval($attribute['priority']) : 0;

                $dispatcher->addMethodCall(
                    'addSubscriber',
                    [new Reference($id), $priority]
                );
            }
        }
    }
}
