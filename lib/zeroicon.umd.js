(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["zeroicon"] = factory();
	else
		root["zeroicon"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0ced":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-recall",
  "use": "icon-recall-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-recall\">\r\n<title>撤回</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-recall_页面-1\">\r\n\t<g id=\"icon-recall_我发起的-进行中\" transform=\"translate(-1630.000000, -750.000000)\">\r\n\t\t<g id=\"icon-recall_撤回\" transform=\"translate(1630.000000, 750.000000)\">\r\n\t\t\t<path id=\"icon-recall_形状结合\" d=\"M153,15c8.5,0,16.6,3.4,22.5,9.3c6,6,9.3,14.1,9.3,22.5l0,0v40.4c0,4.4-3.6,8-8,8s-8-3.6-8-8l0,0V46.9\r\n\t\t\t\tc0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7l0,0H46.8c-8.8,0-15.9,7.1-15.9,15.9l0,0v106.2c0,8.8,7.1,15.9,15.9,15.9l0,0H76\r\n\t\t\t\tc4.3,0.1,7.8,3.6,7.8,8c0,4.3-3.5,7.9-7.8,8l0,0H46.8c-17.6,0-31.9-14.3-31.9-31.9l0,0V46.9C15,29.3,29.2,15,46.8,15l0,0H153z\r\n\t\t\t\t M82.4,95.7c3.1-3.1,8.1-3.1,11.3,0c1.5,1.5,2.4,3.5,2.4,5.6c0,2.1-0.9,4.2-2.4,5.6l0,0l-8.9,8.9h63.7\r\n\t\t\t\tc18.7-0.4,34.6,13.6,36.4,32.2c0.5,9.5-2.9,18.8-9.4,25.6c-6.5,6.9-15.6,10.8-25.1,10.8l0,0h-37.3c-4.4,0-8-3.6-8-8s3.6-8,8-8\r\n\t\t\t\tl0,0h37.5c5.4,0,10.5-2.4,14-6.4c3.5-4.1,5.1-9.5,4.3-14.8c-1.8-9.2-10-15.7-19.3-15.5l0,0H84.9l8.9,8.9c1.5,1.5,2.4,3.5,2.4,5.6\r\n\t\t\t\tc0,2.1-0.9,4.2-2.4,5.6c-3.1,3.1-8.1,3.1-11.3,0l0,0L60,129.5c-0.7-0.7-1.3-1.6-1.7-2.5c-0.9-2-0.9-4.2,0-6.2\r\n\t\t\t\tc0.4-0.9,1-1.8,1.7-2.5l0,0L82.4,95.7z M129.1,57.5c4.3,0.1,7.8,3.6,7.8,8s-3.5,7.9-7.8,8l0,0l-58.5,0c-4.4,0-8-3.6-8-8\r\n\t\t\t\tc0-4.4,3.6-8,8-8l0,0H129.1z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "135c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-zero-icon",
  "use": "icon-zero-icon-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-zero-icon\">\r\n<path d=\"M100,188.5c-48.8,0-88.5-39.7-88.5-88.5S51.2,11.5,100,11.5s88.5,39.7,88.5,88.5S148.8,188.5,100,188.5z M100,18.5\r\n\tc-44.9,0-81.5,36.6-81.5,81.5s36.6,81.5,81.5,81.5s81.5-36.6,81.5-81.5S144.9,18.5,100,18.5z\" />\r\n<polygon points=\"120.8,157.1 43,126.2 134.5,75 79.9,53.3 82.5,46.8 150.7,74 59.3,125.1 123.3,150.6 \" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1b6b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-todo",
  "use": "icon-todo-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-todo\">\r\n<style type=\"text/css\">\r\n\t#icon-todo .st0{opacity:0.8031;}\r\n</style>\r\n<title>待办</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-todo_页面-1\" class=\"st0\">\r\n\t<g id=\"icon-todo_办结事务\" transform=\"translate(-201.000000, -280.000000)\">\r\n\t\t<g id=\"icon-todo_待办\" transform=\"translate(201.000000, 280.000000)\">\r\n\t\t\t<path id=\"icon-todo_形状结合\" d=\"M100.3,14.6c22.9,0,44.4,9.1,60.3,24.9c0.6,0.6,1.1,1.3,1.4,2l5.4-3.9c0.8-0.6,1.8-0.4,2.4,0.4\r\n\t\t\t\tc0.3,0.4,0.4,0.8,0.3,1.3l-3,18.7c-0.1,0.9-1,1.6-2,1.4l-18.7-3c-0.9-0.1-1.6-1-1.4-2c0.1-0.4,0.3-0.8,0.7-1.1l5.9-4.3\r\n\t\t\t\tc-0.1-0.1-0.2-0.2-0.3-0.3c-13.5-13.4-31.6-21.1-51-21.1c-39.9,0-72.2,32.3-72.2,72.2s32.3,72.2,72.2,72.2\r\n\t\t\t\tc4.7,0,9.3-0.4,13.9-1.3c3.6-0.7,7,1.6,7.7,5.2c0.7,3.6-1.6,7-5.2,7.7c-5.4,1-10.8,1.6-16.4,1.6C53.2,185.4,15,147.1,15,100\r\n\t\t\t\tS53.2,14.6,100.3,14.6z M151.9,159.9c2.1,2.9,1.5,7-1.5,9.2c-3.5,2.5-7.1,4.8-10.9,6.7c-3.2,1.7-7.2,0.4-8.9-2.8\r\n\t\t\t\tc-1.7-3.2-0.4-7.2,2.8-8.9c3.2-1.7,6.3-3.6,9.2-5.7C145.7,156.4,149.8,157,151.9,159.9z M171.2,135c3.1,1.9,4.1,5.9,2.2,9\r\n\t\t\t\tc-2,3.3-4.1,6.4-6.5,9.3c-2.3,2.8-6.4,3.3-9.2,1c-2.8-2.3-3.3-6.4-1-9.2c2-2.5,3.9-5.2,5.5-7.9\r\n\t\t\t\tC164.1,134.1,168.1,133.1,171.2,135z M178.4,104.2l0.9,0.1c3.6,0.5,6.1,3.8,5.6,7.4c-0.6,4.5-1.6,8.9-2.9,13.2\r\n\t\t\t\tc-1.1,3.5-4.7,5.4-8.2,4.4s-5.4-4.7-4.4-8.2c1.1-3.6,1.9-7.3,2.4-11.1C172.3,106.6,175.2,104.2,178.4,104.2z M100.3,58.4\r\n\t\t\t\tc3.6,0,6.6,2.9,6.6,6.6l0,0v31l31.4,15.7c3.2,1.6,4.6,5.6,2.9,8.8c-1.6,3.2-5.6,4.6-8.8,2.9l0,0l-34.1-17\r\n\t\t\t\tc-2.8-1.4-4.6-4.3-4.6-7.4l0,0V65C93.8,61.4,96.7,58.4,100.3,58.4z M182.3,76.2c1.1,3.7,1.9,7.5,2.5,11.4c0.5,3.6-2,6.9-5.6,7.4\r\n\t\t\t\tc-3.6,0.5-6.9-2-7.4-5.6c-0.5-3.3-1.2-6.5-2.1-9.6c-1-3.5,1-7.1,4.5-8.1C177.7,70.8,181.3,72.8,182.3,76.2z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "1b99":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-message",
  "use": "icon-message-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-message\">\r\n<title>邮箱</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-message_页面-1\">\r\n\t<g id=\"icon-message_首页1\" transform=\"translate(-224.000000, -840.000000)\">\r\n\t\t<g id=\"icon-message_邮箱\" transform=\"translate(224.000000, 840.000000)\">\r\n\t\t\t<path id=\"icon-message_形状结合\" d=\"M162.5,32.2c12.3,0,22.2,9.9,22.2,22.2v90.7c0,12.3-10,22.2-22.2,22.2H37c-12.3,0-22.2-10-22.2-22.2\r\n\t\t\t\tV54.5c0-12.3,9.9-22.2,22.2-22.2H162.5z M171.7,76.3l-64.5,31.5c-4.7,2.3-10.2,2.3-14.9,0L27.8,76.3l0,68.8\r\n\t\t\t\tc0,5.1,4.1,9.2,9.2,9.2h125.5c5.1,0,9.2-4.1,9.2-9.2L171.7,76.3z M162.5,45.3H37c-5.1,0-9.2,4.1-9.2,9.2l0,7.5\r\n\t\t\t\tc0.5,0.1,1.1,0.3,1.6,0.5L98.1,96c1.1,0.5,2.4,0.5,3.4,0l68.6-33.5c0.5-0.2,1-0.4,1.6-0.5l0-7.5\r\n\t\t\t\tC171.7,49.4,167.6,45.3,162.5,45.3z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "21a1":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var deepmerge = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {} else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

var namespaces_1 = createCommonjsModule(function (module, exports) {
var namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
});

/**
 * @param {Object} attrs
 * @return {string}
 */
var objectToAttrsString = function (attrs) {
  return Object.keys(attrs).map(function (attr) {
    var value = attrs[attr].toString().replace(/"/g, '&quot;');
    return (attr + "=\"" + value + "\"");
  }).join(' ');
};

var svg = namespaces_1.svg;
var xlink = namespaces_1.xlink;

var defaultAttrs = {};
defaultAttrs[svg.name] = svg.uri;
defaultAttrs[xlink.name] = xlink.uri;

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
var wrapInSvgString = function (content, attributes) {
  if ( content === void 0 ) content = '';

  var attrs = deepmerge(defaultAttrs, attributes || {});
  var attrsRendered = objectToAttrsString(attrs);
  return ("<svg " + attrsRendered + ">" + content + "</svg>");
};

var svg$1 = namespaces_1.svg;
var xlink$1 = namespaces_1.xlink;

var defaultConfig = {
  attrs: ( obj = {
    style: ['position: absolute', 'width: 0', 'height: 0'].join('; '),
    'aria-hidden': 'true'
  }, obj[svg$1.name] = svg$1.uri, obj[xlink$1.name] = xlink$1.uri, obj )
};
var obj;

var Sprite = function Sprite(config) {
  this.config = deepmerge(defaultConfig, config || {});
  this.symbols = [];
};

/**
 * Add new symbol. If symbol with the same id exists it will be replaced.
 * @param {SpriteSymbol} symbol
 * @return {boolean} `true` - symbol was added, `false` - replaced
 */
Sprite.prototype.add = function add (symbol) {
  var ref = this;
    var symbols = ref.symbols;
  var existing = this.find(symbol.id);

  if (existing) {
    symbols[symbols.indexOf(existing)] = symbol;
    return false;
  }

  symbols.push(symbol);
  return true;
};

/**
 * Remove symbol & destroy it
 * @param {string} id
 * @return {boolean} `true` - symbol was found & successfully destroyed, `false` - otherwise
 */
Sprite.prototype.remove = function remove (id) {
  var ref = this;
    var symbols = ref.symbols;
  var symbol = this.find(id);

  if (symbol) {
    symbols.splice(symbols.indexOf(symbol), 1);
    symbol.destroy();
    return true;
  }

  return false;
};

/**
 * @param {string} id
 * @return {SpriteSymbol|null}
 */
Sprite.prototype.find = function find (id) {
  return this.symbols.filter(function (s) { return s.id === id; })[0] || null;
};

/**
 * @param {string} id
 * @return {boolean}
 */
Sprite.prototype.has = function has (id) {
  return this.find(id) !== null;
};

/**
 * @return {string}
 */
Sprite.prototype.stringify = function stringify () {
  var ref = this.config;
    var attrs = ref.attrs;
  var stringifiedSymbols = this.symbols.map(function (s) { return s.stringify(); }).join('');
  return wrapInSvgString(stringifiedSymbols, attrs);
};

/**
 * @return {string}
 */
Sprite.prototype.toString = function toString () {
  return this.stringify();
};

Sprite.prototype.destroy = function destroy () {
  this.symbols.forEach(function (s) { return s.destroy(); });
};

var SpriteSymbol = function SpriteSymbol(ref) {
  var id = ref.id;
  var viewBox = ref.viewBox;
  var content = ref.content;

  this.id = id;
  this.viewBox = viewBox;
  this.content = content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.stringify = function stringify () {
  return this.content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.toString = function toString () {
  return this.stringify();
};

SpriteSymbol.prototype.destroy = function destroy () {
    var this$1 = this;

  ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop]; });
};

/**
 * @param {string} content
 * @return {Element}
 */
var parse = function (content) {
  var hasImportNode = !!document.importNode;
  var doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
};

var BrowserSpriteSymbol = (function (SpriteSymbol$$1) {
  function BrowserSpriteSymbol () {
    SpriteSymbol$$1.apply(this, arguments);
  }

  if ( SpriteSymbol$$1 ) BrowserSpriteSymbol.__proto__ = SpriteSymbol$$1;
  BrowserSpriteSymbol.prototype = Object.create( SpriteSymbol$$1 && SpriteSymbol$$1.prototype );
  BrowserSpriteSymbol.prototype.constructor = BrowserSpriteSymbol;

  var prototypeAccessors = { isMounted: {} };

  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  BrowserSpriteSymbol.createFromExistingNode = function createFromExistingNode (node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  };

  BrowserSpriteSymbol.prototype.destroy = function destroy () {
    if (this.isMounted) {
      this.unmount();
    }
    SpriteSymbol$$1.prototype.destroy.call(this);
  };

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.mount = function mount (target) {
    if (this.isMounted) {
      return this.node;
    }

    var mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    var node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.render = function render () {
    var content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  };

  BrowserSpriteSymbol.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  Object.defineProperties( BrowserSpriteSymbol.prototype, prototypeAccessors );

  return BrowserSpriteSymbol;
}(SpriteSymbol));

var defaultConfig$1 = {
  /**
   * Should following options be automatically configured:
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @type {boolean}
   */
  autoConfigure: true,

  /**
   * Default mounting selector
   * @type {string}
   */
  mountTo: 'body',

  /**
   * Fix disappearing SVG elements when <base href> exists.
   * Executes when sprite mounted.
   * @see http://stackoverflow.com/a/18265336/796152
   * @see https://github.com/everdimension/angular-svg-base-fix
   * @see https://github.com/angular/angular.js/issues/8934#issuecomment-56568466
   * @type {boolean}
   */
  syncUrlsWithBaseTag: false,

  /**
   * Should sprite listen custom location change event
   * @type {boolean}
   */
  listenLocationChangeEvent: true,

  /**
   * Custom window event name which should be emitted to update sprite urls
   * @type {string}
   */
  locationChangeEvent: 'locationChange',

  /**
   * Emit location change event in Angular automatically
   * @type {boolean}
   */
  locationChangeAngularEmitter: false,

  /**
   * Selector to find symbols usages when updating sprite urls
   * @type {string}
   */
  usagesToUpdate: 'use[*|href]',

  /**
   * Fix Firefox bug when gradients and patterns don't work if they are within a symbol.
   * Executes when sprite is rendered, but not mounted.
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=306674
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=353575
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1235364
   * @type {boolean}
   */
  moveGradientsOutsideSymbol: false
};

/**
 * @param {*} arrayLike
 * @return {Array}
 */
var arrayFrom = function (arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
};

var browser = {
  isChrome: function () { return /chrome/i.test(navigator.userAgent); },
  isFirefox: function () { return /firefox/i.test(navigator.userAgent); },

  // https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
  isIE: function () { return /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent); },
  isEdge: function () { return /edge/i.test(navigator.userAgent); }
};

/**
 * @param {string} name
 * @param {*} data
 */
var dispatchEvent = function (name, data) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(name, false, false, data);
  window.dispatchEvent(event);
};

/**
 * IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
 * This trick will trigger IE to read and use any existing SVG <style> tags.
 * @see https://github.com/iconic/SVGInjector/issues/23
 * @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
 *
 * @param {Element} node DOM Element to search <style> tags in
 * @return {Array<HTMLStyleElement>}
 */
var evalStylesIEWorkaround = function (node) {
  var updatedNodes = [];

  arrayFrom(node.querySelectorAll('style'))
    .forEach(function (style) {
      style.textContent += '';
      updatedNodes.push(style);
    });

  return updatedNodes;
};

/**
 * @param {string} [url] If not provided - current URL will be used
 * @return {string}
 */
var getUrlWithoutFragment = function (url) {
  return (url || window.location.href).split('#')[0];
};

/* global angular */
/**
 * @param {string} eventName
 */
var locationChangeAngularEmitter = function (eventName) {
  angular.module('ng').run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (e, newUrl, oldUrl) {
      dispatchEvent(eventName, { oldUrl: oldUrl, newUrl: newUrl });
    });
  }]);
};

var defaultSelector = 'linearGradient, radialGradient, pattern';

/**
 * @param {Element} svg
 * @param {string} [selector]
 * @return {Element}
 */
var moveGradientsOutsideSymbol = function (svg, selector) {
  if ( selector === void 0 ) selector = defaultSelector;

  arrayFrom(svg.querySelectorAll('symbol')).forEach(function (symbol) {
    arrayFrom(symbol.querySelectorAll(selector)).forEach(function (node) {
      symbol.parentNode.insertBefore(node, symbol);
    });
  });
  return svg;
};

/**
 * @param {NodeList} nodes
 * @param {Function} [matcher]
 * @return {Attr[]}
 */
function selectAttributes(nodes, matcher) {
  var attrs = arrayFrom(nodes).reduce(function (acc, node) {
    if (!node.attributes) {
      return acc;
    }

    var arrayfied = arrayFrom(node.attributes);
    var matched = matcher ? arrayfied.filter(matcher) : arrayfied;
    return acc.concat(matched);
  }, []);

  return attrs;
}

/**
 * @param {NodeList|Node} nodes
 * @param {boolean} [clone=true]
 * @return {string}
 */

var xLinkNS = namespaces_1.xlink.uri;
var xLinkAttrName = 'xlink:href';

// eslint-disable-next-line no-useless-escape
var specialUrlCharsPattern = /[{}|\\\^\[\]`"<>]/g;

function encoder(url) {
  return url.replace(specialUrlCharsPattern, function (match) {
    return ("%" + (match[0].charCodeAt(0).toString(16).toUpperCase()));
  });
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

/**
 * @param {NodeList} nodes
 * @param {string} startsWith
 * @param {string} replaceWith
 * @return {NodeList}
 */
function updateReferences(nodes, startsWith, replaceWith) {
  arrayFrom(nodes).forEach(function (node) {
    var href = node.getAttribute(xLinkAttrName);
    if (href && href.indexOf(startsWith) === 0) {
      var newUrl = href.replace(startsWith, replaceWith);
      node.setAttributeNS(xLinkNS, xLinkAttrName, newUrl);
    }
  });

  return nodes;
}

/**
 * List of SVG attributes to update url() target in them
 */
var attList = [
  'clipPath',
  'colorProfile',
  'src',
  'cursor',
  'fill',
  'filter',
  'marker',
  'markerStart',
  'markerMid',
  'markerEnd',
  'mask',
  'stroke',
  'style'
];

var attSelector = attList.map(function (attr) { return ("[" + attr + "]"); }).join(',');

/**
 * Update URLs in svg image (like `fill="url(...)"`) and update referencing elements
 * @param {Element} svg
 * @param {NodeList} references
 * @param {string|RegExp} startsWith
 * @param {string} replaceWith
 * @return {void}
 *
 * @example
 * const sprite = document.querySelector('svg.sprite');
 * const usages = document.querySelectorAll('use');
 * updateUrls(sprite, usages, '#', 'prefix#');
 */
var updateUrls = function (svg, references, startsWith, replaceWith) {
  var startsWithEncoded = encoder(startsWith);
  var replaceWithEncoded = encoder(replaceWith);

  var nodes = svg.querySelectorAll(attSelector);
  var attrs = selectAttributes(nodes, function (ref) {
    var localName = ref.localName;
    var value = ref.value;

    return attList.indexOf(localName) !== -1 && value.indexOf(("url(" + startsWithEncoded)) !== -1;
  });

  attrs.forEach(function (attr) { return attr.value = attr.value.replace(new RegExp(escapeRegExp(startsWithEncoded), 'g'), replaceWithEncoded); });
  updateReferences(references, startsWithEncoded, replaceWithEncoded);
};

/**
 * Internal emitter events
 * @enum
 * @private
 */
var Events = {
  MOUNT: 'mount',
  SYMBOL_MOUNT: 'symbol_mount'
};

var BrowserSprite = (function (Sprite$$1) {
  function BrowserSprite(cfg) {
    var this$1 = this;
    if ( cfg === void 0 ) cfg = {};

    Sprite$$1.call(this, deepmerge(defaultConfig$1, cfg));

    var emitter = mitt();
    this._emitter = emitter;
    this.node = null;

    var ref = this;
    var config = ref.config;

    if (config.autoConfigure) {
      this._autoConfigure(cfg);
    }

    if (config.syncUrlsWithBaseTag) {
      var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
      emitter.on(Events.MOUNT, function () { return this$1.updateUrls('#', baseUrl); });
    }

    var handleLocationChange = this._handleLocationChange.bind(this);
    this._handleLocationChange = handleLocationChange;

    // Provide way to update sprite urls externally via dispatching custom window event
    if (config.listenLocationChangeEvent) {
      window.addEventListener(config.locationChangeEvent, handleLocationChange);
    }

    // Emit location change event in Angular automatically
    if (config.locationChangeAngularEmitter) {
      locationChangeAngularEmitter(config.locationChangeEvent);
    }

    // After sprite mounted
    emitter.on(Events.MOUNT, function (spriteNode) {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(spriteNode);
      }
    });

    // After symbol mounted into sprite
    emitter.on(Events.SYMBOL_MOUNT, function (symbolNode) {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(symbolNode.parentNode);
      }

      if (browser.isIE() || browser.isEdge()) {
        evalStylesIEWorkaround(symbolNode);
      }
    });
  }

  if ( Sprite$$1 ) BrowserSprite.__proto__ = Sprite$$1;
  BrowserSprite.prototype = Object.create( Sprite$$1 && Sprite$$1.prototype );
  BrowserSprite.prototype.constructor = BrowserSprite;

  var prototypeAccessors = { isMounted: {} };

  /**
   * @return {boolean}
   */
  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * Automatically configure following options
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @param {Object} cfg
   * @private
   */
  BrowserSprite.prototype._autoConfigure = function _autoConfigure (cfg) {
    var ref = this;
    var config = ref.config;

    if (typeof cfg.syncUrlsWithBaseTag === 'undefined') {
      config.syncUrlsWithBaseTag = typeof document.getElementsByTagName('base')[0] !== 'undefined';
    }

    if (typeof cfg.locationChangeAngularEmitter === 'undefined') {
        config.locationChangeAngularEmitter = typeof window.angular !== 'undefined';
    }

    if (typeof cfg.moveGradientsOutsideSymbol === 'undefined') {
      config.moveGradientsOutsideSymbol = browser.isFirefox();
    }
  };

  /**
   * @param {Event} event
   * @param {Object} event.detail
   * @param {string} event.detail.oldUrl
   * @param {string} event.detail.newUrl
   * @private
   */
  BrowserSprite.prototype._handleLocationChange = function _handleLocationChange (event) {
    var ref = event.detail;
    var oldUrl = ref.oldUrl;
    var newUrl = ref.newUrl;
    this.updateUrls(oldUrl, newUrl);
  };

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * If sprite already mounted - `symbol.mount(sprite.node)` will be called.
   * @fires Events#SYMBOL_MOUNT
   * @param {BrowserSpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  BrowserSprite.prototype.add = function add (symbol) {
    var sprite = this;
    var isNewSymbol = Sprite$$1.prototype.add.call(this, symbol);

    if (this.isMounted && isNewSymbol) {
      symbol.mount(sprite.node);
      this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    }

    return isNewSymbol;
  };

  /**
   * Attach to existing DOM node
   * @param {string|Element} target
   * @return {Element|null} attached DOM Element. null if node to attach not found.
   */
  BrowserSprite.prototype.attach = function attach (target) {
    var this$1 = this;

    var sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    /** @type Element */
    var node = typeof target === 'string' ? document.querySelector(target) : target;
    sprite.node = node;

    // Already added symbols needs to be mounted
    this.symbols.forEach(function (symbol) {
      symbol.mount(sprite.node);
      this$1._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    });

    // Create symbols from existing DOM nodes, add and mount them
    arrayFrom(node.querySelectorAll('symbol'))
      .forEach(function (symbolNode) {
        var symbol = BrowserSpriteSymbol.createFromExistingNode(symbolNode);
        symbol.node = symbolNode; // hack to prevent symbol mounting to sprite when adding
        sprite.add(symbol);
      });

    this._emitter.emit(Events.MOUNT, node);

    return node;
  };

  BrowserSprite.prototype.destroy = function destroy () {
    var ref = this;
    var config = ref.config;
    var symbols = ref.symbols;
    var _emitter = ref._emitter;

    symbols.forEach(function (s) { return s.destroy(); });

    _emitter.off('*');
    window.removeEventListener(config.locationChangeEvent, this._handleLocationChange);

    if (this.isMounted) {
      this.unmount();
    }
  };

  /**
   * @fires Events#MOUNT
   * @param {string|Element} [target]
   * @param {boolean} [prepend=false]
   * @return {Element|null} rendered sprite node. null if mount node not found.
   */
  BrowserSprite.prototype.mount = function mount (target, prepend) {
    if ( target === void 0 ) target = this.config.mountTo;
    if ( prepend === void 0 ) prepend = false;

    var sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    var mountNode = typeof target === 'string' ? document.querySelector(target) : target;
    var node = sprite.render();
    this.node = node;

    if (prepend && mountNode.childNodes[0]) {
      mountNode.insertBefore(node, mountNode.childNodes[0]);
    } else {
      mountNode.appendChild(node);
    }

    this._emitter.emit(Events.MOUNT, node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSprite.prototype.render = function render () {
    return parse(this.stringify());
  };

  /**
   * Detach sprite from the DOM
   */
  BrowserSprite.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  /**
   * Update URLs in sprite and usage elements
   * @param {string} oldUrl
   * @param {string} newUrl
   * @return {boolean} `true` - URLs was updated, `false` - sprite is not mounted
   */
  BrowserSprite.prototype.updateUrls = function updateUrls$1 (oldUrl, newUrl) {
    if (!this.isMounted) {
      return false;
    }

    var usages = document.querySelectorAll(this.config.usagesToUpdate);

    updateUrls(
      this.node,
      usages,
      ((getUrlWithoutFragment(oldUrl)) + "#"),
      ((getUrlWithoutFragment(newUrl)) + "#")
    );

    return true;
  };

  Object.defineProperties( BrowserSprite.prototype, prototypeAccessors );

  return BrowserSprite;
}(Sprite));

var ready$1 = createCommonjsModule(function (module) {
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  { module.exports = definition(); }

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);


  if (!loaded)
  { doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener);
    loaded = 1;
    while (listener = fns.shift()) { listener(); }
  }); }

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  }

});
});

var spriteNodeId = '__SVG_SPRITE_NODE__';
var spriteGlobalVarName = '__SVG_SPRITE__';
var isSpriteExists = !!window[spriteGlobalVarName];

// eslint-disable-next-line import/no-mutable-exports
var sprite;

if (isSpriteExists) {
  sprite = window[spriteGlobalVarName];
} else {
  sprite = new BrowserSprite({ attrs: { id: spriteNodeId } });
  window[spriteGlobalVarName] = sprite;
}

var loadSprite = function () {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
  var existing = document.getElementById(spriteNodeId);

  if (existing) {
    sprite.attach(existing);
  } else {
    sprite.mount(document.body, true);
  }
};

if (document.body) {
  loadSprite();
} else {
  ready$1(loadSprite);
}

var sprite$1 = sprite;

return sprite$1;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "36c1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-github",
  "use": "icon-github-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-github\">\r\n<path d=\"M100,14.7c-46.4-0.5-84.5,36.8-85,83.2c0.2,36.2,23.6,68.1,58.1,79.1c4.3,0.8,5.8-1.8,5.8-4v-14.1\r\n\tc-23.6,5-28.7-11.1-28.7-11.1c-1.6-5.1-4.9-9.4-9.4-12.2c-7.7-5.1,0.6-5,0.6-5c5.4,0.7,10.2,3.9,13,8.6c5,8.7,16,11.7,24.7,6.9\r\n\tc0.4-4.2,2.3-8.2,5.4-11.1c-18.9-2.1-38.6-9.2-38.6-41.1c-0.2-8.3,2.9-16.4,8.6-22.5c-2.6-7.1-2.3-15,0.8-21.9c0,0,7.2-2.2,23.2,8.5\r\n\tc13.9-3.7,28.6-3.7,42.5,0c16.2-10.7,23.2-8.5,23.2-8.5c3.1,6.9,3.4,14.8,0.9,21.9c5.8,6,9,14,9,22.3c0,32-19.9,39-38.6,41.1\r\n\tc4.1,4,6.3,9.7,5.8,15.5v22.8c0,2.7,1.5,4.9,5.8,4c34.4-11,57.7-42.9,58-79C184.5,51.5,146.4,14.2,100,14.7\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3acb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-initiate",
  "use": "icon-initiate-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-initiate\">\r\n<style type=\"text/css\">\r\n\t#icon-initiate .st0{opacity:0.7977;}\r\n</style>\r\n<title>发起</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-initiate_页面-1\" class=\"st0\">\r\n\t<g id=\"icon-initiate_办结事务\" transform=\"translate(-1013.000000, -280.000000)\">\r\n\t\t<g id=\"icon-initiate_发起\" transform=\"translate(1013.000000, 280.000000)\">\r\n\t\t\t<path d=\"M143.7,15.7c12.5,0,22.8,9.8,22.8,22.1l0,0v53.6c0,3.6-2.9,6.5-6.5,6.5c-3.6,0-6.5-2.9-6.5-6.5l0,0V37.7\r\n\t\t\t\tc0-4.9-4.3-9.1-9.8-9.1l0,0H37.8c-5.5,0-9.8,4.1-9.8,9.1l0,0v124.5c0,4.9,4.3,9.1,9.8,9.1l0,0h105.8c3.6,0,6.5,2.9,6.5,6.5\r\n\t\t\t\ts-2.9,6.5-6.5,6.5l0,0H37.8c-12.5,0-22.8-9.8-22.8-22.1l0,0V37.7c0-12.2,10.3-22.1,22.8-22.1l0,0H143.7z M162.5,110.5\r\n\t\t\t\tc0.8,0,1.5,0.3,2,0.9l19.9,23.3c0.8,1,0.8,2.4,0,3.4l-19.9,23.3c-0.9,1.1-2.6,1.2-3.7,0.3c-0.6-0.5-0.9-1.2-0.9-2v-16.3h-19.5\r\n\t\t\t\tc-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5H160v-17.2C160,111.6,161.1,110.5,162.5,110.5z M123.2,130.3\r\n\t\t\t\tc3.6,0,6.5,2.9,6.5,6.5c0,3.6-2.9,6.5-6.5,6.5h-8.6c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5H123.2z M84.3,125.9\r\n\t\t\t\tc3.6,0,6.5,2.9,6.5,6.5c0,3.6-2.9,6.5-6.5,6.5H54c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5H84.3z M127.5,91.4\r\n\t\t\t\tc3.6,0,6.5,2.9,6.5,6.5s-2.9,6.5-6.5,6.5H54c-3.6,0-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5H127.5z M127.5,56.8c3.6,0,6.5,2.9,6.5,6.5\r\n\t\t\t\tc0,3.6-2.9,6.5-6.5,6.5H54c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5H127.5z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "52b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-service",
  "use": "icon-service-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-service\">\r\n<title>服务</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-service_页面-1\">\r\n\t<g id=\"icon-service_首页1\" transform=\"translate(-1643.000000, -200.000000)\">\r\n\t\t<g id=\"icon-service_服务\" transform=\"translate(1643.000000, 200.000000)\">\r\n\t\t\t<path id=\"icon-service_形状\" d=\"M54.5,15C32.7,15,15,32.7,15,54.5s17.7,39.5,39.5,39.5h39.5V54.5C94.1,32.7,76.3,15,54.5,15z M81.9,81.9\r\n\t\t\t\tH54.5c-15.2,0-27.3-12.2-27.3-27.3s12.2-27.3,27.3-27.3s27.3,12.2,27.3,27.3V81.9z M145.5,15c-21.8,0-39.5,17.7-39.5,39.5v39.5\r\n\t\t\t\th39.5c21.8,0,39.5-17.7,39.5-39.5S167.3,15,145.5,15z M145.5,81.9h-27.3V54.5c0-15.2,12.2-27.3,27.3-27.3\r\n\t\t\t\tc15.2,0,27.3,12.2,27.3,27.3S160.6,81.9,145.5,81.9z M54.5,105.9c-21.8,0-39.5,17.7-39.5,39.5S32.7,185,54.5,185\r\n\t\t\t\ts39.5-17.7,39.5-39.5v-39.5H54.5z M81.9,145.5c0,15.2-12.2,27.3-27.3,27.3s-27.3-12.2-27.3-27.3c0-15.2,12.2-27.3,27.3-27.3h27.3\r\n\t\t\t\tV145.5z M145.5,105.9h-39.5v39.5c0,21.8,17.7,39.5,39.5,39.5s39.5-17.7,39.5-39.5S167.3,105.9,145.5,105.9z M145.5,172.8\r\n\t\t\t\tc-15.2,0-27.3-12.2-27.3-27.3v-27.3h27.3c15.2,0,27.3,12.2,27.3,27.3C172.8,160.6,160.6,172.8,145.5,172.8L145.5,172.8z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "57d5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-book",
  "use": "icon-book-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-book\">\r\n<title>图书</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-book_页面-1\">\r\n\t<g id=\"icon-book_首页1\" transform=\"translate(-698.000000, -834.000000)\">\r\n\t\t<g id=\"icon-book_图书\" transform=\"translate(698.000000, 834.000000)\">\r\n\t\t\t<path id=\"icon-book_形状结合\" d=\"M162.6,15c9.3,0,16.8,7.7,16.8,17.2l0,0v135.6c0,9.5-7.7,17.2-17.2,17.2l0,0H45.1\r\n\t\t\t\tc-13.8,0-25-11.2-25-25c0-0.3,0-0.6,0-0.9c0-0.1,0-0.3,0-0.4l0,0V47.8C20.1,29.7,34.5,15,52,15l0,0H162.6z M165.9,148.6H45.1\r\n\t\t\t\tc-4.1,0-7.9,2.2-10,5.7c-2.1,3.6-2.1,7.9,0,11.5c2.1,3.6,5.9,5.7,10,5.7l0,0h117.2c2,0,3.6-1.6,3.6-3.6l0,0V148.6z M162.6,28.5\r\n\t\t\t\tl-54.7,0l0,42.4v0.2c0.1,2.5-1.2,4.9-3.3,6.1c-2.2,1.3-4.9,1.2-7-0.1l0,0l-13.8-8.6L70,77.1c-2.1,1.3-4.8,1.4-7,0.1\r\n\t\t\t\tc-2.2-1.3-3.5-3.6-3.3-6.1l0,0l0-42.6l-7.7,0c-9.9,0-18,8.3-18.4,18.5l0,0.7v90c3.5-1.8,7.5-2.8,11.5-2.8l0,0h120.8V32.2\r\n\t\t\t\tC165.9,30.2,164.5,28.5,162.6,28.5L162.6,28.5z M94.4,28.5H73.3l0,30.7l7-4.4l0.1,0c0.1-0.1,0.2-0.1,0.4-0.2\r\n\t\t\t\tc0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.3-0.1,0.4-0.1\r\n\t\t\t\tc0.1,0,0.2,0,0.2,0c0.1,0,0.3-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.4,0l0,0h0.3c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.4,0\r\n\t\t\t\tc0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.4,0.1l0,0l0.2,0.1c0.1,0,0.3,0.1,0.4,0.1c0.1,0,0.2,0,0.3,0.1c0.1,0,0.2,0.1,0.3,0.1\r\n\t\t\t\tc0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0.1,0.3,0.1c0.1,0.1,0.2,0.1,0.4,0.2l0,0l0.1,0l7,4.4L94.4,28.5z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-department",
  "use": "icon-department-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-department\">\r\n<title>su-icon-department (1)</title>\r\n<desc>Created with Sketch.</desc>\r\n<path id=\"icon-department_形状\" d=\"M121.7,15c2.2,0,3.9,2,3.9,4.5v31.3c0,2.5-1.8,4.5-3.9,4.5l-15.8,0v26.8h53.4c7.6,0,13.8,7,13.8,15.7v47h7.9\r\n\tc2.2,0,4,2,4,4.5v31.3c0,2.5-1.8,4.5-4,4.5h-27.7c-2.2,0-3.9-2-4-4.5v-31.3c0-2.5,1.8-4.5,4-4.5h7.9l0-47c0-1.2-0.9-2.2-2-2.2h-53.4\r\n\tv47.9c0,0.4,0,0.8-0.1,1.3h8c2.2,0,4,2,4,4.5v31.3c0,1.2-0.4,2.3-1.2,3.2c-0.7,0.8-1.7,1.3-2.8,1.3H86.1c-1,0-2-0.4-2.8-1.3\r\n\ts-1.2-2-1.2-3.2v-31.3c0-2.5,1.8-4.5,4-4.5l8,0c-0.1-0.4-0.1-0.8-0.1-1.3l0-47.9H40.7c-1.1,0-2,1-2,2.2v47h7.9c2.2,0,4,2,4,4.5v31.3\r\n\tc0,1.2-0.4,2.3-1.2,3.2c-0.7,0.8-1.7,1.3-2.8,1.3H18.9c-2.2,0-3.9-2-4-4.5v-31.3c0-2.5,1.8-4.5,4-4.5h7.9v-47\r\n\tC26.9,89,33.1,82,40.7,82.1l53.4,0V55.2H78.2c-2.2,0-3.9-2-3.9-4.5V19.5c0-2.5,1.8-4.5,3.9-4.5H121.7L121.7,15z M173.1,158.1h-11.9\r\n\tv13.4h11.9V158.1z M105.9,158.1H94v13.4h11.9V158.1z M38.7,158.1H26.8v13.4h11.9V158.1z M113.8,28.4H86.1v13.4h27.7V28.4L113.8,28.4\r\n\tz\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6dea":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-fullscreen-scale",
  "use": "icon-fullscreen-scale-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"icon-fullscreen-scale\"><defs><style type=\"text/css\"></style></defs><path d=\"M749.248 704H864a32 32 0 1 0 0-64H672a32 32 0 0 0-32 32v192a32 32 0 1 0 64 0v-114.752l137.36 137.36a32 32 0 1 0 45.232-45.264L749.248 704zM320 749.248V864a32 32 0 1 0 64 0V672a32 32 0 0 0-32-32H160a32 32 0 1 0 0 64h114.752l-137.36 137.36a32 32 0 1 0 45.264 45.232L320 749.248zM749.248 320H864a32 32 0 1 1 0 64H672a32 32 0 0 1-32-32V160a32 32 0 1 1 64 0v114.752l137.36-137.36a32 32 0 1 1 45.232 45.264L749.248 320zM320 274.752V160a32 32 0 1 1 64 0v192a32 32 0 0 1-32 32H160a32 32 0 1 1 0-64h114.752l-137.36-137.36a32 32 0 1 1 45.264-45.232L320 274.752z\" p-id=\"2629\" /></symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7b68":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-notice",
  "use": "icon-notice-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-notice\">\r\n<title>通知消息</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-notice_页面-1\">\r\n\t<g id=\"icon-notice_首页1\" transform=\"translate(-1171.000000, -197.000000)\">\r\n\t\t<g id=\"icon-notice_通知消息\" transform=\"translate(1171.000000, 197.000000)\">\r\n\t\t\t<path id=\"icon-notice_形状\" d=\"M161.1,51.2h-33.8l-14-24.6c-2.8-4.9-7.9-7.9-13.6-8h-0.1c-5.7,0-10.7,2.9-13.6,7.8L71.6,51.2H38.2\r\n\t\t\t\tc-13,0-23.6,10.6-23.6,23.6v82.9c0,13,10.6,23.6,23.6,23.6H161c13,0,23.6-10.6,23.6-23.6V74.8C184.7,61.8,174.1,51.2,161.1,51.2z\r\n\t\t\t\t M95.9,30c1.7-2.9,5.9-2.9,7.6,0l12.1,21.1h-32L95.9,30L95.9,30z M174.3,159.6c0,5.7-4.7,10.4-10.4,10.4H35.3\r\n\t\t\t\tc-5.7,0-10.4-4.7-10.4-10.4V72.9c0-5.7,4.7-10.4,10.4-10.4h128.6c5.7,0,10.4,4.7,10.4,10.4V159.6z\" />\r\n\t\t\t<path id=\"icon-notice_形状_1_\" d=\"M139.2,91.4H60c-4.4,0-7.9,3.5-7.9,7.9s3.5,7.9,7.9,7.9h79.2c4.4,0,7.9-3.5,7.9-7.9\r\n\t\t\t\tS143.6,91.4,139.2,91.4L139.2,91.4z M109,120.2H60c-4.4,0-7.9,3.5-7.9,7.9c0,4.4,3.5,7.9,7.9,7.9H109c4.4,0,7.9-3.5,7.9-7.9\r\n\t\t\t\tC116.9,123.7,113.3,120.2,109,120.2z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "841b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-lock",
  "use": "icon-lock-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"icon-lock\"><defs><style type=\"text/css\"></style></defs><path d=\"M512 64a192 192 0 0 1 192 192v64h96a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H224a128 128 0 0 1-128-128V448a128 128 0 0 1 128-128h96V256a192 192 0 0 1 192-192z m288 320H224a64 64 0 0 0-63.84 59.2L160 448v384a64 64 0 0 0 59.2 63.84L224 896h576a64 64 0 0 0 63.84-59.2L864 832V448a64 64 0 0 0-59.2-63.84L800 384z m-288 96a128 128 0 0 1 32 251.968V800h-64v-68.032A128.064 128.064 0 0 1 512 480z m0 64a64 64 0 1 0 0 128 64 64 0 0 0 0-128z m0-416a128 128 0 0 0-127.84 121.6L384 256v64h256V256a128 128 0 0 0-121.6-127.84L512 128z\" p-id=\"11237\" /></symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "995d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-grade",
  "use": "icon-grade-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-grade\">\r\n<title>成绩</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-grade_页面-1\">\r\n\t<g id=\"icon-grade_首页1-卡片翻页总\" transform=\"translate(-1171.000000, -516.000000)\">\r\n\t\t<g id=\"icon-grade_成绩\" transform=\"translate(1171.000000, 516.000000)\">\r\n\t\t\t<path id=\"icon-grade_形状\" d=\"M172.1,15H27.9C20.8,15,15,20.8,15,27.9v144.2c0,3.4,1.4,6.7,3.8,9.1s5.7,3.8,9.1,3.8h144.2\r\n\t\t\t\tc3.4,0,6.7-1.4,9.1-3.8s3.8-5.7,3.8-9.1V27.9C185,20.8,179.2,15,172.1,15z M173.1,172.1c0,0.5-0.5,1-1,1H27.9c-0.5,0-1-0.5-1-1\r\n\t\t\t\tV27.9c0-0.5,0.5-1,1-1h144.2c0.5,0,1,0.5,1,1V172.1z\" />\r\n\t\t\t<path id=\"icon-grade_形状_1_\" d=\"M88.9,139.3H46.5c-3.3,0-6,2.7-6,5.9c0,3.3,2.7,5.9,6,5.9h42.5c3.3,0,6-2.7,6-5.9\r\n\t\t\t\tC94.9,141.9,92.2,139.3,88.9,139.3L88.9,139.3z M88.9,113.8H46.5c-3.3,0-6,2.7-6,6s2.7,5.9,6,5.9h42.5c3.3,0,6-2.7,6-5.9\r\n\t\t\t\tS92.2,113.8,88.9,113.8z M149.3,128.1l-22.8,22.8l-9.9-10c-2.3-2.3-6.1-2.3-8.4,0c-2.3,2.3-2.3,6.1,0,8.4l14.2,14.2\r\n\t\t\t\tc1.1,1.1,2.7,1.7,4.3,1.7c1.6,0,3.1-0.6,4.2-1.7l26.9-26.9c1.8-2.4,1.6-5.8-0.6-7.9C155.1,126.5,151.7,126.2,149.3,128.1\r\n\t\t\t\tL149.3,128.1z\" />\r\n\t\t\t<path id=\"icon-grade_形状_2_\" d=\"M149.3,99.2L126.5,122l-9.9-10.1c-1.5-1.5-3.7-2.1-5.7-1.5c-2.1,0.6-3.7,2.2-4.2,4.2\r\n\t\t\t\tc-0.6,2.1,0,4.2,1.5,5.7l14.2,14.2c1.1,1.1,2.7,1.7,4.3,1.7c1.6,0,3.1-0.6,4.2-1.7l26.9-26.9c2.1-2.4,2-6-0.2-8.3\r\n\t\t\t\tC155.3,97.1,151.7,97.1,149.3,99.2L149.3,99.2z M48.6,51.7h3.7v33.4c0,1.6,1.3,3,3,3H60c1.6,0,3-1.3,3-3V44c0-1.6-1.3-3-3-3h-8.5\r\n\t\t\t\tc-1,0-2,0.6-2.5,1.4l-2.9,4.7c-0.6,0.9-0.6,2-0.1,3C46.5,51.1,47.5,51.7,48.6,51.7L48.6,51.7z M105,46.9c-2.8-4.4-7.7-7-12.9-6.9\r\n\t\t\t\tc-5.2-0.1-10,2.4-12.8,6.8c-3.1,5.4-4.5,11.5-4.1,17.7c-0.4,6.2,1,12.4,4.1,17.8c2.7,4.3,7.5,6.9,12.7,6.8\r\n\t\t\t\tc5.2,0.1,10.1-2.5,12.9-6.8c3.3-5.3,4.9-11.5,4.5-17.7C109.8,58.3,108.2,52.2,105,46.9L105,46.9z M96.8,75.7\r\n\t\t\t\tc-0.8,1.8-2.6,3-4.6,3c-1.6,0-6.5,0-6.5-14c-0.3-3.9,0.5-7.7,2.1-11.2c0.7-1.8,2.4-2.9,4.3-2.9c2,0,3.8,1.2,4.6,3\r\n\t\t\t\tc1.7,3.4,2.4,7.2,2.2,11C99.2,68.4,98.4,72.2,96.8,75.7L96.8,75.7z M137,89c5.2,0.1,10.1-2.5,12.9-6.8c3.3-5.3,4.9-11.5,4.5-17.7\r\n\t\t\t\tc0.4-6.2-1.2-12.4-4.4-17.7c-2.8-4.4-7.7-7-12.9-6.9c-5.2-0.1-10,2.4-12.7,6.8c-3.1,5.4-4.5,11.5-4.1,17.7\r\n\t\t\t\tc-0.4,6.2,1,12.4,4.1,17.8C127,86.6,131.8,89.2,137,89L137,89z M132.8,53.4c0.7-1.8,2.4-2.9,4.3-2.9c2,0,3.8,1.2,4.6,3\r\n\t\t\t\tc1.7,3.4,2.4,7.2,2.2,11c0.2,3.8-0.5,7.6-2.1,11.1c-0.8,1.8-2.6,3-4.6,3c-1.6,0-6.5,0-6.5-14C130.5,60.8,131.2,56.9,132.8,53.4\r\n\t\t\t\tL132.8,53.4z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b1d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-news",
  "use": "icon-news-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-news\">\r\n<title>新闻</title>\r\n<desc>Created with Sketch.</desc>\r\n<g id=\"icon-news_页面-1\">\r\n\t<g id=\"icon-news_首页1\" transform=\"translate(-457.000000, -313.000000)\">\r\n\t\t<g id=\"icon-news_新闻\" transform=\"translate(457.000000, 313.000000)\">\r\n\t\t\t<path id=\"icon-news_形状\" d=\"M169.1,15H52.2c-8.8,0-15.9,7.1-15.9,15.9v10.6h-5.3c-8.8,0-15.9,7.1-15.9,15.9v106.3\r\n\t\t\t\tc0,11.7,9.5,21.3,21.3,21.3h127.5c11.7,0,21.3-9.5,21.3-21.3V30.9C185,22.1,177.9,15,169.1,15z M174.4,163.8\r\n\t\t\t\tc0,5.9-4.8,10.6-10.6,10.6H36.3c-5.9,0-10.6-4.8-10.6-10.6V57.5c0-2.9,2.4-5.3,5.3-5.3h5.3v106.3c0,2.9,2.4,5.3,5.3,5.3\r\n\t\t\t\ts5.3-2.4,5.3-5.3V30.9c0-2.9,2.4-5.3,5.3-5.3h116.9c2.9,0,5.3,2.4,5.3,5.3V163.8z\" />\r\n\t\t\t<path id=\"icon-news_形状_1_\" d=\"M118.6,84.1h42.5c1.5,0,2.7-1.2,2.7-2.7s-1.2-2.7-2.7-2.7h-42.5c-1.5,0-2.7,1.2-2.7,2.7\r\n\t\t\t\tS117.1,84.1,118.6,84.1z M118.6,68.1h42.5c1.5,0,2.7-1.2,2.7-2.7s-1.2-2.7-2.7-2.7h-42.5c-1.5,0-2.7,1.2-2.7,2.7\r\n\t\t\t\tS117.1,68.1,118.6,68.1z M118.6,52.2h42.5c1.5,0,2.7-1.2,2.7-2.7s-1.2-2.7-2.7-2.7h-42.5c-1.5,0-2.7,1.2-2.7,2.7\r\n\t\t\t\tS117.1,52.2,118.6,52.2z M102.7,158.4H60.2c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h42.5c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS104.1,158.4,102.7,158.4z M102.7,142.5H60.2c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h42.5c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS104.1,142.5,102.7,142.5z M102.7,126.6H60.2c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h42.5c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS104.1,126.6,102.7,126.6z M161.1,158.4h-42.5c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h42.5c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS162.6,158.4,161.1,158.4z M161.1,142.5h-42.5c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h42.5c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS162.6,142.5,161.1,142.5z M161.1,126.6h-42.5c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h42.5c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS162.6,126.6,161.1,126.6z M161.1,94.7H60.2c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h100.9c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS162.6,94.7,161.1,94.7z M161.1,110.6H60.2c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7h100.9c1.5,0,2.7-1.2,2.7-2.7\r\n\t\t\t\tS162.6,110.6,161.1,110.6z M62.8,84.1H100c2.9,0,5.3-2.4,5.3-5.3V41.6c0-2.9-2.4-5.3-5.3-5.3H62.8c-2.9,0-5.3,2.4-5.3,5.3v37.2\r\n\t\t\t\tC57.5,81.7,59.9,84.1,62.8,84.1z M68.1,46.9h26.6v26.6H68.1V46.9z\" />\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "beaf":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./OCP.svg": "eeed",
	"./book.svg": "57d5",
	"./copy.svg": "f5be",
	"./department.svg": "62a5",
	"./fullscreen-scale.svg": "6dea",
	"./fullscreen.svg": "d320",
	"./github.svg": "36c1",
	"./grade.svg": "995d",
	"./initiate.svg": "3acb",
	"./lock.svg": "841b",
	"./message.svg": "1b99",
	"./news.svg": "b1d6",
	"./notice.svg": "7b68",
	"./qr.svg": "d37f",
	"./recall.svg": "0ced",
	"./service.svg": "52b9",
	"./todo.svg": "1b6b",
	"./zero-icon.svg": "135c"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "beaf";

/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d320":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-fullscreen",
  "use": "icon-fullscreen-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"icon-fullscreen\"><defs><style type=\"text/css\"></style></defs><path d=\"M237.248 192H352a32 32 0 1 0 0-64H160a32 32 0 0 0-32 32v192a32 32 0 1 0 64 0v-114.752l137.36 137.36a32 32 0 1 0 45.232-45.264L237.248 192zM832 237.248V352a32 32 0 1 0 64 0V160a32 32 0 0 0-32-32H672a32 32 0 1 0 0 64h114.752l-137.36 137.36a32 32 0 1 0 45.264 45.232L832 237.248zM237.248 832H352a32 32 0 1 1 0 64H160a32 32 0 0 1-32-32V672a32 32 0 1 1 64 0v114.752l137.36-137.36a32 32 0 1 1 45.232 45.264L237.248 832zM832 786.752V672a32 32 0 1 1 64 0v192a32 32 0 0 1-32 32H672a32 32 0 1 1 0-64h114.752l-137.36-137.36a32 32 0 1 1 45.264-45.232L832 786.752z\" p-id=\"2325\" /></symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "d37f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-qr",
  "use": "icon-qr-usage",
  "viewBox": "0 0 1024 1024",
  "content": "<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"icon-qr\"><defs><style type=\"text/css\"></style></defs><path d=\"M928.016126 543.908618 95.983874 543.908618c-17.717453 0-31.994625-14.277171-31.994625-31.994625S78.26642 479.919368 95.983874 479.919368l832.032253 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S945.73358 543.908618 928.016126 543.908618z\" p-id=\"8733\" /><path d=\"M832.032253 928.016126 639.892491 928.016126c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625l191.967747 0c17.717453 0 31.994625-14.277171 31.994625-31.994625l0-159.973123c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 159.973123C928.016126 884.840585 884.840585 928.016126 832.032253 928.016126z\" p-id=\"8734\" /><path d=\"M351.94087 928.016126l-159.973123 0c-52.980346 0-95.983874-43.003528-95.983874-95.983874l0-159.973123c0-17.717453 14.277171-31.994625 31.994625-31.994625S159.973123 654.341676 159.973123 672.05913l0 159.973123c0 17.717453 14.449185 31.994625 31.994625 31.994625l159.973123 0c17.717453 0 31.994625 14.277171 31.994625 31.994625C383.935495 913.738955 369.658324 928.016126 351.94087 928.016126z\" p-id=\"8735\" /><path d=\"M127.978498 383.935495c-17.717453 0-31.994625-14.277171-31.994625-31.994625l0-159.973123c0-52.980346 43.003528-95.983874 95.983874-95.983874l159.973123 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S369.658324 159.973123 351.94087 159.973123l-159.973123 0c-17.545439 0-31.994625 14.449185-31.994625 31.994625l0 159.973123C159.973123 369.658324 145.695952 383.935495 127.978498 383.935495z\" p-id=\"8736\" /><path d=\"M896.021502 383.935495c-17.717453 0-31.994625-14.277171-31.994625-31.994625l0-159.973123c0-17.545439-14.277171-31.994625-31.994625-31.994625L639.892491 159.973123c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625l191.967747 0c52.980346 0 95.983874 43.003528 95.983874 95.983874l0 159.973123C928.016126 369.658324 913.738955 383.935495 896.021502 383.935495z\" p-id=\"8737\" /></symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e017":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

var SpriteSymbol = function SpriteSymbol(ref) {
  var id = ref.id;
  var viewBox = ref.viewBox;
  var content = ref.content;

  this.id = id;
  this.viewBox = viewBox;
  this.content = content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.stringify = function stringify () {
  return this.content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.toString = function toString () {
  return this.stringify();
};

SpriteSymbol.prototype.destroy = function destroy () {
    var this$1 = this;

  ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop]; });
};

/**
 * @param {string} content
 * @return {Element}
 */
var parse = function (content) {
  var hasImportNode = !!document.importNode;
  var doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var deepmerge = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {} else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

var namespaces_1 = createCommonjsModule(function (module, exports) {
var namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
});

/**
 * @param {Object} attrs
 * @return {string}
 */
var objectToAttrsString = function (attrs) {
  return Object.keys(attrs).map(function (attr) {
    var value = attrs[attr].toString().replace(/"/g, '&quot;');
    return (attr + "=\"" + value + "\"");
  }).join(' ');
};

var svg = namespaces_1.svg;
var xlink = namespaces_1.xlink;

var defaultAttrs = {};
defaultAttrs[svg.name] = svg.uri;
defaultAttrs[xlink.name] = xlink.uri;

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
var wrapInSvgString = function (content, attributes) {
  if ( content === void 0 ) content = '';

  var attrs = deepmerge(defaultAttrs, attributes || {});
  var attrsRendered = objectToAttrsString(attrs);
  return ("<svg " + attrsRendered + ">" + content + "</svg>");
};

var BrowserSpriteSymbol = (function (SpriteSymbol$$1) {
  function BrowserSpriteSymbol () {
    SpriteSymbol$$1.apply(this, arguments);
  }

  if ( SpriteSymbol$$1 ) BrowserSpriteSymbol.__proto__ = SpriteSymbol$$1;
  BrowserSpriteSymbol.prototype = Object.create( SpriteSymbol$$1 && SpriteSymbol$$1.prototype );
  BrowserSpriteSymbol.prototype.constructor = BrowserSpriteSymbol;

  var prototypeAccessors = { isMounted: {} };

  prototypeAccessors.isMounted.get = function () {
    return !!this.node;
  };

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  BrowserSpriteSymbol.createFromExistingNode = function createFromExistingNode (node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  };

  BrowserSpriteSymbol.prototype.destroy = function destroy () {
    if (this.isMounted) {
      this.unmount();
    }
    SpriteSymbol$$1.prototype.destroy.call(this);
  };

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.mount = function mount (target) {
    if (this.isMounted) {
      return this.node;
    }

    var mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    var node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  };

  /**
   * @return {Element}
   */
  BrowserSpriteSymbol.prototype.render = function render () {
    var content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  };

  BrowserSpriteSymbol.prototype.unmount = function unmount () {
    this.node.parentNode.removeChild(this.node);
  };

  Object.defineProperties( BrowserSpriteSymbol.prototype, prototypeAccessors );

  return BrowserSpriteSymbol;
}(SpriteSymbol));

return BrowserSpriteSymbol;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "eeed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-OCP",
  "use": "icon-OCP-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-OCP\">\r\n<title>一卡通</title>\r\n<desc>Created with Sketch.</desc>\r\n<g>\r\n\t<path d=\"M171.2,34H27.8c-7.3,0-13.3,6-13.3,13.3v105.1c0,7.3,6,13.3,13.3,13.3h143.4c7.3,0,13.3-6,13.3-13.3V47.2\r\n\t\tC184.5,39.9,178.6,34,171.2,34z M27.8,47h143.4c0.1,0,0.2,0.1,0.2,0.2v18.3H27.6V47.2C27.6,47.1,27.7,47,27.8,47z M171.2,152.5\r\n\t\tH27.8c-0.1,0-0.2-0.1-0.2-0.2V78.6h143.9v73.7C171.5,152.4,171.3,152.5,171.2,152.5z\" />\r\n\t<path d=\"M159.6,92.5h-39.4c-3.6,0-6.5,2.9-6.5,6.5c0,3.6,2.9,6.5,6.5,6.5h39.4c3.6,0,6.5-2.9,6.5-6.5\r\n\t\tC166.1,95.4,163.2,92.5,159.6,92.5z\" />\r\n\t<path d=\"M100.2,92.5H40c-3.6,0-6.5,2.9-6.5,6.5c0,3.6,2.9,6.5,6.5,6.5h60.2c3.6,0,6.5-2.9,6.5-6.5\r\n\t\tC106.7,95.4,103.8,92.5,100.2,92.5z\" />\r\n\t<path d=\"M80.8,115.8H40.3c-3.6,0-6.5,2.9-6.5,6.5c0,3.6,2.9,6.5,6.5,6.5h40.4c3.6,0,6.5-2.9,6.5-6.5\r\n\t\tC87.3,118.7,84.4,115.8,80.8,115.8z\" />\r\n</g>\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "f5be":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e017");
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("21a1");
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-copy",
  "use": "icon-copy-usage",
  "viewBox": "0 0 200 200",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 200 200\" id=\"icon-copy\">\r\n<path id=\"icon-copy_形状结合\" d=\"M126.8,14.6l0.3,0l0.5,0.1h0.1c0.2,0,0.4,0.1,0.5,0.1l0,0c0.2,0.1,0.4,0.1,0.6,0.2\r\n\tc0.2,0.1,0.3,0.1,0.5,0.2l0,0h0.1c0.1,0.1,0.3,0.2,0.4,0.3l0,0l0.1,0.1l0.4,0.3l0.1,0.1l0.4,0.4l0.1,0.1l42.2,42.2\r\n\tc0.1,0.2,0.2,0.3,0.4,0.5l0,0l0.1,0.1c0.1,0.1,0.2,0.2,0.3,0.4c0,0,0,0.1,0.1,0.1c0.1,0.1,0.2,0.3,0.2,0.4l0,0v0.1\r\n\tc0.1,0.2,0.2,0.3,0.2,0.5l0,0c0.1,0.2,0.1,0.4,0.2,0.6c0.1,0.2,0.1,0.5,0.1,0.5s-0.1,0,0,0.1c0.1,0.2,0.1,0.3,0.1,0.5\r\n\tc0,0.2,0,0.4,0,0.6l0,0V145c0,9.7-7.8,17.5-17.5,17.5l0,0h-5.7v4.5c0,9.7-7.8,17.5-17.5,17.5l0,0h-92c-9.7,0-17.5-7.8-17.5-17.5l0,0\r\n\tV54c0-9.7,7.9-17.5,17.5-17.5l0,0h5.6V32c0.1-9.6,7.9-17.4,17.5-17.4l0,0h61.2c0.2,0,0.4,0,0.6,0L126.8,14.6z M47.8,49.1h-5.6\r\n\tc-2.7,0-4.9,2.2-4.9,4.9l0,0v113.1c0,1.3,0.5,2.5,1.4,3.4s2.2,1.4,3.4,1.4l0,0h92c2.7,0,4.9-2.2,4.9-4.9l0,0l0-4.5H65.3\r\n\tc-9.7,0-17.5-7.8-17.5-17.5l0,0V49.1z M120,27.1H65.3c-1.3,0-2.5,0.5-3.4,1.4c-0.9,0.9-1.4,2.2-1.4,3.4l0,0v113\r\n\tc0,1.3,0.5,2.5,1.4,3.4c0.9,0.9,2.2,1.4,3.4,1.4l0,0h92c1.3,0,2.5-0.5,3.5-1.4s1.4-2.1,1.5-3.4l0,0V69.3h-35.8\r\n\tc-3.5,0-6.3-2.8-6.3-6.3l0,0V27.1z M140.6,123.1c3.5,0,6.3,2.8,6.3,6.3s-2.8,6.3-6.3,6.3l0,0H81.9c-3.5,0-6.3-2.8-6.3-6.3\r\n\ts2.8-6.3,6.3-6.3l0,0H140.6z M140.6,99.2c3.5,0,6.3,2.8,6.3,6.3c0,3.5-2.8,6.3-6.3,6.3l0,0H81.9c-3.5,0-6.3-2.8-6.3-6.3\r\n\tc0-3.5,2.8-6.3,6.3-6.3l0,0H140.6z M110,75.2c3.5,0,6.3,2.8,6.3,6.3s-2.8,6.3-6.3,6.3l0,0H81.9c-3.5,0-6.3-2.8-6.3-6.3\r\n\ts2.8-6.3,6.3-6.3l0,0H110z M132.7,36.1v20.5h20.5L132.7,36.1z\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7e6f2bda-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/zero-icon/ZeroIcon.vue?vue&type=template&id=50d27a86&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',_vm._g({style:(_vm.style),attrs:{"aria-hidden":"true"}},_vm.$listeners),[_c('use',{attrs:{"xlink:href":_vm.iconName}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/zero-icon/ZeroIcon.vue?vue&type=template&id=50d27a86&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/zero-icon/ZeroIcon.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var ZeroIconvue_type_script_lang_js_ = ({
  name: "ZeroIcon",
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName: function iconName() {
      return "#icon-" + this.icon;
    },
    style: function style() {
      return {
        width: "1em",
        height: "1em",
        overflow: "hidden",
        fill: "currentColor",
        verticalAlign: "-0.15em"
      };
    }
  }
});
// CONCATENATED MODULE: ./packages/zero-icon/ZeroIcon.vue?vue&type=script&lang=js&
 /* harmony default export */ var zero_icon_ZeroIconvue_type_script_lang_js_ = (ZeroIconvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/zero-icon/ZeroIcon.vue





/* normalize component */

var component = normalizeComponent(
  zero_icon_ZeroIconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ZeroIcon = (component.exports);
// CONCATENATED MODULE: ./packages/zero-icon/index.js



// import Vue from "vue";
 // 全局注册
// Vue.component("z-icon", ZeroIcon);
// 为组件提供 install 安装方法，供按需引入

ZeroIcon.install = function (Vue) {
  Vue.component(ZeroIcon.name, ZeroIcon);
};

var req = __webpack_require__("beaf");

var requireAll = function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
};

requireAll(req); // 导出组件

/* harmony default export */ var zero_icon = (ZeroIcon);
// CONCATENATED MODULE: ./packages/index.js

// 导入 ZeroIcon 组件
 // 存储组件列表

var components = [zero_icon]; // 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册

var install = function install(Vue) {
  // 判断是否安装
  if (install.installed) return; // 遍历注册全局组件

  components.map(function (component) {
    return Vue.component(component.name, component);
  });
}; // 判断是否是直接引入文件


if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var packages_0 = ({
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install: install,
  // 以下是具体的组件列表
  ZeroIcon: zero_icon
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
});