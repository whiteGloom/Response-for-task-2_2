window.$ = require('jquery');

window.jQuery = window.$;

window.kit = {};
window.kit.makeMaps = require('./blocks/map/map.js').default;

require('./blocks/button/button.js');
require('./blocks/button-round/button-round.js');
require('./blocks/input/input.js');
require('./blocks/searchbar/searchbar.js');
require('./blocks/dropdown/dropdown.js');
require('./blocks/form/form.js');
require('./blocks/slider/slider.js');
require('./blocks/calendar/calendar.js');
require('./scripts/scripts.js');
