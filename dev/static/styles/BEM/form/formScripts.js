function form(elem) {
	this.base = elem;
	this.name = $(this.base).data('name')
}

form.prototype.getValues = function(){
	try {
		var data = [];
		var formEntrys = $(this.base).find('.form__elEntry');
		for(var i = 0; i < formEntrys.length; i++){
			var entry = $(formEntrys[i]).children()[0];
			if ($(entry).data('custom') == true){
				if($(entry).data('valid') != true ){
					throw new SyntaxError('error')
				}
				data.push({
					name: $(entry).data('name'),
					value: $(entry).data('value') != undefined ? $(entry).data('value') : ''				
				})
			}else{
				data.push({
					name: $(entry).attr('name'),
					value: $(entry).val()
				})
			}
		}
		return data
	} catch (err){
		return 'error'
	}
};

form.prototype.onSubmit = function() {
	$(this.base).on('submit', $.proxy(function (event){
		event.preventDefault();
		if(this.getValues() == 'error'){
			return
		};
		location.reload()
	}, this))
}

function makeArray() {
	var arr = [];
	for (var i = 0; i <= $('.form').length - 1; i++) {
		arr[i] = new form($('.form')[i]);
		arr[i].onSubmit();
	}
	return arr;
}

module.exports.mkArr = makeArray;