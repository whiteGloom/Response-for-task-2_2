class Form {
  constructor(el) {
    this.$base = el;
    this.name = this.$base.data("name");
  }

  getValues() {
    try {
      const data = [];
      const formEntrys = this.$base.find(".js-form__el-entry");

      formEntrys.forEach(($el) => {
        const $entry = $el.children();
        if ($entry.data("custom")) {
          if ($entry.data("valid") !== true) {
            throw new SyntaxError("error");
          }
          data.push({
            name: $entry.data("name"),
            value: $entry.data("value") !== undefined ? $entry.data("value") : ""
          });
        } else {
          data.push({
            name: $entry.attr("name"),
            value: $entry.val()
          });
        }
      });
      return data;
    } catch (e) {
      return e;
    }
  }

  onSubmit() {
    this.$base.on("submit", $.proxy(function (event) {
      event.preventDefault();
      if (this.getValues() === "error") {
        return;
      }
      window.location.reload();
    }, this));
  }
}

function makeForm(el) {
  return new Form($(el));
}

export default makeForm;
