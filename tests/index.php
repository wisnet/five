<?php
/**
 * File: test.php
 * Date: 2019-04-01
 * Time: 14:00
 *
 * @package wisnet Five - Parent
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

use duncan3dc\Laravel\Dusk;

require __DIR__ . "/vendor/autoload.php";

$screenshots = __DIR__ . '/tests/screenshots';
$dusk = new Dusk();
$browser = $dusk->getBrowser();

$dusk->visit("https://www.wisnetfive.dev");
$browser->resize(1920, 1080);
$dusk->screenshot($screenshots . '/desktop-home');

$browser->mouseover('#navbarDropdown__about-us-0');
$dusk->screenshot($screenshots . '/desktop-menu-about-mouseover');

$browser->click('#navbarDropdown__about-us-0');
$dusk->screenshot($screenshots . '/desktop-menu-about-click');

// reset menu
$browser->click('#content');

// go mobile
$browser->resize(411, 823);
$dusk->screenshot($screenshots . '/mobile-home');

$browser->click('.navbar-toggler');
$dusk->screenshot($screenshots . '/mobile-menu-open');

$browser->click('#navbarDropdown__about-us-0');
$dusk->screenshot($screenshots . '/mobile-menu-open-about');

echo $dusk->element("#block_5c9e2bd7a7435")->getText() . "\n";
