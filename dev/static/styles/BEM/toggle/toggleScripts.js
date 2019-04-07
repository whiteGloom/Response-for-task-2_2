module.exports.toggleClicked = function ($) {
	$(document).on('click', '.toggle', function() {
		var	parent 			= this,
			outer 			= {obj: $(parent).find('.toggle__outer'), name: 'outer'},
			handle 			= {obj: $(parent).find('.toggle__handle'), name: 'handle'},
			text 			= {obj: $(parent).find('.toggle__text'), name: 'text'},
			els				= [outer, handle, text];

		var stateCurrent 	= $(parent).data('state'),
			stateNext 		= stateCurrent == 'off' ? 'on' : 'off';

		for (var i = els.length - 1; i >= 0; i--) {
			$(els[i].obj).removeClass('toggle__' + els[i].name + '_state_' + stateCurrent);
			$(els[i].obj).addClass('toggle__' + els[i].name + '_state_' + stateNext);
		}
		$(parent).data('state', stateNext)
	})
}($)