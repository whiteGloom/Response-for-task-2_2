/*
	Рабочий файл, в котором указываются подключаемые файлы и т.д..

	Примеры подключения:
	import "./scripts.js"	- Поключение файлов JS

	-whiteGloom
*/

$ = require('jquery');
require('jchart');
require('ionSlider');
require('stepbar');
require('dateTimePicker');
chart = require('./static/styles/bem/chart/chartScripts.js');
toggle = require('./static/styles/bem/toggle/toggleScripts.js');
tick = require('./static/styles/bem/tick/tickScripts.js');
form = require('./static/styles/bem/form/formScripts.js');
input = require('./static/styles/bem/input/inputScripts.js');
dropdown = require('./static/styles/bem/dropdown/dropdownScripts.js');
searchbar = require('./static/styles/bem/searchbar/searchbarScripts.js');
map = require('./static/styles/bem/map/mapScripts.js');
require('./scripts/scripts.js');