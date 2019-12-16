window.$ = require('jquery');

window.jQuery = window.$;

require('../../blocks/button/button.js');
require('../../blocks/button-round/button-round.js');
require('../../blocks/input/input.js');
require('../../blocks/searchbar/searchbar.js');
require('../../blocks/dropdown/dropdown.js');
require('../../blocks/form/form.js');
require('../../blocks/slider/slider.js');
require('../../blocks/calendar/calendar.js');
const makeMaps = require('../../blocks/map/map.js').default;

// Test scripts
$(document).ready(() => {
  function mapLoader() {
    makeMaps();
  }
  window.initMap = mapLoader();
});
