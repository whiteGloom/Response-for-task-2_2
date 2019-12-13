class Input {
  constructor(el) {
    this.$base = el;
    this.valid = true;

    this._init();
    this._addListeners();
    this._test();
  }

  _setValue(value) {
    this.value = value;
    this.$base.data('value', value);
  }

  _setValid(valid) {
    this.valid = valid;
    this.$base.data('valid', valid);
  }

  _test() {
    switch (this.type) {
      case 'email': {
        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.$entry.val())) {
          this.$message
            .addClass('input__message_state_succes')
            .removeClass('input__message_state_error')
            .removeClass('input__message_state_hidden')
            .text('thanks!');
          this._setValid(true);
          this._setValue(this.$entry.val());
        } else {
          this.$message
            .addClass('input__message_state_error')
            .removeClass('input__message_state_succes')
            .removeClass('input__message_state_hidden')
            .text('error');
          this._setValid(false);
          this._setValue(this.$entry.val());
        }
        break;
      }
      case 'password': {
        if (this.$entry.val().length >= 0) {
          this.$message
            .addClass('input__message_state_succes')
            .removeClass('input__message_state_error')
            .removeClass('input__message_state_hidden')
            .text('thanks!');
          this._setValid(true);
          this._setValue(this.$entry.val());
        } else {
          this.$message
            .addClass('input__message_state_error')
            .removeClass('input__message_state_succes')
            .removeClass('input__message_state_hidden')
            .text('error');
          this._setValid(false);
          this._setValue(this.$entry.val());
        }
        break;
      }

      default: {
        this._setValid(true);
        this._setValue(this.$entry.val());
      }
    }
  }

  _init() {
    this.$entry = this.$base.find('.js-input__entry');
    this.$message = this.$base.find('.js-input__message');
    this.type = this.$base.data('type');
    this.name = this.$base.data('name');
  }

  _addListeners() {
    this.$entry.on('change', $.proxy(this._test, this));
  }
}

$('.js-input').each((i, el) => {
  new Input($(el));
});
