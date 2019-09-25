function dropdown(el){
	this.base 	= el;
	this.type 	= $(this.base).data('type');
	this.button = $(this.base).find('.dropdown__button');
	this.name 	= $(this.base).data('name');

	this.valid 	= false;
	this.custom = true;
	$(this.base).data('custom', true);
	$(this.base).data('valid', false)
	$(this.base).data('value', false)
}

dropdown.prototype.setValue = function(value){
	this.value = value;
	$(this.base).data('value', value)
}

dropdown.prototype.setValid = function(valid){
	this.valid = valid;
	$(this.base).data('valid', valid)
}

dropdown.prototype.test = function(){
	this.currentValue = $(this.base).find('.dropdown__currentValue');
	this.optionsBox = $(this.base).find('.dropdown__optionsBox');
	if ($(this.optionsBox).hasClass('dropdown__optionsBox_state_hidden')) {
		$(this.optionsBox)
			.removeClass('dropdown__optionsBox_state_hidden')
			.addClass('dropdown__optionsBox_state_visible');
		$(document).on('click', $.proxy(selecting, this));
	}

	function selecting(event){
		if ($(event.target).closest('.dropdown')[0] == this.base && $(event.target).closest('.dropdown__button').length != 0) return;

		if ($(event.target).closest('.dropdown')[0] == this.base) {
			if ($(event.target).hasClass('dropdown__option')) {
				this.setValue($(event.target).data('value'));
				this.setValid(true);
				$(this.optionsBox).removeClass('dropdown__optionsBox_state_visible')
				$(this.optionsBox).addClass('dropdown__optionsBox_state_hidden');
				$(this.currentValue).text($(event.target).text())
				$(document).off('click', $.proxy(selecting, this));
				return;
			}
		}else{
			$(document).off('click', $.proxy(selecting, this));
			$(this.optionsBox)
				.removeClass('dropdown__optionsBox_state_visible')
				.addClass('dropdown__optionsBox_state_hidden');
			return;
		}
	}
}

dropdown.prototype.onClick = function(){
	$(this.button).on('click', $.proxy(this.test, this))
}

function makeArray() {
	var arr = [];
	for (var i = 0; i <= $('.dropdown').length - 1; i++) {
		arr[i] = new dropdown($('.dropdown')[i]);
		arr[i].onClick();
	}
	return arr;
}

module.exports.mkArr = makeArray;
