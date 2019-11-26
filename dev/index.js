window.$ = require("jquery");

window.jQuery = window.$;
require("jquery-ui/ui/widgets/datepicker");
require("ion-rangeslider");

window.kit = {};
window.kit.makeForm = require("./blocks/form/form.js").default;
window.kit.makeInput = require("./blocks/input/input.js").default;
window.kit.makeDropdown = require("./blocks/dropdown/dropdown.js").default;
window.kit.makeSearchbar = require("./blocks/searchbar/searchbar.js").default;
window.kit.makeMap = require("./blocks/map/map.js").default;

require("./blocks/stepbar/stepbar.js");
require("./blocks/button/button.js");
require("./blocks/button-round/button-round.js");

require("./scripts/scripts.js");
