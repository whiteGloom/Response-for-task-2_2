/*
	Рабочий файл, в котором указываются подключаемые файлы и т.д..

	Примеры подключения:
	import "./scripts.js"	- Поключение файлов JS
	import "./index.pug"	- Поключение файлов Pug
	import "./styles.styl"	- Поключение сами догадайтесь каких файлов

	Импорт статики в html просиходит через require ( <img src=require("./path/file") ).
	Импорт статики в CSS происходит как обычно.

	UPD: импорт так же можно проводить при помощи функции importAll, пример:
	importAll(require.context("./static/styles", true, /\.css$/)) - подключение файлов CSS

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
bar = require('./static/styles/bem/bar/barScripts.js');
map = require('./static/styles/bem/map/mapScripts.js');
require('./scripts/scripts.js');