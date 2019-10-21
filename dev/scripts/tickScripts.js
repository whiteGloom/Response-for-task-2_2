function tick(elem) {
	this.base = elem;
	this.outer = $(this.base).find(".js-tick__outer");
	this.icon = $(this.base).find(".js-tick__icon");
	this.value = $(this.base).data("value");
	this.name = $(this.base).data("name");
	this.valid = true;

	$(this.base).data("custom", true);
	$(this.base).data("valid", true);
	$(this.base).data("value", this.value);
}

tick.prototype.setValue = function(value){
	this.value = value;
	$(this.base).data("value", value);
}

tick.prototype.test = function(){
	switch(this.value){
		case false: {
			$(this.outer)
				.removeClass("tick__outer_state_off")
				.addClass("tick__outer_state_on");
			$(this.icon)
				.addClass("tick__icon_state_on")
				.removeClass("tick__icon_state_off");
			this.setValue(true)
			break
		}
		case true: {
			$(this.outer)
				.removeClass("tick__outer_state_on")
				.addClass("tick__outer_state_off");
			$(this.icon)
				.addClass("tick__icon_state_off")
				.removeClass("tick__icon_state_on");
			this.setValue(false)
			break
		}
	}
};

tick.prototype.onClick = function() {
	$(this.base).on("click", $.proxy(this.test, this));
};

tick.prototype.offClick = function() {
	$(this.base).off("click", $.proxy(this.test, this));
};

function makeArray() {
	var arr = [];
	var $ticks = $(".js-tick");
	for (var i = 0; i <= $ticks.length - 1; i++) {
		arr[i] = new tick($ticks[i]);
		arr[i].onClick();
	}
	return arr;
}

module.exports.mkArr = makeArray;