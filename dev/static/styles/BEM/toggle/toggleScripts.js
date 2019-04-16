function toggle(elem) {
	this.base 		= elem;
	this.handle 	= $(this.base).find('.toggle__handle');
	this.text 		= $(this.base).find('.toggle__text');
	this.value		= $(this.base).data('value');
	this.name		= $(this.base).data('name');
	this.valid 		= true;

	$(this.base).data('custom', true);
	$(this.base).data('valid', true);
	$(this.base).data('value', this.value);
}

toggle.prototype.setValue = function(value){
	this.value = value;
	$(this.base).data('value', value);
}

toggle.prototype.test = function(){
	switch(this.value){
		case false: {
			$(this.base)
				.removeClass('toggle_state_off')
				.addClass('toggle_state_on');
			$(this.handle)
				.addClass('toggle__handle_state_on')
				.removeClass('toggle__handle_state_off');
			$(this.text)
				.addClass('toggle__text_state_on')
				.removeClass('toggle__text_state_off')
				.text('on')
			this.setValue(true)
			break
		}
		case true: {
			$(this.base)
				.removeClass('toggle_state_on')
				.addClass('toggle_state_off');
			$(this.handle)
				.addClass('toggle__handle_state_off')
				.removeClass('toggle__handle_state_on');
			$(this.text)
				.addClass('toggle__text_state_off')
				.removeClass('toggle__text_state_on')
				.text('off')
			this.setValue(false)
			break
		}
	}
};

toggle.prototype.onClick = function() {
	$(this.base).on('click', $.proxy(this.test, this));
};

toggle.prototype.offClick = function() {
	$(this.base).off('click', $.proxy(this.test, this));
};

function makeArray() {
	var arr = [];
	for (var i = 0; i <= $('.toggle').length - 1; i++) {
		arr[i] = new toggle($('.toggle')[i]);
		arr[i].onClick();
	}
	return arr;
}

module.exports.mkArr = makeArray;