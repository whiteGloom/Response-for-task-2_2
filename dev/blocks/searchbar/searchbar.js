class Searchbar {
  constructor(el) {
    this.$base = el;
    this.$button = this.$base.find(".js-searchbar__button");
    this.$input = this.$base.find(".js-searchbar__input").children();
    this.type = this.$base.data("type");
    this.name = this.$base.data("name");

    this.valid = true;
    this.custom = true;
    this.$base.data("custom", true);
    this.$base.data("valid", true);
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

  test() {
    if (this.$input.data().valid && this.$input.data().value !== undefined) {
      window.location.reload();
    }
    return this.$input.children().data();
  }

  onClick() {
    this.$button.on("click", $.proxy(this.test, this));
  }
}

function makeSearchbar(el) {
  return new Searchbar($(el));
}

export default makeSearchbar;
