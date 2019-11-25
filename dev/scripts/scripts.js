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
    dayNamesMin: [ "Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat" ],
    showButtonPanel: "true",  
    showOtherMonths: "true",
    dateFormat: "dd", 
    gotoCurrent: "false"
  });

  window.kit.makeChart({
    target: "#Rating",
    type: "progress",
    title: "89",
    values: [
      {
        value: 89
      }
    ]
  });

  window.kit.makeChart({
    target: "#Assort",
    type: "progress",
    title: "50",
    values: [
      {
        value: 50
      }
    ]
  });

  window.kit.makeChart({
    target: "#Categories",
    type: "pie",
    values: [
      {
        value: 10,
        color: "#747474"
      },
      {
        value: 30,
        color: "#e75735"
      },
      {
        value: 30,
        color: "#4eb7a8"
      },
      {
        value: 30,
        color: "#e5e5e5"
      }
    ]
  });

  window.kit.makeChart({
    target: "#0percExample",
    type: "progress",
    title: "0",
    values: [
      {
        value: 0
      }
    ]
  });

  window.kit.makeChart({
    target: "#38percExample",
    type: "progress",
    title: "38",
    values: [
      {
        value: 38
      }
    ]
  });

  window.kit.makeChart({
    target: "#62percExample",
    type: "progress",
    title: "62",
    values: [
      {
        value: 62
      }
    ]
  });

  window.kit.makeChart({
    target: "#89percExample",
    type: "progress",
    title: "89",
    values: [
      {
        value: 89
      }
    ]
  });

  window.kit.makeChart({
    target: "#pieExample",
    type: "pie",
    values: [
      {
        value: 10,
        color: "#747474"
      },
      {
        value: 30,
        color: "#e75735"
      },
      {
        value: 30,
        color: "#4eb7a8"
      },
      {
        value: 30,
        color: "#e5e5e5"
      }
    ]
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
