define("expand-toggleLink", [], function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ExpandToggle; });\n/* harmony import */ var ev_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ev-emitter */ \"./node_modules/ev-emitter/ev-emitter.js\");\n/* harmony import */ var ev_emitter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ev_emitter__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, \"prototype\", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n/**\n * Wrap the last X words in an HTML tag to prevent them from wrapping (i.e. orphans)\n * @param {HTMLElement} el - Toggle button DOM node\n * @param {Object} opts - Options\n * @param {string} [opts.expandedClasses=\"\"] - Class(es) to apply when expanded\n * @param {string} [opts.activeToggleText=\"\"] - Expanded state toggle button text\n * @param {boolean} [opts.shouldStartExpanded=false] - Whether menu should start expanded\n * @param {function} [opts.onReady=\"\"] - Ready callback function\n */\n\nvar ExpandToggle = /*#__PURE__*/function (_EventEmitter) {\n  _inherits(ExpandToggle, _EventEmitter);\n  var _super = _createSuper(ExpandToggle);\n  function ExpandToggle(el, opts) {\n    var _this;\n    _classCallCheck(this, ExpandToggle);\n    // Have to call super() first before referencing “this” since we’re extending EventEmitter\n    // https://stackoverflow.com/a/43591507/673457\n    _this = _super.call(this);\n    _this.el = el;\n    _this.targetId = _this.el.getAttribute(\"data-expands\");\n    _this.targetEl = document.getElementById(_this.targetId);\n    _this.targetParentEl = _this.targetEl.parentNode;\n\n    // Ensure target element exist before initializing\n    if (!_this.targetEl) {\n      console.warn(\"Can\\u2019t find expandable target with id \\u201C\".concat(_this.targetId, \"\\u201D\"));\n      return _possibleConstructorReturn(_this);\n    }\n\n    // Use Object.assign() to merge “opts” object with default values in this.options\n    _this.options = Object.assign({}, {\n      expandedClasses: \"\",\n      // string, accepts multiple space-separated classes\n      activeToggleText: \"\",\n      // expanded state toggle button text\n      shouldStartExpanded: false,\n      // component starts expanded on init\n      onReady: null // ready callback function\n    }, opts);\n\n    // Check for custom expanded class(es)\n    _this.expandedClasses = _this.el.getAttribute(\"data-expands-class\") || _this.options.expandedClasses;\n    if (_this.expandedClasses.length) {\n      // Check if active class string contains multiple classes\n      if (_this.expandedClasses.indexOf(\" \") > -1) {\n        // Convert to array and remove any empty string values\n        // caused by having multiple spaces in a row.\n        _this.expandedClasses = _this.expandedClasses.split(\" \").filter(function (n) {\n          return n.length;\n        });\n      } else {\n        // We still need to convert a single active class to an array\n        // so we can use the spread syntax later in classList.add()\n        _this.expandedClasses = [_this.expandedClasses];\n      }\n    }\n\n    // Check if component should start expanded\n    _this.shouldStartExpanded = _this.el.hasAttribute(\"data-expanded\") || _this.options.shouldStartExpanded;\n\n    // Check for custom toggle button text to use when expanded\n    _this.hasActiveText = false;\n    _this.textEl = _this.el.querySelector(\"[data-expands-text]\");\n    if (_this.textEl) {\n      _this.defaultToggleText = _this.textEl.textContent;\n      _this.activeToggleText = _this.textEl.getAttribute(\"data-expands-text\") || _this.options.activeToggleText;\n      _this.hasActiveText = !!_this.activeToggleText.length;\n    }\n    _this.init();\n    return _this;\n  }\n  _createClass(ExpandToggle, [{\n    key: \"init\",\n    value: function init() {\n      // Store state to avoid calling resize handler after component has been destroyed\n      this.hasInitialized = true;\n\n      // Accessibility setup\n      this.el.setAttribute(\"aria-haspopup\", true);\n      this.el.setAttribute(\"aria-expanded\", this.shouldStartExpanded);\n\n      // Omit “aria-controls” for now\n      // See https://inclusive-components.design/menus-menu-buttons/#ariacontrols\n      // this.el.setAttribute(\"aria-controls\", this.targetId);\n      this.targetEl.setAttribute(\"aria-hidden\", !this.shouldStartExpanded);\n      if (this.el.tagName.toLowerCase() === \"a\") {\n        this.el.setAttribute(\"role\", \"button\");\n      }\n\n      // Click event listener on toggle button\n      // Note: Callback needs to be assigned to a let so we can remove it since we’re using bind()\n      // https://stackoverflow.com/a/22870717/673457\n      this.clickHandler = this.toggle.bind(this);\n      this.el.addEventListener(\"click\", this.clickHandler);\n\n      // Keyboard listeners on toggle button\n      this.keydownHandler = this.keyboardEvents.bind(this);\n      this.el.addEventListener(\"keydown\", this.keydownHandler);\n\n      // Check for onReady callback\n      if (typeof this.options.onReady === \"function\") {\n        this.options.onReady();\n      }\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.hasInitialized = false;\n\n      // Remove event listeners\n      this.el.removeEventListener(\"click\", this.clickHandler);\n      this.el.removeEventListener(\"keydown\", this.keydownHandler);\n\n      // Remove aria attributes\n      this.el.removeAttribute(\"aria-haspopup\");\n      this.el.removeAttribute(\"aria-expanded\");\n      this.targetEl.removeAttribute(\"aria-hidden\");\n      if (this.el.tagName.toLowerCase() === \"a\") {\n        this.el.removeAttribute(\"role\");\n      }\n\n      // Reset toggle text\n      if (this.hasActiveText) {\n        this.textEl.textContent = this.defaultToggleText;\n      }\n\n      // Remove custom classes\n      if (this.expandedClasses.length) {\n        var _this$el$classList, _this$targetEl$classL;\n        (_this$el$classList = this.el.classList).remove.apply(_this$el$classList, _toConsumableArray(this.expandedClasses));\n        (_this$targetEl$classL = this.targetEl.classList).remove.apply(_this$targetEl$classL, _toConsumableArray(this.expandedClasses));\n      }\n      this.emitEvent(\"destroy\");\n    }\n  }, {\n    key: \"keyboardEvents\",\n    value: function keyboardEvents(event) {\n      // Expand with down arrow\n      if (event.keyCode == 40) {\n        this.expand();\n      } else if (event.keyCode == 38 || event.keyCode == 27) {\n        // Close with up arrow or escape key\n        this.collapse();\n      }\n    }\n  }, {\n    key: \"expand\",\n    value: function expand(event) {\n      // Update toggle text\n      if (this.hasActiveText) {\n        this.textEl.textContent = this.activeToggleText;\n      }\n\n      // Add classes\n      if (this.expandedClasses.length) {\n        var _this$el$classList2, _this$targetEl$classL2;\n        (_this$el$classList2 = this.el.classList).add.apply(_this$el$classList2, _toConsumableArray(this.expandedClasses));\n        (_this$targetEl$classL2 = this.targetEl.classList).add.apply(_this$targetEl$classL2, _toConsumableArray(this.expandedClasses));\n      }\n\n      // Update aria attributes\n      this.el.setAttribute(\"aria-expanded\", true);\n      this.targetEl.setAttribute(\"aria-hidden\", false);\n\n      // Emit event and include original event as an argument\n      this.emitEvent(\"expand\", event);\n    }\n  }, {\n    key: \"collapse\",\n    value: function collapse(event) {\n      // Update toggle text\n      if (this.hasActiveText) {\n        this.textEl.textContent = this.defaultToggleText;\n      }\n\n      // Remove classes\n      if (this.expandedClasses.length) {\n        var _this$el$classList3, _this$targetEl$classL3;\n        (_this$el$classList3 = this.el.classList).remove.apply(_this$el$classList3, _toConsumableArray(this.expandedClasses));\n        (_this$targetEl$classL3 = this.targetEl.classList).remove.apply(_this$targetEl$classL3, _toConsumableArray(this.expandedClasses));\n      }\n\n      // Update aria attributes\n      this.el.setAttribute(\"aria-expanded\", false);\n      this.targetEl.setAttribute(\"aria-hidden\", true);\n\n      // Emit event and include original event as an argument\n      this.emitEvent(\"collapse\", event);\n    }\n  }, {\n    key: \"toggle\",\n    value: function toggle(event) {\n      // Prevent default in case toggle element is a link instead of a button\n      event.preventDefault();\n      if (this.el.getAttribute(\"aria-expanded\") === \"true\") {\n        this.collapse(event);\n      } else {\n        this.expand(event);\n      }\n    }\n  }]);\n  return ExpandToggle;\n}(ev_emitter__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n\n//# sourceURL=webpack://%5Bname%5DLink/./index.js?");

/***/ }),

/***/ "./node_modules/ev-emitter/ev-emitter.js":
/*!***********************************************!*\
  !*** ./node_modules/ev-emitter/ev-emitter.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * EvEmitter v2.1.1\n * Lil' event emitter\n * MIT License\n */\n\n( function( global, factory ) {\n  // universal module definition\n  if (  true && module.exports ) {\n    // CommonJS - Browserify, Webpack\n    module.exports = factory();\n  } else {\n    // Browser globals\n    global.EvEmitter = factory();\n  }\n\n}( typeof window != 'undefined' ? window : this, function() {\n\nfunction EvEmitter() {}\n\nlet proto = EvEmitter.prototype;\n\nproto.on = function( eventName, listener ) {\n  if ( !eventName || !listener ) return this;\n\n  // set events hash\n  let events = this._events = this._events || {};\n  // set listeners array\n  let listeners = events[ eventName ] = events[ eventName ] || [];\n  // only add once\n  if ( !listeners.includes( listener ) ) {\n    listeners.push( listener );\n  }\n\n  return this;\n};\n\nproto.once = function( eventName, listener ) {\n  if ( !eventName || !listener ) return this;\n\n  // add event\n  this.on( eventName, listener );\n  // set once flag\n  // set onceEvents hash\n  let onceEvents = this._onceEvents = this._onceEvents || {};\n  // set onceListeners object\n  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};\n  // set flag\n  onceListeners[ listener ] = true;\n\n  return this;\n};\n\nproto.off = function( eventName, listener ) {\n  let listeners = this._events && this._events[ eventName ];\n  if ( !listeners || !listeners.length ) return this;\n\n  let index = listeners.indexOf( listener );\n  if ( index != -1 ) {\n    listeners.splice( index, 1 );\n  }\n\n  return this;\n};\n\nproto.emitEvent = function( eventName, args ) {\n  let listeners = this._events && this._events[ eventName ];\n  if ( !listeners || !listeners.length ) return this;\n\n  // copy over to avoid interference if .off() in listener\n  listeners = listeners.slice( 0 );\n  args = args || [];\n  // once stuff\n  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];\n\n  for ( let listener of listeners ) {\n    let isOnce = onceListeners && onceListeners[ listener ];\n    if ( isOnce ) {\n      // remove listener\n      // remove before trigger to prevent recursion\n      this.off( eventName, listener );\n      // unset once flag\n      delete onceListeners[ listener ];\n    }\n    // trigger listener\n    listener.apply( this, args );\n  }\n\n  return this;\n};\n\nproto.allOff = function() {\n  delete this._events;\n  delete this._onceEvents;\n  return this;\n};\n\nreturn EvEmitter;\n\n} ) );\n\n\n//# sourceURL=webpack://%5Bname%5DLink/./node_modules/ev-emitter/ev-emitter.js?");

/***/ })

/******/ })});;
//# sourceMappingURL=expand-toggle.amd.js.map