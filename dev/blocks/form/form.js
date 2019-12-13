class Form {
  constructor(el) {
    this.$base = el;
    this.name = this.$base.data('name');
  }

  onSubmit() {
    function submitHandler(e) {
      e.preventDefault();
      if (this._getValues() === 'error') {
        return;
      }
      window.location.reload();
    }

    this.$base.on('submit', $.proxy(submitHandler, this));
  }

  _getValues() {
    try {
      const data = [];
      const formEntrys = this.$base.find('.js-form__el-entry');

      formEntrys.forEach(($el) => {
        const $entry = $el.children();
        if ($entry.data('custom')) {
          if ($entry.data('valid') !== true) {
            throw new SyntaxError('error');
          }
          data.push({
            name: $entry.data('name'),
            value: $entry.data('value') !== undefined ? $entry.data('value') : '',
          });
        } else {
          data.push({
            name: $entry.attr('name'),
            value: $entry.val(),
          });
        }
      });
      return data;
    } catch (e) {
      return e;
    }
  }
}

$('.js-form').each((i, el) => {
  new Form($(el));
});
