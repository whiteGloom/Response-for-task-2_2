class Input {
  constructor(el) {
    this.$base = el;
    this.$entry = this.$base.find('.js-input__entry');
    this.$message = this.$base.find('.js-input__message');
    this.type = this.$base.data('type');
    this.name = this.$base.data('name');
    this.valid = true;

    this.$base.data('custom', true);
    this.$base.data('valid', true);

    this.setValue(this.$entry.val());
    this.onChange();
    this.test();
  }

  setValue(value) {
    this.value = value;
    this.$base.data('value', value);
  }

  setValid(valid) {
    this.valid = valid;
    this.$base.data('valid', valid);
  }

  test() {
    switch (this.type) {
      case 'email': {
        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.$entry.val())) {
          this.$message
            .addClass('input__message_state_succes')
            .removeClass('input__message_state_error')
            .removeClass('input__message_state_hidden')
            .text('thanks!');
          this.setValid(true);
          this.setValue(this.$entry.val());
        } else {
          this.$message
            .addClass('input__message_state_error')
            .removeClass('input__message_state_succes')
            .removeClass('input__message_state_hidden')
            .text('error');
          this.setValid(false);
          this.setValue(this.$entry.val());
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
          this.setValid(true);
          this.setValue(this.$entry.val());
        } else {
          this.$message
            .addClass('input__message_state_error')
            .removeClass('input__message_state_succes')
            .removeClass('input__message_state_hidden')
            .text('error');
          this.setValid(false);
          this.setValue(this.$entry.val());
        }
        break;
      }

      default: {
        this.setValid(true);
        this.setValue(this.$entry.val());
      }
    }
  }

  onChange() {
    this.$entry.prop('readonly', false);
    this.$entry.on('change', $.proxy(this.test, this));
  }

  offChange() {
    this.$entry.prop('readonly', true);
    this.$entry.off('change', $.proxy(this.test, this));
  }
}

$('.js-input').each((i, el) => {
  new Input($(el));
});
