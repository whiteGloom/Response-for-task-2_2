(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors"],{

/***/ "./dev/jsPlugins/ion.rangeSlider.js":
/*!******************************************!*\
  !*** ./dev/jsPlugins/ion.rangeSlider.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Ion.RangeSlider
// version 2.3.0 Build: 381
// © Denis Ineshin, 2018
// https://github.com/IonDen
//
// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
// GitHub page:     https://github.com/IonDen/ion.rangeSlider
//
// Released under MIT licence:
// http://ionden.com/a/plugins/licence-en.html
// =====================================================================================================================
;

(function (factory) {
  if (!$ && "function" === "function" && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./dev/jsPlugins/jquery-3.3.1.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
      return factory($, document, window, navigator);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (!$ && ( false ? undefined : _typeof(exports)) === "object") {
    factory(__webpack_require__(/*! jquery */ "./dev/jsPlugins/jquery-3.3.1.js"), document, window, navigator);
  } else {
    factory($, document, window, navigator);
  }
})(function ($, document, window, navigator, undefined) {
  "use strict"; // =================================================================================================================
  // Service

  var plugin_count = 0; // IE8 fix

  var is_old_ie = function () {
    var n = navigator.userAgent,
        r = /msie\s\d+/i,
        v;

    if (n.search(r) > 0) {
      v = r.exec(n).toString();
      v = v.split(" ")[1];

      if (v < 9) {
        $("html").addClass("lt-ie9");
        return true;
      }
    }

    return false;
  }();

  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {
      var target = this;
      var slice = [].slice;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1),
          bound = function bound() {
        if (this instanceof bound) {
          var F = function F() {};

          F.prototype = target.prototype;
          var self = new F();
          var result = target.apply(self, args.concat(slice.call(arguments)));

          if (Object(result) === result) {
            return result;
          }

          return self;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };

      return bound;
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      var k;

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var O = Object(this);
      var len = O.length >>> 0;

      if (len === 0) {
        return -1;
      }

      var n = +fromIndex || 0;

      if (Math.abs(n) === Infinity) {
        n = 0;
      }

      if (n >= len) {
        return -1;
      }

      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      while (k < len) {
        if (k in O && O[k] === searchElement) {
          return k;
        }

        k++;
      }

      return -1;
    };
  } // =================================================================================================================
  // Template


  var base_html = '<span class="irs">' + '<span class="irs-line" tabindex="0"></span>' + '<span class="irs-min">0</span><span class="irs-max">1</span>' + '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' + '</span>' + '<span class="irs-grid"></span>';
  var single_html = '<span class="irs-bar irs-bar--single"></span>' + '<span class="irs-shadow shadow-single"></span>' + '<span class="irs-handle single"><i></i><i></i><i></i></span>';
  var double_html = '<span class="irs-bar"></span>' + '<span class="irs-shadow shadow-from"></span>' + '<span class="irs-shadow shadow-to"></span>' + '<span class="irs-handle from"><i></i><i></i><i></i></span>' + '<span class="irs-handle to"><i></i><i></i><i></i></span>';
  var disable_html = '<span class="irs-disable-mask"></span>'; // =================================================================================================================
  // Core

  /**
   * Main plugin constructor
   *
   * @param input {Object} link to base input element
   * @param options {Object} slider config
   * @param plugin_count {Number}
   * @constructor
   */

  var IonRangeSlider = function IonRangeSlider(input, options, plugin_count) {
    this.VERSION = "2.3.0";
    this.input = input;
    this.plugin_count = plugin_count;
    this.current_plugin = 0;
    this.calc_count = 0;
    this.update_tm = 0;
    this.old_from = 0;
    this.old_to = 0;
    this.old_min_interval = null;
    this.raf_id = null;
    this.dragging = false;
    this.force_redraw = false;
    this.no_diapason = false;
    this.has_tab_index = true;
    this.is_key = false;
    this.is_update = false;
    this.is_start = true;
    this.is_finish = false;
    this.is_active = false;
    this.is_resize = false;
    this.is_click = false;
    options = options || {}; // cache for links to all DOM elements

    this.$cache = {
      win: $(window),
      body: $(document.body),
      input: $(input),
      cont: null,
      rs: null,
      min: null,
      max: null,
      from: null,
      to: null,
      single: null,
      bar: null,
      line: null,
      s_single: null,
      s_from: null,
      s_to: null,
      shad_single: null,
      shad_from: null,
      shad_to: null,
      edge: null,
      grid: null,
      grid_labels: []
    }; // storage for measure variables

    this.coords = {
      // left
      x_gap: 0,
      x_pointer: 0,
      // width
      w_rs: 0,
      w_rs_old: 0,
      w_handle: 0,
      // percents
      p_gap: 0,
      p_gap_left: 0,
      p_gap_right: 0,
      p_step: 0,
      p_pointer: 0,
      p_handle: 0,
      p_single_fake: 0,
      p_single_real: 0,
      p_from_fake: 0,
      p_from_real: 0,
      p_to_fake: 0,
      p_to_real: 0,
      p_bar_x: 0,
      p_bar_w: 0,
      // grid
      grid_gap: 0,
      big_num: 0,
      big: [],
      big_w: [],
      big_p: [],
      big_x: []
    }; // storage for labels measure variables

    this.labels = {
      // width
      w_min: 0,
      w_max: 0,
      w_from: 0,
      w_to: 0,
      w_single: 0,
      // percents
      p_min: 0,
      p_max: 0,
      p_from_fake: 0,
      p_from_left: 0,
      p_to_fake: 0,
      p_to_left: 0,
      p_single_fake: 0,
      p_single_left: 0
    };
    /**
     * get and validate config
     */

    var $inp = this.$cache.input,
        val = $inp.prop("value"),
        config,
        config_from_data,
        prop; // default config

    config = {
      skin: "flat",
      type: "single",
      min: 10,
      max: 100,
      from: null,
      to: null,
      step: 1,
      min_interval: 0,
      max_interval: 0,
      drag_interval: false,
      values: [],
      p_values: [],
      from_fixed: false,
      from_min: null,
      from_max: null,
      from_shadow: false,
      to_fixed: false,
      to_min: null,
      to_max: null,
      to_shadow: false,
      prettify_enabled: true,
      prettify_separator: " ",
      prettify: null,
      force_edges: false,
      keyboard: true,
      grid: false,
      grid_margin: true,
      grid_num: 4,
      grid_snap: false,
      hide_min_max: false,
      hide_from_to: false,
      prefix: "",
      postfix: "",
      max_postfix: "",
      decorate_both: true,
      values_separator: " — ",
      input_values_separator: ";",
      disable: false,
      block: false,
      extra_classes: "",
      scope: null,
      onStart: null,
      onChange: null,
      onFinish: null,
      onUpdate: null
    }; // check if base element is input

    if ($inp[0].nodeName !== "INPUT") {
      console && console.warn && console.warn("Base element should be <input>!", $inp[0]);
    } // config from data-attributes extends js config


    config_from_data = {
      skin: $inp.data("skin"),
      type: $inp.data("type"),
      min: $inp.data("min"),
      max: $inp.data("max"),
      from: $inp.data("from"),
      to: $inp.data("to"),
      step: $inp.data("step"),
      min_interval: $inp.data("minInterval"),
      max_interval: $inp.data("maxInterval"),
      drag_interval: $inp.data("dragInterval"),
      values: $inp.data("values"),
      from_fixed: $inp.data("fromFixed"),
      from_min: $inp.data("fromMin"),
      from_max: $inp.data("fromMax"),
      from_shadow: $inp.data("fromShadow"),
      to_fixed: $inp.data("toFixed"),
      to_min: $inp.data("toMin"),
      to_max: $inp.data("toMax"),
      to_shadow: $inp.data("toShadow"),
      prettify_enabled: $inp.data("prettifyEnabled"),
      prettify_separator: $inp.data("prettifySeparator"),
      force_edges: $inp.data("forceEdges"),
      keyboard: $inp.data("keyboard"),
      grid: $inp.data("grid"),
      grid_margin: $inp.data("gridMargin"),
      grid_num: $inp.data("gridNum"),
      grid_snap: $inp.data("gridSnap"),
      hide_min_max: $inp.data("hideMinMax"),
      hide_from_to: $inp.data("hideFromTo"),
      prefix: $inp.data("prefix"),
      postfix: $inp.data("postfix"),
      max_postfix: $inp.data("maxPostfix"),
      decorate_both: $inp.data("decorateBoth"),
      values_separator: $inp.data("valuesSeparator"),
      input_values_separator: $inp.data("inputValuesSeparator"),
      disable: $inp.data("disable"),
      block: $inp.data("block"),
      extra_classes: $inp.data("extraClasses")
    };
    config_from_data.values = config_from_data.values && config_from_data.values.split(",");

    for (prop in config_from_data) {
      if (config_from_data.hasOwnProperty(prop)) {
        if (config_from_data[prop] === undefined || config_from_data[prop] === "") {
          delete config_from_data[prop];
        }
      }
    } // input value extends default config


    if (val !== undefined && val !== "") {
      val = val.split(config_from_data.input_values_separator || options.input_values_separator || ";");

      if (val[0] && val[0] == +val[0]) {
        val[0] = +val[0];
      }

      if (val[1] && val[1] == +val[1]) {
        val[1] = +val[1];
      }

      if (options && options.values && options.values.length) {
        config.from = val[0] && options.values.indexOf(val[0]);
        config.to = val[1] && options.values.indexOf(val[1]);
      } else {
        config.from = val[0] && +val[0];
        config.to = val[1] && +val[1];
      }
    } // js config extends default config


    $.extend(config, options); // data config extends config

    $.extend(config, config_from_data);
    this.options = config; // validate config, to be sure that all data types are correct

    this.update_check = {};
    this.validate(); // default result object, returned to callbacks

    this.result = {
      input: this.$cache.input,
      slider: null,
      min: this.options.min,
      max: this.options.max,
      from: this.options.from,
      from_percent: 0,
      from_value: null,
      to: this.options.to,
      to_percent: 0,
      to_value: null
    };
    this.init();
  };

  IonRangeSlider.prototype = {
    /**
     * Starts or updates the plugin instance
     *
     * @param [is_update] {boolean}
     */
    init: function init(is_update) {
      this.no_diapason = false;
      this.coords.p_step = this.convertToPercent(this.options.step, true);
      this.target = "base";
      this.toggleInput();
      this.append();
      this.setMinMax();

      if (is_update) {
        this.force_redraw = true;
        this.calc(true); // callbacks called

        this.callOnUpdate();
      } else {
        this.force_redraw = true;
        this.calc(true); // callbacks called

        this.callOnStart();
      }

      this.updateScene();
    },

    /**
     * Appends slider template to a DOM
     */
    append: function append() {
      var container_html = '<span class="irs irs--' + this.options.skin + ' js-irs-' + this.plugin_count + ' ' + this.options.extra_classes + '"></span>';
      this.$cache.input.before(container_html);
      this.$cache.input.prop("readonly", true);
      this.$cache.cont = this.$cache.input.prev();
      this.result.slider = this.$cache.cont;
      this.$cache.cont.html(base_html);
      this.$cache.rs = this.$cache.cont.find(".irs");
      this.$cache.min = this.$cache.cont.find(".irs-min");
      this.$cache.max = this.$cache.cont.find(".irs-max");
      this.$cache.from = this.$cache.cont.find(".irs-from");
      this.$cache.to = this.$cache.cont.find(".irs-to");
      this.$cache.single = this.$cache.cont.find(".irs-single");
      this.$cache.line = this.$cache.cont.find(".irs-line");
      this.$cache.grid = this.$cache.cont.find(".irs-grid");

      if (this.options.type === "single") {
        this.$cache.cont.append(single_html);
        this.$cache.bar = this.$cache.cont.find(".irs-bar");
        this.$cache.edge = this.$cache.cont.find(".irs-bar-edge");
        this.$cache.s_single = this.$cache.cont.find(".single");
        this.$cache.from[0].style.visibility = "hidden";
        this.$cache.to[0].style.visibility = "hidden";
        this.$cache.shad_single = this.$cache.cont.find(".shadow-single");
      } else {
        this.$cache.cont.append(double_html);
        this.$cache.bar = this.$cache.cont.find(".irs-bar");
        this.$cache.s_from = this.$cache.cont.find(".from");
        this.$cache.s_to = this.$cache.cont.find(".to");
        this.$cache.shad_from = this.$cache.cont.find(".shadow-from");
        this.$cache.shad_to = this.$cache.cont.find(".shadow-to");
        this.setTopHandler();
      }

      if (this.options.hide_from_to) {
        this.$cache.from[0].style.display = "none";
        this.$cache.to[0].style.display = "none";
        this.$cache.single[0].style.display = "none";
      }

      this.appendGrid();

      if (this.options.disable) {
        this.appendDisableMask();
        this.$cache.input[0].disabled = true;
      } else {
        this.$cache.input[0].disabled = false;
        this.removeDisableMask();
        this.bindEvents();
      } // block only if not disabled


      if (!this.options.disable) {
        if (this.options.block) {
          this.appendDisableMask();
        } else {
          this.removeDisableMask();
        }
      }

      if (this.options.drag_interval) {
        this.$cache.bar[0].style.cursor = "ew-resize";
      }
    },

    /**
     * Determine which handler has a priority
     * works only for double slider type
     */
    setTopHandler: function setTopHandler() {
      var min = this.options.min,
          max = this.options.max,
          from = this.options.from,
          to = this.options.to;

      if (from > min && to === max) {
        this.$cache.s_from.addClass("type_last");
      } else if (to < max) {
        this.$cache.s_to.addClass("type_last");
      }
    },

    /**
     * Determine which handles was clicked last
     * and which handler should have hover effect
     *
     * @param target {String}
     */
    changeLevel: function changeLevel(target) {
      switch (target) {
        case "single":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
          this.$cache.s_single.addClass("state_hover");
          break;

        case "from":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
          this.$cache.s_from.addClass("state_hover");
          this.$cache.s_from.addClass("type_last");
          this.$cache.s_to.removeClass("type_last");
          break;

        case "to":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
          this.$cache.s_to.addClass("state_hover");
          this.$cache.s_to.addClass("type_last");
          this.$cache.s_from.removeClass("type_last");
          break;

        case "both":
          this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
          this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer);
          this.$cache.s_to.removeClass("type_last");
          this.$cache.s_from.removeClass("type_last");
          break;
      }
    },

    /**
     * Then slider is disabled
     * appends extra layer with opacity
     */
    appendDisableMask: function appendDisableMask() {
      this.$cache.cont.append(disable_html);
      this.$cache.cont.addClass("irs-disabled");
    },

    /**
     * Then slider is not disabled
     * remove disable mask
     */
    removeDisableMask: function removeDisableMask() {
      this.$cache.cont.remove(".irs-disable-mask");
      this.$cache.cont.removeClass("irs-disabled");
    },

    /**
     * Remove slider instance
     * and unbind all events
     */
    remove: function remove() {
      this.$cache.cont.remove();
      this.$cache.cont = null;
      this.$cache.line.off("keydown.irs_" + this.plugin_count);
      this.$cache.body.off("touchmove.irs_" + this.plugin_count);
      this.$cache.body.off("mousemove.irs_" + this.plugin_count);
      this.$cache.win.off("touchend.irs_" + this.plugin_count);
      this.$cache.win.off("mouseup.irs_" + this.plugin_count);

      if (is_old_ie) {
        this.$cache.body.off("mouseup.irs_" + this.plugin_count);
        this.$cache.body.off("mouseleave.irs_" + this.plugin_count);
      }

      this.$cache.grid_labels = [];
      this.coords.big = [];
      this.coords.big_w = [];
      this.coords.big_p = [];
      this.coords.big_x = [];
      cancelAnimationFrame(this.raf_id);
    },

    /**
     * bind all slider events
     */
    bindEvents: function bindEvents() {
      if (this.no_diapason) {
        return;
      }

      this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
      this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));
      this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
      this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
      this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this));

      if (this.options.drag_interval && this.options.type === "double") {
        this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
        this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
      } else {
        this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      }

      if (this.options.type === "single") {
        this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
        this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      } else {
        this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
        this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
        this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
        this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
        this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
        this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
      }

      if (this.options.keyboard) {
        this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
      }

      if (is_old_ie) {
        this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
        this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this));
      }
    },

    /**
     * Focus with tabIndex
     *
     * @param e {Object} event object
     */
    pointerFocus: function pointerFocus(e) {
      if (!this.target) {
        var x;
        var $handle;

        if (this.options.type === "single") {
          $handle = this.$cache.single;
        } else {
          $handle = this.$cache.from;
        }

        x = $handle.offset().left;
        x += $handle.width() / 2 - 1;
        this.pointerClick("single", {
          preventDefault: function preventDefault() {},
          pageX: x
        });
      }
    },

    /**
     * Mousemove or touchmove
     * only for handlers
     *
     * @param e {Object} event object
     */
    pointerMove: function pointerMove(e) {
      if (!this.dragging) {
        return;
      }

      var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
      this.coords.x_pointer = x - this.coords.x_gap;
      this.calc();
    },

    /**
     * Mouseup or touchend
     * only for handlers
     *
     * @param e {Object} event object
     */
    pointerUp: function pointerUp(e) {
      if (this.current_plugin !== this.plugin_count) {
        return;
      }

      if (this.is_active) {
        this.is_active = false;
      } else {
        return;
      }

      this.$cache.cont.find(".state_hover").removeClass("state_hover");
      this.force_redraw = true;

      if (is_old_ie) {
        $("*").prop("unselectable", false);
      }

      this.updateScene();
      this.restoreOriginalMinInterval(); // callbacks call

      if ($.contains(this.$cache.cont[0], e.target) || this.dragging) {
        this.callOnFinish();
      }

      this.dragging = false;
    },

    /**
     * Mousedown or touchstart
     * only for handlers
     *
     * @param target {String|null}
     * @param e {Object} event object
     */
    pointerDown: function pointerDown(target, e) {
      e.preventDefault();
      var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;

      if (e.button === 2) {
        return;
      }

      if (target === "both") {
        this.setTempMinInterval();
      }

      if (!target) {
        target = this.target || "from";
      }

      this.current_plugin = this.plugin_count;
      this.target = target;
      this.is_active = true;
      this.dragging = true;
      this.coords.x_gap = this.$cache.rs.offset().left;
      this.coords.x_pointer = x - this.coords.x_gap;
      this.calcPointerPercent();
      this.changeLevel(target);

      if (is_old_ie) {
        $("*").prop("unselectable", true);
      }

      this.$cache.line.trigger("focus");
      this.updateScene();
    },

    /**
     * Mousedown or touchstart
     * for other slider elements, like diapason line
     *
     * @param target {String}
     * @param e {Object} event object
     */
    pointerClick: function pointerClick(target, e) {
      e.preventDefault();
      var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;

      if (e.button === 2) {
        return;
      }

      this.current_plugin = this.plugin_count;
      this.target = target;
      this.is_click = true;
      this.coords.x_gap = this.$cache.rs.offset().left;
      this.coords.x_pointer = +(x - this.coords.x_gap).toFixed();
      this.force_redraw = true;
      this.calc();
      this.$cache.line.trigger("focus");
    },

    /**
     * Keyborard controls for focused slider
     *
     * @param target {String}
     * @param e {Object} event object
     * @returns {boolean|undefined}
     */
    key: function key(target, e) {
      if (this.current_plugin !== this.plugin_count || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
        return;
      }

      switch (e.which) {
        case 83: // W

        case 65: // A

        case 40: // DOWN

        case 37:
          // LEFT
          e.preventDefault();
          this.moveByKey(false);
          break;

        case 87: // S

        case 68: // D

        case 38: // UP

        case 39:
          // RIGHT
          e.preventDefault();
          this.moveByKey(true);
          break;
      }

      return true;
    },

    /**
     * Move by key
     *
     * @param right {boolean} direction to move
     */
    moveByKey: function moveByKey(right) {
      var p = this.coords.p_pointer;
      var p_step = (this.options.max - this.options.min) / 100;
      p_step = this.options.step / p_step;

      if (right) {
        p += p_step;
      } else {
        p -= p_step;
      }

      this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * p);
      this.is_key = true;
      this.calc();
    },

    /**
     * Set visibility and content
     * of Min and Max labels
     */
    setMinMax: function setMinMax() {
      if (!this.options) {
        return;
      }

      if (this.options.hide_min_max) {
        this.$cache.min[0].style.display = "none";
        this.$cache.max[0].style.display = "none";
        return;
      }

      if (this.options.values.length) {
        this.$cache.min.html(this.decorate(this.options.p_values[this.options.min]));
        this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
      } else {
        var min_pretty = this._prettify(this.options.min);

        var max_pretty = this._prettify(this.options.max);

        this.result.min_pretty = min_pretty;
        this.result.max_pretty = max_pretty;
        this.$cache.min.html(this.decorate(min_pretty, this.options.min));
        this.$cache.max.html(this.decorate(max_pretty, this.options.max));
      }

      this.labels.w_min = this.$cache.min.outerWidth(false);
      this.labels.w_max = this.$cache.max.outerWidth(false);
    },

    /**
     * Then dragging interval, prevent interval collapsing
     * using min_interval option
     */
    setTempMinInterval: function setTempMinInterval() {
      var interval = this.result.to - this.result.from;

      if (this.old_min_interval === null) {
        this.old_min_interval = this.options.min_interval;
      }

      this.options.min_interval = interval;
    },

    /**
     * Restore min_interval option to original
     */
    restoreOriginalMinInterval: function restoreOriginalMinInterval() {
      if (this.old_min_interval !== null) {
        this.options.min_interval = this.old_min_interval;
        this.old_min_interval = null;
      }
    },
    // =============================================================================================================
    // Calculations

    /**
     * All calculations and measures start here
     *
     * @param update {boolean=}
     */
    calc: function calc(update) {
      if (!this.options) {
        return;
      }

      this.calc_count++;

      if (this.calc_count === 10 || update) {
        this.calc_count = 0;
        this.coords.w_rs = this.$cache.rs.outerWidth(false);
        this.calcHandlePercent();
      }

      if (!this.coords.w_rs) {
        return;
      }

      this.calcPointerPercent();
      var handle_x = this.getHandleX();

      if (this.target === "both") {
        this.coords.p_gap = 0;
        handle_x = this.getHandleX();
      }

      if (this.target === "click") {
        this.coords.p_gap = this.coords.p_handle / 2;
        handle_x = this.getHandleX();

        if (this.options.drag_interval) {
          this.target = "both_one";
        } else {
          this.target = this.chooseHandle(handle_x);
        }
      }

      switch (this.target) {
        case "base":
          var w = (this.options.max - this.options.min) / 100,
              f = (this.result.from - this.options.min) / w,
              t = (this.result.to - this.options.min) / w;
          this.coords.p_single_real = this.toFixed(f);
          this.coords.p_from_real = this.toFixed(f);
          this.coords.p_to_real = this.toFixed(t);
          this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          this.target = null;
          break;

        case "single":
          if (this.options.from_fixed) {
            break;
          }

          this.coords.p_single_real = this.convertToRealPercent(handle_x);
          this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
          this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
          this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
          break;

        case "from":
          if (this.options.from_fixed) {
            break;
          }

          this.coords.p_from_real = this.convertToRealPercent(handle_x);
          this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);

          if (this.coords.p_from_real > this.coords.p_to_real) {
            this.coords.p_from_real = this.coords.p_to_real;
          }

          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
          this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          break;

        case "to":
          if (this.options.to_fixed) {
            break;
          }

          this.coords.p_to_real = this.convertToRealPercent(handle_x);
          this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);

          if (this.coords.p_to_real < this.coords.p_from_real) {
            this.coords.p_to_real = this.coords.p_from_real;
          }

          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
          this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          break;

        case "both":
          if (this.options.from_fixed || this.options.to_fixed) {
            break;
          }

          handle_x = this.toFixed(handle_x + this.coords.p_handle * 0.001);
          this.coords.p_from_real = this.convertToRealPercent(handle_x) - this.coords.p_gap_left;
          this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          this.coords.p_to_real = this.convertToRealPercent(handle_x) + this.coords.p_gap_right;
          this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          break;

        case "both_one":
          if (this.options.from_fixed || this.options.to_fixed) {
            break;
          }

          var real_x = this.convertToRealPercent(handle_x),
              from = this.result.from_percent,
              to = this.result.to_percent,
              full = to - from,
              half = full / 2,
              new_from = real_x - half,
              new_to = real_x + half;

          if (new_from < 0) {
            new_from = 0;
            new_to = new_from + full;
          }

          if (new_to > 100) {
            new_to = 100;
            new_from = new_to - full;
          }

          this.coords.p_from_real = this.calcWithStep(new_from);
          this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
          this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
          this.coords.p_to_real = this.calcWithStep(new_to);
          this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
          this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
          break;
      }

      if (this.options.type === "single") {
        this.coords.p_bar_x = this.coords.p_handle / 2;
        this.coords.p_bar_w = this.coords.p_single_fake;
        this.result.from_percent = this.coords.p_single_real;
        this.result.from = this.convertToValue(this.coords.p_single_real);
        this.result.from_pretty = this._prettify(this.result.from);

        if (this.options.values.length) {
          this.result.from_value = this.options.values[this.result.from];
        }
      } else {
        this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2);
        this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake);
        this.result.from_percent = this.coords.p_from_real;
        this.result.from = this.convertToValue(this.coords.p_from_real);
        this.result.from_pretty = this._prettify(this.result.from);
        this.result.to_percent = this.coords.p_to_real;
        this.result.to = this.convertToValue(this.coords.p_to_real);
        this.result.to_pretty = this._prettify(this.result.to);

        if (this.options.values.length) {
          this.result.from_value = this.options.values[this.result.from];
          this.result.to_value = this.options.values[this.result.to];
        }
      }

      this.calcMinMax();
      this.calcLabels();
    },

    /**
     * calculates pointer X in percent
     */
    calcPointerPercent: function calcPointerPercent() {
      if (!this.coords.w_rs) {
        this.coords.p_pointer = 0;
        return;
      }

      if (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer)) {
        this.coords.x_pointer = 0;
      } else if (this.coords.x_pointer > this.coords.w_rs) {
        this.coords.x_pointer = this.coords.w_rs;
      }

      this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100);
    },
    convertToRealPercent: function convertToRealPercent(fake) {
      var full = 100 - this.coords.p_handle;
      return fake / full * 100;
    },
    convertToFakePercent: function convertToFakePercent(real) {
      var full = 100 - this.coords.p_handle;
      return real / 100 * full;
    },
    getHandleX: function getHandleX() {
      var max = 100 - this.coords.p_handle,
          x = this.toFixed(this.coords.p_pointer - this.coords.p_gap);

      if (x < 0) {
        x = 0;
      } else if (x > max) {
        x = max;
      }

      return x;
    },
    calcHandlePercent: function calcHandlePercent() {
      if (this.options.type === "single") {
        this.coords.w_handle = this.$cache.s_single.outerWidth(false);
      } else {
        this.coords.w_handle = this.$cache.s_from.outerWidth(false);
      }

      this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
    },

    /**
     * Find closest handle to pointer click
     *
     * @param real_x {Number}
     * @returns {String}
     */
    chooseHandle: function chooseHandle(real_x) {
      if (this.options.type === "single") {
        return "single";
      } else {
        var m_point = this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2;

        if (real_x >= m_point) {
          return this.options.to_fixed ? "from" : "to";
        } else {
          return this.options.from_fixed ? "to" : "from";
        }
      }
    },

    /**
     * Measure Min and Max labels width in percent
     */
    calcMinMax: function calcMinMax() {
      if (!this.coords.w_rs) {
        return;
      }

      this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100;
      this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100;
    },

    /**
     * Measure labels width and X in percent
     */
    calcLabels: function calcLabels() {
      if (!this.coords.w_rs || this.options.hide_from_to) {
        return;
      }

      if (this.options.type === "single") {
        this.labels.w_single = this.$cache.single.outerWidth(false);
        this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
        this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2;
        this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);
      } else {
        this.labels.w_from = this.$cache.from.outerWidth(false);
        this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100;
        this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2;
        this.labels.p_from_left = this.toFixed(this.labels.p_from_left);
        this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake);
        this.labels.w_to = this.$cache.to.outerWidth(false);
        this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100;
        this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2;
        this.labels.p_to_left = this.toFixed(this.labels.p_to_left);
        this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake);
        this.labels.w_single = this.$cache.single.outerWidth(false);
        this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
        this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2;
        this.labels.p_single_left = this.toFixed(this.labels.p_single_left);
        this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);
      }
    },
    // =============================================================================================================
    // Drawings

    /**
     * Main function called in request animation frame
     * to update everything
     */
    updateScene: function updateScene() {
      if (this.raf_id) {
        cancelAnimationFrame(this.raf_id);
        this.raf_id = null;
      }

      clearTimeout(this.update_tm);
      this.update_tm = null;

      if (!this.options) {
        return;
      }

      this.drawHandles();

      if (this.is_active) {
        this.raf_id = requestAnimationFrame(this.updateScene.bind(this));
      } else {
        this.update_tm = setTimeout(this.updateScene.bind(this), 300);
      }
    },

    /**
     * Draw handles
     */
    drawHandles: function drawHandles() {
      this.coords.w_rs = this.$cache.rs.outerWidth(false);

      if (!this.coords.w_rs) {
        return;
      }

      if (this.coords.w_rs !== this.coords.w_rs_old) {
        this.target = "base";
        this.is_resize = true;
      }

      if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) {
        this.setMinMax();
        this.calc(true);
        this.drawLabels();

        if (this.options.grid) {
          this.calcGridMargin();
          this.calcGridLabels();
        }

        this.force_redraw = true;
        this.coords.w_rs_old = this.coords.w_rs;
        this.drawShadow();
      }

      if (!this.coords.w_rs) {
        return;
      }

      if (!this.dragging && !this.force_redraw && !this.is_key) {
        return;
      }

      if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {
        this.drawLabels();
        this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
        this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";

        if (this.options.type === "single") {
          this.$cache.bar[0].style.left = 0;
          this.$cache.bar[0].style.width = this.coords.p_bar_w + this.coords.p_bar_x + "%";
          this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";
          this.$cache.single[0].style.left = this.labels.p_single_left + "%";
        } else {
          this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
          this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";

          if (this.old_from !== this.result.from || this.force_redraw) {
            this.$cache.from[0].style.left = this.labels.p_from_left + "%";
          }

          if (this.old_to !== this.result.to || this.force_redraw) {
            this.$cache.to[0].style.left = this.labels.p_to_left + "%";
          }

          this.$cache.single[0].style.left = this.labels.p_single_left + "%";
        }

        this.writeToInput();

        if ((this.old_from !== this.result.from || this.old_to !== this.result.to) && !this.is_start) {
          this.$cache.input.trigger("change");
          this.$cache.input.trigger("input");
        }

        this.old_from = this.result.from;
        this.old_to = this.result.to; // callbacks call

        if (!this.is_resize && !this.is_update && !this.is_start && !this.is_finish) {
          this.callOnChange();
        }

        if (this.is_key || this.is_click) {
          this.is_key = false;
          this.is_click = false;
          this.callOnFinish();
        }

        this.is_update = false;
        this.is_resize = false;
        this.is_finish = false;
      }

      this.is_start = false;
      this.is_key = false;
      this.is_click = false;
      this.force_redraw = false;
    },

    /**
     * Draw labels
     * measure labels collisions
     * collapse close labels
     */
    drawLabels: function drawLabels() {
      if (!this.options) {
        return;
      }

      var values_num = this.options.values.length;
      var p_values = this.options.p_values;
      var text_single;
      var text_from;
      var text_to;
      var from_pretty;
      var to_pretty;

      if (this.options.hide_from_to) {
        return;
      }

      if (this.options.type === "single") {
        if (values_num) {
          text_single = this.decorate(p_values[this.result.from]);
          this.$cache.single.html(text_single);
        } else {
          from_pretty = this._prettify(this.result.from);
          text_single = this.decorate(from_pretty, this.result.from);
          this.$cache.single.html(text_single);
        }

        this.calcLabels();

        if (this.labels.p_single_left < this.labels.p_min + 1) {
          this.$cache.min[0].style.visibility = "hidden";
        } else {
          this.$cache.min[0].style.visibility = "visible";
        }

        if (this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1) {
          this.$cache.max[0].style.visibility = "hidden";
        } else {
          this.$cache.max[0].style.visibility = "visible";
        }
      } else {
        if (values_num) {
          if (this.options.decorate_both) {
            text_single = this.decorate(p_values[this.result.from]);
            text_single += this.options.values_separator;
            text_single += this.decorate(p_values[this.result.to]);
          } else {
            text_single = this.decorate(p_values[this.result.from] + this.options.values_separator + p_values[this.result.to]);
          }

          text_from = this.decorate(p_values[this.result.from]);
          text_to = this.decorate(p_values[this.result.to]);
          this.$cache.single.html(text_single);
          this.$cache.from.html(text_from);
          this.$cache.to.html(text_to);
        } else {
          from_pretty = this._prettify(this.result.from);
          to_pretty = this._prettify(this.result.to);

          if (this.options.decorate_both) {
            text_single = this.decorate(from_pretty, this.result.from);
            text_single += this.options.values_separator;
            text_single += this.decorate(to_pretty, this.result.to);
          } else {
            text_single = this.decorate(from_pretty + this.options.values_separator + to_pretty, this.result.to);
          }

          text_from = this.decorate(from_pretty, this.result.from);
          text_to = this.decorate(to_pretty, this.result.to);
          this.$cache.single.html(text_single);
          this.$cache.from.html(text_from);
          this.$cache.to.html(text_to);
        }

        this.calcLabels();
        var min = Math.min(this.labels.p_single_left, this.labels.p_from_left),
            single_left = this.labels.p_single_left + this.labels.p_single_fake,
            to_left = this.labels.p_to_left + this.labels.p_to_fake,
            max = Math.max(single_left, to_left);

        if (this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left) {
          this.$cache.from[0].style.visibility = "hidden";
          this.$cache.to[0].style.visibility = "hidden";
          this.$cache.single[0].style.visibility = "visible";

          if (this.result.from === this.result.to) {
            if (this.target === "from") {
              this.$cache.from[0].style.visibility = "visible";
            } else if (this.target === "to") {
              this.$cache.to[0].style.visibility = "visible";
            } else if (!this.target) {
              this.$cache.from[0].style.visibility = "visible";
            }

            this.$cache.single[0].style.visibility = "hidden";
            max = to_left;
          } else {
            this.$cache.from[0].style.visibility = "hidden";
            this.$cache.to[0].style.visibility = "hidden";
            this.$cache.single[0].style.visibility = "visible";
            max = Math.max(single_left, to_left);
          }
        } else {
          this.$cache.from[0].style.visibility = "visible";
          this.$cache.to[0].style.visibility = "visible";
          this.$cache.single[0].style.visibility = "hidden";
        }

        if (min < this.labels.p_min + 1) {
          this.$cache.min[0].style.visibility = "hidden";
        } else {
          this.$cache.min[0].style.visibility = "visible";
        }

        if (max > 100 - this.labels.p_max - 1) {
          this.$cache.max[0].style.visibility = "hidden";
        } else {
          this.$cache.max[0].style.visibility = "visible";
        }
      }
    },

    /**
     * Draw shadow intervals
     */
    drawShadow: function drawShadow() {
      var o = this.options,
          c = this.$cache,
          is_from_min = typeof o.from_min === "number" && !isNaN(o.from_min),
          is_from_max = typeof o.from_max === "number" && !isNaN(o.from_max),
          is_to_min = typeof o.to_min === "number" && !isNaN(o.to_min),
          is_to_max = typeof o.to_max === "number" && !isNaN(o.to_max),
          from_min,
          from_max,
          to_min,
          to_max;

      if (o.type === "single") {
        if (o.from_shadow && (is_from_min || is_from_max)) {
          from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
          from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
          from_min = this.toFixed(from_min - this.coords.p_handle / 100 * from_min);
          from_max = this.toFixed(from_max - this.coords.p_handle / 100 * from_max);
          from_min = from_min + this.coords.p_handle / 2;
          c.shad_single[0].style.display = "block";
          c.shad_single[0].style.left = from_min + "%";
          c.shad_single[0].style.width = from_max + "%";
        } else {
          c.shad_single[0].style.display = "none";
        }
      } else {
        if (o.from_shadow && (is_from_min || is_from_max)) {
          from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
          from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
          from_min = this.toFixed(from_min - this.coords.p_handle / 100 * from_min);
          from_max = this.toFixed(from_max - this.coords.p_handle / 100 * from_max);
          from_min = from_min + this.coords.p_handle / 2;
          c.shad_from[0].style.display = "block";
          c.shad_from[0].style.left = from_min + "%";
          c.shad_from[0].style.width = from_max + "%";
        } else {
          c.shad_from[0].style.display = "none";
        }

        if (o.to_shadow && (is_to_min || is_to_max)) {
          to_min = this.convertToPercent(is_to_min ? o.to_min : o.min);
          to_max = this.convertToPercent(is_to_max ? o.to_max : o.max) - to_min;
          to_min = this.toFixed(to_min - this.coords.p_handle / 100 * to_min);
          to_max = this.toFixed(to_max - this.coords.p_handle / 100 * to_max);
          to_min = to_min + this.coords.p_handle / 2;
          c.shad_to[0].style.display = "block";
          c.shad_to[0].style.left = to_min + "%";
          c.shad_to[0].style.width = to_max + "%";
        } else {
          c.shad_to[0].style.display = "none";
        }
      }
    },

    /**
     * Write values to input element
     */
    writeToInput: function writeToInput() {
      if (this.options.type === "single") {
        if (this.options.values.length) {
          this.$cache.input.prop("value", this.result.from_value);
        } else {
          this.$cache.input.prop("value", this.result.from);
        }

        this.$cache.input.data("from", this.result.from);
      } else {
        if (this.options.values.length) {
          this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value);
        } else {
          this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to);
        }

        this.$cache.input.data("from", this.result.from);
        this.$cache.input.data("to", this.result.to);
      }
    },
    // =============================================================================================================
    // Callbacks
    callOnStart: function callOnStart() {
      this.writeToInput();

      if (this.options.onStart && typeof this.options.onStart === "function") {
        if (this.options.scope) {
          this.options.onStart.call(this.options.scope, this.result);
        } else {
          this.options.onStart(this.result);
        }
      }
    },
    callOnChange: function callOnChange() {
      this.writeToInput();

      if (this.options.onChange && typeof this.options.onChange === "function") {
        if (this.options.scope) {
          this.options.onChange.call(this.options.scope, this.result);
        } else {
          this.options.onChange(this.result);
        }
      }
    },
    callOnFinish: function callOnFinish() {
      this.writeToInput();

      if (this.options.onFinish && typeof this.options.onFinish === "function") {
        if (this.options.scope) {
          this.options.onFinish.call(this.options.scope, this.result);
        } else {
          this.options.onFinish(this.result);
        }
      }
    },
    callOnUpdate: function callOnUpdate() {
      this.writeToInput();

      if (this.options.onUpdate && typeof this.options.onUpdate === "function") {
        if (this.options.scope) {
          this.options.onUpdate.call(this.options.scope, this.result);
        } else {
          this.options.onUpdate(this.result);
        }
      }
    },
    // =============================================================================================================
    // Service methods
    toggleInput: function toggleInput() {
      this.$cache.input.toggleClass("irs-hidden-input");

      if (this.has_tab_index) {
        this.$cache.input.prop("tabindex", -1);
      } else {
        this.$cache.input.removeProp("tabindex");
      }

      this.has_tab_index = !this.has_tab_index;
    },

    /**
     * Convert real value to percent
     *
     * @param value {Number} X in real
     * @param no_min {boolean=} don't use min value
     * @returns {Number} X in percent
     */
    convertToPercent: function convertToPercent(value, no_min) {
      var diapason = this.options.max - this.options.min,
          one_percent = diapason / 100,
          val,
          percent;

      if (!diapason) {
        this.no_diapason = true;
        return 0;
      }

      if (no_min) {
        val = value;
      } else {
        val = value - this.options.min;
      }

      percent = val / one_percent;
      return this.toFixed(percent);
    },

    /**
     * Convert percent to real values
     *
     * @param percent {Number} X in percent
     * @returns {Number} X in real
     */
    convertToValue: function convertToValue(percent) {
      var min = this.options.min,
          max = this.options.max,
          min_decimals = min.toString().split(".")[1],
          max_decimals = max.toString().split(".")[1],
          min_length,
          max_length,
          avg_decimals = 0,
          abs = 0;

      if (percent === 0) {
        return this.options.min;
      }

      if (percent === 100) {
        return this.options.max;
      }

      if (min_decimals) {
        min_length = min_decimals.length;
        avg_decimals = min_length;
      }

      if (max_decimals) {
        max_length = max_decimals.length;
        avg_decimals = max_length;
      }

      if (min_length && max_length) {
        avg_decimals = min_length >= max_length ? min_length : max_length;
      }

      if (min < 0) {
        abs = Math.abs(min);
        min = +(min + abs).toFixed(avg_decimals);
        max = +(max + abs).toFixed(avg_decimals);
      }

      var number = (max - min) / 100 * percent + min,
          string = this.options.step.toString().split(".")[1],
          result;

      if (string) {
        number = +number.toFixed(string.length);
      } else {
        number = number / this.options.step;
        number = number * this.options.step;
        number = +number.toFixed(0);
      }

      if (abs) {
        number -= abs;
      }

      if (string) {
        result = +number.toFixed(string.length);
      } else {
        result = this.toFixed(number);
      }

      if (result < this.options.min) {
        result = this.options.min;
      } else if (result > this.options.max) {
        result = this.options.max;
      }

      return result;
    },

    /**
     * Round percent value with step
     *
     * @param percent {Number}
     * @returns percent {Number} rounded
     */
    calcWithStep: function calcWithStep(percent) {
      var rounded = Math.round(percent / this.coords.p_step) * this.coords.p_step;

      if (rounded > 100) {
        rounded = 100;
      }

      if (percent === 100) {
        rounded = 100;
      }

      return this.toFixed(rounded);
    },
    checkMinInterval: function checkMinInterval(p_current, p_next, type) {
      var o = this.options,
          current,
          next;

      if (!o.min_interval) {
        return p_current;
      }

      current = this.convertToValue(p_current);
      next = this.convertToValue(p_next);

      if (type === "from") {
        if (next - current < o.min_interval) {
          current = next - o.min_interval;
        }
      } else {
        if (current - next < o.min_interval) {
          current = next + o.min_interval;
        }
      }

      return this.convertToPercent(current);
    },
    checkMaxInterval: function checkMaxInterval(p_current, p_next, type) {
      var o = this.options,
          current,
          next;

      if (!o.max_interval) {
        return p_current;
      }

      current = this.convertToValue(p_current);
      next = this.convertToValue(p_next);

      if (type === "from") {
        if (next - current > o.max_interval) {
          current = next - o.max_interval;
        }
      } else {
        if (current - next > o.max_interval) {
          current = next + o.max_interval;
        }
      }

      return this.convertToPercent(current);
    },
    checkDiapason: function checkDiapason(p_num, min, max) {
      var num = this.convertToValue(p_num),
          o = this.options;

      if (typeof min !== "number") {
        min = o.min;
      }

      if (typeof max !== "number") {
        max = o.max;
      }

      if (num < min) {
        num = min;
      }

      if (num > max) {
        num = max;
      }

      return this.convertToPercent(num);
    },
    toFixed: function toFixed(num) {
      num = num.toFixed(20);
      return +num;
    },
    _prettify: function _prettify(num) {
      if (!this.options.prettify_enabled) {
        return num;
      }

      if (this.options.prettify && typeof this.options.prettify === "function") {
        return this.options.prettify(num);
      } else {
        return this.prettify(num);
      }
    },
    prettify: function prettify(num) {
      var n = num.toString();
      return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator);
    },
    checkEdges: function checkEdges(left, width) {
      if (!this.options.force_edges) {
        return this.toFixed(left);
      }

      if (left < 0) {
        left = 0;
      } else if (left > 100 - width) {
        left = 100 - width;
      }

      return this.toFixed(left);
    },
    validate: function validate() {
      var o = this.options,
          r = this.result,
          v = o.values,
          vl = v.length,
          value,
          i;
      if (typeof o.min === "string") o.min = +o.min;
      if (typeof o.max === "string") o.max = +o.max;
      if (typeof o.from === "string") o.from = +o.from;
      if (typeof o.to === "string") o.to = +o.to;
      if (typeof o.step === "string") o.step = +o.step;
      if (typeof o.from_min === "string") o.from_min = +o.from_min;
      if (typeof o.from_max === "string") o.from_max = +o.from_max;
      if (typeof o.to_min === "string") o.to_min = +o.to_min;
      if (typeof o.to_max === "string") o.to_max = +o.to_max;
      if (typeof o.grid_num === "string") o.grid_num = +o.grid_num;

      if (o.max < o.min) {
        o.max = o.min;
      }

      if (vl) {
        o.p_values = [];
        o.min = 0;
        o.max = vl - 1;
        o.step = 1;
        o.grid_num = o.max;
        o.grid_snap = true;

        for (i = 0; i < vl; i++) {
          value = +v[i];

          if (!isNaN(value)) {
            v[i] = value;
            value = this._prettify(value);
          } else {
            value = v[i];
          }

          o.p_values.push(value);
        }
      }

      if (typeof o.from !== "number" || isNaN(o.from)) {
        o.from = o.min;
      }

      if (typeof o.to !== "number" || isNaN(o.to)) {
        o.to = o.max;
      }

      if (o.type === "single") {
        if (o.from < o.min) o.from = o.min;
        if (o.from > o.max) o.from = o.max;
      } else {
        if (o.from < o.min) o.from = o.min;
        if (o.from > o.max) o.from = o.max;
        if (o.to < o.min) o.to = o.min;
        if (o.to > o.max) o.to = o.max;

        if (this.update_check.from) {
          if (this.update_check.from !== o.from) {
            if (o.from > o.to) o.from = o.to;
          }

          if (this.update_check.to !== o.to) {
            if (o.to < o.from) o.to = o.from;
          }
        }

        if (o.from > o.to) o.from = o.to;
        if (o.to < o.from) o.to = o.from;
      }

      if (typeof o.step !== "number" || isNaN(o.step) || !o.step || o.step < 0) {
        o.step = 1;
      }

      if (typeof o.from_min === "number" && o.from < o.from_min) {
        o.from = o.from_min;
      }

      if (typeof o.from_max === "number" && o.from > o.from_max) {
        o.from = o.from_max;
      }

      if (typeof o.to_min === "number" && o.to < o.to_min) {
        o.to = o.to_min;
      }

      if (typeof o.to_max === "number" && o.from > o.to_max) {
        o.to = o.to_max;
      }

      if (r) {
        if (r.min !== o.min) {
          r.min = o.min;
        }

        if (r.max !== o.max) {
          r.max = o.max;
        }

        if (r.from < r.min || r.from > r.max) {
          r.from = o.from;
        }

        if (r.to < r.min || r.to > r.max) {
          r.to = o.to;
        }
      }

      if (typeof o.min_interval !== "number" || isNaN(o.min_interval) || !o.min_interval || o.min_interval < 0) {
        o.min_interval = 0;
      }

      if (typeof o.max_interval !== "number" || isNaN(o.max_interval) || !o.max_interval || o.max_interval < 0) {
        o.max_interval = 0;
      }

      if (o.min_interval && o.min_interval > o.max - o.min) {
        o.min_interval = o.max - o.min;
      }

      if (o.max_interval && o.max_interval > o.max - o.min) {
        o.max_interval = o.max - o.min;
      }
    },
    decorate: function decorate(num, original) {
      var decorated = "",
          o = this.options;

      if (o.prefix) {
        decorated += o.prefix;
      }

      decorated += num;

      if (o.max_postfix) {
        if (o.values.length && num === o.p_values[o.max]) {
          decorated += o.max_postfix;

          if (o.postfix) {
            decorated += " ";
          }
        } else if (original === o.max) {
          decorated += o.max_postfix;

          if (o.postfix) {
            decorated += " ";
          }
        }
      }

      if (o.postfix) {
        decorated += o.postfix;
      }

      return decorated;
    },
    updateFrom: function updateFrom() {
      this.result.from = this.options.from;
      this.result.from_percent = this.convertToPercent(this.result.from);
      this.result.from_pretty = this._prettify(this.result.from);

      if (this.options.values) {
        this.result.from_value = this.options.values[this.result.from];
      }
    },
    updateTo: function updateTo() {
      this.result.to = this.options.to;
      this.result.to_percent = this.convertToPercent(this.result.to);
      this.result.to_pretty = this._prettify(this.result.to);

      if (this.options.values) {
        this.result.to_value = this.options.values[this.result.to];
      }
    },
    updateResult: function updateResult() {
      this.result.min = this.options.min;
      this.result.max = this.options.max;
      this.updateFrom();
      this.updateTo();
    },
    // =============================================================================================================
    // Grid
    appendGrid: function appendGrid() {
      if (!this.options.grid) {
        return;
      }

      var o = this.options,
          i,
          z,
          total = o.max - o.min,
          big_num = o.grid_num,
          big_p = 0,
          big_w = 0,
          small_max = 4,
          local_small_max,
          small_p,
          small_w = 0,
          result,
          html = '';
      this.calcGridMargin();

      if (o.grid_snap) {
        big_num = total / o.step;
      }

      if (big_num > 50) big_num = 50;
      big_p = this.toFixed(100 / big_num);

      if (big_num > 4) {
        small_max = 3;
      }

      if (big_num > 7) {
        small_max = 2;
      }

      if (big_num > 14) {
        small_max = 1;
      }

      if (big_num > 28) {
        small_max = 0;
      }

      for (i = 0; i < big_num + 1; i++) {
        local_small_max = small_max;
        big_w = this.toFixed(big_p * i);

        if (big_w > 100) {
          big_w = 100;
        }

        this.coords.big[i] = big_w;
        small_p = (big_w - big_p * (i - 1)) / (local_small_max + 1);

        for (z = 1; z <= local_small_max; z++) {
          if (big_w === 0) {
            break;
          }

          small_w = this.toFixed(big_w - small_p * z);
          html += '<span class="irs-grid-pol small" style="left: ' + small_w + '%"></span>';
        }

        html += '<span class="irs-grid-pol" style="left: ' + big_w + '%"></span>';
        result = this.convertToValue(big_w);

        if (o.values.length) {
          result = o.p_values[result];
        } else {
          result = this._prettify(result);
        }

        html += '<span class="irs-grid-text js-grid-text-' + i + '" style="left: ' + big_w + '%">' + result + '</span>';
      }

      this.coords.big_num = Math.ceil(big_num + 1);
      this.$cache.cont.addClass("irs-with-grid");
      this.$cache.grid.html(html);
      this.cacheGridLabels();
    },
    cacheGridLabels: function cacheGridLabels() {
      var $label,
          i,
          num = this.coords.big_num;

      for (i = 0; i < num; i++) {
        $label = this.$cache.grid.find(".js-grid-text-" + i);
        this.$cache.grid_labels.push($label);
      }

      this.calcGridLabels();
    },
    calcGridLabels: function calcGridLabels() {
      var i,
          label,
          start = [],
          finish = [],
          num = this.coords.big_num;

      for (i = 0; i < num; i++) {
        this.coords.big_w[i] = this.$cache.grid_labels[i].outerWidth(false);
        this.coords.big_p[i] = this.toFixed(this.coords.big_w[i] / this.coords.w_rs * 100);
        this.coords.big_x[i] = this.toFixed(this.coords.big_p[i] / 2);
        start[i] = this.toFixed(this.coords.big[i] - this.coords.big_x[i]);
        finish[i] = this.toFixed(start[i] + this.coords.big_p[i]);
      }

      if (this.options.force_edges) {
        if (start[0] < -this.coords.grid_gap) {
          start[0] = -this.coords.grid_gap;
          finish[0] = this.toFixed(start[0] + this.coords.big_p[0]);
          this.coords.big_x[0] = this.coords.grid_gap;
        }

        if (finish[num - 1] > 100 + this.coords.grid_gap) {
          finish[num - 1] = 100 + this.coords.grid_gap;
          start[num - 1] = this.toFixed(finish[num - 1] - this.coords.big_p[num - 1]);
          this.coords.big_x[num - 1] = this.toFixed(this.coords.big_p[num - 1] - this.coords.grid_gap);
        }
      }

      this.calcGridCollision(2, start, finish);
      this.calcGridCollision(4, start, finish);

      for (i = 0; i < num; i++) {
        label = this.$cache.grid_labels[i][0];

        if (this.coords.big_x[i] !== Number.POSITIVE_INFINITY) {
          label.style.marginLeft = -this.coords.big_x[i] + "%";
        }
      }
    },
    // Collisions Calc Beta
    // TODO: Refactor then have plenty of time
    calcGridCollision: function calcGridCollision(step, start, finish) {
      var i,
          next_i,
          label,
          num = this.coords.big_num;

      for (i = 0; i < num; i += step) {
        next_i = i + step / 2;

        if (next_i >= num) {
          break;
        }

        label = this.$cache.grid_labels[next_i][0];

        if (finish[i] <= start[next_i]) {
          label.style.visibility = "visible";
        } else {
          label.style.visibility = "hidden";
        }
      }
    },
    calcGridMargin: function calcGridMargin() {
      if (!this.options.grid_margin) {
        return;
      }

      this.coords.w_rs = this.$cache.rs.outerWidth(false);

      if (!this.coords.w_rs) {
        return;
      }

      if (this.options.type === "single") {
        this.coords.w_handle = this.$cache.s_single.outerWidth(false);
      } else {
        this.coords.w_handle = this.$cache.s_from.outerWidth(false);
      }

      this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
      this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - 0.1);
      this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%";
      this.$cache.grid[0].style.left = this.coords.grid_gap + "%";
    },
    // =============================================================================================================
    // Public methods
    update: function update(options) {
      if (!this.input) {
        return;
      }

      this.is_update = true;
      this.options.from = this.result.from;
      this.options.to = this.result.to;
      this.update_check.from = this.result.from;
      this.update_check.to = this.result.to;
      this.options = $.extend(this.options, options);
      this.validate();
      this.updateResult(options);
      this.toggleInput();
      this.remove();
      this.init(true);
    },
    reset: function reset() {
      if (!this.input) {
        return;
      }

      this.updateResult();
      this.update();
    },
    destroy: function destroy() {
      if (!this.input) {
        return;
      }

      this.toggleInput();
      this.$cache.input.prop("readonly", false);
      $.data(this.input, "ionRangeSlider", null);
      this.remove();
      this.input = null;
      this.options = null;
    }
  };

  $.fn.ionRangeSlider = function (options) {
    return this.each(function () {
      if (!$.data(this, "ionRangeSlider")) {
        $.data(this, "ionRangeSlider", new IonRangeSlider(this, options, plugin_count++));
      }
    });
  }; // =================================================================================================================
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license


  (function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  })();
});

/***/ }),

/***/ "./dev/jsPlugins/jquery-3.3.1.js":
/*!***************************************!*\
  !*** ./dev/jsPlugins/jquery-3.3.1.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
(function (global, factory) {
  "use strict";

  if (( false ? undefined : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }

      return factory(w);
    };
  } else {
    factory(global);
  } // Pass this if window is not defined yet

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.
  "use strict";

  var arr = [];
  var document = window.document;
  var getProto = Object.getPrototypeOf;
  var _slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};

  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
  };

  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
  };

  var preservedScriptAttributes = {
    type: true,
    src: true,
    noModule: true
  };

  function DOMEval(code, doc, node) {
    doc = doc || document;
    var i,
        script = doc.createElement("script");
    script.text = code;

    if (node) {
      for (i in preservedScriptAttributes) {
        if (node[i]) {
          script[i] = node[i];
        }
      }
    }

    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  function toType(obj) {
    if (obj == null) {
      return obj + "";
    } // Support: Android <=2.3 only (functionish RegExp)


    return _typeof(obj) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : _typeof(obj);
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module


  var version = "3.3.1",
      // Define a local copy of jQuery
  jQuery = function jQuery(selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init(selector, context);
  },
      // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery,
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function toArray() {
      return _slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function get(num) {
      // Return all the elements in a clean array
      if (num == null) {
        return _slice.call(this);
      } // Return just the one element from the set


      return num < 0 ? this[num + this.length] : this[num];
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function pushStack(elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems); // Add the old object onto the stack (as a reference)

      ret.prevObject = this; // Return the newly-formed element set

      return ret;
    },
    // Execute a callback for every element in the matched set.
    each: function each(callback) {
      return jQuery.each(this, callback);
    },
    map: function map(callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function slice() {
      return this.pushStack(_slice.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    eq: function eq(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };

  jQuery.extend = jQuery.fn.extend = function () {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false; // Handle a deep copy situation

    if (typeof target === "boolean") {
      deep = target; // Skip the boolean and the target

      target = arguments[i] || {};
      i++;
    } // Handle case when target is a string or something (possible in deep copy)


    if (_typeof(target) !== "object" && !isFunction(target)) {
      target = {};
    } // Extend jQuery itself if only one argument is passed


    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name]; // Prevent never-ending loop

          if (target === copy) {
            continue;
          } // Recurse if we're merging plain objects or arrays


          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            } // Never move original objects, clone them


            target[name] = jQuery.extend(deep, clone, copy); // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    } // Return the modified object


    return target;
  };

  jQuery.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function error(msg) {
      throw new Error(msg);
    },
    noop: function noop() {},
    isPlainObject: function isPlainObject(obj) {
      var proto, Ctor; // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects

      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = getProto(obj); // Objects with no prototype (e.g., `Object.create( null )`) are plain

      if (!proto) {
        return true;
      } // Objects with prototype are plain iff they were constructed by a global Object function


      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function isEmptyObject(obj) {
      /* eslint-disable no-unused-vars */
      // See https://github.com/eslint/eslint/issues/6125
      var name;

      for (name in obj) {
        return false;
      }

      return true;
    },
    // Evaluates a script in a global context
    globalEval: function globalEval(code) {
      DOMEval(code);
    },
    each: function each(obj, callback) {
      var length,
          i = 0;

      if (isArrayLike(obj)) {
        length = obj.length;

        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }

      return obj;
    },
    // Support: Android <=4.0 only
    trim: function trim(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    // results is for internal usage only
    makeArray: function makeArray(arr, results) {
      var ret = results || [];

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },
    inArray: function inArray(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function merge(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;
      return first;
    },
    grep: function grep(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert; // Go through the array, only saving the items
      // that pass the validator function

      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);

        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },
    // arg is for internal usage only
    map: function map(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = []; // Go through the array, translating each of the items to their new values

      if (isArrayLike(elems)) {
        length = elems.length;

        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        } // Go through every key on the object,

      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }
      } // Flatten any nested arrays


      return concat.apply([], ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });

  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  } // Populate the class2type map


  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj);

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }

  var Sizzle =
  /*!
   * Sizzle CSS Selector Engine v2.3.3
   * https://sizzlejs.com/
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license
   * http://jquery.org/license
   *
   * Date: 2016-08-08
   */
  function (window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        // Local document vars
    setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        // Instance-specific data
    expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function sortOrder(a, b) {
      if (a === b) {
        hasDuplicate = true;
      }

      return 0;
    },
        // Instance methods
    hasOwn = {}.hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        // Use a stripped-down indexOf as it's faster than native
    // https://jsperf.com/thor-indexof-vs-for/5
    indexOf = function indexOf(list, elem) {
      var i = 0,
          len = list.length;

      for (; i < len; i++) {
        if (list[i] === elem) {
          return i;
        }
      }

      return -1;
    },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        // Regular expressions
    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",
        // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + // 3. anything else (capture 2)
    ".*" + ")\\)|)",
        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
      "ID": new RegExp("^#(" + identifier + ")"),
      "CLASS": new RegExp("^\\.(" + identifier + ")"),
      "TAG": new RegExp("^(" + identifier + "|[*])"),
      "ATTR": new RegExp("^" + attributes),
      "PSEUDO": new RegExp("^" + pseudos),
      "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
      "bool": new RegExp("^(?:" + booleans + ")$", "i"),
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        // CSS escapes
    // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function funescape(_, escaped, escapedWhitespace) {
      var high = "0x" + escaped - 0x10000; // NaN means non-codepoint
      // Support: Firefox<24
      // Workaround erroneous numeric interpretation of +"0x"

      return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
      String.fromCharCode(high + 0x10000) : // Supplemental Plane codepoint (surrogate pair)
      String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
    },
        // CSS string/identifier serialization
    // https://drafts.csswg.org/cssom/#common-serializing-idioms
    rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function fcssescape(ch, asCodePoint) {
      if (asCodePoint) {
        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
        if (ch === "\0") {
          return "\uFFFD";
        } // Control characters and (dependent upon position) numbers get escaped as code points


        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      } // Other potentially-special ASCII characters get backslash-escaped


      return "\\" + ch;
    },
        // Used for iframes
    // See setDocument()
    // Removing the function wrapper causes a "Permission Denied"
    // error in IE
    unloadHandler = function unloadHandler() {
      setDocument();
    },
        disabledAncestor = addCombinator(function (elem) {
      return elem.disabled === true && ("form" in elem || "label" in elem);
    }, {
      dir: "parentNode",
      next: "legend"
    }); // Optimize for push.apply( _, NodeList )


    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes); // Support: Android<4.0
      // Detect silently failing push.apply

      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? // Leverage slice if possible
        function (target, els) {
          push_native.apply(target, slice.call(els));
        } : // Support: IE<9
        // Otherwise append directly
        function (target, els) {
          var j = target.length,
              i = 0; // Can't trust NodeList.length

          while (target[j++] = els[i++]) {}

          target.length = j - 1;
        }
      };
    }

    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          // nodeType defaults to 9, since context defaults to document
      nodeType = context ? context.nodeType : 9;
      results = results || []; // Return early from calls with invalid selector or context

      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      } // Try to shortcut find operations (as opposed to filters) in HTML documents


      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }

        context = context || document;

        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                } // Element context

              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } // Type selector

            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results; // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          } // Take advantage of querySelectorAll


          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector; // qSA looks outside Element context, which is not what we want
              // Thanks to Andrew Dupont for this workaround technique
              // Support: IE <=8
              // Exclude object elements
            } else if (context.nodeName.toLowerCase() !== "object") {
              // Capture the context ID, setting it first if necessary
              if (nid = context.getAttribute("id")) {
                nid = nid.replace(rcssescape, fcssescape);
              } else {
                context.setAttribute("id", nid = expando);
              } // Prefix every selector in the list


              groups = tokenize(selector);
              i = groups.length;

              while (i--) {
                groups[i] = "#" + nid + " " + toSelector(groups[i]);
              }

              newSelector = groups.join(","); // Expand context for sibling selectors

              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }

            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      } // All others


      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */


    function createCache() {
      var keys = [];

      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }

        return cache[key + " "] = value;
      }

      return cache;
    }
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */


    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */


    function assert(fn) {
      var el = document.createElement("fieldset");

      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } // release memory in IE


        el = null;
      }
    }
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */


    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;

      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */


    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex; // Use IE sourceIndex if available on both nodes

      if (diff) {
        return diff;
      } // Check if b follows a


      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }

      return a ? 1 : -1;
    }
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */


    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */


    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */


    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ("form" in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            } // Support: IE 6 - 11
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors


            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually

            /* jshint -W018 */
            elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
          }

          return elem.disabled === disabled; // Try to winnow out elements that can't be disabled before trusting the disabled property.
          // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
          // even exist on them, let alone have a boolean value.
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        } // Remaining elements are neither :enabled nor :disabled


        return false;
      };
    }
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */


    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length; // Match elements found at the specified indexes

          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */


    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    } // Expose support vars for convenience


    support = Sizzle.support = {};
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */

    isXML = Sizzle.isXML = function (elem) {
      // documentElement is verified for cases where it doesn't yet exist
      // (such as loading iframes in IE - #4833)
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */


    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare,
          subWindow,
          doc = node ? node.ownerDocument || node : preferredDoc; // Return early if doc is invalid or already selected

      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      } // Update global variables


      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document); // Support: IE 9-11, Edge
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)

      if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 11, Edge
        if (subWindow.addEventListener) {
          subWindow.addEventListener("unload", unloadHandler, false); // Support: IE 9 - 10 only
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent("onunload", unloadHandler);
        }
      }
      /* Attributes
      ---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)


      support.attributes = assert(function (el) {
        el.className = "i";
        return !el.getAttribute("className");
      });
      /* getElement(s)By*
      ---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements

      support.getElementsByTagName = assert(function (el) {
        el.appendChild(document.createComment(""));
        return !el.getElementsByTagName("*").length;
      }); // Support: IE<9

      support.getElementsByClassName = rnative.test(document.getElementsByClassName); // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test

      support.getById = assert(function (el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      }); // ID filter and find

      if (support.getById) {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute("id") === attrId;
          };
        };

        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        }; // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut


        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node,
                i,
                elems,
                elem = context.getElementById(id);

            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode("id");

              if (node && node.value === id) {
                return [elem];
              } // Fall back on getElementsByName


              elems = context.getElementsByName(id);
              i = 0;

              while (elem = elems[i++]) {
                node = elem.getAttributeNode("id");

                if (node && node.value === id) {
                  return [elem];
                }
              }
            }

            return [];
          }
        };
      } // Tag


      Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem,
            tmp = [],
            i = 0,
            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
        results = context.getElementsByTagName(tag); // Filter out possible comments

        if (tag === "*") {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }

          return tmp;
        }

        return results;
      }; // Class

      Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)


      rbuggyMatches = []; // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See https://bugs.jquery.com/ticket/13378

      rbuggyQSA = [];

      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (el) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // https://bugs.jquery.com/ticket/12359
          docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section

          if (el.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          } // Support: IE8
          // Boolean attributes and "value" are not treated correctly


          if (!el.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          } // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+


          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          } // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests


          if (!el.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          } // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibling-combinator selector` fails


          if (!el.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function (el) {
          el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>"; // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment

          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          el.appendChild(input).setAttribute("name", "D"); // Support: IE8
          // Enforce case-sensitivity of name attribute

          if (el.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          } // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests


          if (el.querySelectorAll(":enabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Support: IE9-11+
          // IE's :disabled selector does not pick up the children of disabled fieldsets


          docElem.appendChild(el).disabled = true;

          if (el.querySelectorAll(":disabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Opera 10-11 does not throw on post-comma invalid pseudos


          el.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }

      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (el) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(el, "*"); // This should fail with an exception
          // Gecko does not error, returns false instead

          matches.call(el, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      /* Contains
      ---------------------------------------------------------------------- */

      hasCompare = rnative.test(docElem.compareDocumentPosition); // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself

      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }

        return false;
      };
      /* Sorting
      ---------------------------------------------------------------------- */
      // Document order sorting

      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        } // Sort on method existence if only one input has compareDocumentPosition


        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;

        if (compare) {
          return compare;
        } // Calculate position if both inputs belong to the same document


        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1; // Disconnected nodes

        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }

          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          } // Maintain original order


          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }

        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }

        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b]; // Parentless nodes are either documents or disconnected

        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0; // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        } // Otherwise we need full lists of their ancestors for comparison


        cur = a;

        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }

        cur = b;

        while (cur = cur.parentNode) {
          bp.unshift(cur);
        } // Walk down the tree looking for a discrepancy


        while (ap[i] === bp[i]) {
          i++;
        }

        return i ? // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
        ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };

    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };

    Sizzle.matchesSelector = function (elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      } // Make sure that attribute selectors are quoted


      expr = expr.replace(rattributeQuotes, "='$1']");

      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr); // IE 9's matchesSelector returns false on disconnected nodes

          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }

      return Sizzle(expr, document, null, [elem]).length > 0;
    };

    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }

      return contains(context, elem);
    };

    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }

      var fn = Expr.attrHandle[name.toLowerCase()],
          // Don't get fooled by Object.prototype properties (jQuery #13807)
      val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };

    Sizzle.escape = function (sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };

    Sizzle.error = function (msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */


    Sizzle.uniqueSort = function (results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0; // Unless we *know* we can detect duplicates, assume their presence

      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);

      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }

        while (j--) {
          results.splice(duplicates[j], 1);
        }
      } // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225


      sortInput = null;
      return results;
    };
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */


    getText = Sizzle.getText = function (elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;

      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      } // Do not include comment or processing instruction nodes


      return ret;
    };

    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        "ATTR": function ATTR(match) {
          match[1] = match[1].replace(runescape, funescape); // Move the given value to match[3] whether quoted or unquoted

          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }

          return match.slice(0, 4);
        },
        "CHILD": function CHILD(match) {
          /* matches from matchExpr["CHILD"]
          	1 type (only|nth|...)
          	2 what (child|of-type)
          	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          	4 xn-component of xn+y argument ([+-]?\d*n|)
          	5 sign of xn-component
          	6 x of xn-component
          	7 sign of y-component
          	8 y of y-component
          */
          match[1] = match[1].toLowerCase();

          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            } // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1


            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd"); // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }

          return match;
        },
        "PSEUDO": function PSEUDO(match) {
          var excess,
              unquoted = !match[6] && match[2];

          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          } // Accept quoted arguments as-is


          if (match[3]) {
            match[2] = match[4] || match[5] || ""; // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && ( // Get excess from tokenize (recursively)
          excess = tokenize(unquoted, true)) && ( // advance to the next closing parenthesis
          excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          } // Return only captures needed by the pseudo filter method (type and argument)


          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function TAG(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function CLASS(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function ATTR(name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);

            if (result == null) {
              return operator === "!=";
            }

            if (!operator) {
              return true;
            }

            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function CHILD(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;

            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;

                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  } // Reverse direction for :only-* (if we haven't yet done so)


                  start = dir = type === "only" && !start && "nextSibling";
                }

                return true;
              }

              start = [forward ? parent.firstChild : parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`

              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)

                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];

                while (node = ++nodeIndex && node && node[dir] || ( // Fallback to seeking `elem` from the start
                diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)

                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                } // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)


                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)

                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }

                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              } // Incorporate the offset, then check against cycle size


              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        "PSEUDO": function PSEUDO(pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo); // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does

          if (fn[expando]) {
            return fn(argument);
          } // But maintain support for old signatures


          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;

              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }

          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length; // Match elements unmatched by `matcher`

            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results); // Don't keep the element (issue #299)

            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }

          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;

            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);

            return false;
          };
        }),
        // Miscellaneous
        "target": function target(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function root(elem) {
          return elem === docElem;
        },
        "focus": function focus(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        "enabled": createDisabledPseudo(false),
        "disabled": createDisabledPseudo(true),
        "checked": function checked(elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
        },
        "selected": function selected(elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },
        // Contents
        "empty": function empty(elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }

          return true;
        },
        "parent": function parent(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        // Element/input types
        "header": function header(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function input(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function button(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function text(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ( // Support: IE<8
          // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
          (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        "first": createPositionalPseudo(function () {
          return [0];
        }),
        "last": createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;

          for (; --i >= 0;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;

          for (; ++i < length;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"]; // Add button/input type pseudos

    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }

    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    } // Easy API for creating new setFilters


    function setFilters() {}

    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];

      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }

      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;

      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }

          groups.push(tokens = []);
        }

        matched = false; // Combinators

        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        } // Filters


        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }

        if (!matched) {
          break;
        }
      } // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens


      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };

    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";

      for (; i < len; i++) {
        selector += tokens[i].value;
      }

      return selector;
    }

    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          skip = combinator.next,
          key = skip || dir,
          checkNonElements = base && key === "parentNode",
          doneName = done++;
      return combinator.first ? // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }

        return false;
      } : // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching

        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {}); // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)

              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem;
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[key] = newCache; // A match means we're done; a fail means we have to keep checking

                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      };
    }

    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;

        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }

        return true;
      } : matchers[0];
    }

    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;

      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }

      return results;
    }

    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;

      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);

            if (mapped) {
              map.push(i);
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }

      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }

      return markFunction(function (seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            // Get initial elements from seed or context
        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            // Prefilter to get matcher input, preserving a map for seed-results synchronization
        matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
        [] : // ...otherwise use results directly
        results : matcherIn; // Find primary matches

        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        } // Apply postFilter


        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml); // Un-match failing elements by moving them back to matcherIn

          i = temp.length;

          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }

        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;

              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }

              postFinder(null, matcherOut = [], temp, xml);
            } // Move matched elements from seed to results to keep them synchronized


            i = matcherOut.length;

            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          } // Add elements to results, through postFinder if defined

        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);

          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }

    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          // The foundational matcher ensures that elements are reachable from top-level context(s)
      matchContext = addCombinator(function (elem) {
        return elem === checkContext;
      }, implicitRelative, true),
          matchAnyContext = addCombinator(function (elem) {
        return indexOf(checkContext, elem) > -1;
      }, implicitRelative, true),
          matchers = [function (elem, context, xml) {
        var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml)); // Avoid hanging onto element (issue #299)

        checkContext = null;
        return ret;
      }];

      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches); // Return special upon seeing a positional matcher

          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;

            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }

            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }

          matchers.push(matcher);
        }
      }

      return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function superMatcher(seed, context, xml, results, outermost) {
        var elem,
            j,
            matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
            // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
            len = elems.length;

        if (outermost) {
          outermostContext = context === document || context || outermost;
        } // Add elements passing elementMatchers directly to results
        // Support: IE<9, Safari
        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id


        for (; i !== len && (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0;

            if (!context && elem.ownerDocument !== document) {
              setDocument(elem);
              xml = !documentIsHTML;
            }

            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context || document, xml)) {
                results.push(elem);
                break;
              }
            }

            if (outermost) {
              dirruns = dirrunsUnique;
            }
          } // Track unmatched elements for set filters


          if (bySet) {
            // They will have gone through all possible matchers
            if (elem = !matcher && elem) {
              matchedCount--;
            } // Lengthen the array for every element, matched or not


            if (seed) {
              unmatched.push(elem);
            }
          }
        } // `i` is now the count of elements visited above, and adding it to `matchedCount`
        // makes the latter nonnegative.


        matchedCount += i; // Apply set filters to unmatched elements
        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
        // no element matchers and no seed.
        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
        // numerically zero.

        if (bySet && i !== matchedCount) {
          j = 0;

          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }

          if (seed) {
            // Reintegrate element matches to eliminate the need for sorting
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results);
                }
              }
            } // Discard index placeholder values to get only actual matches


            setMatched = condense(setMatched);
          } // Add matches to results


          push.apply(results, setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting

          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        } // Override manipulation of globals by nested matchers


        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }

        return unmatched;
      };

      return bySet ? markFunction(superMatcher) : superMatcher;
    }

    compile = Sizzle.compile = function (selector, match
    /* Internal Use Only */
    ) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];

      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }

        i = match.length;

        while (i--) {
          cached = matcherFromTokens(match[i]);

          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        } // Cache the compiled function


        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)); // Save selector and tokenization

        cached.selector = selector;
      }

      return cached;
    };
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */


    select = Sizzle.select = function (selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || []; // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)

      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);

        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];

          if (!context) {
            return results; // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }

          selector = selector.slice(tokens.shift().value.length);
        } // Fetch a seed set for right-to-left matching


        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;

        while (i--) {
          token = tokens[i]; // Abort if we hit a combinator

          if (Expr.relative[type = token.type]) {
            break;
          }

          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);

              if (!selector) {
                push.apply(results, seed);
                return results;
              }

              break;
            }
          }
        }
      } // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above


      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    }; // One-time assignments
    // Sort stability


    support.sortStable = expando.split("").sort(sortOrder).join("") === expando; // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function

    support.detectDuplicates = !!hasDuplicate; // Initialize against the default document

    setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*

    support.sortDetached = assert(function (el) {
      // Should return 1, but returns 4 (following)
      return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
    }); // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx

    if (!assert(function (el) {
      el.innerHTML = "<a href='#'></a>";
      return el.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    } // Support: IE<9
    // Use defaultValue in place of getAttribute("value")


    if (!support.attributes || !assert(function (el) {
      el.innerHTML = "<input/>";
      el.firstChild.setAttribute("value", "");
      return el.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    } // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies


    if (!assert(function (el) {
      return el.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;

        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }

    return Sizzle;
  }(window);

  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors; // Deprecated

  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;

  var dir = function dir(elem, _dir, until) {
    var matched = [],
        truncate = until !== undefined;

    while ((elem = elem[_dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }

        matched.push(elem);
      }
    }

    return matched;
  };

  var _siblings = function siblings(n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  var rneedsContext = jQuery.expr.match.needsContext;

  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }

  ;
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; // Implement the identical functionality for filter and not

  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    } // Single element


    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    } // Arraylike of elements (jQuery, arguments, Array)


    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function (elem) {
        return indexOf.call(qualifier, elem) > -1 !== not;
      });
    } // Filtered directly for both simple and complex selectors


    return jQuery.filter(qualifier, elements, not);
  }

  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0];

    if (not) {
      expr = ":not(" + expr + ")";
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }

    return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1;
    }));
  };

  jQuery.fn.extend({
    find: function find(selector) {
      var i,
          ret,
          len = this.length,
          self = this;

      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }

      ret = this.pushStack([]);

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter: function filter(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function not(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function is(selector) {
      return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  }); // Initialize a jQuery object
  // A central reference to the root jQuery(document)

  var rootjQuery,
      // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  // Shortcut simple #id case for speed
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      init = jQuery.fn.init = function (selector, context, root) {
    var match, elem; // HANDLE: $(""), $(null), $(undefined), $(false)

    if (!selector) {
      return this;
    } // Method init() accepts an alternate rootjQuery
    // so migrate can support jQuery.sub (gh-2101)


    root = root || rootjQuery; // Handle HTML strings

    if (typeof selector === "string") {
      if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [null, selector, null];
      } else {
        match = rquickExpr.exec(selector);
      } // Match html or make sure no context is specified for #id


      if (match && (match[1] || !context)) {
        // HANDLE: $(html) -> $(array)
        if (match[1]) {
          context = context instanceof jQuery ? context[0] : context; // Option to run scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present

          jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)); // HANDLE: $(html, props)

          if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
            for (match in context) {
              // Properties of context are called as methods if possible
              if (isFunction(this[match])) {
                this[match](context[match]); // ...and otherwise set as attributes
              } else {
                this.attr(match, context[match]);
              }
            }
          }

          return this; // HANDLE: $(#id)
        } else {
          elem = document.getElementById(match[2]);

          if (elem) {
            // Inject the element directly into the jQuery object
            this[0] = elem;
            this.length = 1;
          }

          return this;
        } // HANDLE: $(expr, $(...))

      } else if (!context || context.jquery) {
        return (context || root).find(selector); // HANDLE: $(expr, context)
        // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor(context).find(selector);
      } // HANDLE: $(DOMElement)

    } else if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this; // HANDLE: $(function)
      // Shortcut for document ready
    } else if (isFunction(selector)) {
      return root.ready !== undefined ? root.ready(selector) : // Execute immediately if ready is not present
      selector(jQuery);
    }

    return jQuery.makeArray(selector, this);
  }; // Give the init function the jQuery prototype for later instantiation


  init.prototype = jQuery.fn; // Initialize central reference

  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      // Methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };
  jQuery.fn.extend({
    has: function has(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function () {
        var i = 0;

        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function closest(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          targets = typeof selectors !== "string" && jQuery(selectors); // Positional selectors never match, since there's no _selection_ context

      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : // Don't pass non-elements to Sizzle
            cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }

      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    // Determine the position of an element within the set
    index: function index(elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      } // Index in selector


      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      } // Locate the position of the desired element


      return indexOf.call(this, // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem);
    },
    add: function add(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function addBack(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });

  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}

    return cur;
  }

  jQuery.each({
    parent: function parent(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function parents(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function parentsUntil(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function next(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function prev(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function nextAll(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function prevAll(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function nextUntil(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function prevUntil(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function siblings(elem) {
      return _siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function children(elem) {
      return _siblings(elem.firstChild);
    },
    contents: function contents(elem) {
      if (nodeName(elem, "iframe")) {
        return elem.contentDocument;
      } // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.


      if (nodeName(elem, "template")) {
        elem = elem.content || elem;
      }

      return jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);

      if (name.slice(-5) !== "Until") {
        selector = until;
      }

      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }

      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        } // Reverse order for parents* and prev-derivatives


        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }

      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g; // Convert String-formatted options into Object-formatted ones

  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */


  jQuery.Callbacks = function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

    var // Flag to know if list is currently firing
    firing,
        // Last fire value for non-forgettable lists
    memory,
        // Flag to know if list was already fired
    _fired,
        // Flag to prevent firing
    _locked,
        // Actual callback list
    list = [],
        // Queue of execution data for repeatable lists
    queue = [],
        // Index of currently firing callback (modified by add/remove as needed)
    firingIndex = -1,
        // Fire callbacks
    fire = function fire() {
      // Enforce single-firing
      _locked = _locked || options.once; // Execute callbacks for all pending executions,
      // respecting firingIndex overrides and runtime changes

      _fired = firing = true;

      for (; queue.length; firingIndex = -1) {
        memory = queue.shift();

        while (++firingIndex < list.length) {
          // Run callback and check for early termination
          if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
            // Jump to end and forget the data so .add doesn't re-fire
            firingIndex = list.length;
            memory = false;
          }
        }
      } // Forget the data if we're done with it


      if (!options.memory) {
        memory = false;
      }

      firing = false; // Clean up if we're done firing for good

      if (_locked) {
        // Keep an empty list if we have data for future add calls
        if (memory) {
          list = []; // Otherwise, this object is spent
        } else {
          list = "";
        }
      }
    },
        // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function add() {
        if (list) {
          // If we have memory from a past run, we should fire after adding
          if (memory && !firing) {
            firingIndex = list.length - 1;
            queue.push(memory);
          }

          (function add(args) {
            jQuery.each(args, function (_, arg) {
              if (isFunction(arg)) {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && toType(arg) !== "string") {
                // Inspect recursively
                add(arg);
              }
            });
          })(arguments);

          if (memory && !firing) {
            fire();
          }
        }

        return this;
      },
      // Remove a callback from the list
      remove: function remove() {
        jQuery.each(arguments, function (_, arg) {
          var index;

          while ((index = jQuery.inArray(arg, list, index)) > -1) {
            list.splice(index, 1); // Handle firing indexes

            if (index <= firingIndex) {
              firingIndex--;
            }
          }
        });
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function has(fn) {
        return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
      },
      // Remove all callbacks from the list
      empty: function empty() {
        if (list) {
          list = [];
        }

        return this;
      },
      // Disable .fire and .add
      // Abort any current/pending executions
      // Clear all callbacks and values
      disable: function disable() {
        _locked = queue = [];
        list = memory = "";
        return this;
      },
      disabled: function disabled() {
        return !list;
      },
      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions
      lock: function lock() {
        _locked = queue = [];

        if (!memory && !firing) {
          list = memory = "";
        }

        return this;
      },
      locked: function locked() {
        return !!_locked;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function fireWith(context, args) {
        if (!_locked) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          queue.push(args);

          if (!firing) {
            fire();
          }
        }

        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function fire() {
        self.fireWith(this, arguments);
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function fired() {
        return !!_fired;
      }
    };

    return self;
  };

  function Identity(v) {
    return v;
  }

  function Thrower(ex) {
    throw ex;
  }

  function adoptValue(value, resolve, reject, noValue) {
    var method;

    try {
      // Check for promise aspect first to privilege synchronous behavior
      if (value && isFunction(method = value.promise)) {
        method.call(value).done(resolve).fail(reject); // Other thenables
      } else if (value && isFunction(method = value.then)) {
        method.call(value, resolve, reject); // Other non-thenables
      } else {
        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
        // * false: [ value ].slice( 0 ) => resolve( value )
        // * true: [ value ].slice( 1 ) => resolve()
        resolve.apply(undefined, [value].slice(noValue));
      } // For Promises/A+, convert exceptions into rejections
      // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
      // Deferred#then to conditionally suppress rejection.

    } catch (value) {
      // Support: Android 4.0 only
      // Strict mode functions invoked without .call/.apply get global-object context
      reject.apply(undefined, [value]);
    }
  }

  jQuery.extend({
    Deferred: function Deferred(func) {
      var tuples = [// action, add listener, callbacks,
      // ... .then handlers, argument index, [final state]
      ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
          _state = "pending",
          _promise = {
        state: function state() {
          return _state;
        },
        always: function always() {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        "catch": function _catch(fn) {
          return _promise.then(null, fn);
        },
        // Keep pipe for back-compat
        pipe: function pipe()
        /* fnDone, fnFail, fnProgress */
        {
          var fns = arguments;
          return jQuery.Deferred(function (newDefer) {
            jQuery.each(tuples, function (i, tuple) {
              // Map tuples (progress, done, fail) to arguments (done, fail, progress)
              var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]]; // deferred.progress(function() { bind to newDefer or newDefer.notify })
              // deferred.done(function() { bind to newDefer or newDefer.resolve })
              // deferred.fail(function() { bind to newDefer or newDefer.reject })

              deferred[tuple[1]](function () {
                var returned = fn && fn.apply(this, arguments);

                if (returned && isFunction(returned.promise)) {
                  returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                } else {
                  newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                }
              });
            });
            fns = null;
          }).promise();
        },
        then: function then(onFulfilled, onRejected, onProgress) {
          var maxDepth = 0;

          function resolve(depth, deferred, handler, special) {
            return function () {
              var that = this,
                  args = arguments,
                  mightThrow = function mightThrow() {
                var returned, then; // Support: Promises/A+ section 2.3.3.3.3
                // https://promisesaplus.com/#point-59
                // Ignore double-resolution attempts

                if (depth < maxDepth) {
                  return;
                }

                returned = handler.apply(that, args); // Support: Promises/A+ section 2.3.1
                // https://promisesaplus.com/#point-48

                if (returned === deferred.promise()) {
                  throw new TypeError("Thenable self-resolution");
                } // Support: Promises/A+ sections 2.3.3.1, 3.5
                // https://promisesaplus.com/#point-54
                // https://promisesaplus.com/#point-75
                // Retrieve `then` only once


                then = returned && ( // Support: Promises/A+ section 2.3.4
                // https://promisesaplus.com/#point-64
                // Only check objects and functions for thenability
                _typeof(returned) === "object" || typeof returned === "function") && returned.then; // Handle a returned thenable

                if (isFunction(then)) {
                  // Special processors (notify) just wait for resolution
                  if (special) {
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)); // Normal processors (resolve) also hook into progress
                  } else {
                    // ...and disregard older resolution values
                    maxDepth++;
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                  } // Handle all other returned values

                } else {
                  // Only substitute handlers pass on context
                  // and multiple values (non-spec behavior)
                  if (handler !== Identity) {
                    that = undefined;
                    args = [returned];
                  } // Process the value(s)
                  // Default process is resolve


                  (special || deferred.resolveWith)(that, args);
                }
              },
                  // Only normal processors (resolve) catch and reject exceptions
              process = special ? mightThrow : function () {
                try {
                  mightThrow();
                } catch (e) {
                  if (jQuery.Deferred.exceptionHook) {
                    jQuery.Deferred.exceptionHook(e, process.stackTrace);
                  } // Support: Promises/A+ section 2.3.3.3.4.1
                  // https://promisesaplus.com/#point-61
                  // Ignore post-resolution exceptions


                  if (depth + 1 >= maxDepth) {
                    // Only substitute handlers pass on context
                    // and multiple values (non-spec behavior)
                    if (handler !== Thrower) {
                      that = undefined;
                      args = [e];
                    }

                    deferred.rejectWith(that, args);
                  }
                }
              }; // Support: Promises/A+ section 2.3.3.3.1
              // https://promisesaplus.com/#point-57
              // Re-resolve promises immediately to dodge false rejection from
              // subsequent errors


              if (depth) {
                process();
              } else {
                // Call an optional hook to record the stack, in case of exception
                // since it's otherwise lost when execution goes async
                if (jQuery.Deferred.getStackHook) {
                  process.stackTrace = jQuery.Deferred.getStackHook();
                }

                window.setTimeout(process);
              }
            };
          }

          return jQuery.Deferred(function (newDefer) {
            // progress_handlers.add( ... )
            tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)); // fulfilled_handlers.add( ... )

            tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity)); // rejected_handlers.add( ... )

            tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function promise(obj) {
          return obj != null ? jQuery.extend(obj, _promise) : _promise;
        }
      },
          deferred = {}; // Add list-specific methods

      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
            stateString = tuple[5]; // promise.progress = list.add
        // promise.done = list.add
        // promise.fail = list.add

        _promise[tuple[1]] = list.add; // Handle state

        if (stateString) {
          list.add(function () {
            // state = "resolved" (i.e., fulfilled)
            // state = "rejected"
            _state = stateString;
          }, // rejected_callbacks.disable
          // fulfilled_callbacks.disable
          tuples[3 - i][2].disable, // rejected_handlers.disable
          // fulfilled_handlers.disable
          tuples[3 - i][3].disable, // progress_callbacks.lock
          tuples[0][2].lock, // progress_handlers.lock
          tuples[0][3].lock);
        } // progress_handlers.fire
        // fulfilled_handlers.fire
        // rejected_handlers.fire


        list.add(tuple[3].fire); // deferred.notify = function() { deferred.notifyWith(...) }
        // deferred.resolve = function() { deferred.resolveWith(...) }
        // deferred.reject = function() { deferred.rejectWith(...) }

        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this;
        }; // deferred.notifyWith = list.fireWith
        // deferred.resolveWith = list.fireWith
        // deferred.rejectWith = list.fireWith


        deferred[tuple[0] + "With"] = list.fireWith;
      }); // Make the deferred a promise

      _promise.promise(deferred); // Call given func if any


      if (func) {
        func.call(deferred, deferred);
      } // All done!


      return deferred;
    },
    // Deferred helper
    when: function when(singleValue) {
      var // count of uncompleted subordinates
      remaining = arguments.length,
          // count of unprocessed arguments
      i = remaining,
          // subordinate fulfillment data
      resolveContexts = Array(i),
          resolveValues = _slice.call(arguments),
          // the master Deferred
      master = jQuery.Deferred(),
          // subordinate callback factory
      updateFunc = function updateFunc(i) {
        return function (value) {
          resolveContexts[i] = this;
          resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;

          if (! --remaining) {
            master.resolveWith(resolveContexts, resolveValues);
          }
        };
      }; // Single- and empty arguments are adopted like Promise.resolve


      if (remaining <= 1) {
        adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining); // Use .then() to unwrap secondary thenables (cf. gh-3000)

        if (master.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
          return master.then();
        }
      } // Multiple arguments are aggregated like Promise.all array elements


      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), master.reject);
      }

      return master.promise();
    }
  }); // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.

  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  jQuery.Deferred.exceptionHook = function (error, stack) {
    // Support: IE 8 - 9 only
    // Console exists when dev tools are open, which can happen at any time
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }
  };

  jQuery.readyException = function (error) {
    window.setTimeout(function () {
      throw error;
    });
  }; // The deferred used on DOM ready


  var readyList = jQuery.Deferred();

  jQuery.fn.ready = function (fn) {
    readyList.then(fn) // Wrap jQuery.readyException in a function so that the lookup
    // happens at the time of error handling instead of callback
    // registration.
    .catch(function (error) {
      jQuery.readyException(error);
    });
    return this;
  };

  jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,
    // Handle when the DOM is ready
    ready: function ready(wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      } // Remember that the DOM is ready


      jQuery.isReady = true; // If a normal DOM Ready event fired, decrement, and wait if need be

      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      } // If there are functions bound, to execute


      readyList.resolveWith(document, [jQuery]);
    }
  });
  jQuery.ready.then = readyList.then; // The ready event handler and self cleanup method

  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  } // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon


  if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(jQuery.ready);
  } else {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed); // A fallback to window.onload, that will always work

    window.addEventListener("load", completed);
  } // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function


  var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null; // Sets many values

    if (toType(key) === "object") {
      chainable = true;

      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      } // Sets one value

    } else if (value !== undefined) {
      chainable = true;

      if (!isFunction(value)) {
        raw = true;
      }

      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null; // ...except when executing function values
        } else {
          bulk = fn;

          fn = function fn(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }

    if (chainable) {
      return elems;
    } // Gets


    if (bulk) {
      return fn.call(elems);
    }

    return len ? fn(elems[0], key) : emptyGet;
  }; // Matches dashed string for camelizing


  var rmsPrefix = /^-ms-/,
      rdashAlpha = /-([a-z])/g; // Used by camelCase as callback to replace()

  function fcamelCase(all, letter) {
    return letter.toUpperCase();
  } // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (#9572)


  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  }

  var acceptData = function acceptData(owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };

  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;
  Data.prototype = {
    cache: function cache(owner) {
      // Check if the owner object already has a cache
      var value = owner[this.expando]; // If not, create one

      if (!value) {
        value = {}; // We can accept data for non-element nodes in modern browsers,
        // but we should not, see #8335.
        // Always return an empty object.

        if (acceptData(owner)) {
          // If it is a node unlikely to be stringify-ed or looped over
          // use plain assignment
          if (owner.nodeType) {
            owner[this.expando] = value; // Otherwise secure it in a non-enumerable property
            // configurable must be true to allow the property to be
            // deleted when data is removed
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }

      return value;
    },
    set: function set(owner, data, value) {
      var prop,
          cache = this.cache(owner); // Handle: [ owner, key, value ] args
      // Always use camelCase key (gh-2257)

      if (typeof data === "string") {
        cache[camelCase(data)] = value; // Handle: [ owner, { properties } ] args
      } else {
        // Copy the properties one-by-one to the cache object
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }

      return cache;
    },
    get: function get(owner, key) {
      return key === undefined ? this.cache(owner) : // Always use camelCase key (gh-2257)
      owner[this.expando] && owner[this.expando][camelCase(key)];
    },
    access: function access(owner, key, value) {
      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined || key && typeof key === "string" && value === undefined) {
        return this.get(owner, key);
      } // When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //


      this.set(owner, key, value); // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]

      return value !== undefined ? value : key;
    },
    remove: function remove(owner, key) {
      var i,
          cache = owner[this.expando];

      if (cache === undefined) {
        return;
      }

      if (key !== undefined) {
        // Support array or space separated string of keys
        if (Array.isArray(key)) {
          // If key is an array of keys...
          // We always set camelCase keys, so remove that.
          key = key.map(camelCase);
        } else {
          key = camelCase(key); // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace

          key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
        }

        i = key.length;

        while (i--) {
          delete cache[key[i]];
        }
      } // Remove the expando if there's no more data


      if (key === undefined || jQuery.isEmptyObject(cache)) {
        // Support: Chrome <=35 - 45
        // Webkit & Blink performance suffers when deleting properties
        // from DOM nodes, so set to undefined instead
        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function hasData(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data(); //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;

  function getData(data) {
    if (data === "true") {
      return true;
    }

    if (data === "false") {
      return false;
    }

    if (data === "null") {
      return null;
    } // Only convert to a number if it doesn't change the string


    if (data === +data + "") {
      return +data;
    }

    if (rbrace.test(data)) {
      return JSON.parse(data);
    }

    return data;
  }

  function dataAttr(elem, key, data) {
    var name; // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute

    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);

      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {} // Make sure we set the data so it isn't changed later


        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }

    return data;
  }

  jQuery.extend({
    hasData: function hasData(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function data(elem, name, _data) {
      return dataUser.access(elem, name, _data);
    },
    removeData: function removeData(elem, name) {
      dataUser.remove(elem, name);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function _data(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function _removeData(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function data(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes; // Gets all values

      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);

          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;

            while (i--) {
              // Support: IE 11 only
              // The attrs elements can be null (#14894)
              if (attrs[i]) {
                name = attrs[i].name;

                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }

            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }

        return data;
      } // Sets multiple values


      if (_typeof(key) === "object") {
        return this.each(function () {
          dataUser.set(this, key);
        });
      }

      return access(this, function (value) {
        var data; // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.

        if (elem && value === undefined) {
          // Attempt to get data from the cache
          // The key will always be camelCased in Data
          data = dataUser.get(elem, key);

          if (data !== undefined) {
            return data;
          } // Attempt to "discover" the data in
          // HTML5 custom data-* attrs


          data = dataAttr(elem, key);

          if (data !== undefined) {
            return data;
          } // We tried really hard, but the data doesn't exist.


          return;
        } // Set the data...


        this.each(function () {
          // We always store the camelCased key
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function removeData(key) {
      return this.each(function () {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function queue(elem, type, data) {
      var queue;

      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type); // Speed up dequeue by getting out quickly if this is just a lookup

        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }

        return queue || [];
      }
    },
    dequeue: function dequeue(elem, type) {
      type = type || "fx";

      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function next() {
        jQuery.dequeue(elem, type);
      }; // If the fx queue is dequeued, always remove the progress sentinel


      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }

      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        } // Clear up the last queue stop function


        delete hooks.stop;
        fn.call(elem, next, hooks);
      }

      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function _queueHooks(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function () {
          dataPriv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function queue(type, data) {
      var setter = 2;

      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }

      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }

      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data); // Ensure a hooks for this queue

        jQuery._queueHooks(this, type);

        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function dequeue(type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function clearQueue(type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function promise(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function resolve() {
        if (! --count) {
          defer.resolveWith(elements, [elements]);
        }
      };

      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }

      type = type || "fx";

      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");

        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }

      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];

  var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {
    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem; // Inline style trumps all

    return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
    // Support: Firefox <=43 - 45
    // Disconnected elements can have computed display: none, so first confirm that elem is
    // in the document.
    jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
  };

  var swap = function swap(elem, options, callback, args) {
    var ret,
        name,
        old = {}; // Remember the old values, and insert the new ones

    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }

    ret = callback.apply(elem, args || []); // Revert the old values

    for (name in options) {
      elem.style[name] = old[name];
    }

    return ret;
  };

  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale,
        maxIterations = 20,
        currentValue = tween ? function () {
      return tween.cur();
    } : function () {
      return jQuery.css(elem, prop, "");
    },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        // Starting value computation is required for potential unit mismatches
    initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

    if (initialInUnit && initialInUnit[3] !== unit) {
      // Support: Firefox <=54
      // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
      initial = initial / 2; // Trust units reported by jQuery.css

      unit = unit || initialInUnit[3]; // Iteratively approximate from a nonzero starting point

      initialInUnit = +initial || 1;

      while (maxIterations--) {
        // Evaluate and update our best guess (doubling guesses that zero out).
        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
        jQuery.style(elem, prop, initialInUnit + unit);

        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }

        initialInUnit = initialInUnit / scale;
      }

      initialInUnit = initialInUnit * 2;
      jQuery.style(elem, prop, initialInUnit + unit); // Make sure we update the tween properties later on

      valueParts = valueParts || [];
    }

    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0; // Apply relative offset (+=/-=) if specified

      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];

      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }

    return adjusted;
  }

  var defaultDisplayMap = {};

  function getDefaultDisplay(elem) {
    var temp,
        doc = elem.ownerDocument,
        nodeName = elem.nodeName,
        display = defaultDisplayMap[nodeName];

    if (display) {
      return display;
    }

    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");
    temp.parentNode.removeChild(temp);

    if (display === "none") {
      display = "block";
    }

    defaultDisplayMap[nodeName] = display;
    return display;
  }

  function showHide(elements, show) {
    var display,
        elem,
        values = [],
        index = 0,
        length = elements.length; // Determine new display value for elements that need to change

    for (; index < length; index++) {
      elem = elements[index];

      if (!elem.style) {
        continue;
      }

      display = elem.style.display;

      if (show) {
        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
        // check is required in this first loop unless we have a nonempty display value (either
        // inline or about-to-be-restored)
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;

          if (!values[index]) {
            elem.style.display = "";
          }
        }

        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none"; // Remember what we're overwriting

          dataPriv.set(elem, "display", display);
        }
      }
    } // Set the display of the elements in a second loop to avoid constant reflow


    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }

    return elements;
  }

  jQuery.fn.extend({
    show: function show() {
      return showHide(this, true);
    },
    hide: function hide() {
      return showHide(this);
    },
    toggle: function toggle(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }

      return this.each(function () {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i; // We have to close these tags to support XHTML (#13200)

  var wrapMap = {
    // Support: IE <=9 only
    option: [1, "<select multiple='multiple'>", "</select>"],
    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  }; // Support: IE <=9 only

  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;

  function getAll(context, tag) {
    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (#15151)
    var ret;

    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");
    } else {
      ret = [];
    }

    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }

    return ret;
  } // Mark scripts as having already been evaluated


  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;

    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }

  var rhtml = /<|&#?\w+;/;

  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;

    for (; i < l; i++) {
      elem = elems[i];

      if (elem || elem === 0) {
        // Add nodes directly
        if (toType(elem) === "object") {
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem); // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div")); // Deserialize a standard representation

          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2]; // Descend through wrappers to the right content

          j = wrap[0];

          while (j--) {
            tmp = tmp.lastChild;
          } // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit


          jQuery.merge(nodes, tmp.childNodes); // Remember the top-level container

          tmp = fragment.firstChild; // Ensure the created nodes are orphaned (#12392)

          tmp.textContent = "";
        }
      }
    } // Remove wrapper from fragment


    fragment.textContent = "";
    i = 0;

    while (elem = nodes[i++]) {
      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }

        continue;
      }

      contains = jQuery.contains(elem.ownerDocument, elem); // Append to fragment

      tmp = getAll(fragment.appendChild(elem), "script"); // Preserve script evaluation history

      if (contains) {
        setGlobalEval(tmp);
      } // Capture executables


      if (scripts) {
        j = 0;

        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }

    return fragment;
  }

  (function () {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input"); // Support: Android 4.0 - 4.3 only
    // Check state lost if the name is set (#11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)

    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input); // Support: Android <=4.1 only
    // Older WebKit doesn't clone checked state correctly in fragments

    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE <=11 only
    // Make sure textarea (and checkbox) defaultValue is properly cloned

    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();

  var documentElement = document.documentElement;
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
    return true;
  }

  function returnFalse() {
    return false;
  } // Support: IE <=9 only
  // See #13393 for more info


  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  function _on(elem, types, selector, data, fn, one) {
    var origFn, type; // Types can be a map of types/handlers

    if (_typeof(types) === "object") {
      // ( types-Object, selector, data )
      if (typeof selector !== "string") {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }

      for (type in types) {
        _on(elem, type, selector, data, types[type], one);
      }

      return elem;
    }

    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }

    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }

    if (one === 1) {
      origFn = fn;

      fn = function fn(event) {
        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      }; // Use same guid so caller can remove using origFn


      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }

    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */


  jQuery.event = {
    global: {},
    add: function add(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem); // Don't attach events to noData or text/comment nodes (but allow plain objects)

      if (!elemData) {
        return;
      } // Caller can pass in an object of custom data in lieu of the handler


      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      } // Ensure that invalid selectors throw exceptions at attach time
      // Evaluate against documentElement in case elem is a non-element node (e.g., document)


      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      } // Make sure that the handler has a unique ID, used to find/remove it later


      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      } // Init the element's event structure and main handler, if this is the first


      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }

      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      } // Handle multiple events separated by a space


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers

        if (!type) {
          continue;
        } // If event changes its type, use the special event handlers for the changed type


        special = jQuery.event.special[type] || {}; // If selector defined, determine special event api type, otherwise given type

        type = (selector ? special.delegateType : special.bindType) || type; // Update special based on newly reset type

        special = jQuery.event.special[type] || {}; // handleObj is passed to all event handlers

        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn); // Init the event handler queue if we're the first

        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0; // Only use addEventListener if the special events handler returns false

          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj);

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        } // Add to the element's handler list, delegates in front


        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        } // Keep track of which events have ever been used, for event optimization


        jQuery.event.global[type] = true;
      }
    },
    // Detach an event or set of events from an element
    remove: function remove(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

      if (!elemData || !(events = elemData.events)) {
        return;
      } // Once for each type.namespace in types; type may be omitted


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element

        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }

          continue;
        }

        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"); // Remove matching events

        origCount = j = handlers.length;

        while (j--) {
          handleObj = handlers[j];

          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);

            if (handleObj.selector) {
              handlers.delegateCount--;
            }

            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        } // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)


        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }

          delete events[type];
        }
      } // Remove data and the expando if it's no longer used


      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function dispatch(nativeEvent) {
      // Make a writable jQuery.Event from the native event object
      var event = jQuery.event.fix(nativeEvent);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue,
          args = new Array(arguments.length),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {}; // Use the fix-ed jQuery.Event rather than the (read-only) native event

      args[0] = event;

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      event.delegateTarget = this; // Call the preDispatch hook for the mapped type, and let it bail if desired

      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      } // Determine handlers


      handlerQueue = jQuery.event.handlers.call(this, event, handlers); // Run delegates first; they may want to stop propagation beneath us

      i = 0;

      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;

        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          // Triggered event must either 1) have no namespace, or 2) have namespace(s)
          // a subset or equal to those in the bound event (both can have no namespace).
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      } // Call the postDispatch hook for the mapped type


      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }

      return event.result;
    },
    handlers: function handlers(event, _handlers) {
      var i,
          handleObj,
          sel,
          matchedHandlers,
          matchedSelectors,
          handlerQueue = [],
          delegateCount = _handlers.delegateCount,
          cur = event.target; // Find delegate handlers

      if (delegateCount && // Support: IE <=9
      // Black-hole SVG <use> instance trees (trac-13180)
      cur.nodeType && // Support: Firefox <=42
      // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
      // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
      // Support: IE 11 only
      // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
      !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          // Don't check non-elements (#13208)
          // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};

            for (i = 0; i < delegateCount; i++) {
              handleObj = _handlers[i]; // Don't conflict with Object.prototype properties (#13203)

              sel = handleObj.selector + " ";

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }

              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }

            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              });
            }
          }
        }
      } // Add the remaining (directly-bound) handlers


      cur = this;

      if (delegateCount < _handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: _handlers.slice(delegateCount)
        });
      }

      return handlerQueue;
    },
    addProp: function addProp(name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function () {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function () {
          if (this.originalEvent) {
            return this.originalEvent[name];
          }
        },
        set: function set(value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        }
      });
    },
    fix: function fix(originalEvent) {
      return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      focus: {
        // Fire native event if possible so blur/focus sequence is correct
        trigger: function trigger() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function trigger() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        // For checkbox, fire native event so checked state will be right
        trigger: function trigger() {
          if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        // For cross-browser consistency, don't fire native .click() on links
        _default: function _default(event) {
          return nodeName(event.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    }
  };

  jQuery.removeEvent = function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };

  jQuery.Event = function (src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    } // Event object


    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type; // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.

      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: Android <=2.3 only
      src.returnValue === false ? returnTrue : returnFalse; // Create target properties
      // Support: Safari <=6 - 7 only
      // Target should not be a text node (#504, #13143)

      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget; // Event type
    } else {
      this.type = src;
    } // Put explicitly provided properties onto the event object


    if (props) {
      jQuery.extend(this, props);
    } // Create a timestamp if incoming event doesn't have one


    this.timeStamp = src && src.timeStamp || Date.now(); // Mark it as fixed

    this[jQuery.expando] = true;
  }; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html


  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;

      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }

      this.stopPropagation();
    }
  }; // Includes all common event props including KeyEvent and MouseEvent specific props

  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: function which(event) {
      var button = event.button; // Add which for key events

      if (event.which == null && rkeyEvent.test(event.type)) {
        return event.charCode != null ? event.charCode : event.keyCode;
      } // Add which for click: 1 === left; 2 === middle; 3 === right


      if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
        if (button & 1) {
          return 1;
        }

        if (button & 2) {
          return 3;
        }

        if (button & 4) {
          return 2;
        }

        return 0;
      }

      return event.which;
    }
  }, jQuery.event.addProp); // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).

  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function handle(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj; // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window

        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }

        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function on(types, selector, data, fn) {
      return _on(this, types, selector, data, fn);
    },
    one: function one(types, selector, data, fn) {
      return _on(this, types, selector, data, fn, 1);
    },
    off: function off(types, selector, fn) {
      var handleObj, type;

      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }

      if (_typeof(types) === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }

        return this;
      }

      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }

      if (fn === false) {
        fn = returnFalse;
      }

      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var
  /* eslint-disable max-len */
  // See https://github.com/eslint/eslint/issues/3229
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

  /* eslint-enable */
  // Support: IE <=10 - 11, Edge 12 - 13 only
  // In IE/Edge using regex groups here causes severe slowdowns.
  // See https://connect.microsoft.com/IE/feedback/details/1736512/
  rnoInnerhtml = /<script|<style|<link/i,
      // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; // Prefer a tbody over its parent table for containing new rows

  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return jQuery(elem).children("tbody")[0] || elem;
    }

    return elem;
  } // Replace/restore the type attribute of script elements for safe DOM manipulation


  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }

  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute("type");
    }

    return elem;
  }

  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

    if (dest.nodeType !== 1) {
      return;
    } // 1. Copy private data: events, handlers, etc.


    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;

      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};

        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    } // 2. Copy user data


    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  } // Fix IE bugs, see support tests


  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.

    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked; // Fails to return the selected option to the default selected state when cloning options
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }

  function domManip(collection, args, callback, ignored) {
    // Flatten any nested arrays
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        valueIsFunction = isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit

    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function (index) {
        var self = collection.eq(index);

        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }

        domManip(self, args, callback, ignored);
      });
    }

    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;

      if (fragment.childNodes.length === 1) {
        fragment = first;
      } // Require either new content or an interest in ignored elements to invoke the callback


      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length; // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).

        for (; i < l; i++) {
          node = fragment;

          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true); // Keep references to cloned scripts for later restoration

            if (hasScripts) {
              // Support: Android <=4.0 only, PhantomJS 1 only
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }

          callback.call(collection[i], node, i);
        }

        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument; // Reenable scripts

          jQuery.map(scripts, restoreScript); // Evaluate executable scripts on first document insertion

          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];

            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src && (node.type || "").toLowerCase() !== "module") {
                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), doc, node);
              }
            }
          }
        }
      }
    }

    return collection;
  }

  function _remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;

    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }

      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }

        node.parentNode.removeChild(node);
      }
    }

    return elem;
  }

  jQuery.extend({
    htmlPrefilter: function htmlPrefilter(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem); // Fix IE cloning issues

      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);

        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      } // Copy the events from the original to the clone


      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);

          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      } // Preserve script evaluation history


      destElements = getAll(clone, "script");

      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      } // Return the cloned set


      return clone;
    },
    cleanData: function cleanData(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;

      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if (data = elem[dataPriv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type); // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            } // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove


            elem[dataPriv.expando] = undefined;
          }

          if (elem[dataUser.expando]) {
            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    detach: function detach(selector) {
      return _remove(this, selector, true);
    },
    remove: function remove(selector) {
      return _remove(this, selector);
    },
    text: function text(value) {
      return access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function () {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function append() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function prepend() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function before() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function after() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function empty() {
      var elem,
          i = 0;

      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false)); // Remove any remaining nodes

          elem.textContent = "";
        }
      }

      return this;
    },
    clone: function clone(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function html(value) {
      return access(this, function (value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;

        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        } // See if we can take a shortcut and just use innerHTML


        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);

          try {
            for (; i < l; i++) {
              elem = this[i] || {}; // Remove element nodes and prevent memory leaks

              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }

            elem = 0; // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }

        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function replaceWith() {
      var ignored = []; // Make the changes, replacing each non-ignored context element with the new content

      return domManip(this, arguments, function (elem) {
        var parent = this.parentNode;

        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));

          if (parent) {
            parent.replaceChild(elem, this);
          }
        } // Force callback invocation

      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;

      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems); // Support: Android <=4.0 only, PhantomJS 1 only
        // .get() because push.apply(_, arraylike) throws on ancient WebKit

        push.apply(ret, elems.get());
      }

      return this.pushStack(ret);
    };
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

  var getStyles = function getStyles(elem) {
    // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    return view.getComputedStyle(elem);
  };

  var rboxStyle = new RegExp(cssExpand.join("|"), "i");

  (function () {
    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computeStyleTests() {
      // This is a singleton, we need to execute it only once
      if (!div) {
        return;
      }

      container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
      div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%"; // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44

      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12; // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
      // Some styles come back with percentage values, even though they shouldn't

      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36; // Support: IE 9 - 11 only
      // Detect misreporting of content dimensions for box-sizing:border-box elements

      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36; // Support: IE 9 only
      // Detect overflow:scroll screwiness (gh-3699)

      div.style.position = "absolute";
      scrollboxSizeVal = div.offsetWidth === 36 || "absolute";
      documentElement.removeChild(container); // Nullify the div so it wouldn't be stored in the memory and
      // it will also be a sign that checks already performed

      div = null;
    }

    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }

    var pixelPositionVal,
        boxSizingReliableVal,
        scrollboxSizeVal,
        pixelBoxStylesVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div"); // Finish early in limited (non-browser) environments

    if (!div.style) {
      return;
    } // Support: IE <=9 - 11 only
    // Style of cloned element affects source element cloned (#8908)


    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    jQuery.extend(support, {
      boxSizingReliable: function boxSizingReliable() {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles: function pixelBoxStyles() {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition: function pixelPosition() {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize: function scrollboxSize() {
        computeStyleTests();
        return scrollboxSizeVal;
      }
    });
  })();

  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        // Support: Firefox 51+
    // Retrieving style before computed somehow
    // fixes an issue with getting wrong values
    // on detached elements
    style = elem.style;
    computed = computed || getStyles(elem); // getPropertyValue is needed for:
    //   .css('filter') (IE 9 only, #12537)
    //   .css('--customProperty) (#3144)

    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];

      if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      } // A tribute to the "awesome hack by Dean Edwards"
      // Android Browser returns percentage for some values,
      // but width seems to be reliably pixels.
      // This is against the CSSOM draft spec:
      // https://drafts.csswg.org/cssom/#resolved-values


      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth; // Put in the new values to get a computed value out

        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width; // Revert the changed values

        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    return ret !== undefined ? // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
    ret + "" : ret;
  }

  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function get() {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        } // Hook needed; redefine it so that the support test is not executed again.


        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }

  var // Swappable if display is none or starts with table
  // except "table", "table-cell", or "table-caption"
  // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      rcustomProp = /^--/,
      cssShow = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  },
      cssPrefixes = ["Webkit", "Moz", "ms"],
      emptyStyle = document.createElement("div").style; // Return a css property mapped to a potentially vendor prefixed property

  function vendorPropName(name) {
    // Shortcut for names that are not vendor prefixed
    if (name in emptyStyle) {
      return name;
    } // Check for vendor prefixed names


    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;

    while (i--) {
      name = cssPrefixes[i] + capName;

      if (name in emptyStyle) {
        return name;
      }
    }
  } // Return a property mapped along what jQuery.cssProps suggests or to
  // a vendor prefixed property.


  function finalPropName(name) {
    var ret = jQuery.cssProps[name];

    if (!ret) {
      ret = jQuery.cssProps[name] = vendorPropName(name) || name;
    }

    return ret;
  }

  function setPositiveNumber(elem, value, subtract) {
    // Any relative (+/-) values have already been
    // normalized at this point
    var matches = rcssNum.exec(value);
    return matches ? // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }

  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0,
        extra = 0,
        delta = 0; // Adjustment may not be necessary

    if (box === (isBorderBox ? "border" : "content")) {
      return 0;
    }

    for (; i < 4; i += 2) {
      // Both box models exclude margin
      if (box === "margin") {
        delta += jQuery.css(elem, box + cssExpand[i], true, styles);
      } // If we get here with a content-box, we're seeking "padding" or "border" or "margin"


      if (!isBorderBox) {
        // Add padding
        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles); // For "border" or "margin", add border

        if (box !== "padding") {
          delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles); // But still keep track of it otherwise
        } else {
          extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        } // If we get here with a border-box (content + padding + border), we're seeking "content" or
        // "padding" or "margin"

      } else {
        // For "content", subtract padding
        if (box === "content") {
          delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        } // For "content" or "padding", subtract border


        if (box !== "margin") {
          delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    } // Account for positive content-box scroll gutter when requested by providing computedVal


    if (!isBorderBox && computedVal >= 0) {
      // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
      // Assuming integer scroll gutter, subtract the rest and round down
      delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5));
    }

    return delta;
  }

  function getWidthOrHeight(elem, dimension, extra) {
    // Start with computed style
    var styles = getStyles(elem),
        val = curCSS(elem, dimension, styles),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box",
        valueIsBorderBox = isBorderBox; // Support: Firefox <=54
    // Return a confounding non-pixel value or feign ignorance, as appropriate.

    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }

      val = "auto";
    } // Check for style in case a browser which returns unreliable values
    // for getComputedStyle silently falls back to the reliable elem.style


    valueIsBorderBox = valueIsBorderBox && (support.boxSizingReliable() || val === elem.style[dimension]); // Fall back to offsetWidth/offsetHeight when value is "auto"
    // This happens for inline elements with no explicit setting (gh-3571)
    // Support: Android <=4.1 - 4.3 only
    // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)

    if (val === "auto" || !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") {
      val = elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)]; // offsetWidth/offsetHeight provide border-box values

      valueIsBorderBox = true;
    } // Normalize "" and auto


    val = parseFloat(val) || 0; // Adjust for the element's box model

    return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, // Provide the current computed size to request scroll gutter calculation (gh-3589)
    val) + "px";
  }

  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function get(elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},
    // Get and set the style property on a DOM Node
    style: function style(elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      } // Make sure that we're working with the right name


      var ret,
          type,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name),
          style = elem.style; // Make sure that we're working with the right name. We don't
      // want to query the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Gets hook for the prefixed version, then unprefixed version


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // Check if we're setting a value

      if (value !== undefined) {
        type = _typeof(value); // Convert "+=" or "-=" to relative numbers (#7345)

        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret); // Fixes bug #9237

          type = "number";
        } // Make sure that null and NaN values aren't set (#7116)


        if (value == null || value !== value) {
          return;
        } // If a number was passed in, add the unit (except for certain CSS properties)


        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        } // background-* props affect original clone's values


        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        } // If a hook was provided, use that value, otherwise just set the specified value


        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        } // Otherwise just get the value from the style object


        return style[name];
      }
    },
    css: function css(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name); // Make sure that we're working with the right name. We don't
      // want to modify the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Try prefixed name followed by the unprefixed name


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there

      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      } // Otherwise, if a way to get the computed value exists, use that


      if (val === undefined) {
        val = curCSS(elem, name, styles);
      } // Convert "normal" to computed value


      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      } // Make numeric if forced or a qualifier was provided and val looks numeric


      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }

      return val;
    }
  });
  jQuery.each(["height", "width"], function (i, dimension) {
    jQuery.cssHooks[dimension] = {
      get: function get(elem, computed, extra) {
        if (computed) {
          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, "display")) && ( // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, dimension, extra);
          }) : getWidthOrHeight(elem, dimension, extra);
        }
      },
      set: function set(elem, value, extra) {
        var matches,
            styles = getStyles(elem),
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box",
            subtract = extra && boxModelAdjustment(elem, dimension, extra, isBorderBox, styles); // Account for unreliable border-box dimensions by comparing offset* to computed and
        // faking a content-box to get border and padding (gh-3699)

        if (isBorderBox && support.scrollboxSize() === styles.position) {
          subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
        } // Convert to pixels if value adjustment is needed


        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension);
        }

        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
        marginLeft: 0
      }, function () {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  }); // These hooks are used by animate to expand properties

  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function expand(value) {
        var i = 0,
            expanded = {},
            // Assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [value];

        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }

        return expanded;
      }
    };

    if (prefix !== "margin") {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function css(name, value) {
      return access(this, function (elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;

        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;

          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }

          return map;
        }

        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    }
  });

  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }

  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function init(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function cur() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function run(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];

      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }

      this.now = (this.end - this.start) * eased + this.start;

      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }

      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }

      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function get(tween) {
        var result; // Use a property on the element directly when it is not a DOM element,
        // or when there is no matching style property that exists.

        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        } // Passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails.
        // Simple values such as "10px" are parsed to Float;
        // complex values such as "rotate(1rad)" are returned as-is.


        result = jQuery.css(tween.elem, tween.prop, ""); // Empty strings, null, undefined and "auto" are converted to 0.

        return !result || result === "auto" ? 0 : result;
      },
      set: function set(tween) {
        // Use step hook for back compat.
        // Use cssHook if its there.
        // Use .style if available and use plain properties where available.
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  }; // Support: IE <=9 only
  // Panic based approach to setting things on disconnected nodes

  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function set(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear: function linear(p) {
      return p;
    },
    swing: function swing(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init; // Back compat <1.8 extension point

  jQuery.fx.step = {};
  var fxNow,
      inProgress,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;

  function schedule() {
    if (inProgress) {
      if (document.hidden === false && window.requestAnimationFrame) {
        window.requestAnimationFrame(schedule);
      } else {
        window.setTimeout(schedule, jQuery.fx.interval);
      }

      jQuery.fx.tick();
    }
  } // Animations created synchronously will run synchronously


  function createFxNow() {
    window.setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = Date.now();
  } // Generate parameters to create a standard animation


  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {
      height: type
    }; // If we include width, step value is 1 to do all cssExpand values,
    // otherwise step value is 2 to skip over Left and Right

    includeWidth = includeWidth ? 1 : 0;

    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }

    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }

    return attrs;
  }

  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;

    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        // We're done with this property
        return tween;
      }
    }
  }

  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        hooks,
        oldfire,
        propTween,
        restoreDisplay,
        display,
        isBox = "width" in props || "height" in props,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHiddenWithinTree(elem),
        dataShow = dataPriv.get(elem, "fxshow"); // Queue-skipping animations hijack the fx hooks

    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");

      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;

        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }

      hooks.unqueued++;
      anim.always(function () {
        // Ensure the complete handler is called before this completes
        anim.always(function () {
          hooks.unqueued--;

          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    } // Detect show/hide animations


    for (prop in props) {
      value = props[prop];

      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";

        if (value === (hidden ? "hide" : "show")) {
          // Pretend to be hidden if this is a "show" and
          // there is still data from a stopped show/hide
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true; // Ignore all other no-op show/hide data
          } else {
            continue;
          }
        }

        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    } // Bail out if this is a no-op like .hide().hide()


    propTween = !jQuery.isEmptyObject(props);

    if (!propTween && jQuery.isEmptyObject(orig)) {
      return;
    } // Restrict "overflow" and "display" styles during box animations


    if (isBox && elem.nodeType === 1) {
      // Support: IE <=9 - 11, Edge 12 - 15
      // Record all 3 overflow attributes because IE does not infer the shorthand
      // from identically-valued overflowX and overflowY and Edge just mirrors
      // the overflowX value there.
      opts.overflow = [style.overflow, style.overflowX, style.overflowY]; // Identify a display type, preferring old show/hide data over the CSS cascade

      restoreDisplay = dataShow && dataShow.display;

      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display");
      }

      display = jQuery.css(elem, "display");

      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {
          // Get nonempty value(s) by temporarily forcing visibility
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, "display");
          showHide([elem]);
        }
      } // Animate inline elements as inline-block


      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery.css(elem, "float") === "none") {
          // Restore the original display value at the end of pure show/hide animations
          if (!propTween) {
            anim.done(function () {
              style.display = restoreDisplay;
            });

            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display;
            }
          }

          style.display = "inline-block";
        }
      }
    }

    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    } // Implement show/hide animations


    propTween = false;

    for (prop in orig) {
      // General show/hide setup for this element animation
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", {
            display: restoreDisplay
          });
        } // Store hidden/visible for toggle so `.stop().toggle()` "reverses"


        if (toggle) {
          dataShow.hidden = !hidden;
        } // Show elements before animating them


        if (hidden) {
          showHide([elem], true);
        }
        /* eslint-disable no-loop-func */


        anim.done(function () {
          /* eslint-enable no-loop-func */
          // The final step of a "hide" animation is actually hiding the element
          if (!hidden) {
            showHide([elem]);
          }

          dataPriv.remove(elem, "fxshow");

          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
      } // Per-property setup


      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;

        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }

  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks; // camelCase, specialEasing and expand cssHook pass

    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];

      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }

      if (index !== name) {
        props[name] = value;
        delete props[index];
      }

      hooks = jQuery.cssHooks[name];

      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name]; // Not quite $.extend, this won't overwrite existing keys.
        // Reusing 'index' because we have the correct "name"

        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }

  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function () {
      // Don't match elem in the :animated selector
      delete tick.elem;
    }),
        tick = function tick() {
      if (stopped) {
        return false;
      }

      var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
          // Support: Android 2.3 only
      // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
      temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;

      for (; index < length; index++) {
        animation.tweens[index].run(percent);
      }

      deferred.notifyWith(elem, [animation, percent, remaining]); // If there's more to do, yield

      if (percent < 1 && length) {
        return remaining;
      } // If this was an empty animation, synthesize a final progress notification


      if (!length) {
        deferred.notifyWith(elem, [animation, 1, 0]);
      } // Resolve the animation and report its conclusion


      deferred.resolveWith(elem, [animation]);
      return false;
    },
        animation = deferred.promise({
      elem: elem,
      props: jQuery.extend({}, properties),
      opts: jQuery.extend(true, {
        specialEasing: {},
        easing: jQuery.easing._default
      }, options),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function createTween(prop, end) {
        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        animation.tweens.push(tween);
        return tween;
      },
      stop: function stop(gotoEnd) {
        var index = 0,
            // If we are going to the end, we want to run all the tweens
        // otherwise we skip this part
        length = gotoEnd ? animation.tweens.length : 0;

        if (stopped) {
          return this;
        }

        stopped = true;

        for (; index < length; index++) {
          animation.tweens[index].run(1);
        } // Resolve when we played the last frame; otherwise, reject


        if (gotoEnd) {
          deferred.notifyWith(elem, [animation, 1, 0]);
          deferred.resolveWith(elem, [animation, gotoEnd]);
        } else {
          deferred.rejectWith(elem, [animation, gotoEnd]);
        }

        return this;
      }
    }),
        props = animation.props;

    propFilter(props, animation.opts.specialEasing);

    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);

      if (result) {
        if (isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
        }

        return result;
      }
    }

    jQuery.map(props, createTween, animation);

    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    } // Attach callbacks from options


    animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation;
  }

  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {
      "*": [function (prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]
    },
    tweener: function tweener(props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnothtmlwhite);
      }

      var prop,
          index = 0,
          length = props.length;

      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function prefilter(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });

  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && _typeof(speed) === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing
    }; // Go to the end state if fx are off

    if (jQuery.fx.off) {
      opt.duration = 0;
    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery.fx.speeds) {
          opt.duration = jQuery.fx.speeds[opt.duration];
        } else {
          opt.duration = jQuery.fx.speeds._default;
        }
      }
    } // Normalize opt.queue - true/undefined/null -> "fx"


    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    } // Queueing


    opt.old = opt.complete;

    opt.complete = function () {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }

      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };

    return opt;
  };

  jQuery.fn.extend({
    fadeTo: function fadeTo(speed, to, easing, callback) {
      // Show any hidden elements after setting opacity to 0
      return this.filter(isHiddenWithinTree).css("opacity", 0).show() // Animate to the value specified
      .end().animate({
        opacity: to
      }, speed, easing, callback);
    },
    animate: function animate(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function doAnimation() {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation(this, jQuery.extend({}, prop), optall); // Empty animations, or finishing resolves immediately

        if (empty || dataPriv.get(this, "finish")) {
          anim.stop(true);
        }
      };

      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function stop(type, clearQueue, gotoEnd) {
      var stopQueue = function stopQueue(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };

      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }

      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }

      return this.each(function () {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);

        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }

        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        } // Start the next in the queue if the last step wasn't forced.
        // Timers currently will call their complete callbacks, which
        // will dequeue but only if they were gotoEnd.


        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function finish(type) {
      if (type !== false) {
        type = type || "fx";
      }

      return this.each(function () {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0; // Enable finishing flag on private data

        data.finish = true; // Empty the queue first

        jQuery.queue(this, type, []);

        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        } // Look for any active animations, and finish them


        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        } // Look for any animations in the old queue and finish them


        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        } // Turn off finishing flag


        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function (i, name) {
    var cssFn = jQuery.fn[name];

    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  }); // Generate shortcuts for custom animations

  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];

  jQuery.fx.tick = function () {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = Date.now();

    for (; i < timers.length; i++) {
      timer = timers[i]; // Run the timer and safely remove it when done (allowing for external removal)

      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }

    if (!timers.length) {
      jQuery.fx.stop();
    }

    fxNow = undefined;
  };

  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer);
    jQuery.fx.start();
  };

  jQuery.fx.interval = 13;

  jQuery.fx.start = function () {
    if (inProgress) {
      return;
    }

    inProgress = true;
    schedule();
  };

  jQuery.fx.stop = function () {
    inProgress = null;
  };

  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  }; // Based off of the plugin by Clint Helfers, with permission.
  // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/

  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function (next, hooks) {
      var timeout = window.setTimeout(next, time);

      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };

  (function () {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox"; // Support: Android <=4.3 only
    // Default value for a checkbox should be "on"

    support.checkOn = input.value !== ""; // Support: IE <=11 only
    // Must access selectedIndex to make default options select

    support.optSelected = opt.selected; // Support: IE <=11 only
    // An input loses its value after becoming a radio

    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();

  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function attr(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function removeAttr(name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function attr(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set attributes on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      } // Fallback to prop when attributes are not supported


      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      } // Attribute hooks are determined by the lowercase version
      // Grab necessary hook if one is defined


      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }

      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }

        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        elem.setAttribute(name, value + "");
        return value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      ret = jQuery.find.attr(elem, name); // Non-existent attributes return null, we normalize to undefined

      return ret == null ? undefined : ret;
    },
    attrHooks: {
      type: {
        set: function set(elem, value) {
          if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);

            if (val) {
              elem.value = val;
            }

            return value;
          }
        }
      }
    },
    removeAttr: function removeAttr(elem, value) {
      var name,
          i = 0,
          // Attribute names can contain non-HTML whitespace characters
      // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
      attrNames = value && value.match(rnothtmlwhite);

      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          elem.removeAttribute(name);
        }
      }
    }
  }); // Hooks for boolean attributes

  boolHook = {
    set: function set(elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }

      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;

    attrHandle[name] = function (elem, name, isXML) {
      var ret,
          handle,
          lowercaseName = name.toLowerCase();

      if (!isXML) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }

      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function prop(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function removeProp(name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function prop(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set properties on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }

      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        return elem[name] = value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function get(elem) {
          // Support: IE <=9 - 11 only
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
          // Use proper attribute retrieval(#12072)
          var tabindex = jQuery.find.attr(elem, "tabindex");

          if (tabindex) {
            return parseInt(tabindex, 10);
          }

          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0;
          }

          return -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }); // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop

  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function get(elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }

        return null;
      },
      set: function set(elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent) {
          parent.selectedIndex;

          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }

  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  }); // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace

  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }

  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }

  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || [];
    }

    return [];
  }

  jQuery.fn.extend({
    addClass: function addClass(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    removeClass: function removeClass(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }

      if (!arguments.length) {
        return this.attr("class", "");
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem); // This expression is here for better compressibility (see addClass)

          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              // Remove *all* instances
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    toggleClass: function toggleClass(value, stateVal) {
      var type = _typeof(value),
          isValidValue = type === "string" || Array.isArray(value);

      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }

      if (isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }

      return this.each(function () {
        var className, i, self, classNames;

        if (isValidValue) {
          // Toggle individual class names
          i = 0;
          self = jQuery(this);
          classNames = classesToArray(value);

          while (className = classNames[i++]) {
            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          } // Toggle whole class name

        } else if (value === undefined || type === "boolean") {
          className = getClass(this);

          if (className) {
            // Store className if set
            dataPriv.set(this, "__className__", className);
          } // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.


          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function hasClass(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";

      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }

      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function val(value) {
      var hooks,
          ret,
          valueIsFunction,
          elem = this[0];

      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }

          ret = elem.value; // Handle most common string cases

          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          } // Handle cases where value is null/undef or number


          return ret == null ? "" : ret;
        }

        return;
      }

      valueIsFunction = isFunction(value);
      return this.each(function (i) {
        var val;

        if (this.nodeType !== 1) {
          return;
        }

        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        } // Treat null/undefined as ""; convert numbers to string


        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (Array.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? "" : value + "";
          });
        }

        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting

        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function get(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : // Support: IE <=10 - 11 only
          // option.text throws exceptions (#14686, #14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          stripAndCollapse(jQuery.text(elem));
        }
      },
      select: {
        get: function get(elem) {
          var value,
              option,
              i,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one",
              values = one ? null : [],
              max = one ? index + 1 : options.length;

          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          } // Loop through all the selected options


          for (; i < max; i++) {
            option = options[i]; // Support: IE <=9 only
            // IE8-9 doesn't update selected after form reset (#2551)

            if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
            !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
              // Get the specific value for the option
              value = jQuery(option).val(); // We don't need an array for one selects

              if (one) {
                return value;
              } // Multi-Selects return an array


              values.push(value);
            }
          }

          return values;
        },
        set: function set(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;

          while (i--) {
            option = options[i];
            /* eslint-disable no-cond-assign */

            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
            /* eslint-enable no-cond-assign */

          } // Force browsers to behave consistently when non-matching value is set


          if (!optionSet) {
            elem.selectedIndex = -1;
          }

          return values;
        }
      }
    }
  }); // Radios and checkboxes getter/setter

  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function set(elem, value) {
        if (Array.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
        }
      }
    };

    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  }); // Return jQuery for attributes-only inclusion

  support.focusin = "onfocusin" in window;

  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
      stopPropagationCallback = function stopPropagationCallback(e) {
    e.stopPropagation();
  };

  jQuery.extend(jQuery.event, {
    trigger: function trigger(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          lastElement,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = lastElement = tmp = elem = elem || document; // Don't do events on text and comment nodes

      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      } // focus/blur morphs to focusin/out; ensure we're not firing them right now


      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }

      if (type.indexOf(".") > -1) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }

      ontype = type.indexOf(":") < 0 && "on" + type; // Caller can pass in a jQuery.Event object, Object, or just an event type string

      event = event[jQuery.expando] ? event : new jQuery.Event(type, _typeof(event) === "object" && event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)

      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; // Clean up the event in case it is being reused

      event.result = undefined;

      if (!event.target) {
        event.target = elem;
      } // Clone any incoming data and prepend the event, creating the handler arg list


      data = data == null ? [event] : jQuery.makeArray(data, [event]); // Allow special events to draw outside the lines

      special = jQuery.event.special[type] || {};

      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      } // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)


      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;

        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }

        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        } // Only add window if we got to document (e.g., not plain obj or detached DOM)


        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      } // Fire handlers on the event path


      i = 0;

      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ? bubbleType : special.bindType || type; // jQuery handler

        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");

        if (handle) {
          handle.apply(cur, data);
        } // Native handler


        handle = ontype && cur[ontype];

        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);

          if (event.result === false) {
            event.preventDefault();
          }
        }
      }

      event.type = type; // If nobody prevented the default action, do it now

      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          // Call a native DOM method on the target with the same name as the event.
          // Don't do default actions on window, that's where global variables be (#6170)
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];

            if (tmp) {
              elem[ontype] = null;
            } // Prevent re-triggering of the same event, since we already bubbled it above


            jQuery.event.triggered = type;

            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }

            elem[type]();

            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }

            jQuery.event.triggered = undefined;

            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }

      return event.result;
    },
    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate: function simulate(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function trigger(type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function triggerHandler(type, data) {
      var elem = this[0];

      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  }); // Support: Firefox <=44
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857

  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function (orig, fix) {
      // Attach a single capturing handler on the document while someone wants focusin/focusout
      var handler = function handler(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };

      jQuery.event.special[fix] = {
        setup: function setup() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);

          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }

          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function teardown() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;

          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }

  var location = window.location;
  var nonce = Date.now();
  var rquery = /\?/; // Cross-browser xml parsing

  jQuery.parseXML = function (data) {
    var xml;

    if (!data || typeof data !== "string") {
      return null;
    } // Support: IE 9 - 11 only
    // IE throws on parseFromString with invalid input.


    try {
      xml = new window.DOMParser().parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }

    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }

    return xml;
  };

  var rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;

    if (Array.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(prefix + "[" + (_typeof(v) === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && toType(obj) === "object") {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  } // Serialize an array of form elements or a set of
  // key/values into a query string


  jQuery.param = function (a, traditional) {
    var prefix,
        s = [],
        add = function add(key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
    }; // If an array was passed in, assume that it is an array of form elements.


    if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      // Serialize the form elements
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    } // Return the resulting serialization


    return s.join("&");
  };

  jQuery.fn.extend({
    serialize: function serialize() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works

        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();

        if (val == null) {
          return null;
        }

        if (Array.isArray(val)) {
          return jQuery.map(val, function (val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }

        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  var r20 = /%20/g,
      rhash = /#.*$/,
      rantiCache = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},
      // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  allTypes = "*/".concat("*"),
      // Anchor tag for parsing the document origin
  originAnchor = document.createElement("a");
  originAnchor.href = location.href; // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport

  function addToPrefiltersOrTransports(structure) {
    // dataTypeExpression is optional and defaults to "*"
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }

      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

      if (isFunction(func)) {
        // For each dataType in the dataTypeExpression
        while (dataType = dataTypes[i++]) {
          // Prepend if requested
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func); // Otherwise append
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  } // Base inspection function for prefilters and transports


  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = structure === transports;

    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);

        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }

    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  } // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887


  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }

    if (deep) {
      jQuery.extend(true, target, deep);
    }

    return target;
  }
  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */


  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes; // Remove auto dataType and get content-type in the process

    while (dataTypes[0] === "*") {
      dataTypes.shift();

      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    } // Check if we're dealing with a known content-type


    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    } // Check to see if we have a response for the expected dataType


    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }

        if (!firstDataType) {
          firstDataType = type;
        }
      } // Or just use first one


      finalDataType = finalDataType || firstDataType;
    } // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response


    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }

      return responses[finalDataType];
    }
  }
  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */


  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice(); // Create converters map with lowercased keys

    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }

    current = dataTypes.shift(); // Convert to each sequential dataType

    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      } // Apply the dataFilter if provided


      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }

      prev = current;
      current = dataTypes.shift();

      if (current) {
        // There's only work to do if current dataType is non-auto
        if (current === "*") {
          current = prev; // Convert response if prev dataType is non-auto and differs from current
        } else if (prev !== "*" && prev !== current) {
          // Seek a direct converter
          conv = converters[prev + " " + current] || converters["* " + current]; // If none found, seek a pair

          if (!conv) {
            for (conv2 in converters) {
              // If conv2 outputs current
              tmp = conv2.split(" ");

              if (tmp[1] === current) {
                // If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];

                if (conv) {
                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2]; // Otherwise, insert the intermediate dataType
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }

                  break;
                }
              }
            }
          } // Apply converter (if not an equivalence)


          if (conv !== true) {
            // Unless errors are allowed to bubble, catch and return them
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }

    return {
      state: "success",
      data: response
    };
  }

  jQuery.extend({
    // Counter for holding the number of active queries
    active: 0,
    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",

      /*
      timeout: 0,
      data: null,
      dataType: null,
      username: null,
      password: null,
      cache: null,
      throws: false,
      traditional: false,
      headers: {},
      */
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {
        // Convert anything to text
        "* text": String,
        // Text to html (true = no transformation)
        "text html": true,
        // Evaluate text as a json expression
        "text json": JSON.parse,
        // Parse text as xml
        "text xml": jQuery.parseXML
      },
      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },
    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function ajaxSetup(target, settings) {
      return settings ? // Building a settings object
      ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : // Extending ajaxSettings
      ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    // Main method
    ajax: function ajax(url, options) {
      // If url is an object, simulate pre-1.5 signature
      if (_typeof(url) === "object") {
        options = url;
        url = undefined;
      } // Force options to be an object


      options = options || {};

      var transport,
          // URL without anti-cache param
      cacheURL,
          // Response headers
      responseHeadersString,
          responseHeaders,
          // timeout handle
      timeoutTimer,
          // Url cleanup var
      urlAnchor,
          // Request state (becomes false upon send and true upon completion)
      completed,
          // To know if global events are to be dispatched
      fireGlobals,
          // Loop variable
      i,
          // uncached part of the url
      uncached,
          // Create the final options object
      s = jQuery.ajaxSetup({}, options),
          // Callbacks context
      callbackContext = s.context || s,
          // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          // Deferreds
      deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          // Status-dependent callbacks
      _statusCode = s.statusCode || {},
          // Headers (they are sent all at once)
      requestHeaders = {},
          requestHeadersNames = {},
          // Default abort message
      strAbort = "canceled",
          // Fake xhr
      jqXHR = {
        readyState: 0,
        // Builds headers hashtable if needed
        getResponseHeader: function getResponseHeader(key) {
          var match;

          if (completed) {
            if (!responseHeaders) {
              responseHeaders = {};

              while (match = rheaders.exec(responseHeadersString)) {
                responseHeaders[match[1].toLowerCase()] = match[2];
              }
            }

            match = responseHeaders[key.toLowerCase()];
          }

          return match == null ? null : match;
        },
        // Raw string
        getAllResponseHeaders: function getAllResponseHeaders() {
          return completed ? responseHeadersString : null;
        },
        // Caches the header
        setRequestHeader: function setRequestHeader(name, value) {
          if (completed == null) {
            name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
            requestHeaders[name] = value;
          }

          return this;
        },
        // Overrides response content-type header
        overrideMimeType: function overrideMimeType(type) {
          if (completed == null) {
            s.mimeType = type;
          }

          return this;
        },
        // Status-dependent callbacks
        statusCode: function statusCode(map) {
          var code;

          if (map) {
            if (completed) {
              // Execute the appropriate callbacks
              jqXHR.always(map[jqXHR.status]);
            } else {
              // Lazy-add the new callbacks in a way that preserves old ones
              for (code in map) {
                _statusCode[code] = [_statusCode[code], map[code]];
              }
            }
          }

          return this;
        },
        // Cancel the request
        abort: function abort(statusText) {
          var finalText = statusText || strAbort;

          if (transport) {
            transport.abort(finalText);
          }

          done(0, finalText);
          return this;
        }
      }; // Attach deferreds


      deferred.promise(jqXHR); // Add protocol if not provided (prefilters might expect it)
      // Handle falsy url in the settings object (#10093: consistency with old signature)
      // We also use the url parameter if available

      s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"); // Alias method option to type as per ticket #12004

      s.type = options.method || options.type || s.method || s.type; // Extract dataTypes list

      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""]; // A cross-domain request is in order when the origin doesn't match the current origin.

      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a"); // Support: IE <=8 - 11, Edge 12 - 15
        // IE throws exception on accessing the href property if url is malformed,
        // e.g. http://example.com:80x/

        try {
          urlAnchor.href = s.url; // Support: IE <=8 - 11 only
          // Anchor's host property isn't correctly set when s.url is relative

          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          // If there is an error parsing the URL, assume it is crossDomain,
          // it can be rejected by the transport if it is invalid
          s.crossDomain = true;
        }
      } // Convert data if not already a string


      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      } // Apply prefilters


      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR); // If request was aborted inside a prefilter, stop there

      if (completed) {
        return jqXHR;
      } // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)


      fireGlobals = jQuery.event && s.global; // Watch for a new set of requests

      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      } // Uppercase the type


      s.type = s.type.toUpperCase(); // Determine if request has content

      s.hasContent = !rnoContent.test(s.type); // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      // Remove hash to simplify url manipulation

      cacheURL = s.url.replace(rhash, ""); // More options handling for requests with no content

      if (!s.hasContent) {
        // Remember the hash so we can put it back
        uncached = s.url.slice(cacheURL.length); // If data is available and should be processed, append data to url

        if (s.data && (s.processData || typeof s.data === "string")) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data; // #9682: remove data so that it's not used in an eventual retry

          delete s.data;
        } // Add or update anti-cache param if needed


        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
        } // Put hash and anti-cache on the URL that will be requested (gh-1732)


        s.url = cacheURL + uncached; // Change '%20' to '+' if this is encoded form body content (gh-2658)
      } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+");
      } // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.


      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }

        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      } // Set the correct header, if data is being sent


      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      } // Set the Accepts header for the server, depending on the dataType


      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]); // Check for headers option

      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      } // Allow custom headers/mimetypes and early abort


      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
        // Abort if not done already and return
        return jqXHR.abort();
      } // Aborting is no longer a cancellation


      strAbort = "abort"; // Install callbacks on deferreds

      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error); // Get transport

      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR); // If no transport, we auto-abort

      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1; // Send global event

        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        } // If request was aborted inside ajaxSend, stop there


        if (completed) {
          return jqXHR;
        } // Timeout


        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function () {
            jqXHR.abort("timeout");
          }, s.timeout);
        }

        try {
          completed = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          // Rethrow post-completion exceptions
          if (completed) {
            throw e;
          } // Propagate others as results


          done(-1, e);
        }
      } // Callback for when everything is done


      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText; // Ignore repeat invocations

        if (completed) {
          return;
        }

        completed = true; // Clear timeout if it exists

        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        } // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)


        transport = undefined; // Cache response headers

        responseHeadersString = headers || ""; // Set readyState

        jqXHR.readyState = status > 0 ? 4 : 0; // Determine if successful

        isSuccess = status >= 200 && status < 300 || status === 304; // Get response data

        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        } // Convert no matter what (that way responseXXX fields are always set)


        response = ajaxConvert(s, response, jqXHR, isSuccess); // If successful, handle type chaining

        if (isSuccess) {
          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");

            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }

            modified = jqXHR.getResponseHeader("etag");

            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          } // if no content


          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent"; // if not modified
          } else if (status === 304) {
            statusText = "notmodified"; // If we have data, let's convert it
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          // Extract error from statusText and normalize for non-aborts
          error = statusText;

          if (status || !statusText) {
            statusText = "error";

            if (status < 0) {
              status = 0;
            }
          }
        } // Set data for the fake xhr object


        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + ""; // Success/Error

        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        } // Status-dependent callbacks


        jqXHR.statusCode(_statusCode);
        _statusCode = undefined;

        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        } // Complete


        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]); // Handle the global AJAX counter

          if (! --jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }

      return jqXHR;
    },
    getJSON: function getJSON(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function getScript(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      // Shift arguments if data argument was omitted
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      } // The url can be an options object (which then must have .url)


      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });

  jQuery._evalUrl = function (url) {
    return jQuery.ajax({
      url: url,
      // Make this explicit, since user can override this through ajaxSetup (#11264)
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      "throws": true
    });
  };

  jQuery.fn.extend({
    wrapAll: function wrapAll(html) {
      var wrap;

      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        } // The elements to wrap the target around


        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }

        wrap.map(function () {
          var elem = this;

          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }

          return elem;
        }).append(this);
      }

      return this;
    },
    wrapInner: function wrapInner(html) {
      if (isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }

      return this.each(function () {
        var self = jQuery(this),
            contents = self.contents();

        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function wrap(html) {
      var htmlIsFunction = isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function unwrap(selector) {
      this.parent(selector).not("body").each(function () {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });

  jQuery.expr.pseudos.hidden = function (elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };

  jQuery.expr.pseudos.visible = function (elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  jQuery.ajaxSettings.xhr = function () {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };

  var xhrSuccessStatus = {
    // File protocol always yields status code 0, assume 200
    0: 200,
    // Support: IE <=9 only
    // #1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var _callback, errorCallback; // Cross domain only allowed if supported through XMLHttpRequest


    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function send(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password); // Apply custom fields if provided

          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          } // Override mime type if needed


          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          } // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.


          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          } // Set headers


          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          } // Callback


          _callback = function callback(type) {
            return function () {
              if (_callback) {
                _callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;

                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  // Support: IE <=9 only
                  // On a manual native abort, IE9 throws
                  // errors on any property access that is not readyState
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete( // File: protocol always yields status 0; see #8605, #14207
                    xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, // Support: IE <=9 only
                  // IE9 has no XHR2 but throws on binary (trac-11426)
                  // For XHR2 non-text, let the caller handle it (gh-2498)
                  (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                    binary: xhr.response
                  } : {
                    text: xhr.responseText
                  }, xhr.getAllResponseHeaders());
                }
              }
            };
          }; // Listen to events


          xhr.onload = _callback();
          errorCallback = xhr.onerror = xhr.ontimeout = _callback("error"); // Support: IE 9 only
          // Use onreadystatechange to replace onabort
          // to handle uncaught aborts

          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function () {
              // Check readyState before timeout as it changes
              if (xhr.readyState === 4) {
                // Allow onerror to be called first,
                // but that will not handle a native abort
                // Also, save errorCallback to a variable
                // as xhr.onerror cannot be accessed
                window.setTimeout(function () {
                  if (_callback) {
                    errorCallback();
                  }
                });
              }
            };
          } // Create the abort callback


          _callback = _callback("abort");

          try {
            // Do send the request (this may raise an exception)
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            // #14683: Only rethrow if this hasn't been notified as an error yet
            if (_callback) {
              throw e;
            }
          }
        },
        abort: function abort() {
          if (_callback) {
            _callback();
          }
        }
      };
    }
  }); // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)

  jQuery.ajaxPrefilter(function (s) {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  }); // Install script dataType

  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  }); // Handle cache's special case and crossDomain

  jQuery.ajaxPrefilter("script", function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }

    if (s.crossDomain) {
      s.type = "GET";
    }
  }); // Bind script tag hack transport

  jQuery.ajaxTransport("script", function (s) {
    // This transport only deals with cross domain requests
    if (s.crossDomain) {
      var script, _callback2;

      return {
        send: function send(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", _callback2 = function callback(evt) {
            script.remove();
            _callback2 = null;

            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          }); // Use native DOM manipulation to avoid our domManip AJAX trickery

          document.head.appendChild(script[0]);
        },
        abort: function abort() {
          if (_callback2) {
            _callback2();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/; // Default jsonp settings

  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
      this[callback] = true;
      return callback;
    }
  }); // Detect, normalize options and install callbacks for jsonp requests

  jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data"); // Handle iff the expected data type is "jsonp" or we have a parameter to set

    if (jsonProp || s.dataTypes[0] === "jsonp") {
      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback; // Insert callback into url or form data

      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      } // Use data converter to retrieve json after script execution


      s.converters["script json"] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }

        return responseContainer[0];
      }; // Force json dataType


      s.dataTypes[0] = "json"; // Install callback

      overwritten = window[callbackName];

      window[callbackName] = function () {
        responseContainer = arguments;
      }; // Clean-up function (fires after converters)


      jqXHR.always(function () {
        // If previous value didn't exist - remove it
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName); // Otherwise restore preexisting value
        } else {
          window[callbackName] = overwritten;
        } // Save back as free


        if (s[callbackName]) {
          // Make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback; // Save the callback name for future use

          oldCallbacks.push(callbackName);
        } // Call if it was a function and we have a response


        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }

        responseContainer = overwritten = undefined;
      }); // Delegate to script

      return "script";
    }
  }); // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337

  support.createHTMLDocument = function () {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  }(); // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string


  jQuery.parseHTML = function (data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }

    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }

    var base, parsed, scripts;

    if (!context) {
      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument(""); // Set the base href for the created document
        // so any parsed elements with URLs
        // are based on the document's URL (gh-2965)

        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }

    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && []; // Single tag

    if (parsed) {
      return [context.createElement(parsed[1])];
    }

    parsed = buildFragment([data], context, scripts);

    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }

    return jQuery.merge([], parsed.childNodes);
  };
  /**
   * Load a url into a page
   */


  jQuery.fn.load = function (url, params, callback) {
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");

    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    } // If it's a function


    if (isFunction(params)) {
      // We assume that it's the callback
      callback = params;
      params = undefined; // Otherwise, build a param string
    } else if (params && _typeof(params) === "object") {
      type = "POST";
    } // If we have elements to modify, make the request


    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function (responseText) {
        // Save response for use in complete callback
        response = arguments;
        self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
        responseText); // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).always(callback && function (jqXHR, status) {
        self.each(function () {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }

    return this;
  }; // Attach a bunch of functions for handling common AJAX events


  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });

  jQuery.expr.pseudos.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem;
    }).length;
  };

  jQuery.offset = {
    setOffset: function setOffset(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {}; // Set position first, in-case top/left are set even on static elem

      if (position === "static") {
        elem.style.position = "relative";
      }

      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1; // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed

      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }

      if (isFunction(options)) {
        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }

      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }

      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }

      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    // offset() relates an element's border box to the document origin
    offset: function offset(options) {
      // Preserve chaining for setter
      if (arguments.length) {
        return options === undefined ? this : this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }

      var rect,
          win,
          elem = this[0];

      if (!elem) {
        return;
      } // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error


      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      } // Get document-relative position by adding viewport scroll to viewport-relative gBCR


      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position: function position() {
      if (!this[0]) {
        return;
      }

      var offsetParent,
          offset,
          doc,
          elem = this[0],
          parentOffset = {
        top: 0,
        left: 0
      }; // position:fixed elements are offset from the viewport, which itself always has zero offset

      if (jQuery.css(elem, "position") === "fixed") {
        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
      } else {
        offset = this.offset(); // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified

        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;

        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.parentNode;
        }

        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          // Incorporate borders into its offset, since they are outside its content origin
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
        }
      } // Subtract parent offsets and element margins


      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent: function offsetParent() {
      return this.map(function () {
        var offsetParent = this.offsetParent;

        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || documentElement;
      });
    }
  }); // Create scrollLeft and scrollTop methods

  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (method, prop) {
    var top = "pageYOffset" === prop;

    jQuery.fn[method] = function (val) {
      return access(this, function (elem, method, val) {
        // Coalesce documents and windows
        var win;

        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }

        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }

        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  }); // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here

  jQuery.each(["top", "left"], function (i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop); // If curCSS returns percentage, fallback to offset

        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  }); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods

  jQuery.each({
    Height: "height",
    Width: "width"
  }, function (name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function (defaultExtra, funcName) {
      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function (elem, type, value) {
          var doc;

          if (isWindow(elem)) {
            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
          } // Get document width or height


          if (elem.nodeType === 9) {
            doc = elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest

            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }

          return value === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css(elem, type, extra) : // Set width or height on the element
          jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });
  jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {
    // Handle event binding
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function hover(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  jQuery.fn.extend({
    bind: function bind(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function unbind(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function delegate(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function undelegate(selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    }
  }); // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon

  jQuery.proxy = function (fn, context) {
    var tmp, args, proxy;

    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    } // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.


    if (!isFunction(fn)) {
      return undefined;
    } // Simulated bind


    args = _slice.call(arguments, 2);

    proxy = function proxy() {
      return fn.apply(context || this, args.concat(_slice.call(arguments)));
    }; // Set the guid of unique handler to the same of original handler, so it can be removed


    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    return proxy;
  };

  jQuery.holdReady = function (hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };

  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;
  jQuery.now = Date.now;

  jQuery.isNumeric = function (obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = jQuery.type(obj);
    return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    !isNaN(obj - parseFloat(obj));
  }; // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.
  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon


  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return jQuery;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  var // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,
      // Map over the $ in case of overwrite
  _$ = window.$;

  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }

    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }

    return jQuery;
  }; // Expose jQuery and $ identifiers, even in AMD
  // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)


  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }

  return jQuery;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./dev/jsPlugins/jquery.datetimepicker.js":
/*!************************************************!*\
  !*** ./dev/jsPlugins/jquery.datetimepicker.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function (e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./dev/jsPlugins/jquery-3.3.1.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (e) {
  function a(a, t) {
    var n,
        s,
        d,
        r = {},
        l = e.fn.datetimepicker.CONSTS,
        o = l.NAV,
        i = l.I18N[t.language] ? l.I18N[t.language] : l.I18N.en,
        c = {
      showYear: null,
      showMonth: null
    },
        u = t.date instanceof Date ? new Date(t.date.getTime()) : null,
        p = t.firstDayOfWeek,
        h = e(a),
        v = function v(e, a) {
      var t = e.getFullYear();
      return null == a && (a = e.getMonth()), 0 != t % 4 || 0 == t % 100 && 0 != t % 400 || 1 !== a ? [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][a] : 29;
    },
        D = function D(e) {
      return "" === e || null == e;
    },
        M = function M(a, t, n, s) {
      return e.isFunction(t) ? t.apply(a, n || []) : s;
    },
        g = function g(e, a, t) {
      var n = e + "";

      for (t || (t = " "); n.length < a;) {
        n = t + n;
      }

      return n.toString();
    },
        m = function m(e, a) {
      var t = e.str,
          n = e.len;

      switch (e.char) {
        case "Y":
          t = n <= 3 ? (a.getFullYear() + "").slice(2, 4) : a.getFullYear();
          break;

        case "M":
          t = n > 2 ? l.MN[a.getMonth()] : n < 2 ? a.getMonth() + 1 : g(a.getMonth() + 1, 2, "0");
          break;

        case "D":
          t = n > 1 ? g(a.getDate(), 2, "0") : a.getDate();
          break;

        case "h":
          var s = a.getHours() % 12;
          0 === s && (s = 12), t = n > 1 ? g(s, 2, "0") : s;
          break;

        case "H":
          t = n > 1 ? g(a.getHours(), 2, "0") : a.getHours();
          break;

        case "m":
          t = n > 1 ? g(a.getMinutes(), 2, "0") : a.getMinutes();
          break;

        case "s":
          t = n > 1 ? g(a.getSeconds(), 2, "0") : a.getSeconds();
          break;

        default:
          t = e.str;
      }

      return t;
    },
        f = function f(a, t, n, s, d) {
      var r = e("<td/>").attr("colspan", n).html(t).appendTo(a);
      return s && r.data("nav", s), r.addClass(d), r;
    },
        C = function C(e) {
      var a = u,
          n = a.getDate(),
          s = t.endDate,
          d = t.startDate,
          r = v(a, e);
      n > r && a.setDate(r), a.setMonth(e), s && a > s && a.setDate(s.getDate()), d && a < d && a.setDate(d.getDate());
    },
        Y = function Y(e, a) {
      if (a) {
        var n = a.getFullYear(),
            s = a.getMonth(),
            d = a.getDate(),
            r = new Date(),
            u = r.getFullYear(),
            h = r.getMonth(),
            D = r.getDate();
        c.showYear = n, c.showMonth = s;
        var M = t.startDate,
            g = t.endDate;
        e.$title.text(i.MN[s] + ", " + n);
        var m = new Date(a);
        m.setDate(v(m, null) + 1), g && m > g || m.getFullYear() > l.MAXYEAR ? e.$nextm.addClass("disabled").removeClass("hover").data("disabled", !0) : e.$nextm.removeClass("disabled").data("disabled", !1);
        var f = new Date(a);
        f.setDate(0), M && f < M || f.getFullYear() < l.MINYEAR ? e.$prevm.addClass("disabled").removeClass("hover").data("disabled", !0) : e.$prevm.removeClass("disabled").data("disabled", !1), a.setDate(1);
        var C = (a.getDay() - p) % 7;
        a.setDate(0 - C), a.setDate(a.getDate() + 1);

        for (var Y = e.find("tbody").children().eq(0), b = 0; b < 5 && Y.length; b++) {
          for (var w, k = Y.children(), T = 0; T < 7; ++T, a.setDate(w + 1)) {
            var y = k.eq(T);
            if (y.removeClass().data("nav", o.day), !y.length) break;
            w = a.getDate(), y.text(w);
            var E = a.getMonth() == s;

            if (E) {
              var A = !1;

              if (null != M && M > a || null != g && g < a ? (y.addClass("day disabled"), A = !0) : y.addClass("day"), y.data("disabled", A), !A) {
                E && w == d && (c.selectedDate && c.selectedDate.removeClass("selected"), y.addClass("selected"), c.selectedDate = y, c.showDay = w), a.getFullYear() == u && a.getMonth() == h && w == D && y.addClass("today");
                var N = a.getDay();
                0 !== N && 6 !== N || y.addClass("weekend");
              }
            } else y.addClass("oday").data("disabled", !0);
          }

          Y = Y.next();
        }
      }
    },
        b = function b(a, n) {
      if (n) {
        var s = n.getFullYear(),
            d = n.getMonth(),
            r = e(a).data("midYear");
        r ? s > r + 5 ? r += 10 : s < r - 4 && (r -= 10) : r = s, e(a).data("midYear", r);
        var u,
            p,
            h,
            v,
            M = [r - 4, r - 3, r - 2, r - 1, r, r + 1, r + 2, r + 3, r + 4, r + 5],
            g = e("td.year", a),
            m = e("td.month", a),
            f = t.endDate,
            C = t.startDate;
        f && f && s == (u = f.getFullYear()) && (p = f.getMonth()), (!u || u > l.MAXYEAR) && (u = l.MAXYEAR), C && C && s == (h = C.getFullYear()) && (v = C.getMonth()), (!h || h < l.MINYEAR) && (h = l.MINYEAR);

        for (var Y = 0; Y < 12; Y++) {
          var b = m.eq(Y).text(i.MN[Y]).data("nav", o.month).data("month", Y);

          if (Y == d && (c.selectedMonth && c.selectedMonth.removeClass("selected"), b.addClass("selected"), c.selectedMonth = b), !D(v) && Y < v || !D(p) && Y > p ? b.addClass("disabled").data("disabled", !0) : b.removeClass("disabled").data("disabled", !1), Y < 10) {
            var w = g.eq(Y).text(M[Y]).data("nav", o.year);
            M[Y] == s && (c.selectedYear && c.selectedYear.removeClass("selected"), w.addClass("selected"), c.selectedYear = w), !D(h) && M[Y] < h || !D(u) && M[Y] > u ? w.addClass("disabled").data("disabled", !0) : w.removeClass("disabled").data("disabled", !1);
          }
        }

        var k = e("td.prevy", a).removeClass("disabled").data("disabled", !1);
        M[0] <= h && k.addClass("disabled").data("disabled", !0).removeClass("hover");
        var T = e("td.nexty", a).removeClass("disabled").data("disabled", !1);
        M[9] >= u && T.addClass("disabled").data("disabled", !0).removeClass("hover");
      }
    },
        w = function w(e, a, t) {
      if (!a) return e.$h.val("00"), e.$m.val("00"), void e.$s.val("00");
      t != l.VIEWMODE.HM && t != l.VIEWMODE.YMDHM || a.setSeconds(0);
      var n = a.getHours() + "",
          s = a.getMinutes() + "",
          d = a.getSeconds() + "";
      e.$h.val(g(n, 2, "0")), e.$m.val(g(s, 2, "0")), e.$s.val(g(d, 2, "0"));
    },
        k = function k(e, a, t) {
      return isNaN(e) ? a : Math.min(t, Math.max(a, e));
    },
        T = e("<form novalidate/>").appendTo(h).addClass(t.baseCls);

    n = function () {
      var a = e('<table cellspacing = "2px" cellpadding = "0" class="dt"/>'),
          t = e("<thead/>").appendTo(a),
          n = e('<tr class = "mainhead"/>');
      a.$prevm = f(n, '<i class="icon-datepicker-prev"/>', 1, o.prevm, "prevm"), a.$title = e('<td class="title" colspan="5"/>').data("nav", o.title).appendTo(n), a.$nextm = f(n, '<i class="icon-datepicker-next"/>', 1, o.nextm, "nextm"), n.appendTo(t), n = e("<tr/>");
      var s;

      for (s = 0; s < 7; ++s) {
        var d = e("<td/>").appendTo(n),
            r = (s + p) % 7;
        d.addClass("day name").text(i.SDN[r]), 0 !== r && 6 !== r || d.addClass("weekend");
      }

      n.appendTo(t);
      var l = e('<tbody onselectstart="return false;"/>').appendTo(a);

      for (s = 5; s > 0; s--) {
        for (var c = e("<tr/>").appendTo(l), u = 0; u < 7; u++) {
          e("<td/>").appendTo(c);
        }
      }

      return a;
    }(), Y(n, new Date(u)), s = function () {
      for (var a = e('<table cellspacing = "2px" cellpadding = "0" class="mt"/>'), t = e("<tbody/>").appendTo(a), n = e("<tr/>").appendTo(t), s = 0; s < 2; s++) {
        e('<td class="month"/>').appendTo(n);
      }

      f(n, '<i class="icon-datepicker-prev"/>', 1, o.prevy, " prevy"), f(n, '<i class="icon-datepicker-next"/>', 1, o.nexty, " nexty");

      for (var d = 0; d < 5; d++) {
        n = e("<tr/>").appendTo(t), e('<td class="month"/><td class="month"/><td class="year"/><td class="year"/>').appendTo(n);
      }

      var r = e('<tfoot class="buttonpane"/>').appendTo(a);
      return n = e("<tr/>").appendTo(r), f(n, i.OK, 4, o.mok, "ok"), a;
    }(), d = function (a) {
      var n = e('<table cellspacing = "0" cellpadding = "0" class="tt"/>'),
          s = e("<tbody>").appendTo(n);
      n.$h = e('<input type="number" min="0" max="23" maxlength="2"/>').data("time", "h").change(function () {
        var e = parseInt(this.value, 10),
            a = k(e, 0, 23);
        e != a && (this.value = a), u.setHours(a), M(r, t.onDateChange, arguments);
      }).focus(function () {
        n.focus = e(this);
      }), n.$m = e('<input type="number" min="0" max="59" maxlength="2"/>').data("time", "m").change(function () {
        var e = parseInt(this.value, 10),
            a = k(e, 0, 59);
        e != a && (this.value = a), u.setMinutes(a), M(r, t.onDateChange, arguments);
      }).focus(function () {
        n.focus = e(this);
      }), n.$s = e('<input type="number" min="0" max="59" maxlength="2"/>').data("time", "s").change(function () {
        var e = parseInt(this.value, 10),
            a = k(e, 0, 59);
        e != a && (this.value = a), u.setSeconds(a), M(r, t.onDateChange, arguments);
      }).focus(function () {
        n.focus = e(this);
      }), n.focus = n.$m;
      var d = e("<td/>").append(e('<i class="icon-datepicker-plus"/>')).data("nav", o.plus),
          c = e("<td/>").append(e('<i class="icon-datepicker-minus"/>')).data("nav", o.minus),
          p = e("<tr/>").append(e('<td rowspan="2"/>').text(i.TIME)).append(e('<td rowspan="2"/>').append(n.$h)).append(e('<td class="common" rowspan="2"/>').text(":")).append(e('<td rowspan="2"/>').append(n.$m));
      return a != l.VIEWMODE.YMDHM && a != l.VIEWMODE.HM && p.append(e('<td class="common" rowspan="2"/>').text(":")).append(e('<td rowspan="2"/>').append(n.$s)), p.append(d).appendTo(s), e("<tr/>").append(c).appendTo(s), n;
    }(t.viewMode);

    var y = function () {
      var a = e('<table class="buttonpane"/>'),
          t = e("<tr/>");
      return f(t, i.TODAY, null, o.today, "today"), t.appendTo(a), a;
    }(),
        E = l.VIEWMODE;

    switch (t.viewMode) {
      case E.YM:
        b(s, new Date(u)), T.append(s.show());
        break;

      case E.HM:
      case E.HMS:
        w(d, u, t.viewMode), T.append(d.show()), function (a) {
          var t = e("<table/>"),
              n = e("<tr/>").appendTo(t);
          f(n, i.CLEAR, 1, o.clear, "clear"), f(n, i.CURRENT, 1, o.current, "current"), f(n, i.OK, 1, o.dok, "ok"), t.appendTo(a);
        }(T);
        break;

      case E.YMD:
        T.append(n.show()), s.hide().appendTo(T), T.append(y);
        break;

      case E.YMDHMS:
      case E.YMDHM:
      default:
        n.appendTo(T).show(), s.hide().appendTo(T), w(d, u, t.viewMode), d.show().appendTo(T), T.append(y);
    }

    return function () {
      var a = function a(_a) {
        var i = _a.target,
            p = e(i).closest("td"),
            h = _a.type,
            v = p.data("nav"),
            D = arguments;
        if (!p.data("disabled") && 0 !== p.length && v) if (u || (u = u || new Date()), "mouseover" === h) p.addClass("hover");else if ("mouseup" === h) switch (p.removeClass("hover"), v) {
          case o.prevm:
            !function () {
              var e = t.startDate,
                  a = u,
                  n = c.showMonth,
                  s = c.showYear;
              e ? s > e.getFullYear() ? n > 0 ? C(n - 1) : (a.setFullYear(s - 1), C(11)) : s == e.getFullYear() && n > e.getMonth() && n > 0 && (C(n - 1), a < e && (u = new Date(e))) : n > 0 ? C(n - 1) : (a.setFullYear(s - 1), C(11));
            }(), Y(n, new Date(u)), M(r, t.onDateChange, D);
            break;

          case o.nextm:
            !function () {
              var e = t.endDate,
                  a = u,
                  n = c.showMonth,
                  s = c.showYear;
              e ? s < e.getFullYear() ? n < 11 ? C(n + 1) : (a.setFullYear(s + 1), C(0)) : s == e.getFullYear() && n < e.getMonth() && (C(n + 1), a > e && (u = new Date(e))) : n < 11 ? C(n + 1) : (a.setFullYear(s + 1), C(0));
            }(), Y(n, new Date(u)), M(r, t.onDateChange, D);
            break;

          case o.title:
            b(s, new Date(c.showYear, c.showMonth));
            var m = s.parent(".perfect-datetimepicker");
            s.css({
              position: "absolute",
              top: 0,
              left: 0,
              height: m.height(),
              width: m.width(),
              "z-index": 1e5
            }).show("fast");
            break;

          case o.clear:
            u = null, c.selectedDate && c.selectedDate.removeClass("selected"), M(r, t.onDateChange, D), M(r, t.onClear, D);
            break;

          case o.current:
            u = new Date(), M(r, t.onDateChange, D);

          case o.today:
            var f = new Date();
            if (t.startDate && f < t.startDate || t.endDate && f > t.endDate) return;
            u = new Date(f), Y(n, f), w(d, f), c.selectedDate && c.selectedDate.removeClass("selected"), c.selectedDate = n.find("td.today").addClass("selected"), M(r, t.onDateChange, D);
            break;

          case o.dok:
            M(r, t.onOk, D);
            break;

          case o.prevy:
            !function () {
              var e,
                  a,
                  n = t.startDate,
                  s = u,
                  d = s.getFullYear() - 10,
                  r = s.getMonth();
              n && d == (a = n.getFullYear()) && (e = n.getMonth()), (!a || a < l.MINYEAR) && (a = l.MINYEAR), d < a ? (s.setFullYear(a), r < e && s.setMonth(e)) : s.setFullYear(d);
            }(), b(s, new Date(u)), M(r, t.onDateChange, D);
            break;

          case o.nexty:
            !function () {
              var e,
                  a,
                  n = t.endDate,
                  s = u,
                  d = s.getFullYear() + 10,
                  r = s.getMonth();
              n && d == (a = n.getFullYear()) && (e = n.getMonth()), (!a || a > l.MAXYEAR) && (a = l.MAXYEAR), d > a ? (s.setFullYear(a), r < e && s.setMonth(e)) : s.setFullYear(d);
            }(), b(s, new Date(u)), M(r, t.onDateChange, D);
            break;

          case o.mok:
            Y(n, new Date(u)), n.parent().length > 0 && s.hide("fast");
            break;

          case o.cancel:
            Y(n, new Date(u)), s.hide("fast");
            break;

          case o.year:
            c.selectedYear && c.selectedYear.removeClass("selected"), c.selectedYear = p;
            var k = u;
            k.setFullYear(p.text()), b(s, new Date(k)), M(r, t.onDateChange, D);
            break;

          case o.month:
            c.selectedMonth && c.selectedMonth.removeClass("selected"), c.selectedMonth = p.addClass("selected"), u.setMonth(p.data("month")), M(r, t.onDateChange, D);
            break;

          case o.day:
            c.selectedDate && c.selectedDate.removeClass("selected"), c.selectedDate = p.addClass("selected");
            var T = u;
            T.setFullYear(c.showYear), T.setMonth(c.showMonth), T.setDate(p.text()), M(r, t.onDateChange, D);
            break;

          case o.plus:
            !function (e, a) {
              var n = a.data("time");

              if ("h" === n) {
                var s = (u.getHours() + 1) % 24;
                u.setHours(s), e.$h.val(g(s, 2, "0"));
              } else if ("m" === n) {
                var d = (u.getMinutes() + 5) % 60;
                u.setMinutes(d), e.$m.val(g(d, 2, "0"));
              } else {
                var l = (u.getSeconds() + 5) % 60;
                u.setSeconds(l), e.$s.val(g(l, 2, "0"));
              }

              a.select(), M(r, t.onDateChange, arguments, !1);
            }(d, d.focus);
            break;

          case o.minus:
            !function (e, a) {
              var n = a.data("time");

              if ("h" === n) {
                var s = (u.getHours() + 23) % 24;
                u.setHours(s), e.$h.val(g(s, 2, "0"));
              } else if ("m" === n) {
                var d = (u.getMinutes() + 55) % 60;
                u.setMinutes(d), e.$m.val(g(d, 2, "0"));
              } else {
                var l = (u.getSeconds() + 55) % 60;
                u.setSeconds(l), e.$s.val(g(l, 2, "0"));
              }

              a.select(), M(r, t.onDateChange, arguments, !1);
            }(d, d.focus);
        } else "mouseout" === h && p.removeClass("hover");
      };

      h.unbind(), h.bind("mousedown", a).bind("mouseover", a).bind("mouseup", a).bind("mouseout", a);
    }(), r.element = h, r.$datetable = n, r.$monthtable = s, r.$timetable = d, r.getValue = function () {
      var e = l.VIEWMODE,
          a = u;
      return !a || t.viewMode !== e.YMD && t.viewMode !== e.YM || a.setHours(0, 0, 0, 0), a;
    }, r.setValue = function (e) {
      e instanceof Date && (u = e, Y(n, e), b(s, e), w(d, e, t.viewMode));
    }, r.getText = function (e) {
      return function (e, a) {
        if (!e) return "";
        var t = a.length,
            n = "";

        if (t > 0) {
          for (var s = a.charAt(0), d = 0, r = s, l = 1; l < t; l++) {
            var o = a.charAt(l);
            s !== o ? (n += m({
              char: s,
              str: r,
              len: l - d
            }, e), d = l, r = s = o) : r += o;
          }

          n += m({
            char: s,
            str: r,
            len: t - d
          }, e);
        }

        return n;
      }(this.getValue(), e || "YYYY/MM/DD HH:mm:ss");
    }, r.destroy = function () {
      return this.element.removeData("datetimepicker"), this.element.remove(), r;
    }, r;
  }

  e.fn.datetimepicker = function (t) {
    return this.each(function () {
      var n = e(this);
      n.data("dateTimePicker") || (t = e.extend(!0, {}, e.fn.datetimepicker.defaults, t), n.data("dateTimePicker", new a(this, t)));
    });
  }, e.fn.datetimepicker.init = function (t, n) {
    var s = new a(t, e.extend(!0, {}, e.fn.datetimepicker.defaults, n));
    return e(t).data("dateTimePicker", s), s;
  }, e.fn.datetimepicker.CONSTS = {
    I18N: {
      zh: {
        SDN: ["日", "一", "二", "三", "四", "五", "六"],
        MN: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        DN: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        CALENDAR: "日历",
        CLEAR: "清空",
        TODAY: "今天",
        OK: "确定",
        CURRENT: "当前",
        TIME: "时间"
      },
      en: {
        SDN: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        MN: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        DN: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        CALENDAR: "Calendar",
        CLEAR: "Clear",
        TODAY: "Today",
        OK: "OK",
        CURRENT: "Now",
        TIME: "Time"
      },
      de: {
        SDN: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        MN: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        DN: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        CALENDAR: "Kalender",
        CLEAR: "Löschen",
        TODAY: "Heute",
        OK: "OK",
        CURRENT: "Jetzt",
        TIME: "Zeit"
      },
      nl: {
        SDN: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
        MN: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        DN: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
        CALENDAR: "Kalender",
        CLEAR: "Legen",
        TODAY: "Vandaag",
        OK: "OK",
        CURRENT: "Nu",
        TIME: "Tijd"
      }
    },
    VIEWMODE: {
      YM: "YM",
      YMD: "YMD",
      HMS: "HMS",
      HM: "HM",
      YMDHMS: "YMDHMS",
      YMDHM: "YMDHM"
    },
    MINYEAR: 1900,
    MAXYEAR: 2999,
    NAV: {
      prevm: 2,
      nextm: 3,
      title: 4,
      clear: 5,
      today: 6,
      dok: 7,
      prevy: 8,
      nexty: 9,
      cancel: 10,
      mok: 11,
      plus: 12,
      minus: 13,
      current: 15,
      day: 100,
      month: 200,
      year: 300
    }
  }, e.fn.datetimepicker.defaults = {
    baseCls: "perfect-datetimepicker",
    viewMode: e.fn.datetimepicker.CONSTS.VIEWMODE.YMD,
    firstDayOfWeek: 0,
    date: null,
    endDate: null,
    startDate: null,
    language: "en",
    onDateChange: null,
    onClear: null,
    onOk: null,
    onClose: null
  };
});

/***/ }),

/***/ "./dev/jsPlugins/jquery.jchart.js":
/*!****************************************!*\
  !*** ./dev/jsPlugins/jquery.jchart.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 *  jChart - v0.1.1
 *  A plugin template
 *
 *  Made by Adam Kocić (Falkan3)
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;

(function ($, window, document, undefined) {
  "use strict"; // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.
  // window and document are passed through as local variable rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).
  // Create the defaults once

  var pluginName = "jChart",
      pluginNameLower = pluginName.toLowerCase(),
      objPrefix = 'jchart__',
      defaults = {
    elements: {
      container: null,
      body: null,
      group: null,
      figure: null,
      svg: null,
      segments: [],
      markers: null
    },
    data: [],
    values: {},
    // values necessary for the graphing, like sum of values of all segments
    placeholder: {
      data: {
        value: 0,
        // value of the segment
        color: {
          normal: '#00a3f2',
          // stroke/fill color of the segment
          active: '#00d8f2'
        },
        draw: true,
        // whether to draw the segment on the chart or not; default true
        push: true,
        // whether to push the next segment via offset. Best to set false together when draw is set to false (the empty section will always be at the end that way); default true
        order: null,
        // drawing order
        title: 'untitled',
        strokeWidth: 3
      }
    },
    appearance: {
      type: 'donut',
      baseColor: '#ddd',
      segmentColor: {
        normal: '#00a3f2',
        active: '#00d8f2'
      },
      baseOffset: 0,
      // offset for starting point of first segment
      baseStrokeWidth: 1,
      strokeWidth: 3,
      // default stroke width for all segments
      animated: true,

      /* TITLE */
      title: {
        chartTitle: '',
        // tooltips
        showValue: true,
        showPercentage: true,
        // summary - show a value inside the donut chart
        showSummary: false,
        summaryTitle: '',
        // by default it shows the percentage of the greatest segment in the chart
        // (if summaryTitle is empty)
        summarySegment: null // the segment's id which percentage will be displayed in the summary

      },

      /* DONUT AND CIRCLE */
      radius: 100 / (2 * Math.PI),
      // 125 for full area of the SVG canvas
      innerCutout: 0.75,
      // how "thin" the segments are from the center point. (0 will render a pie chart (full circle))
      centerX: 21,
      centerY: 21,

      /* DONUT */
      subType: 'circle',
      // render type: circle for circle based approach, path for line and arc approach using path
      isGauge: false,
      // if the donut will be rendered as a full circle or a half-circle
      gap: 1,
      // gap between segments for donut chart (in percentage, 1 = 1%)

      /* BAR */
      showMarkers: true,
      markerColor: '#f45a42',
      markerCount: 10,
      markerWidth: 0.5,
      // in percentage of width - 0.5 means 0.5%
      rx: 0,
      // horizontal corner radius
      ry: 0 // vertical corner radius

    },
    callbacks: {
      onInit: function onInit() {},
      onRefresh: function onRefresh() {},
      onSegmentMouseover: function onSegmentMouseover() {},
      onSegmentMouseout: function onSegmentMouseout() {}
    }
  }; // The actual plugin constructor

  function Plugin(element, options) {
    this.element = element;
    this.$element = $(element); // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin

    this.settings = $.extend(true, {}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this._nameLower = pluginNameLower;
    this._objPrefix = objPrefix;
    this._methods = methods; //dynamic vars
    //this.html = $('html');

    this._methods.init(this);
  } // Avoid Plugin.prototype conflicts
  // $.extend(Plugin.prototype, {


  var methods = {
    //if(jQuery.fn.pluginName) {...} - check for functions from other plugins (dependencies)
    init: function init(instance) {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. instance.element
      // and instance.settings
      // you can add more functions like the one below and
      // call them like the example bellow
      instance._methods.initElement(instance); // On Init callback


      if (instance.settings.callbacks.onInit && $.isFunction(instance.settings.callbacks.onInit)) {
        instance.settings.callbacks.onInit.call(instance);
      }
    },

    /*
     * Main function for initializing
     */
    initElement: function initElement(instance) {
      // calculate the values
      instance._methods.calculateDataValues(instance); // draw html


      instance._methods.initHtml(instance);
    },

    /*
     * Calculate the necessary values for graphing (maxval, percentage value of each segment)
     */
    calculateDataValues: function calculateDataValues(instance) {
      var values = {
        maxval: 0
      };
      var data = instance.settings.data; // calculate the sum data values

      for (var segment in data) {
        if (data.hasOwnProperty(segment)) {
          data[segment] = $.extend(true, {}, instance.settings.placeholder.data, data[segment]);
          values.maxval += data[segment].value;
        }
      } // calculate the single data values


      for (var _segment in data) {
        if (data.hasOwnProperty(_segment)) {
          if (values.maxval === 0) {
            data[_segment].percentage_raw = 0;
            data[_segment].percentage = 0;
          } else {
            data[_segment].percentage_raw = data[_segment].value / values.maxval;
            data[_segment].percentage = data[_segment].value / values.maxval * 100;
          }

          if (data[_segment].order === null) {
            data[_segment].order = data.length;
          }
        }
      } // sort data by their order parameter


      function compare(a, b) {
        if (a['order'] === null) return 1;
        if (b['order'] === null) return -1;
        if (a['order'] < b['order']) return -1;
        if (a['order'] > b['order']) return 1;
        return 0;
      }

      data.sort(compare); //instance.settings.data = data;

      instance.settings.values = values;
    },

    /*
     * Initialize HTML drawing function
     */
    initHtml: function initHtml(instance) {
      instance._methods.drawContainer(instance);

      instance._methods.drawBody(instance);
    },

    /*
     * Draw chart container
     */
    drawContainer: function drawContainer(instance) {
      /* ---- cleanup ---- */
      if (typeof instance.settings.elements.container !== 'undefined' && instance.settings.elements.container !== null) {
        instance.settings.elements.container.remove();
      }

      if (typeof instance.settings.elements.figure !== 'undefined' && instance.settings.elements.figure !== null) {
        instance.settings.elements.figure.remove();
      }
      /* ---- cleanup ---- */


      var $container = $('<div>', {
        'class': pluginNameLower
      });
      var $figure = $('<figure>', {
        'class': instance._objPrefix + 'figure'
      });
      instance.settings.elements.container = $container;
      instance.settings.elements.figure = $figure;
      instance.$element.append($container);
      $container.append($figure);
    },

    /*
     * Draw chart body
     */
    drawBody: function drawBody(instance) {
      /* ---- cleanup ---- */
      if (typeof instance.settings.elements.body !== 'undefined' && instance.settings.elements.body !== null) {
        instance.settings.elements.body.remove();
      }

      if (typeof instance.settings.elements.figureCaption !== 'undefined' && instance.settings.elements.figureCaption !== null) {
        instance.settings.elements.figureCaption.remove();
      }
      /* ---- cleanup ---- */


      var $chartBody = $('<div>', {
        'class': instance._objPrefix + 'body'
      });
      var $figureCaption = $('<figcaption>');
      instance.settings.elements.body = $chartBody;
      instance.settings.elements.figureCaption = $figureCaption;
      instance.settings.elements.figure.append($chartBody);
      instance.settings.elements.figure.append($figureCaption);

      instance._methods.drawBodyBase(instance);

      instance._methods.addEventListeners(instance);
    },
    drawBodyBase: function drawBodyBase(instance) {
      /* ---- cleanup ---- */
      if (typeof instance.settings.elements.svg !== 'undefined' && instance.settings.elements.svg !== null) {
        instance.settings.elements.svg.remove();
      }

      if (typeof instance.settings.elements.group !== 'undefined' && instance.settings.elements.group !== null) {
        instance.settings.elements.group.remove();
      }
      /* ---- cleanup ---- */
      // render data into the graph


      var data = instance.settings.data;
      var values = instance.settings.values;
      var graphData = null;
      var svg = null;
      var svgElement = null;
      var segments = [];
      var markers = [];

      switch (instance.settings.appearance.type) {
        /* donut chart */
        case 'donut':
          graphData = instance._methods.drawBodyBaseDonut(instance, {
            'type': instance.settings.appearance.subType
          });
          svg = graphData['svg'];
          segments = instance._methods.drawBodySegmentDonut(instance, data, values, {
            'type': instance.settings.appearance.subType
          });
          svgElement = instance.settings.elements.body[0].appendChild(svg);
          svgElement.appendChild(graphData['ring']);

          switch (instance.settings.appearance.type) {
            /* donut chart - circle */
            case 'circle':
              break;

            /* donut chart - path */

            case 'path':
              svgElement.appendChild(graphData['ring']);
              break;
          } // animation loop


          if (instance.settings.appearance.animated) {
            instance._methods.animationLoop(instance, function (instance, progress) {
              instance._methods.drawBodySegmentDonut(instance, data, values, {
                'type': instance.settings.appearance.subType,
                'updateOnly': true,
                'modifier': progress
              });
            });
          } // set text inside donut chart summary


          if (instance.settings.appearance.title.showSummary) {
            // count drawable segments in chart (visible and non-zero value segments)
            // draw svg text element and append it to the svg element
            var chartSummary = instance._methods.drawSvgText(instance, {
              'class': "".concat(instance._objPrefix, "summary"),
              'x': instance.settings.appearance.centerX,
              'y': instance.settings.appearance.isGauge ? instance.settings.appearance.centerY * 0.9 : instance.settings.appearance.centerY + 5
            });

            instance.settings.elements.summary = chartSummary;
            svgElement.appendChild(chartSummary);

            if (instance.settings.appearance.title.summaryTitle) {
              instance.settings.elements.summary.innerHTML = instance.settings.appearance.title.summaryTitle;
            } else {
              if (instance.settings.appearance.title.summarySegment !== null) {
                // if a summary segment id is given, show the percentage of that segment
                var segment = instance.settings.data[instance.settings.appearance.title.summarySegment];

                if (typeof segment !== 'undefined') {
                  var percentage = Math.round(segment.percentage * 10) / 10;
                  instance.settings.elements.summary.innerHTML = "".concat(percentage, "%");
                }
              } else {
                // if no summary segment id is specified, show the percentage of the segment with the greatest value
                var drawableSegments = instance._methods.getDrawableSegments(instance, data, true);

                if (drawableSegments.length) {
                  var _percentage = Math.round(drawableSegments[0].percentage * 10) / 10;

                  instance.settings.elements.summary.innerHTML = "".concat(_percentage, "%");
                }
              }
            }
          }

          break;

        /* pie chart */

        case 'pie':
          graphData = instance._methods.drawBodyBasePie(instance);
          svg = graphData['svg'];
          segments = instance._methods.drawBodySegmentPie(instance, data, values);
          svgElement = instance.settings.elements.body[0].appendChild(svg); // animation loop

          if (instance.settings.appearance.animated) {
            instance._methods.animationLoop(instance, function (instance, progress) {
              instance._methods.drawBodySegmentPie(instance, data, values, {
                'updateOnly': true,
                'modifier': progress
              });
            });
          }

          break;

        case 'bar':
          graphData = instance._methods.drawBodyBaseBar(instance);
          svg = graphData['svg'];
          segments = instance._methods.drawBodySegmentBar(instance, data, values);
          svgElement = instance.settings.elements.body[0].appendChild(svg);
          svgElement.appendChild(graphData['background']);

          if (graphData['markers'].group !== null) {
            var markersGroup = graphData['markers'].group;

            for (var index in graphData['markers'].markers) {
              if (graphData['markers'].markers.hasOwnProperty(index)) {
                markersGroup.appendChild(graphData['markers'].markers[index]);
              }
            }

            svgElement.appendChild(markersGroup);
          } // animation loop


          if (instance.settings.appearance.animated) {
            instance._methods.animationLoop(instance, function (instance, progress) {
              instance._methods.drawBodySegmentBar(instance, data, values, {
                'updateOnly': true,
                'modifier': progress
              });
            });
          } // set text inside donut chart summary


          if (instance.settings.appearance.title.showSummary) {
            // count drawable segments in chart (visible and non-zero value segments)
            // draw svg text element and append it to the svg element
            instance.settings.elements.summary = [];
            var summaryOffsetX = 0;

            for (var item in data) {
              if (data.hasOwnProperty(item)) {
                var _segment2 = data[item];

                var _chartSummary = instance._methods.drawSvgText(instance, {
                  'class': "".concat(instance._objPrefix, "summary"),
                  'x': "".concat(_segment2['percentage'] / 2 + summaryOffsetX, "%"),
                  'y': '50%'
                });

                summaryOffsetX += _segment2['percentage'];
                instance.settings.elements.summary.push(_chartSummary);
                svgElement.appendChild(_chartSummary);

                if (instance.settings.appearance.title.summarySegment !== null) {
                  // if a summary segment id is given, show the percentage of that segment
                  var _segment3 = instance.settings.data[instance.settings.appearance.title.summarySegment];

                  if (typeof _segment3 !== 'undefined') {
                    var _percentage2 = Math.round(_segment3.percentage * 10) / 10;

                    _chartSummary.innerHTML = "".concat(_percentage2, "%");
                  }
                } else {
                  // if no summary segment id is specified, show the percentage of the segment with the greatest value
                  var _drawableSegments = instance._methods.getDrawableSegments(instance, data, true);

                  var _percentage3 = Math.round(_drawableSegments[0].percentage * 10) / 10;

                  _chartSummary.innerHTML = "".concat(_percentage3, "%");
                }
              }
            }
          }

          break;

        default:
          break;
      }
      /* ******* jQuery element in settings.elements array approach ******* */
      // for (const segment in segments) {
      //     if (segments.hasOwnProperty(segment)) {
      //         const segmentElement = svgElement.appendChild(segments[segment]);
      //         instance.settings.elements.segments.push({data_id: instance.settings.elements.segments.length, element: $(segmentElement)});
      //     }
      // }

      /* ******* jQuery element in settings.data array approach ******* */


      var group = svgElement.appendChild(instance._methods.drawGroup(instance));

      for (var _item in data) {
        if (data.hasOwnProperty(_item)) {
          var _segment4 = data[_item]['element'];

          if (typeof _segment4 !== 'undefined' && typeof _segment4.nodeType !== 'undefined') {
            var segmentElement = group.appendChild(_segment4); //svgElement.appendChild(segment);

            var $segmentElement = $(segmentElement);
            data[_item]['element'] = $segmentElement;
            instance.settings.elements.segments.push($segmentElement);
          }
        }
      }

      instance.settings.elements.svg = svgElement;
      instance.settings.elements.group = $(group);
    },
    addEventListeners: function addEventListeners(instance) {
      /* ******* jQuery element in settings.data array approach ******* */
      var items = instance.settings.data;

      for (var item in items) {
        if (items.hasOwnProperty(item)) {
          var segment = items[item]['element'];

          if (typeof segment !== 'undefined') {
            segment.on('mouseover', function () {
              var $this = $(this); // todo: remake the instance getting
              //const instance = $this.closest('.' + instance._nameLower).parent().data('plugin_' + instance._name);

              var dId = $this.attr('d-id');
              $this.removeClass('active');
              $this.addClass('active');

              switch (instance.settings.appearance.type) {
                /* donut chart */
                case 'donut':
                  switch (instance.settings.appearance.subType) {
                    /* donut chart - circle */
                    case 'circle':
                      $this.css('stroke', instance.settings.data[dId]['color']['active']);
                      break;

                    /* donut chart - path */

                    case 'path':
                      $this.css('fill', instance.settings.data[dId]['color']['active']);
                      break;
                  }

                  break;

                /* pie chart */

                case 'pie':
                  $this.css('fill', instance.settings.data[dId]['color']['active']);
                  break;

                /* bar chart */

                case 'bar':
                  $this.css('fill', instance.settings.data[dId]['color']['active']);
                  break;
              } // On Segment Mouseover callback


              if (instance.settings.callbacks.onSegmentMouseover && $.isFunction(instance.settings.callbacks.onSegmentMouseover)) {
                instance.settings.callbacks.onSegmentMouseover.call(instance, dId, instance.settings.data[dId]);
              }
            });
            segment.on('mouseout', function () {
              var $this = $(this); // todo: remake the instance getting
              //const instance = $this.closest('.' + instance._nameLower).parent().data('plugin_' + instance._name);

              var dId = $this.attr('d-id');
              $this.removeClass('active');

              switch (instance.settings.appearance.type) {
                /* donut chart */
                case 'donut':
                  switch (instance.settings.appearance.subType) {
                    /* donut chart - circle */
                    case 'circle':
                      $this.css('stroke', '');
                      break;

                    /* donut chart - path */

                    case 'path':
                      $this.css('fill', '');
                      break;
                  }

                  break;

                /* pie chart */

                case 'pie':
                  $this.css('fill', '');
                  break;

                /* bar chart */

                case 'bar':
                  $this.css('fill', '');
                  break;
              } // On Segment Mouseout callback


              if (instance.settings.callbacks.onSegmentMouseout && $.isFunction(instance.settings.callbacks.onSegmentMouseout)) {
                instance.settings.callbacks.onSegmentMouseout.call(instance, instance.settings.data[dId], instance.settings.data[dId]);
              }
            });
          }
        }
      }
      /* ******* jQuery element in settings.elements array approach ******* */
      // const segments = instance.settings.elements.segments;
      // for (const segment in segments) {
      //     if (segments.hasOwnProperty(segment)) {
      //         const data = instance.settings.data[segments[segment]['data_id']];
      //         const $element = segments[segment]['element'];
      //         $element.on('mouseover', function () {
      //             const $this = $(this);
      //             $element.removeClass('active');
      //             $this.addClass('active');
      //             $this.css('fill', data['color']['active']);
      //         });
      //         $element.on('mouseout', function () {
      //             const $this = $(this);
      //             $this.removeClass('active');
      //             $this.css('fill', '');
      //         });
      //     }
      // }

    },

    /* DONUT */
    drawBodyBaseDonut: function drawBodyBaseDonut(instance, options) {
      var defaults = {
        type: 'circle',
        // ['path', 'circle']
        isGauge: instance.settings.appearance.isGauge,
        // gauge chart for donut chart (top half of the circle only)
        centerX: instance.settings.appearance.centerX,
        centerY: instance.settings.appearance.isGauge ? instance.settings.appearance.centerY / 2 : instance.settings.appearance.centerY
      };
      var settings = $.extend(true, {}, defaults, options);
      var response = {};
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('class', instance._objPrefix + 'donut');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', "0 0 ".concat(settings.centerX * 2, " ").concat(settings.centerY * 2)); // double cx and cy

      svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
      /* common vars */

      var donutRing;

      switch (settings.type) {
        case 'circle':
          /* -------- Method 1 - Circle -------- */
          donutRing = instance._methods.drawSvgCircle(instance, {
            class: instance._objPrefix + 'donut__ring' + instance._objPrefix + 'donut__ring-circle',
            fill: instance.settings.appearance.baseColor,
            stroke: instance.settings.appearance.baseColor,
            'stroke-width': instance.settings.appearance.baseStrokeWidth
          });
          var donutHole = null; // const donutHole = instance._methods.drawSvgCircle(instance, {
          //     class: instance._objPrefix + 'donut__hole'
          // });

          response = {
            'svg': svg,
            'ring': donutRing,
            'hole': donutHole
          };
          break;

        case 'path':
          /* -------- Method 2 - Path - Arc and Line -------- */
          var baseDoughnutRadius = instance.settings.appearance.radius + instance.settings.appearance.baseStrokeWidth; // + instance.settings.appearance.baseOffset;

          var cutoutRadius = instance.settings.appearance.radius * instance.settings.appearance.innerCutout;
          var baseCutoutRadius = cutoutRadius - instance.settings.appearance.baseStrokeWidth; // - instance.settings.appearance.baseOffset;

          var rad = settings.isGauge ? Math.PI : Math.PI * 2; // 180deg : 360deg
          //Calculate values for the path.
          //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.

          var startRadius = -rad,
              // -1.570
          segmentAngle = 99.9999 / 100 * rad,
              // 6.2831, // 1 * ((99.9999/100) * (PI*2)),
          endRadius = startRadius + segmentAngle,
              // 4.7131
          startX = instance.settings.appearance.centerX + Math.cos(startRadius) * baseDoughnutRadius,
              startY = instance.settings.appearance.centerY + Math.sin(startRadius) * baseDoughnutRadius,
              endX = instance.settings.appearance.centerX + Math.cos(endRadius) * baseDoughnutRadius,
              endY = instance.settings.appearance.centerY + Math.sin(endRadius) * baseDoughnutRadius,
              startX2 = instance.settings.appearance.centerX + Math.cos(endRadius) * baseCutoutRadius,
              startY2 = instance.settings.appearance.centerY + Math.sin(endRadius) * baseCutoutRadius,
              endX2 = instance.settings.appearance.centerX + Math.cos(startRadius) * baseCutoutRadius,
              endY2 = instance.settings.appearance.centerY + Math.sin(startRadius) * baseCutoutRadius;
          var cmd = ['M', startX, startY, 'A', baseDoughnutRadius, baseDoughnutRadius, 0, 1, 1, endX, endY, 'L', startX2, startY2, 'A', baseCutoutRadius, baseCutoutRadius, 0, 1, 0, endX2, endY2, // reverse
          'Z'];
          donutRing = instance._methods.drawSvgPath(instance, {
            class: "".concat(instance._objPrefix, "donut__ring ").concat(instance._objPrefix, "donut__ring-path"),
            fill: instance.settings.appearance.baseColor,
            d: cmd.join(' ')
          });
          response = {
            'svg': svg,
            'ring': donutRing
          };
          break;
      }

      return response;
    },
    drawBodySegmentDonut: function drawBodySegmentDonut(instance, data, values, options) {
      var defaults = {
        type: 'circle',
        // ['path', 'circle']
        isGauge: instance.settings.appearance.isGauge,
        // gauge chart for donut chart (top half of the circle only)
        updateOnly: false,
        modifier: 1,
        drawableSegments: instance._methods.getDrawableSegments(instance, data).length
      };
      var settings = $.extend(true, {}, defaults, options);
      var segments = [];
      data = instance.settings.data;
      /* common vars */

      var gap = settings.drawableSegments > 1 || settings.isGauge ? instance.settings.appearance.gap : 0.00001; // gap between segments. Set to that number because 0 causes unwanted behavior.

      switch (settings.type) {
        case 'circle':
          /* -------- Method 1 - Circle -------- */
          var base_offset = 25; // base offset set to 25 to make the chart start from the top

          var offset = 0; //offset for dashoffset parameter, increased after every segment is drawn and supplied to dashoffset parameter for the next segment
          // const gap = instance.settings.appearance.gap; // gap between segments

          for (var segment in data) {
            if (data.hasOwnProperty(segment)) {
              var local_offset = 100 - data[segment]['percentage'] * settings.modifier; // draw the segment only if it's set to be drawn and its data value is greater than 0

              if (data[segment]['draw'] === true && data[segment]['value'] > 0) {
                // svg settings for both draw and update
                var svgCircleOptions = {};
                var drawOnly = false;
                var element = null; // format the segment title

                var titlePartials = {
                  'segmentTitle': data[segment]['title'],
                  'segmentValue': instance._methods.numberFormat(data[segment]['value'], 0, ',', '\xa0'),
                  'segmentPercentage': Math.round(data[segment]['percentage'] * 10) / 10
                };
                var title = titlePartials.segmentTitle;

                if (instance.settings.appearance.title.showValue && instance.settings.appearance.title.showPercentage) {
                  title += ": ".concat(titlePartials.segmentValue, " (").concat(titlePartials.segmentPercentage, "%)");
                } else if (instance.settings.appearance.title.showValue) {
                  title += ": ".concat(titlePartials.segmentValue);
                } else if (instance.settings.appearance.title.showPercentage) {
                  title += ": ".concat(titlePartials.segmentPercentage, "%");
                } //


                if (settings.updateOnly) {
                  drawOnly = true;
                  element = data[segment]['element'][0]; // svg settings for only update

                  svgCircleOptions = {
                    fill: 'transparent',
                    stroke: data[segment]['color']['normal'],
                    'stroke-width': data[segment]['strokeWidth'],
                    'stroke-dasharray': Math.max(data[segment]['percentage'] * settings.modifier - gap, 0) + ' ' + (local_offset + gap),
                    // '85 15',
                    'stroke-dashoffset': base_offset + offset
                  };
                } else {
                  // svg settings for only draw
                  svgCircleOptions = {
                    'd-id': segment,
                    class: "".concat(instance._objPrefix, "donut__segment ").concat(instance._objPrefix, "donut__segment-circle"),
                    title: title,
                    fill: 'transparent',
                    stroke: data[segment]['color']['normal'],
                    'stroke-width': data[segment]['strokeWidth'],
                    'stroke-dasharray': Math.max(data[segment]['percentage'] * settings.modifier - gap, 0) + ' ' + (local_offset + gap),
                    // '85 15',
                    'stroke-dashoffset': base_offset + offset
                  };
                }

                var donutSegment = instance._methods.drawSvgCircle(instance, svgCircleOptions, drawOnly, element);

                if (!settings.updateOnly) {
                  /* ******* jQuery element in settings.data array approach ******* */
                  data[segment]['element'] = donutSegment;
                  segments.push(donutSegment);
                }
              }

              if (data[segment]['push'] === true) {
                offset += local_offset;
              }
            }
          }

          break;

        case 'path':
          /* -------- Method 2 - Path - Arc and Line -------- */
          var doughnutRadius = instance.settings.appearance.radius;
          var cutoutRadius = doughnutRadius * instance.settings.appearance.innerCutout;
          var centerX = instance.settings.appearance.centerX;
          var centerY = instance.settings.appearance.centerY;
          var startAngle = settings.isGauge ? Math.PI : Math.PI / 2; // 180deg : 90deg

          var rad = settings.isGauge ? Math.PI : Math.PI * 2; // 360deg
          // const gap = instance.settings.appearance.gap; // gap between segments

          var gapPercent = gap / 100;
          var gapForSegment = gapPercent; // distribute gap evenly between all segments. One gap percentage is added to offset for startRadius gap.

          var startRadius = -startAngle; // -90 degree

          if (settings.isGauge) {
            startRadius += gapPercent * startAngle; // add an additional gap before the first segment

            gapForSegment += gapPercent / settings.drawableSegments; // distribute the additional gap before the first segment between all segments - divide the gap by the segment count and deduct that part from each segment's percentage
          } // draw each path


          for (var _segment5 in data) {
            if (data.hasOwnProperty(_segment5)) {
              var gapAngle = gapPercent * rad,
                  segmentAngle = settings.modifier * (Math.max(data[_segment5]['percentage_raw'] - gapForSegment, 0) * rad),
                  endRadius = startRadius + segmentAngle,
                  largeArc = (endRadius - startRadius) % rad > Math.PI ? 1 : 0,
                  startX = centerX + Math.cos(startRadius) * doughnutRadius,
                  startY = centerY + Math.sin(startRadius) * doughnutRadius,
                  endX = centerX + Math.cos(endRadius) * doughnutRadius,
                  endY = centerY + Math.sin(endRadius) * doughnutRadius,
                  startX2 = centerX + Math.cos(endRadius) * cutoutRadius,
                  startY2 = centerY + Math.sin(endRadius) * cutoutRadius,
                  endX2 = centerX + Math.cos(startRadius) * cutoutRadius,
                  endY2 = centerY + Math.sin(startRadius) * cutoutRadius; // draw the segment only if it's set to be drawn and its data value is greater than 0

              if (data[_segment5]['draw'] === true && data[_segment5]['value'] > 0 && segmentAngle > 0) {
                var cmd = ['M', startX, startY, // Move pointer
                'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY, // Draw outer arc path
                'L', startX2, startY2, // Draw line path (this line connects outer and innner arc paths)
                'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2, // Draw inner arc path
                'Z' // Close path
                ]; // svg settings for both draw and update

                var svgPathOptions = {};
                var _drawOnly = false;
                var _element = null; // format the segment title

                var _titlePartials = {
                  'segmentTitle': data[_segment5]['title'],
                  'segmentValue': instance._methods.numberFormat(data[_segment5]['value'], 0, ',', '\xa0'),
                  'segmentPercentage': Math.round(data[_segment5]['percentage'] * 10) / 10
                };
                var _title = _titlePartials.segmentTitle;

                if (instance.settings.appearance.title.showValue && instance.settings.appearance.title.showPercentage) {
                  _title += ": ".concat(_titlePartials.segmentValue, " (").concat(_titlePartials.segmentPercentage, "%)");
                } else if (instance.settings.appearance.title.showValue) {
                  _title += ": ".concat(_titlePartials.segmentValue);
                } else if (instance.settings.appearance.title.showPercentage) {
                  _title += ": ".concat(_titlePartials.segmentPercentage, "%");
                } //
                // update only settings


                if (settings.updateOnly) {
                  _drawOnly = true;
                  _element = data[_segment5]['element'][0]; // svg settings for only update

                  svgPathOptions = {
                    fill: data[_segment5]['color']['normal'],
                    stroke: 'transparent',
                    'stroke-width': data[_segment5]['strokeWidth'],
                    d: cmd.join(' ')
                  };
                } else {
                  // svg settings for only draw
                  svgPathOptions = {
                    'd-id': _segment5,
                    class: "".concat(instance._objPrefix, "donut__segment ").concat(instance._objPrefix, "donut__segment-path"),
                    title: _title,
                    fill: data[_segment5]['color']['normal'],
                    stroke: 'transparent',
                    'stroke-width': data[_segment5]['strokeWidth'],
                    d: cmd.join(' ')
                  };
                }

                var _donutSegment = instance._methods.drawSvgPath(instance, svgPathOptions, _drawOnly, _element);

                if (!settings.updateOnly) {
                  /* ******* jQuery element in settings.data array approach ******* */
                  data[_segment5]['element'] = _donutSegment;
                  segments.push(_donutSegment);
                }
              }

              if (data[_segment5]['push'] === true && segmentAngle > 0) {
                startRadius += segmentAngle + gapAngle;
              }
            }
          }

          break;
      }

      return segments;
    },

    /* PIE */
    drawBodyBasePie: function drawBodyBasePie(instance) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('class', "".concat(instance._objPrefix, "pie"));
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', '-1 -1 2 2'); // -1 -1 for the offset so that the center point of the circle will be the start for sin and cos functions. 2 2 to simplify the calculations (center at [1,1])

      svg.setAttribute('style', 'transform: rotate(-0.25turn)'); //rotate 25% counter-clockwise so the start point is at the top

      svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
      return {
        'svg': svg
      };
    },
    drawBodySegmentPie: function drawBodySegmentPie(instance, data, values, options) {
      var defaults = {
        updateOnly: false,
        modifier: 1,
        drawableSegments: instance._methods.getDrawableSegments(instance, data).length
      };
      var settings = $.extend(true, {}, defaults, options);
      var segments = [];
      /* common vars */

      var gap = 0.00001;
      var baseGap = 0; // gap base value

      if (instance.settings.appearance.gap && settings.drawableSegments > 1) {
        gap = instance.settings.appearance.gap;
        baseGap = gap * 0.1;
      } // const gap = (settings.drawableSegments > 1) ? instance.settings.appearance.gap : 0.00001; // gap between segments. Set to that number because 0 causes unwanted behavior.


      var base_offset = 0; // base offset set to 0 to make the chart start from the top

      var offset = 0; // offset for the next segment

      var gapPercent = gap / 100;

      for (var segment in data) {
        if (data.hasOwnProperty(segment)) {
          var percentage = settings.modifier * data[segment]['percentage_raw']; // draw the segment only if it's set to be drawn and its data value is greater than 0

          if (data[segment]['draw'] === true && data[segment]['value'] > 0) {
            var startCoordinates = instance._methods.getCoordinatesForPercent(1, base_offset + offset + gapPercent);

            var endCoordinates = instance._methods.getCoordinatesForPercent(1, base_offset + offset + percentage - gapPercent);

            var largeArcFlag = settings.modifier * data[segment]['percentage_raw'] > .5 ? 1 : 0; // start and end for gap

            var gapCoordinatesStart = instance._methods.getCoordinatesForPercent(baseGap + gapPercent, base_offset + offset + gapPercent);

            var gapCoordinatesEnd = instance._methods.getCoordinatesForPercent(baseGap + gapPercent, base_offset + offset + percentage - gapPercent);

            var gapCoordinatesCenter = {
              x: (gapCoordinatesStart['x'] + gapCoordinatesEnd['x']) / 2,
              y: (gapCoordinatesStart['y'] + gapCoordinatesEnd['y']) / 2
            }; // /gap

            var pathData = ["M ".concat(startCoordinates['x'], " ").concat(startCoordinates['y']), "A 1 1 0 ".concat(largeArcFlag, " 1 ").concat(endCoordinates['x'], " ").concat(endCoordinates['y']), "L ".concat(gapCoordinatesCenter['x'], " ").concat(gapCoordinatesCenter['y'])].join(' '); // svg settings for both draw and update

            var svgPathOptions = {};
            var drawOnly = false;
            var element = null;

            if (settings.updateOnly) {
              drawOnly = true;
              element = data[segment]['element'][0]; // svg settings for only update

              svgPathOptions = {
                fill: data[segment]['color']['normal'],
                d: pathData
              };
            } else {
              // svg settings for only draw
              svgPathOptions = {
                'd-id': segment,
                class: "".concat(instance._objPrefix, "pie__segment"),
                fill: data[segment]['color']['normal'],
                d: pathData
              };
            }

            var pieSegment = instance._methods.drawSvgPath(instance, svgPathOptions, drawOnly, element);

            if (!settings.updateOnly) {
              /* ******* jQuery element in settings.data array approach ******* */
              data[segment]['element'] = pieSegment;
              segments.push(pieSegment);
            }

            offset += percentage;
          } else {
            if (data[segment]['push'] === true) {
              offset += percentage + gapPercent;
            }
          }
        }
      }

      return segments;
    },

    /* BAR */
    drawBodyBaseBar: function drawBodyBaseBar(instance) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('class', "".concat(instance._objPrefix, "bar"));
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', '0 0 100 10'); // 100 width and 10 height

      svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

      var background = instance._methods.drawSvgRect(instance, {
        fill: instance.settings.appearance.baseColor
      }, false, null);

      var markers = {
        group: null,
        markers: null
      };

      if (instance.settings.appearance.showMarkers) {
        markers.markers = [];
        markers.group = instance._methods.drawGroup(instance, {
          class: "".concat(instance._objPrefix, "markers")
        });
        var markerCount = instance.settings.appearance.markerCount;

        for (var i = 0; i <= markerCount; i++) {
          var markerWidth = instance.settings.appearance.markerWidth,
              markerOffsetX = i * (100 / markerCount); // check if the current iteration is the last marker

          markerOffsetX -= i === markerCount ? markerWidth : 0; // check if the current iteration is the first or the last marker
          // only apply half marker width modifier for the middle markers

          markerOffsetX -= i === 0 || i === markerCount ? 0 : markerWidth / 2;

          var marker = instance._methods.drawSvgRect(instance, {
            width: markerWidth,
            height: '125%',
            x: markerOffsetX,
            fill: instance.settings.appearance.markerColor
          });

          markers.markers.push(marker);
        }
      }

      instance.settings.elements.markers = markers;
      return {
        'svg': svg,
        'background': background,
        'markers': markers
      };
    },
    drawBodySegmentBar: function drawBodySegmentBar(instance, data, values, options) {
      var defaults = {
        updateOnly: false,
        modifier: 1
      };
      var settings = $.extend(true, {}, defaults, options);
      var segments = [];
      var base_offset = 0; // base offset set to 0 to make the chart start from the left

      var offset = 0; //offset for the next segment

      for (var segment in data) {
        if (data.hasOwnProperty(segment)) {
          // draw the segment only if it's set to be drawn and its data value is greater than 0
          if (data[segment]['draw'] === true && data[segment]['value'] > 0) {
            var startCoordinates = base_offset + offset;
            var width = data[segment]['percentage'] * settings.modifier;
            offset += data[segment]['percentage'] * settings.modifier; // svg settings for both draw and update

            var svgRectOptions = {};
            var drawOnly = false;
            var element = null;

            if (settings.updateOnly) {
              drawOnly = true;
              element = data[segment]['element'][0]; // svg settings for only update

              svgRectOptions = {
                width: width,
                x: "".concat(startCoordinates, "%"),
                fill: data[segment]['color']['normal']
              };
            } else {
              // svg settings for only draw
              svgRectOptions = {
                'd-id': segment,
                class: "".concat(instance._objPrefix, "bar__segment"),
                width: width,
                x: "".concat(startCoordinates, "%"),
                fill: data[segment]['color']['normal']
              };
            }

            var barSegment = instance._methods.drawSvgRect(instance, svgRectOptions, drawOnly, element);

            if (!settings.updateOnly) {
              /* ******* jQuery element in settings.data array approach ******* */
              data[segment]['element'] = barSegment;
              segments.push(barSegment);
            }
          } else {
            if (data[segment]['push'] === true) {
              offset += data[segment]['percentage_raw'];
            }
          }
        }
      }

      return segments;
    },

    /* --- SVG helpers--- */
    drawGroup: function drawGroup(instance, options) {
      var defaults = {
        'class': ''
      };
      var settings = $.extend(true, {}, defaults, options);
      var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      for (var attribute in settings) {
        if (settings.hasOwnProperty(attribute) && settings[attribute] !== '' && settings[attribute] !== 0) {
          group.setAttributeNS(null, attribute, settings[attribute]);
        }
      }

      return group;
    },
    drawSvgCircle: function drawSvgCircle(instance, options) {
      var updateOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var defaults = {
        'class': '',
        'cx': instance.settings.appearance.centerX,
        // half of viewbox
        'cy': instance.settings.appearance.centerY,
        // half of viewbox
        'r': instance.settings.appearance.radius,
        // 15.91549430918954
        'fill': '#fff',
        'stroke': '',
        // #000
        'stroke-width': instance.settings.appearance.strokeWidth,
        'stroke-dasharray': '',
        'stroke-dashoffset': '25' // Circumference − All preceding segments’ total length + First segment’s offset = Current segment offset

      };
      var settings = $.extend(true, {}, defaults, options);
      var nCircle = element;

      if (!updateOnly) {
        nCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      }

      for (var attribute in settings) {
        if (settings.hasOwnProperty(attribute) && settings[attribute] !== '' && settings[attribute] !== 0) {
          nCircle.setAttributeNS(null, attribute, settings[attribute]);
        }
      }

      return nCircle;
    },
    drawSvgRect: function drawSvgRect(instance, options) {
      var updateOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var defaults = {
        'width': '100%',
        'height': '100%',
        'x': 0,
        'y': 0,
        'rx': instance.settings.appearance.rx,
        'ry': instance.settings.appearance.ry,
        'class': '',
        'fill': '#fff',
        'stroke': '',
        // #000
        'stroke-width': 0
      };
      var settings = $.extend(true, {}, defaults, options);
      var nRect = element;

      if (!updateOnly) {
        nRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      }

      for (var attribute in settings) {
        if (settings.hasOwnProperty(attribute) && settings[attribute] !== '' && settings[attribute] !== 0) {
          nRect.setAttributeNS(null, attribute, settings[attribute]);
        }
      }

      return nRect;
    },
    drawSvgPath: function drawSvgPath(instance, options) {
      var updateOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var defaults = {
        'class': '',
        'fill': '#fff',
        'd': '',
        'stroke': '',
        // #000
        'stroke-width': 0,
        'stroke-dasharray': '',
        'stroke-dashoffset': 0 // Circumference − All preceding segments’ total length + First segment’s offset = Current segment offset

      };
      var settings = $.extend(true, {}, defaults, options);
      var nPath = element;

      if (!updateOnly) {
        nPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      }

      for (var attribute in settings) {
        if (settings.hasOwnProperty(attribute) && settings[attribute] !== '' && settings[attribute] !== 0) {
          nPath.setAttributeNS(null, attribute, settings[attribute]);
        }
      }

      return nPath;
    },
    drawSvgText: function drawSvgText(instance, options) {
      var updateOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var defaults = {
        'class': '',
        'x': 0,
        'y': 0,
        'alignment-baseline': 'middle',
        'text-anchor': 'middle'
      };
      var settings = $.extend(true, {}, defaults, options);
      var nElement = element;

      if (!updateOnly) {
        nElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      }

      for (var attribute in settings) {
        if (settings.hasOwnProperty(attribute) && settings[attribute] !== '' && settings[attribute] !== 0) {
          nElement.setAttributeNS(null, attribute, settings[attribute]);
        }
      }

      return nElement;
    },
    getCoordinatesForPercent: function getCoordinatesForPercent(radius, percent) {
      var x = radius * Math.cos(2 * Math.PI * percent);
      var y = radius * Math.sin(2 * Math.PI * percent);
      return {
        x: x,
        y: y
      };
    },
    getDrawableSegments: function getDrawableSegments(instance, data) {
      var sortByValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var drawableSegments = data.filter(function (segment) {
        return segment.draw === true && segment.percentage_raw > 0;
      });

      if (sortByValue) {
        drawableSegments.sort(function (a, b) {
          return a.value < b.value;
        });
        drawableSegments.sort();
      }

      return drawableSegments;
    },

    /*
     * Input: ([R, G, B], -100~100)
     * ([135, 10, 0], -50)
     */
    lightenRgbColors: function lightenRgbColors(c, n) {
      var d;

      for (var i = 3; i--; c[i] = d < 0 ? 0 : d > 255 ? 255 : d | 0) {
        d = c[i] + n;
      }

      return c;
    },

    /* --- /SVG helpers--- */
    animationLoop: function animationLoop(instance, callback) {
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
      var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var time = {
        start: performance.now(),
        total: duration
      };

      var easeOut = function easeOut(progress) {
        return Math.pow(--progress, 3) + 1;
      };

      var tick = function tick(now) {
        time.elapsed = now - time.start;
        var progress_raw = time.elapsed / time.total;
        var eased = 1;
        var progress = progress_raw;
        if (easing) progress = easeOut(progress);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        callback.apply(instance, [instance, progress]);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    },

    /* ------------------------------ STRUCTURE ------------------------------- */
    GetInstance: function GetInstance(instance) {
      instance._methods.Log(instance, instance);
    },
    Destroy: function Destroy(instance) {
      instance.settings.elements.container.remove();
      $.removeData(instance.$element, "plugin_" + instance._name);
    },

    /*
     * Use this function to only update values of current segments, e.g. swapping the value of segment 1 from '100' to '3000'.
     * This will not draw the segments from scratch, so if the number of segment changes, use the Refresh function instead.
     */
    Update: function Update(instance) {
      // calculate data values required to draw the graph
      instance._methods.calculateDataValues(instance); // update the graph segments


      var data = instance.settings.data;
      var values = instance.settings.values;

      switch (instance.settings.appearance.type) {
        /* donut chart */
        case 'donut':
          // animation loop
          if (instance.settings.appearance.animated) {
            instance._methods.animationLoop(instance, function (instance, progress) {
              instance._methods.drawBodySegmentDonut(instance, data, values, {
                'type': instance.settings.appearance.subType,
                'updateOnly': true,
                'modifier': progress
              });
            });
          }

          break;

        /* pie chart */

        case 'pie':
          // animation loop
          if (instance.settings.appearance.animated) {
            instance._methods.animationLoop(instance, function (instance, progress) {
              instance._methods.drawBodySegmentPie(instance, data, values, {
                'updateOnly': true,
                'modifier': progress
              });
            });
          }

          break;

        default:
          break;
      }
    },

    /*
     * Use this function to draw a new set of data. This will redraw all the segments from scratch.
     * Needed when a change of number of segments occurs.
     */
    Refresh: function Refresh(instance) {
      instance._methods.initElement(instance); // On Init callback


      if (instance.settings.callbacks.onRefresh && $.isFunction(instance.settings.callbacks.onRefresh)) {
        instance.settings.callbacks.onRefresh.call(instance);
      }
    },

    /* ------------------------------ HELPERS ------------------------------- */
    Log: function Log(instance, message) {
      console.log('*** ' + instance._name + ' ***');

      if (message instanceof Array) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = message[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;
            console.log(value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        console.log(message);
      }
    },

    /*
     * Sort an array containing DOM elements by their position in the document (top to bottom)
     */
    objSortByPositionInDOM: function objSortByPositionInDOM(input, attr, attr2) {
      //sort by position in DOM
      var _input = input;
      var output;

      if (attr && attr2) {
        output = _input.sort(function (a, b) {
          if (a[attr][attr2][0] === b[attr][attr2][0]) return 0;

          if (!a[attr][attr2][0].compareDocumentPosition) {
            // support for IE8 and below
            return a[attr][attr2][0].sourceIndex - b[attr][attr2][0].sourceIndex;
          }

          if (a[attr][attr2][0].compareDocumentPosition(b[attr][attr2][0]) & 2) {
            // b comes before a
            return 1;
          }

          return -1;
        });
      } else if (attr) {
        output = _input.sort(function (a, b) {
          if (a[attr][0] === b[attr][0]) return 0;

          if (!a[attr][0].compareDocumentPosition) {
            // support for IE8 and below
            return a[attr][0].sourceIndex - b[attr][0].sourceIndex;
          }

          if (a[attr][0].compareDocumentPosition(b[attr][0]) & 2) {
            // b comes before a
            return 1;
          }

          return -1;
        });
      } else {
        output = _input.sort(function (a, b) {
          if (a[0] === b[0]) return 0;

          if (!a[0].compareDocumentPosition) {
            // support for IE8 and below
            return a[0].sourceIndex - b[0].sourceIndex;
          }

          if (a[0].compareDocumentPosition(b[0]) & 2) {
            // b comes before a
            return 1;
          }

          return -1;
        });
      }

      return output;
    },
    numberFormat: function numberFormat(number, decimals, dec_point, thousands_sep) {
      // Strip all characters but numerical ones.
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

      var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
          dec = typeof dec_point === 'undefined' ? '.' : dec_point,
          s = '',
          toFixedFix = function toFixedFix(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      }; // Fix for IE parseFloat(0.55).toFixed(0) = 0;


      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }

      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      }

      return s.join(dec);
    }
  }; // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  // default outside method call: pluginInstance._methods.nameOfAnInnerFunction(pluginInstance, arg1, arg2...);

  $.fn[pluginName] = function (options) {
    var instances = [];
    this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        var instance = new Plugin(this, options);
        $.data(this, "plugin_" + pluginName, instance);
        instances.push(instance);
      }
    });

    if (instances.length === 1) {
      return instances[0];
    }

    return null;
  };
})($, window, document);

/***/ }),

/***/ "./dev/jsPlugins/stepbar.js":
/*!**********************************!*\
  !*** ./dev/jsPlugins/stepbar.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Edited by whiteGloom
(function ($) {
  var fillCircle = function fillCircle(x, y, s, color, ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, s / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  $.fn.stepbar = function (opts) {
    var items = opts.items || [];
    var color = opts.color || '#e5e5e5';
    var fontColor = opts.fontColor || '#888888';
    var selectedColor = opts.selectedColor || '#e75735';
    var selectedFontColor = opts.selectedFontColor || '#fff';
    var current = opts.current || 1;
    var stepBulletSize = 29;
    var fontSize = 14;
    var me = $(this);
    var w = me.width();
    var canvas = document.createElement('canvas');
    $(canvas).appendTo(me);
    var layer1 = canvas.getContext('2d');
    var canvas2 = document.createElement('canvas');
    var layer2 = canvas2.getContext('2d');
    $([canvas, canvas2]).each(function () {
      $(this).attr('width', w);
      $(this).attr('height', 50);
      $(this).css({
        'width': '100%'
      });
    });
    var stepSize = Math.floor((w - stepBulletSize) / (items.length - 1));
    var stepMiddle = stepBulletSize / 2;

    for (var i = 0; i < items.length; i++) {
      var thisX = i * stepSize + stepMiddle;
      var thisY = 20; // Draw the bullet
      // Background

      fillCircle(thisX, thisY, stepBulletSize, color, layer2);
      layer2.fillStyle = fontColor; // Draw lines

      var lineHeight = stepBulletSize / 7;
      var lineWidth = Math.ceil(stepSize / 2);
      var lineTop = thisY - lineHeight / 2;
      var lineLeft = thisX - lineWidth;
      var lineRight = thisX;
      var selectedLineDelta = lineHeight * 0.7;
      var selectedLineTop = lineTop + selectedLineDelta / 2; // Left

      if (i !== 0) {
        layer1.fillStyle = color;
        layer1.fillRect(lineLeft, lineTop, lineWidth, lineHeight);

        if (i < current) {
          layer2.fillStyle = selectedColor;
          layer2.fillRect(lineLeft, lineTop, lineWidth, lineHeight);
        }
      } //Right 


      if (i < items.length - 1) {
        layer1.fillStyle = color;
        layer1.fillRect(lineRight, lineTop, lineWidth, lineHeight);

        if (i < current - 1) {
          layer2.fillStyle = selectedColor;
          layer2.fillRect(lineRight, lineTop, lineWidth, lineHeight);
        }
      } // Draw selected bullet


      if (i < current) {
        fillCircle(thisX, thisY, stepBulletSize, selectedColor, layer2);
        layer2.fillStyle = selectedFontColor;
      } // Text and number


      layer2.font = fontSize + 'px Lato-black';
      var iLabel = i + 1 + '';
      var metrics = layer2.measureText(iLabel);
      layer2.fillText(iLabel, thisX - metrics.width / 2, thisY + fontSize / 2.5);
      layer2.font = fontSize + 'px Lato-black';
      var metrics = layer2.measureText(items[i]);
      layer2.fillStyle = fontColor;
    }

    layer1.drawImage(canvas2, 0, 0);
  };
})($);

/***/ })

}]);