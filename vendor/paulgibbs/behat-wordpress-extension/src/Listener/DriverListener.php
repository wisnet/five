<?php
declare(strict_types=1);
namespace PaulGibbs\WordpressBehatExtension\Listener;

use Behat\Behat\EventDispatcher\Event\ExampleTested;
use Behat\Behat\EventDispatcher\Event\ScenarioLikeTested;
use Behat\Behat\EventDispatcher\Event\ScenarioTested;
use PaulGibbs\WordpressBehatExtension\WordpressDriverManager;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * WordPress driver listener.
 *
 * Determines which WordPress driver to use for a given scenario or outline.
 */
class DriverListener implements EventSubscriberInterface
{
    /**
     * WordPress driver manager.
     *
     * @var WordpressDriverManager
     */
    protected $wordpress;

    /**
     * WordPress context parameters.
     *
     * @var array
     */
    protected $parameters = [];

    /**
     * Constructor.
     *
     * @param WordpressDriverManager $wordpress
     * @param array                  $parameters
     */
    public function __construct(WordpressDriverManager $wordpress, array $parameters)
    {
        $this->wordpress  = $wordpress;
        $this->parameters = $parameters;
    }

    /**
     * Returns an array of event names this subscriber wants to listen to.
     *
     * @return array The event names to listen to.
     */
    public static function getSubscribedEvents() : array
    {
        return array(
            ScenarioTested::BEFORE => ['prepareWordpressDriver', 11],  // Scenarios
            ExampleTested::BEFORE  => ['prepareWordpressDriver', 11],  // Scenario Outlines
        );
    }

    /**
     * Configures the driver to use before each scenario or outline.
     *
     * @param ScenarioLikeTested $event
     */
    public function prepareWordpressDriver($event)
    {
        $drivers = array_keys($this->wordpress->getDrivers());
        $driver  = $this->parameters['default_driver'];
        $tags    = array_merge($event->getFeature()->getTags(), $event->getScenario()->getTags());

        // If the scenario or outline is tagged with a specific driver, switch to it.
        foreach ($tags as $tag) {
            if (! in_array($tag, $drivers, true)) {
                continue;
            }

            $driver = $tag;
            break;
        }

        $this->wordpress->setDefaultDriverName($driver);
    }
}
