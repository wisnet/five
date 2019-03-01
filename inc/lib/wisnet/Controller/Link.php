<?php
/**
 * File: Link.php
 * Date: 2019-01-04
 * Time: 14:09
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Controller;

class Link {

	public function __construct() {
		// parent::__construct();
	}

	public function linkPhone($phone) {
		return 'tel:' . preg_replace('/[^0-9]/', '', $phone);
	}

	public function linkEmail($email, $subject = '', $body = '') {
		return 'mailto:' . $email . '?subject=' . $subject . '&body=' . $body;
	}

	public function aEmail($email, $subject = '', $body = '', $attr = []) {
		$atts = '';
		foreach ($attr ?: [] as $key => $val) {
			$atts .= $key . '="' . $val . '" ';
		}
		return '<a ' . $atts . ' href="' . $this->linkEmail($email, $subject, $body) . '">' . $email . '</a>';
	}

	public function aPhone($phone, $attr = []) {
		$atts = '';
		foreach ($attr ?: [] as $key => $val) {
			$atts .= $key . '="' . $val . '" ';
		}
		return '<a ' . $atts . ' href="' . $this->linkPhone($phone) . '">' . $phone . '</a>';
	}
}
