class Dropdown {
  constructor(el) {
    this.$base = el;
    this.$button = this.$base.find(".js-dropdown__button");
    this.$currentValue = this.$base.find(".js-dropdown__currentValue");
    this.$optionsBox = this.$base.find(".js-dropdown__optionsBox");
    this.type = this.$base.data("type");
    this.name = this.$base.data("name");

    this.valid = false;
    this.custom = true;
    this.$base.data("custom", true);
    this.$base.data("valid", false);
    this.$base.data("value", false);

    this.onClick();
  }

  setValue(value) {
    this.value = value;
    this.$base.data("value", value);
  }

  setValid(valid) {
    this.valid = valid;
    this.$base.data("valid", valid);
  }

  onClick() {
    this.$button.on("click", $.proxy(this.test, this));
  }

  test() {
    function selecting(event) {
      const $target = $(event.target);
      if ($target.closest(".dropdown").is(this.$base) && $target.closest(".dropdown__button").length > 0) return;

      if ($target.closest(".dropdown").is(this.$base)) {
        if ($target.hasClass("dropdown__option")) {
          this.setValue($target.data("value"));
          this.setValid(true);
          this.$optionsBox.removeClass("dropdown__optionsBox_state_visible");
          this.$optionsBox.addClass("dropdown__optionsBox_state_hidden");
          this.$currentValue.text($target.text());
          $(document).off("click", $.proxy(selecting, this));
        }
      } else {
        $(document).off("click", $.proxy(selecting, this));
        this.$optionsBox
          .removeClass("dropdown__optionsBox_state_visible")
          .addClass("dropdown__optionsBox_state_hidden");
      }
    }

    if (this.$optionsBox.hasClass("dropdown__optionsBox_state_hidden")) {
      this.$optionsBox
        .removeClass("dropdown__optionsBox_state_hidden")
        .addClass("dropdown__optionsBox_state_visible");
      $(document).on("click", $.proxy(selecting, this));
    }
  }
}

function makeDropdown(el) {
  return new Dropdown($(el));
}

export default makeDropdown;
