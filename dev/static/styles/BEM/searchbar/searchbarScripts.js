function searchbar(el){
	this.base 	= el;
	this.type 	= $(this.base).data('type');
	this.button = $(this.base).find('.serchbar__button');
	this.name 	= $(this.base).data('name');

	this.valid 	= false;
	this.custom = true;
	$(this.base).data('custom', true);
	$(this.base).data('valid', false)
	$(this.base).data('value', false)
}

searchbar.prototype.setValue = function(value){
	this.value = value;
	$(this.base).data('value', value)
}

searchbar.prototype.setValid = function(valid){
	this.valid = valid;
	$(this.base).data('valid', valid)
}

searchbar.prototype.test = function(){
	this.input = $(this.base).find('.bar__input').children();
	if ($(this.input).data().valid && $(this.input).data().value != undefined){
		location.reload()
	}
	return $(this.input).children().data()

}

searchbar.prototype.onClick = function(){
	$(this.button).on('click', $.proxy(this.test, this))
}

function makeArray() {
	var arr = [];
	for (var i = 0; i <= $('.searchbar').length - 1; i++) {
		arr[i] = new searchbar($('.searchbar')[i]);
		arr[i].onClick();
	}
	return arr;
}

module.exports.mkArr = makeArray;
