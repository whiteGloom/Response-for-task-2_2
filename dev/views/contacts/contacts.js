window.$ = require('jquery');

window.jQuery = window.$;

makeMaps = require('../../blocks/map/map.js').default;
require('../../blocks/form/form.js');
require('../../blocks/input/input.js');
require('../../blocks/button/button.js');

// Test scripts
$(document).ready(() => {
  function mapLoader() {
    makeMaps();
  }
  window.initMap = mapLoader();
});
