<?php
/**
 * File: Bootstrap.php
 * Date: 2019-02-21
 * Time: 14:03
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Controller;

class Bootstrap {

	public function __construct() {
		// parent::__construct();
	}

	public function row($block = null) {
		if ($block !== '/') {
			?>
			<div class="row <?= block_global_setting(['alignment_vertical', 'alignment_horizontal', 'fluid_items']); ?>">
			<?php
		}
		else {
			?>
			</div>
			<?php
		}
	}

}
