class Searchbar {
  constructor(el) {
    this.$base = el;

    this._init();
  }

  setValue(value) {
    this.value = value;
    this.$base.data('value', value);
  }

  setValid(valid) {
    this.valid = valid;
    this.$base.data('valid', valid);
  }

  _test() {
    if (this.$input.data().valid && this.$input.data().value !== undefined) {
      window.location.reload();
    }
    return this.$input.children().data();
  }

  _addListeners() {
    this.$button.on('click', $.proxy(this._test, this));
  }

  _init() {
    this.$button = this.$base.find('.js-searchbar__button');
    this.$input = this.$base.find('.js-searchbar__input').children();
    this.type = this.$base.data('type');
    this.name = this.$base.data('name');
    this.valid = true;
    this.custom = true;

    this._addListeners();
  }
}

$('.js-searchbar').each((i, el) => {
  new Searchbar($(el));
});
