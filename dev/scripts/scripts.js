// Test scripts
$(document).ready(() => {
  $(".js-form").each(function () {
    window.makeForm(this);
  });
  $(".js-input").each(function () {
    window.makeInput(this);
  });
  $(".js-dropdown").each(function () {
    window.makeDropdown(this);
  });
  $(".js-searchbar").each(function () {
    window.makeSearchbar(this);
  });
  window.initMap = (function () {
    $(".js-map").each(function () {
      window.makeMap(this);
    });
  }());

  $(".js-calendar__holder").datetimepicker({
    date: new Date(),
    firstDayOfWeek: 1
  });

  window.makeChart({
    target: "#Rating",
    type: "progress",
    title: "89",
    values: [
      {
        value: 89
      }
    ]
  });

  window.makeChart({
    target: "#Assort",
    type: "progress",
    title: "50",
    values: [
      {
        value: 50
      }
    ]
  });

  window.makeChart({
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

  window.makeChart({
    target: "#0percExample",
    type: "progress",
    title: "0",
    values: [
      {
        value: 0
      }
    ]
  });

  window.makeChart({
    target: "#38percExample",
    type: "progress",
    title: "38",
    values: [
      {
        value: 38
      }
    ]
  });

  window.makeChart({
    target: "#62percExample",
    type: "progress",
    title: "62",
    values: [
      {
        value: 62
      }
    ]
  });

  window.makeChart({
    target: "#89percExample",
    type: "progress",
    title: "89",
    values: [
      {
        value: 89
      }
    ]
  });

  window.makeChart({
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
