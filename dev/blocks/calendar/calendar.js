require('jquery-ui/ui/widgets/datepicker');

class Calendar {
  constructor(element) {
    this.$calendar = element;

    this._init();
  }

  _getConfig() {
    return {
      firstDay: 1,
      gotoCurrent: false,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
      showButtonPanel: true,
      showOtherMonths: true,
      dateFormat: 'dd',
    }
  }

  _init() {
    this.$calendar.datepicker(this._getConfig());
  }
}

$('.js-calendar__holder').each((i, el) => {
  new Calendar($(el));
});
