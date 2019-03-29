/* eslint-disable */
new acf.Model({
	events: {
		'load input[type="number"]': 'onChangeNumber',
		'keyup input[type="number"]': 'onChangeNumber'
	},
	onChangeNumber: function (e, $el) {
		const val = $el.val();
		let $wrap = $el.closest('.acf-input');
		let $seconds = $wrap.find('[data-interval-seconds]');
		
		if ($seconds.length && val > 0) {
			$seconds.text((val / 1000));
		}
	}
});
/* eslint-enable */
