function input(elem) {
	this.base 		= elem;
	this.entry 		= $(this.base).find(".js-input__entry");
	this.message 	= $(this.base).find(".js-input__message");
	this.type 		= $(this.base).data("type");
	this.value		= $(this.entry).val();
	this.name 		= $(this.base).data("name")
	this.valid  	= true;

	$(this.base).data("custom", true);
	$(this.base).data("valid", true);
}

input.prototype.setValue = function(value){
	this.value = value;
	$(this.base).data("value", value);
}

input.prototype.setValid = function(valid){
	this.valid = valid;
	$(this.base).data("valid", valid);
}

input.prototype.test = function(){
	switch(this.type){
		case "email": {
			if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test($(this.entry).val())){
				$(this.message)
					.addClass("input__message_state_succes")
					.removeClass("input__message_state_error")
					.removeClass("input__message_state_hidden")
					.text("thanks!")
				this.setValid(true);
				this.setValue($(this.entry).val());
			}else{
				$(this.message)
					.addClass("input__message_state_error")
					.removeClass("input__message_state_succes")
					.removeClass("input__message_state_hidden")
					.text("error")
				this.setValid(false);
				this.setValue($(this.entry).val());
			}
			break
		}
		case "password": {
			if ($(this.entry).val().length > 3){
				$(this.message)
					.addClass("input__message_state_succes")
					.removeClass("input__message_state_error")
					.removeClass("input__message_state_hidden")
					.text("thanks!")
				this.setValid(true);
				this.setValue($(this.entry).val());
			}else{
				$(this.message)
					.addClass("input__message_state_error")
					.removeClass("input__message_state_succes")
					.removeClass("input__message_state_hidden")
					.text("error")
				this.setValid(false);
				this.setValue($(this.entry).val())
			}
			break
		}
		default: {
			this.setValid(true);
			this.setValue($(this.entry).val());
		}
	}
};

input.prototype.onChange = function() {
	$(this.entry).prop("readonly", false);
	if ($(this.entry).val().length != 0) {
		this.test()
	};
	$(this.entry).on("change", $.proxy(this.test, this));
};

input.prototype.offChange = function() {
	$(this.entry).prop("readonly", true);
	$(this.entry).off("change", $.proxy(this.test, this));
};

function makeArray() {
	var arr = [];
	var $entrys = $(".js-input");
	for (var i = 0; i <= $entrys.length - 1; i++) {
		arr[i] = new input($entrys[i]);
		arr[i].onChange();
	}
	return arr;
}

module.exports.mkArr = makeArray;