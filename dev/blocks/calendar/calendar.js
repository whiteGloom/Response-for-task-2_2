require('jquery-ui/ui/widgets/datepicker');

$('.js-calendar__holder').each((i, el) => {
  $(el).datepicker({
    firstDay: 1,
    gotoCurrent: false,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    showButtonPanel: true,
    showOtherMonths: true,
    dateFormat: 'dd',
  });
});
