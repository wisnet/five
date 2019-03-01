import $ from 'jquery';
import debug from './debug';

$('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
	debug('hi');
	if (!$(this).next().hasClass('show')) {
		$(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
	}
	const $subMenu = $(this).next('.dropdown-menu');
	$subMenu.toggleClass('show');
	
	
	$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
		$('.dropdown-submenu .show').removeClass('show');
	});
	
	debug(e);
	
	return false;
});

let v = 'hey';
debug({v});
