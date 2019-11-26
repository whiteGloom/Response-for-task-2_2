// Test scripts
$(document).ready(() => {
  $(".js-form").each(function () {
    window.kit.makeForm(this);
  });
  $(".js-input").each(function () {
    window.kit.makeInput(this);
  });
  $(".js-dropdown").each(function () {
    window.kit.makeDropdown(this);
  });
  $(".js-searchbar").each(function () {
    window.kit.makeSearchbar(this);
  });
  window.initMap = (function () {
    $(".js-map").each(function () {
      window.kit.makeMap(this);
    });
  }());


  $(".js-calendar__holder").datepicker({
    date: new Date(),
    firstDay: 1,
    dayNamesMin: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"],
    showButtonPanel: "true",
    showOtherMonths: "true",
    dateFormat: "dd",
    gotoCurrent: "false"
  });

  $(".js-slider__holder").eq(0).ionRangeSlider({
    min: 0,
    max: 100,
    from: 40,
    skin: "simple"
  });

  $(".js-slider__holder").eq(1).ionRangeSlider({
    min: 0,
    max: 100,
    from: 75,
    grid: true,
    skin: "pips"
  });

  $(".js-stepbar").stepbar({
    items: ["1", "2", "3", "4", "5"],
    current: 3
  });
});
