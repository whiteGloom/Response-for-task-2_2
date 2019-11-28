require('jquery-ui/ui/widgets/datepicker');

$('.js-calendar__holder').each((i, el) => {
  $(el).datepicker({
    date: new Date(),
    firstDay: 1,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    showButtonPanel: 'true',
    showOtherMonths: 'true',
    dateFormat: 'dd',
    gotoCurrent: 'false',
  });
});
