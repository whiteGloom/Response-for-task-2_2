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

chart = require('./scripts/chartScripts.js');
toggle = require('./scripts/toggleScripts.js');
tick = require('./scripts/tickScripts.js');
form = require('./scripts/formScripts.js');
input = require('./scripts/inputScripts.js');
dropdown = require('./scripts/dropdownScripts.js');
searchbar = require('./scripts/searchbarScripts.js');
map = require('./scripts/mapScripts.js');

require('./scripts/scripts.js');