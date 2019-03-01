/* src/js/flash.js */
// import $ from 'jquery';

let flash = {};

flash.timeout = null;
flash.message = {
	status: 'success',
	content: '',
	showTime: 2000,
	dismissable: true
};

flash.container = $('<div />', {
	'class': 'flash-wrap ' + flash.message.status
});
flash.inner = $('<div />', {
	'class': 'flash-inner'
}).appendTo(flash.container);

flash.show = function (e) {
	
	if (typeof e !== 'undefined') {
		if (typeof e === 'object') {
			
			if (typeof e.size === 'undefined') {
				e.size = 'full';
			}
			
			if (typeof e.content === 'undefined' && typeof e.message !== 'undefined') {
				e.content = e.message;
			}
			
			flash.message = $.extend(flash.message, e);
		}
		
		if (typeof flash.message.status === 'boolean') {
			flash.message.status = flash.message.status ? 'success' : 'danger';
		}
	}
	
	if (flash.message.content !== '') {
		flash.displayMessage();
	} else {
		console.warn('Flash message blank: ', flash.message);
	}
};

flash.displayMessage = function () {
	
	var flashMessage = $('<div />', {
		'class': 'flash-message ' + flash.message.status + ' size-' + flash.message.size
	});
	
	if (flash.message.dismissable) {
		var flashClose = $('<span />', {
			'class': 'flash-close'
		}).append($('<span/>', {
			'class': 'flash-close-icon'
		}));
		flashClose.appendTo(flashMessage);
	}
	
	var flashContent = $('<div />', {
		'class': 'flash-content'
	}).append(flash.message.content).appendTo(flashMessage);
	
	flash.inner.append(flashMessage);
	
	if (!$('.flash-wrap').length) {
		$('body').prepend(flash.container);
		
		setTimeout(function () {
			$('body').addClass('flash-active');
		}, 100);
		
		
	}
	
	if (flash.message.showTime > 100) {
		flash.timeout = setTimeout(function () {
			flash.removeMessage(flashMessage);
		}, flash.message.showTime);
	}
	
};

flash.removeMessage = function (message) {
	
	$('body').removeClass('flash-active');
	
	message.remove();
	
	if (!$('.flash-message').length) {
		$('body').removeClass('flash-active');
		$('.flash-wrap').remove();
	}
};

$(document).on('click', '.flash-close', function () {
	$(this).closest('.flash-message').fadeOut(function () {
		twlw.flash.removeMessage($(this));
	});
});


export default flash;
