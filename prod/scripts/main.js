/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./dev/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/index.js":
/*!**********************!*\
  !*** ./dev/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
$ = __webpack_require__(/*! jquery */ "./dev/jsPlugins/jquery-3.3.1.js");

__webpack_require__(/*! jchart */ "./dev/jsPlugins/jquery.jchart.js");

__webpack_require__(/*! ionSlider */ "./dev/jsPlugins/ion.rangeSlider.js");

__webpack_require__(/*! stepbar */ "./dev/jsPlugins/stepbar.js");

chart = __webpack_require__(/*! ./static/styles/bem/chart/chartScripts.js */ "./dev/static/styles/bem/chart/chartScripts.js");

__webpack_require__(/*! ./static/styles/bem/toggle/toggleScripts.js */ "./dev/static/styles/bem/toggle/toggleScripts.js");

__webpack_require__(/*! ./scripts/scripts.js */ "./dev/scripts/scripts.js");

/***/ }),

/***/ "./dev/scripts/scripts.js":
/*!********************************!*\
  !*** ./dev/scripts/scripts.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Test scripts
$(document).ready(function () {
  chart.newChart({
    target: '#chartTestFirst',
    type: 'progress',
    title: '89',
    values: [{
      value: 89
    }]
  });
  chart.newChart({
    target: '#chartTestSecond',
    type: 'progress',
    title: '50',
    values: [{
      value: 50
    }]
  });
  chart.newChart({
    target: '#chartTestThird',
    type: 'pie',
    values: [{
      value: 10,
      color: '#747474'
    }, {
      value: 30,
      color: '#e75735'
    }, {
      value: 30,
      color: '#4eb7a8'
    }, {
      value: 30,
      color: '#e5e5e5'
    }]
  });
  $("#sliderSimpleTest").ionRangeSlider({
    min: 0,
    max: 100,
    from: 40,
    skin: "simple"
  });
  $("#sliderPipsTest").ionRangeSlider({
    min: 0,
    max: 100,
    from: 40,
    grid: true,
    skin: "pips"
  });
  $('#stepbarTest').stepbar({
    items: ['1', '2', '3', '4', '5'],
    current: 3
  });
});

/***/ }),

/***/ "./dev/static/styles/bem/chart/chartScripts.js":
/*!*****************************************************!*\
  !*** ./dev/static/styles/bem/chart/chartScripts.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.newChart = function (options) {
  var options = options ? options : {};
  var target = options.target ? options.target : '',
      type = options.type ? options.type : 'progress',
      title = options.title ? options.title : '',
      values = options.values ? options.values : [];
  var defaults = {
    data: [],
    appearance: {
      type: 'donut',
      gap: 0,
      baseColor: 'transparent'
    }
  };

  switch (type) {
    case 'pie':
      for (var i = 0; i < values.length; i++) {
        values[i].strokeWidth = 8;
        values[i].color = {
          normal: values[i].color,
          active: values[i].color
        };
      }

      ;
      defaults.data = defaults.data.concat(values);
      defaults.appearance.title = {
        showSummary: false
      };
      break;

    case 'progress':
      values[0].strokeWidth = 2;
      values[0].color = {
        normal: values[0].color ? values[0].color : '#e75735',
        active: values[0].color ? values[0].color : '#e75735'
      };
      defaults.data = defaults.data.concat(values[0], {
        value: 100 - values[0].value,
        draw: false
      });
      defaults.appearance.title = {
        summaryTitle: title,
        showSummary: true
      };
      break;

    default:
      for (var i = 0; i < values.length; i++) {
        values[i].color = {
          normal: values[i].color,
          active: values[i].color
        };
      }

      ;
      defaults.data = defaults.data.concat(values);
      defaults.appearance.title = {
        showSummary: false
      };
      break;
  }

  return $(target).jChart(defaults);
};

/***/ }),

/***/ "./dev/static/styles/bem/toggle/toggleScripts.js":
/*!*******************************************************!*\
  !*** ./dev/static/styles/bem/toggle/toggleScripts.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.toggleClicked = function ($) {
  $(document).on('click', '.toggle', function () {
    var parent = this,
        outer = {
      obj: $(parent).find('.toggle__outer'),
      name: 'outer'
    },
        handle = {
      obj: $(parent).find('.toggle__handle'),
      name: 'handle'
    },
        text = {
      obj: $(parent).find('.toggle__text'),
      name: 'text'
    },
        els = [outer, handle, text];
    var stateCurrent = $(parent).data('state'),
        stateNext = stateCurrent == 'off' ? 'on' : 'off';

    for (var i = els.length - 1; i >= 0; i--) {
      $(els[i].obj).removeClass('toggle__' + els[i].name + '_state_' + stateCurrent);
      $(els[i].obj).addClass('toggle__' + els[i].name + '_state_' + stateNext);
    }

    $(parent).data('state', stateNext);
  });
}($);

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

/******/ });