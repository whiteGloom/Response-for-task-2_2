function bar(el){
	this.base 	= el;
	this.type 	= $(this.base).data('type');
	this.button = $(this.base).find('.bar__button');
	this.name 	= $(this.base).data('name');

	this.valid 	= false;
	this.custom = true;
	$(this.base).data('custom', true);
	$(this.base).data('valid', false)
	$(this.base).data('value', false)
}

bar.prototype.setValue = function(value){
	this.value = value;
	$(this.base).data('value', value)
}

bar.prototype.setValid = function(valid){
	this.valid = valid;
	$(this.base).data('valid', valid)
}

bar.prototype.test = function(){
	switch(this.type){
		case 'search': {
			this.input = $(this.base).find('.bar__input').children();
			if ($(this.input).data().valid && $(this.input).data().value != undefined){
				$(this.input).data().value = "";
				location.reload()
			}
			return $(this.input).children().data()
			break
		}
		case 'dropdown': {
			this.dropdown = $(this.base).find('.bar__dropdown');
			this.dropdownList = $(this.base).find('.bar__dropdownList');
			this.dropdownOptions = $(this.base).find('.bar__dropdownOption');
			this.dropdownText = $(this.base).find('.bar__dropdownText')
			if ($(this.dropdownList).hasClass('bar__dropdownList_state_hidden')) {
				$(this.dropdownList)
					.removeClass('bar__dropdownList_state_hidden')
					.addClass('bar__dropdownList_state_visible');
				$(document).on('click', $.proxy(selecting, this));
			}

			function selecting(event){
				if ($(event.target).closest('.bar')[0] == this.base && $(event.target).closest('.bar__button').length != 0) {
					return
				}else{
					if ($(event.target).closest('.bar__dropdown')[0] == this.dropdown[0]) {
						if ($(event.target).hasClass('bar__dropdownOption')) {
							this.setValue($(event.target).data('value'));
							this.setValid(true);
							$(this.dropdownList)
								.removeClass('bar__dropdownList_state_visible')
								.addClass('bar__dropdownList_state_hidden');
							$(this.dropdownText).text($(event.target).text())
							$(document).off('click', $.proxy(selecting, this));
							return;
						}
					}else{
						$(document).off('click', $.proxy(selecting, this));
						$(this.dropdownList)
							.removeClass('bar__dropdownList_state_visible')
							.addClass('bar__dropdownList_state_hidden');
						return;
					}
				}
			}
			break
		}
	}

}

bar.prototype.onClick = function(){
	$(this.button).on('click', $.proxy(this.test, this))
}

function makeArray() {
	var arr = [];
	for (var i = 0; i <= $('.bar').length - 1; i++) {
		arr[i] = new bar($('.bar')[i]);
		arr[i].onClick();
	}
	return arr;
}

module.exports.mkArr = makeArray;
