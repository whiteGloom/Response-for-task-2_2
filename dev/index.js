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


var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
};

importAll(require.context("./static/BEM/", true, /\.styl$/));
importAll(require.context("./static/BEM/", true, /\.(jpe?g|gif|png|svg)/));
importAll(require.context("./static/fonts/", true, /\.(woff|otf|ttf|eot)/));