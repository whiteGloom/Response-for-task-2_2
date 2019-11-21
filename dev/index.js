window.$ = require("jquery");
require("jchart");
require("ionSlider");
require("stepbar");
require("dateTimePicker");

require("./blocks/button/button.js");
require("./blocks/button-round/button-round.js");
window.makeChart = require("./blocks/chart/chart.js").default;
window.makeForm = require("./blocks/form/form.js").default;
window.makeInput = require("./blocks/input/input.js").default;
window.makeDropdown = require("./blocks/dropdown/dropdown.js").default;
window.makeSearchbar = require("./blocks/searchbar/searchbar.js").default;
window.makeMap = require("./blocks/map/map.js").default;

require("./scripts/scripts.js");
