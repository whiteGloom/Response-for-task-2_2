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
toggle = __webpack_require__(/*! ./static/styles/bem/toggle/toggleScripts.js */ "./dev/static/styles/bem/toggle/toggleScripts.js");
tick = __webpack_require__(/*! ./static/styles/bem/tick/tickScripts.js */ "./dev/static/styles/bem/tick/tickScripts.js");
form = __webpack_require__(/*! ./static/styles/bem/form/formScripts.js */ "./dev/static/styles/bem/form/formScripts.js");
input = __webpack_require__(/*! ./static/styles/bem/input/inputScripts.js */ "./dev/static/styles/bem/input/inputScripts.js");
bar = __webpack_require__(/*! ./static/styles/bem/bar/barScripts.js */ "./dev/static/styles/bem/bar/barScripts.js");

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
  var inputs = input.mkArr();
  var toggles = toggle.mkArr();
  var ticks = tick.mkArr();
  var forms = form.mkArr();
  var bars = bar.mkArr();
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

/***/ "./dev/static/styles/bem/bar/barScripts.js":
/*!*************************************************!*\
  !*** ./dev/static/styles/bem/bar/barScripts.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function bar(el) {
  this.base = el;
  this.type = $(this.base).data('type');
  this.button = $(this.base).find('.bar__button');
  this.name = $(this.base).data('name');
  this.valid = false;
  this.custom = true;
  $(this.base).data('custom', true);
  $(this.base).data('valid', false);
  $(this.base).data('value', false);
}

bar.prototype.setValue = function (value) {
  this.value = value;
  $(this.base).data('value', value);
};

bar.prototype.setValid = function (valid) {
  this.valid = valid;
  $(this.base).data('valid', valid);
};

bar.prototype.test = function () {
  switch (this.type) {
    case 'search':
      {
        this.input = $(this.base).find('.bar__input').children();

        if ($(this.input).data().valid && $(this.input).data().value != undefined) {
          location.reload();
        }

        return $(this.input).children().data();
        break;
      }

    case 'dropdown':
      {
        var selecting = function selecting(event) {
          if ($(event.target).closest('.bar')[0] == this.base && $(event.target).closest('.bar__button').length != 0) {
            return;
          } else {
            if ($(event.target).closest('.bar__dropdown')[0] == this.dropdown[0]) {
              if ($(event.target).hasClass('bar__dropdownOption')) {
                this.setValue($(event.target).data('value'));
                this.setValid(true);
                $(this.dropdownList).removeClass('bar__dropdownList_state_visible').addClass('bar__dropdownList_state_hidden');
                $(this.dropdownText).text($(event.target).text());
                $(document).off('click', $.proxy(selecting, this));
                return;
              }
            } else {
              $(document).off('click', $.proxy(selecting, this));
              $(this.dropdownList).removeClass('bar__dropdownList_state_visible').addClass('bar__dropdownList_state_hidden');
              return;
            }
          }
        };

        this.dropdown = $(this.base).find('.bar__dropdown');
        this.dropdownList = $(this.base).find('.bar__dropdownList');
        this.dropdownOptions = $(this.base).find('.bar__dropdownOption');
        this.dropdownText = $(this.base).find('.bar__dropdownText');

        if ($(this.dropdownList).hasClass('bar__dropdownList_state_hidden')) {
          $(this.dropdownList).removeClass('bar__dropdownList_state_hidden').addClass('bar__dropdownList_state_visible');
          $(document).on('click', $.proxy(selecting, this));
        }

        break;
      }
  }
};

bar.prototype.onClick = function () {
  $(this.button).on('click', $.proxy(this.test, this));
};

function makeArray() {
  var arr = [];

  for (var i = 0; i <= $('.bar').length - 1; i++) {
    arr[i] = new bar($('.bar')[i]);
    arr[i].onClick();
  }

  return arr;
}

module.exports.mkArr = makeArray;

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

/***/ "./dev/static/styles/bem/form/formScripts.js":
/*!***************************************************!*\
  !*** ./dev/static/styles/bem/form/formScripts.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form(elem) {
  this.base = elem;
  this.name = $(this.base).data('name');
}

form.prototype.getValues = function () {
  try {
    var data = [];
    var formEntrys = $(this.base).find('.form__entry');

    for (var i = 0; i < formEntrys.length; i++) {
      var entry = $(formEntrys[i]).children()[0];

      if ($(entry).data('custom') == true) {
        if ($(entry).data('valid') != true) {
          throw new SyntaxError('error');
        }

        data.push({
          name: $(entry).data('name'),
          value: $(entry).data('value') != undefined ? $(entry).data('value') : ''
        });
      } else {
        data.push({
          name: $(entry).attr('name'),
          value: $(entry).val()
        });
      }
    }

    return data;
  } catch (err) {
    return 'error';
  }
};

form.prototype.onSubmit = function () {
  $(this.base).on('submit', $.proxy(function (event) {
    event.preventDefault();

    if (this.getValues() == 'error') {
      return;
    }

    ;
    location.reload();
  }, this));
};

function makeArray() {
  var arr = [];

  for (var i = 0; i <= $('.form').length - 1; i++) {
    arr[i] = new form($('.form')[i]);
    arr[i].onSubmit();
  }

  return arr;
}

module.exports.mkArr = makeArray;

/***/ }),

/***/ "./dev/static/styles/bem/input/inputScripts.js":
/*!*****************************************************!*\
  !*** ./dev/static/styles/bem/input/inputScripts.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function input(elem) {
  this.base = elem;
  this.type = $(this.base).data('type');
  this.entry = $(this.base).find('.input__entry');
  this.message = $(this.base).find('.input__message');
  this.value = $(this.entry).val();
  this.name = $(this.base).data('name');
  this.valid = true;
  $(this.base).data('custom', true);
  $(this.base).data('valid', true);
}

input.prototype.setValue = function (value) {
  this.value = value;
  $(this.base).data('value', value);
};

input.prototype.setValid = function (valid) {
  this.valid = valid;
  $(this.base).data('valid', valid);
};

input.prototype.test = function () {
  switch (this.type) {
    case 'email':
      {
        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test($(this.entry).val())) {
          $(this.message).addClass('input__message_state_succes').removeClass('input__message_state_error').removeClass('input__message_state_hidden').text('thanks!');
          this.setValid(true);
          this.setValue($(this.entry).val());
        } else {
          $(this.message).addClass('input__message_state_error').removeClass('input__message_state_succes').removeClass('input__message_state_hidden').text('error');
          this.setValid(false);
          this.setValue($(this.entry).val());
        }

        break;
      }

    case 'password':
      {
        if ($(this.entry).val().length > 3) {
          $(this.message).addClass('input__message_state_succes').removeClass('input__message_state_error').removeClass('input__message_state_hidden').text('thanks!');
          this.setValid(true);
          this.setValue($(this.entry).val());
        } else {
          $(this.message).addClass('input__message_state_error').removeClass('input__message_state_succes').removeClass('input__message_state_hidden').text('error');
          this.setValid(false);
          this.setValue($(this.entry).val());
        }

        break;
      }

    default:
      {
        this.setValid(true);
        this.setValue($(this.entry).val());
      }
  }
};

input.prototype.onChange = function () {
  $(this.entry).prop('readonly', false);

  if ($(this.entry).val().length != 0) {
    this.test();
  }

  ;
  $(this.entry).on('change', $.proxy(this.test, this));
};

input.prototype.offChange = function () {
  $(this.entry).prop('readonly', true);
  $(this.entry).off('change', $.proxy(this.test, this));
};

function makeArray() {
  var arr = [];

  for (var i = 0; i <= $('.input').length - 1; i++) {
    arr[i] = new input($('.input')[i]);
    arr[i].onChange();
  }

  return arr;
}

module.exports.mkArr = makeArray;

/***/ }),

/***/ "./dev/static/styles/bem/tick/tickScripts.js":
/*!***************************************************!*\
  !*** ./dev/static/styles/bem/tick/tickScripts.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tick(elem) {
  this.base = elem;
  this.outer = $(this.base).find('.tick__outer');
  this.icon = $(this.base).find('.tick__icon');
  this.value = $(this.base).data('value');
  this.name = $(this.base).data('name');
  this.valid = true;
  $(this.base).data('custom', true);
  $(this.base).data('valid', true);
  $(this.base).data('value', this.value);
}

tick.prototype.setValue = function (value) {
  this.value = value;
  $(this.base).data('value', value);
};

tick.prototype.test = function () {
  switch (this.value) {
    case false:
      {
        $(this.outer).removeClass('tick__outer_state_off').addClass('tick__outer_state_on');
        $(this.icon).addClass('tick__icon_state_on').removeClass('tick__icon_state_off');
        this.setValue(true);
        break;
      }

    case true:
      {
        $(this.outer).removeClass('tick__outer_state_on').addClass('tick__outer_state_off');
        $(this.icon).addClass('tick__icon_state_off').removeClass('tick__icon_state_on');
        this.setValue(false);
        break;
      }
  }
};

tick.prototype.onClick = function () {
  $(this.base).on('click', $.proxy(this.test, this));
};

tick.prototype.offClick = function () {
  $(this.base).off('click', $.proxy(this.test, this));
};

function makeArray() {
  var arr = [];

  for (var i = 0; i <= $('.tick').length - 1; i++) {
    arr[i] = new tick($('.tick')[i]);
    arr[i].onClick();
  }

  return arr;
}

module.exports.mkArr = makeArray;

/***/ }),

/***/ "./dev/static/styles/bem/toggle/toggleScripts.js":
/*!*******************************************************!*\
  !*** ./dev/static/styles/bem/toggle/toggleScripts.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function toggle(elem) {
  this.base = elem;
  this.outer = $(this.base).find('.toggle__outer');
  this.handle = $(this.base).find('.toggle__handle');
  this.text = $(this.base).find('.toggle__text');
  this.value = $(this.base).data('value');
  this.name = $(this.base).data('name');
  this.valid = true;
  $(this.base).data('custom', true);
  $(this.base).data('valid', true);
  $(this.base).data('value', this.value);
}

toggle.prototype.setValue = function (value) {
  this.value = value;
  $(this.base).data('value', value);
};

toggle.prototype.test = function () {
  switch (this.value) {
    case false:
      {
        $(this.outer).removeClass('toggle__outer_state_off').addClass('toggle__outer_state_on');
        $(this.handle).addClass('toggle__handle_state_on').removeClass('toggle__handle_state_off');
        $(this.text).addClass('toggle__text_state_on').removeClass('toggle__text_state_off').text('on');
        this.setValue(true);
        break;
      }

    case true:
      {
        $(this.outer).removeClass('toggle__outer_state_on').addClass('toggle__outer_state_off');
        $(this.handle).addClass('toggle__handle_state_off').removeClass('toggle__handle_state_on');
        $(this.text).addClass('toggle__text_state_off').removeClass('toggle__text_state_on').text('off');
        this.setValue(false);
        break;
      }
  }
};

toggle.prototype.onClick = function () {
  $(this.base).on('click', $.proxy(this.test, this));
};

toggle.prototype.offClick = function () {
  $(this.base).off('click', $.proxy(this.test, this));
};

function makeArray() {
  var arr = [];

  for (var i = 0; i <= $('.toggle').length - 1; i++) {
    arr[i] = new toggle($('.toggle')[i]);
    arr[i].onClick();
  }

  return arr;
}

module.exports.mkArr = makeArray;

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