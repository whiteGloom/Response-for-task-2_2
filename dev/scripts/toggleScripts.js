function toggle(elem) {
	this.base 		= elem;
	this.outer		= $(this.base).find(".js-toggle__outer");
	this.handle 	= $(this.base).find(".js-toggle__handle");
	this.text 		= $(this.base).find(".js-toggle__text");
	this.value		= $(this.base).data("value");
	this.name		= $(this.base).data("name");
	this.valid 		= true;

	$(this.base).data("custom", true);
	$(this.base).data("valid", true);
	$(this.base).data("value", this.value);
}

toggle.prototype.setValue = function(value){
	this.value = value;
	$(this.base).data("value", value);
}

toggle.prototype.test = function(){
	switch(this.value){
		case false: {
			$(this.outer)
				.removeClass("toggle__outer_state_off")
				.addClass("toggle__outer_state_on");
			$(this.handle)
				.addClass("toggle__handle_state_on")
				.removeClass("toggle__handle_state_off");
			$(this.text)
				.addClass("toggle__text_state_on")
				.removeClass("toggle__text_state_off")
				.text("on")
			this.setValue(true)
			break
		}
		case true: {
			$(this.outer)
				.removeClass("toggle__outer_state_on")
				.addClass("toggle__outer_state_off");
			$(this.handle)
				.addClass("toggle__handle_state_off")
				.removeClass("toggle__handle_state_on");
			$(this.text)
				.addClass("toggle__text_state_off")
				.removeClass("toggle__text_state_on")
				.text("off")
			this.setValue(false)
			break
		}
	}
};

toggle.prototype.onClick = function() {
	$(this.base).on("click", $.proxy(this.test, this));
};

toggle.prototype.offClick = function() {
	$(this.base).off("click", $.proxy(this.test, this));
};

function makeArray() {
	var arr = [];
	var $toggles = $(".js-toggle");
	for (var i = 0; i <= $toggles.length - 1; i++) {
		arr[i] = new toggle($toggles[i]);
		arr[i].onClick();
	}
	return arr;
}

module.exports.mkArr = makeArray;