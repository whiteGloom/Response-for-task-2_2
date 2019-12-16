window.$ = require('jquery');

window.jQuery = window.$;

require('../../blocks/button/button.js');
require('../../blocks/searchbar/searchbar.js');

// Test scripts
$(document).ready(() => {
  function mapLoader() {
    makeMaps.makeMaps();
  }
  window.initMap = mapLoader();
});
