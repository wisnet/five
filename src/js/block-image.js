import $ from 'jquery';


function fixImageMargins() {
	const $images = $('.wp-block-image');
	const containerWidth = $('.container').one().outerWidth();
	const windowWidth = $(window).outerWidth();
	
	$.each($images, function () {
		const $this = $(this);
		const $figure = $this.children('figure');
		let align = 'marginLeft';
		let margin = (windowWidth - containerWidth) / 2 + 7.5;
		
		if ($figure.hasClass('aligncenter')) {
			margin = '0 auto';
		} else if ($figure.hasClass('alignright')) {
			align = 'marginRight';
		}
		
		$this.css(align, margin + 'px');
		
	});
}

fixImageMargins();

$(window).on('resize', fixImageMargins);
