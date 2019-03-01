<?php
/**
 * File: Hours.php
 * Date: 2019-01-02
 * Time: 08:28
 *
 * @package wisnet Five
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */

namespace wisnet\Block\View;

use Timber\Timber;

class Hours extends Base {
	public $workingHours = [];
	public $heading;

	public function __construct(array $acfBlock, array $fields) {
		parent::__construct($acfBlock, $fields);
		$this->compileHours();
	}

	/**
	 * @return array
	 */
	public function getWorkingHours(): array {
		return $this->workingHours;
	}

	/**
	 * @param array $hours
	 * @return Hours
	 */
	public function setWorkingHours(array $hours = null): Hours {
		$this->workingHours = $hours ?? [];
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getHeading() {
		return $this->heading;
	}

	/**
	 * To prevent needing to copy/paste the heading
	 * Let's just call it directly. This should make things
	 * easier to convert when ACF catches up to nested
	 * blocks.
	 *
	 * @param mixed $heading
	 * @return Hours
	 */
	public function setHeading($heading) {
		$heading = new Heading([], ($heading ?: []));
		// Render the block.
		$context = [
			'block' => $heading,
		];
		$output = null;
		if (file_exists(get_theme_file_path(ATOMIC_BLOCKS . '/heading.twig'))) {
			$output = Timber::fetch(ATOMIC_BLOCKS . '/heading.twig', $context);
		}
		$this->heading = $output;

		return $this;
	}

	public function compileHours() {
		$hours = $this->getField('hours');
		$workingHours = [];

		if ($hours) {
			foreach ($hours as $fieldKey => $hour) {
				$days = $hour['day'];

				$label = ucwords((count($days) > 1 ? ($days[0] . ' - ' . end($days)) : $days[0]));

				$open = $hour['open'] ?: false;
				$close = $hour['close'] ?: false;

				$workingHours[] = [
					'label' => $label,
					'isOpen' => ($open || $close),
					'hours' => [
						'open' => $open,
						'close' => $close,
						'delimiter' => ' - ',
					],
				];
			}
		}

		$this->setWorkingHours($workingHours);
	}

}
