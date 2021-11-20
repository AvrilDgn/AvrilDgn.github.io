/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : _typeof(exports)) === 'object' && ( false ? undefined : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && _typeof(value) === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) {
          __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
        }
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }
    /************************************************************************/

    /******/
    ([
    /* 0 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__); // CONCATENATED MODULE: ./src/tools.js


      var argumentAsArray = function argumentAsArray(argument) {
        return Array.isArray(argument) ? argument : [argument];
      };

      var isElement = function isElement(target) {
        return target instanceof Node;
      };

      var isElementList = function isElementList(nodeList) {
        return nodeList instanceof NodeList;
      };

      var eachNode = function eachNode(nodeList, callback) {
        if (nodeList && callback) {
          nodeList = isElementList(nodeList) ? nodeList : [nodeList];

          for (var i = 0; i < nodeList.length; i++) {
            if (callback(nodeList[i], i, nodeList.length) === true) {
              break;
            }
          }
        }
      };

      var throwError = function throwError(message) {
        return console.error("[scroll-lock] ".concat(message));
      };

      var arrayAsSelector = function arrayAsSelector(array) {
        if (Array.isArray(array)) {
          var selector = array.join(', ');
          return selector;
        }
      };

      var nodeListAsArray = function nodeListAsArray(nodeList) {
        var nodes = [];
        eachNode(nodeList, function (node) {
          return nodes.push(node);
        });
        return nodes;
      };

      var findParentBySelector = function findParentBySelector($el, selector) {
        var self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var $root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

        if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
          return $el;
        }

        while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1) {
          ;
        }

        return $el;
      };

      var elementHasSelector = function elementHasSelector($el, selector) {
        var $root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
        var has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
        return has;
      };

      var elementHasOverflowHidden = function elementHasOverflowHidden($el) {
        if ($el) {
          var computedStyle = getComputedStyle($el);
          var overflowIsHidden = computedStyle.overflow === 'hidden';
          return overflowIsHidden;
        }
      };

      var elementScrollTopOnStart = function elementScrollTopOnStart($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollTop = $el.scrollTop;
          return scrollTop <= 0;
        }
      };

      var elementScrollTopOnEnd = function elementScrollTopOnEnd($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollTop = $el.scrollTop;
          var scrollHeight = $el.scrollHeight;
          var scrollTopWithHeight = scrollTop + $el.offsetHeight;
          return scrollTopWithHeight >= scrollHeight;
        }
      };

      var elementScrollLeftOnStart = function elementScrollLeftOnStart($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollLeft = $el.scrollLeft;
          return scrollLeft <= 0;
        }
      };

      var elementScrollLeftOnEnd = function elementScrollLeftOnEnd($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollLeft = $el.scrollLeft;
          var scrollWidth = $el.scrollWidth;
          var scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
          return scrollLeftWithWidth >= scrollWidth;
        }
      };

      var elementIsScrollableField = function elementIsScrollableField($el) {
        var selector = 'textarea, [contenteditable="true"]';
        return elementHasSelector($el, selector);
      };

      var elementIsInputRange = function elementIsInputRange($el) {
        var selector = 'input[type="range"]';
        return elementHasSelector($el, selector);
      }; // CONCATENATED MODULE: ./src/scroll-lock.js

      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "disablePageScroll", function () {
        return disablePageScroll;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "enablePageScroll", function () {
        return enablePageScroll;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getScrollState", function () {
        return getScrollState;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function () {
        return clearQueueScrollLocks;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function () {
        return scroll_lock_getTargetScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function () {
        return scroll_lock_getCurrentTargetScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function () {
        return getPageScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function () {
        return getCurrentPageScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function () {
        return scroll_lock_addScrollableTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function () {
        return scroll_lock_removeScrollableTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function () {
        return scroll_lock_addScrollableSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function () {
        return scroll_lock_removeScrollableSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addLockableTarget", function () {
        return scroll_lock_addLockableTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addLockableSelector", function () {
        return scroll_lock_addLockableSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function () {
        return scroll_lock_setFillGapMethod;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function () {
        return scroll_lock_addFillGapTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function () {
        return scroll_lock_removeFillGapTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function () {
        return scroll_lock_addFillGapSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function () {
        return scroll_lock_removeFillGapSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "refillGaps", function () {
        return refillGaps;
      });

      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys = Object.keys(source);

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }

          ownKeys.forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        }

        return target;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }

      var FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
      var TOUCH_DIRECTION_DETECT_OFFSET = 3;
      var state = {
        scroll: true,
        queue: 0,
        scrollableSelectors: ['[data-scroll-lock-scrollable]'],
        lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
        fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
        fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
        //
        startTouchY: 0,
        startTouchX: 0
      };

      var disablePageScroll = function disablePageScroll(target) {
        if (state.queue <= 0) {
          state.scroll = false;
          scroll_lock_hideLockableOverflow();
          fillGaps();
        }

        scroll_lock_addScrollableTarget(target);
        state.queue++;
      };

      var enablePageScroll = function enablePageScroll(target) {
        state.queue > 0 && state.queue--;

        if (state.queue <= 0) {
          state.scroll = true;
          scroll_lock_showLockableOverflow();
          unfillGaps();
        }

        scroll_lock_removeScrollableTarget(target);
      };

      var getScrollState = function getScrollState() {
        return state.scroll;
      };

      var clearQueueScrollLocks = function clearQueueScrollLocks() {
        state.queue = 0;
      };

      var scroll_lock_getTargetScrollBarWidth = function getTargetScrollBarWidth($target) {
        var onlyExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (isElement($target)) {
          var currentOverflowYProperty = $target.style.overflowY;

          if (onlyExists) {
            if (!getScrollState()) {
              $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-overflow-y-property');
            }
          } else {
            $target.style.overflowY = 'scroll';
          }

          var width = scroll_lock_getCurrentTargetScrollBarWidth($target);
          $target.style.overflowY = currentOverflowYProperty;
          return width;
        } else {
          return 0;
        }
      };

      var scroll_lock_getCurrentTargetScrollBarWidth = function getCurrentTargetScrollBarWidth($target) {
        if (isElement($target)) {
          if ($target === document.body) {
            var documentWidth = document.documentElement.clientWidth;
            var windowWidth = window.innerWidth;
            var currentWidth = windowWidth - documentWidth;
            return currentWidth;
          } else {
            var borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
            var borderRightWidthCurrentProperty = $target.style.borderRightWidth;
            $target.style.borderLeftWidth = '0px';
            $target.style.borderRightWidth = '0px';

            var _currentWidth = $target.offsetWidth - $target.clientWidth;

            $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
            $target.style.borderRightWidth = borderRightWidthCurrentProperty;
            return _currentWidth;
          }
        } else {
          return 0;
        }
      };

      var getPageScrollBarWidth = function getPageScrollBarWidth() {
        var onlyExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return scroll_lock_getTargetScrollBarWidth(document.body, onlyExists);
      };

      var getCurrentPageScrollBarWidth = function getCurrentPageScrollBarWidth() {
        return scroll_lock_getCurrentTargetScrollBarWidth(document.body);
      };

      var scroll_lock_addScrollableTarget = function addScrollableTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.setAttribute('data-scroll-lock-scrollable', '');
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_removeScrollableTarget = function removeScrollableTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.removeAttribute('data-scroll-lock-scrollable');
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_addScrollableSelector = function addScrollableSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.scrollableSelectors.push(selector);
          });
        }
      };

      var scroll_lock_removeScrollableSelector = function removeScrollableSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.scrollableSelectors = state.scrollableSelectors.filter(function (sSelector) {
              return sSelector !== selector;
            });
          });
        }
      };

      var scroll_lock_addLockableTarget = function addLockableTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.setAttribute('data-scroll-lock-lockable', '');
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });

          if (!getScrollState()) {
            scroll_lock_hideLockableOverflow();
          }
        }
      };

      var scroll_lock_addLockableSelector = function addLockableSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.lockableSelectors.push(selector);
          });

          if (!getScrollState()) {
            scroll_lock_hideLockableOverflow();
          }

          scroll_lock_addFillGapSelector(selector);
        }
      };

      var scroll_lock_setFillGapMethod = function setFillGapMethod(method) {
        if (method) {
          if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
            state.fillGapMethod = method;
            refillGaps();
          } else {
            var methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
            throwError("\"".concat(method, "\" method is not available!\nAvailable fill gap methods: ").concat(methods, "."));
          }
        }
      };

      var scroll_lock_addFillGapTarget = function addFillGapTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.setAttribute('data-scroll-lock-fill-gap', '');

                if (!state.scroll) {
                  scroll_lock_fillGapTarget($target);
                }
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_removeFillGapTarget = function removeFillGapTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.removeAttribute('data-scroll-lock-fill-gap');

                if (!state.scroll) {
                  scroll_lock_unfillGapTarget($target);
                }
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_addFillGapSelector = function addFillGapSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            if (state.fillGapSelectors.indexOf(selector) === -1) {
              state.fillGapSelectors.push(selector);

              if (!state.scroll) {
                scroll_lock_fillGapSelector(selector);
              }
            }
          });
        }
      };

      var scroll_lock_removeFillGapSelector = function removeFillGapSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.fillGapSelectors = state.fillGapSelectors.filter(function (fSelector) {
              return fSelector !== selector;
            });

            if (!state.scroll) {
              scroll_lock_unfillGapSelector(selector);
            }
          });
        }
      };

      var refillGaps = function refillGaps() {
        if (!state.scroll) {
          fillGaps();
        }
      };

      var scroll_lock_hideLockableOverflow = function hideLockableOverflow() {
        var selector = arrayAsSelector(state.lockableSelectors);
        scroll_lock_hideLockableOverflowSelector(selector);
      };

      var scroll_lock_showLockableOverflow = function showLockableOverflow() {
        var selector = arrayAsSelector(state.lockableSelectors);
        scroll_lock_showLockableOverflowSelector(selector);
      };

      var scroll_lock_hideLockableOverflowSelector = function hideLockableOverflowSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        eachNode($targets, function ($target) {
          scroll_lock_hideLockableOverflowTarget($target);
        });
      };

      var scroll_lock_showLockableOverflowSelector = function showLockableOverflowSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        eachNode($targets, function ($target) {
          scroll_lock_showLockableOverflowTarget($target);
        });
      };

      var scroll_lock_hideLockableOverflowTarget = function hideLockableOverflowTarget($target) {
        if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') !== 'true') {
          var computedStyle = window.getComputedStyle($target);
          $target.setAttribute('data-scroll-lock-saved-overflow-y-property', computedStyle.overflowY);
          $target.setAttribute('data-scroll-lock-saved-inline-overflow-property', $target.style.overflow);
          $target.setAttribute('data-scroll-lock-saved-inline-overflow-y-property', $target.style.overflowY);
          $target.style.overflow = 'hidden';
          $target.setAttribute('data-scroll-lock-locked', 'true');
        }
      };

      var scroll_lock_showLockableOverflowTarget = function showLockableOverflowTarget($target) {
        if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') === 'true') {
          $target.style.overflow = $target.getAttribute('data-scroll-lock-saved-inline-overflow-property');
          $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-inline-overflow-y-property');
          $target.removeAttribute('data-scroll-lock-saved-overflow-property');
          $target.removeAttribute('data-scroll-lock-saved-inline-overflow-property');
          $target.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');
          $target.removeAttribute('data-scroll-lock-locked');
        }
      };

      var fillGaps = function fillGaps() {
        state.fillGapSelectors.map(function (selector) {
          scroll_lock_fillGapSelector(selector);
        });
      };

      var unfillGaps = function unfillGaps() {
        state.fillGapSelectors.map(function (selector) {
          scroll_lock_unfillGapSelector(selector);
        });
      };

      var scroll_lock_fillGapSelector = function fillGapSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        var isLockable = state.lockableSelectors.indexOf(selector) !== -1;
        eachNode($targets, function ($target) {
          scroll_lock_fillGapTarget($target, isLockable);
        });
      };

      var scroll_lock_fillGapTarget = function fillGapTarget($target) {
        var isLockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (isElement($target)) {
          var scrollBarWidth;

          if ($target.getAttribute('data-scroll-lock-lockable') === '' || isLockable) {
            scrollBarWidth = scroll_lock_getTargetScrollBarWidth($target, true);
          } else {
            var $lockableParent = findParentBySelector($target, arrayAsSelector(state.lockableSelectors));
            scrollBarWidth = scroll_lock_getTargetScrollBarWidth($lockableParent, true);
          }

          if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
            scroll_lock_unfillGapTarget($target);
          }

          var computedStyle = window.getComputedStyle($target);
          $target.setAttribute('data-scroll-lock-filled-gap', 'true');
          $target.setAttribute('data-scroll-lock-current-fill-gap-method', state.fillGapMethod);

          if (state.fillGapMethod === 'margin') {
            var currentMargin = parseFloat(computedStyle.marginRight);
            $target.style.marginRight = "".concat(currentMargin + scrollBarWidth, "px");
          } else if (state.fillGapMethod === 'width') {
            $target.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
          } else if (state.fillGapMethod === 'max-width') {
            $target.style.maxWidth = "calc(100% - ".concat(scrollBarWidth, "px)");
          } else if (state.fillGapMethod === 'padding') {
            var currentPadding = parseFloat(computedStyle.paddingRight);
            $target.style.paddingRight = "".concat(currentPadding + scrollBarWidth, "px");
          }
        }
      };

      var scroll_lock_unfillGapSelector = function unfillGapSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        eachNode($targets, function ($target) {
          scroll_lock_unfillGapTarget($target);
        });
      };

      var scroll_lock_unfillGapTarget = function unfillGapTarget($target) {
        if (isElement($target)) {
          if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
            var currentFillGapMethod = $target.getAttribute('data-scroll-lock-current-fill-gap-method');
            $target.removeAttribute('data-scroll-lock-filled-gap');
            $target.removeAttribute('data-scroll-lock-current-fill-gap-method');

            if (currentFillGapMethod === 'margin') {
              $target.style.marginRight = "";
            } else if (currentFillGapMethod === 'width') {
              $target.style.width = "";
            } else if (currentFillGapMethod === 'max-width') {
              $target.style.maxWidth = "";
            } else if (currentFillGapMethod === 'padding') {
              $target.style.paddingRight = "";
            }
          }
        }
      };

      var onResize = function onResize(e) {
        refillGaps();
      };

      var onTouchStart = function onTouchStart(e) {
        if (!state.scroll) {
          state.startTouchY = e.touches[0].clientY;
          state.startTouchX = e.touches[0].clientX;
        }
      };

      var scroll_lock_onTouchMove = function onTouchMove(e) {
        if (!state.scroll) {
          var startTouchY = state.startTouchY,
              startTouchX = state.startTouchX;
          var currentClientY = e.touches[0].clientY;
          var currentClientX = e.touches[0].clientX;

          if (e.touches.length < 2) {
            var selector = arrayAsSelector(state.scrollableSelectors);
            var direction = {
              up: startTouchY < currentClientY,
              down: startTouchY > currentClientY,
              left: startTouchX < currentClientX,
              right: startTouchX > currentClientX
            };
            var directionWithOffset = {
              up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
              down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
              left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
              right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX
            };

            var handle = function handle($el) {
              var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              if ($el) {
                var parentScrollableEl = findParentBySelector($el, selector, false);

                if (elementIsInputRange($el)) {
                  return false;
                }

                if (skip || elementIsScrollableField($el) && findParentBySelector($el, selector) || elementHasSelector($el, selector)) {
                  var prevent = false;

                  if (elementScrollLeftOnStart($el) && elementScrollLeftOnEnd($el)) {
                    if (direction.up && elementScrollTopOnStart($el) || direction.down && elementScrollTopOnEnd($el)) {
                      prevent = true;
                    }
                  } else if (elementScrollTopOnStart($el) && elementScrollTopOnEnd($el)) {
                    if (direction.left && elementScrollLeftOnStart($el) || direction.right && elementScrollLeftOnEnd($el)) {
                      prevent = true;
                    }
                  } else if (directionWithOffset.up && elementScrollTopOnStart($el) || directionWithOffset.down && elementScrollTopOnEnd($el) || directionWithOffset.left && elementScrollLeftOnStart($el) || directionWithOffset.right && elementScrollLeftOnEnd($el)) {
                    prevent = true;
                  }

                  if (prevent) {
                    if (parentScrollableEl) {
                      handle(parentScrollableEl, true);
                    } else {
                      if (e.cancelable) {
                        e.preventDefault();
                      }
                    }
                  }
                } else {
                  handle(parentScrollableEl);
                }
              } else {
                if (e.cancelable) {
                  e.preventDefault();
                }
              }
            };

            handle(e.target);
          }
        }
      };

      var onTouchEnd = function onTouchEnd(e) {
        if (!state.scroll) {
          state.startTouchY = 0;
          state.startTouchX = 0;
        }
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', onResize);
      }

      if (typeof document !== 'undefined') {
        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('touchmove', scroll_lock_onTouchMove, {
          passive: false
        });
        document.addEventListener('touchend', onTouchEnd);
      }

      var deprecatedMethods = {
        hide: function hide(target) {
          throwError('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');
          disablePageScroll(target);
        },
        show: function show(target) {
          throwError('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');
          enablePageScroll(target);
        },
        toggle: function toggle(target) {
          throwError('"toggle" is deprecated! Do not use it.');

          if (getScrollState()) {
            disablePageScroll();
          } else {
            enablePageScroll(target);
          }
        },
        getState: function getState() {
          throwError('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');
          return getScrollState();
        },
        getWidth: function getWidth() {
          throwError('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth');
          return getPageScrollBarWidth();
        },
        getCurrentWidth: function getCurrentWidth() {
          throwError('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');
          return getCurrentPageScrollBarWidth();
        },
        setScrollableTargets: function setScrollableTargets(target) {
          throwError('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');
          scroll_lock_addScrollableTarget(target);
        },
        setFillGapSelectors: function setFillGapSelectors(selector) {
          throwError('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');
          scroll_lock_addFillGapSelector(selector);
        },
        setFillGapTargets: function setFillGapTargets(target) {
          throwError('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');
          scroll_lock_addFillGapTarget(target);
        },
        clearQueue: function clearQueue() {
          throwError('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');
          clearQueueScrollLocks();
        }
      };

      var scrollLock = _objectSpread({
        disablePageScroll: disablePageScroll,
        enablePageScroll: enablePageScroll,
        getScrollState: getScrollState,
        clearQueueScrollLocks: clearQueueScrollLocks,
        getTargetScrollBarWidth: scroll_lock_getTargetScrollBarWidth,
        getCurrentTargetScrollBarWidth: scroll_lock_getCurrentTargetScrollBarWidth,
        getPageScrollBarWidth: getPageScrollBarWidth,
        getCurrentPageScrollBarWidth: getCurrentPageScrollBarWidth,
        addScrollableSelector: scroll_lock_addScrollableSelector,
        removeScrollableSelector: scroll_lock_removeScrollableSelector,
        addScrollableTarget: scroll_lock_addScrollableTarget,
        removeScrollableTarget: scroll_lock_removeScrollableTarget,
        addLockableSelector: scroll_lock_addLockableSelector,
        addLockableTarget: scroll_lock_addLockableTarget,
        addFillGapSelector: scroll_lock_addFillGapSelector,
        removeFillGapSelector: scroll_lock_removeFillGapSelector,
        addFillGapTarget: scroll_lock_addFillGapTarget,
        removeFillGapTarget: scroll_lock_removeFillGapTarget,
        setFillGapMethod: scroll_lock_setFillGapMethod,
        refillGaps: refillGaps,
        _state: state
      }, deprecatedMethods);
      /* harmony default export */


      var scroll_lock = __webpack_exports__["default"] = scrollLock;
      /***/
    }
    /******/
    ])["default"]
  );
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/scroll-lock/dist/scroll-lock.js
var scroll_lock = __webpack_require__(0);
var scroll_lock_default = /*#__PURE__*/__webpack_require__.n(scroll_lock);

// CONCATENATED MODULE: ./node_modules/dl-animate/dist/dl-animate-module.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DLAnimate = /*#__PURE__*/function () {
  function DLAnimate() {
    _classCallCheck(this, DLAnimate);

    this.raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var divTest = document.createElement("div");
    /* checking browser for necessary opportunities */

    this.canAnimate = typeof this.raf === "function" && "classList" in divTest && _typeof(divTest.style.transition) !== undefined;

    if (this.canAnimate) {
      this.raf = this.raf.bind(window);
    }
    /* requestAnimationFrame queue */


    this.frames = [];
    this.framesRun = false;
  }

  _createClass(DLAnimate, [{
    key: "show",
    value: function show(el) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.canAnimate) {
        this._show(el);
      }

      if (!this._isHidden(el)) {
        return;
      }
      /* merge defaults and users options */


      var settings = this._calcOptions(options);
      /* set handler on animation finish */


      this._setFinishHandler(el, settings.track, settings.duration, function () {
        _this._removeClasses(el, settings.classNames.enterActive);

        _this._removeClasses(el, settings.classNames.enterTo);

        settings.afterEnter(el);
      });

      this._show(el);

      this._addClasses(el, settings.classNames.enter);

      settings.beforeEnter(el);

      this._addFrame(function () {
        _this._addClasses(el, settings.classNames.enterActive);
      });

      this._addFrame(function () {
        _this._removeClasses(el, settings.classNames.enter);

        _this._addClasses(el, settings.classNames.enterTo);
      });
    }
  }, {
    key: "hide",
    value: function hide(el) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.canAnimate) {
        this._hide(el);
      }

      if (this._isHidden(el)) {
        return;
      }

      var settings = this._calcOptions(options);

      this._setFinishHandler(el, settings.track, settings.duration, function () {
        _this2._hide(el);

        _this2._removeClasses(el, settings.classNames.leaveActive);

        _this2._removeClasses(el, settings.classNames.leaveTo);

        options.systemOnEnd && options.systemOnEnd();
        settings.afterLeave(el);
      });

      this._addClasses(el, settings.classNames.leave);

      settings.beforeLeave(el);

      this._addFrame(function () {
        _this2._addClasses(el, settings.classNames.leaveActive);
      });

      this._addFrame(function () {
        _this2._addClasses(el, settings.classNames.leaveTo);

        _this2._removeClasses(el, settings.classNames.leave);
      });
    }
  }, {
    key: "insert",
    value: function insert(target, el) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var before = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      this._hide(el);

      target.insertBefore(el, before);
      this.show(el, options);
    }
  }, {
    key: "remove",
    value: function remove(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options.systemDoneCallback = function () {
        el.parentNode.removeChild(el);
      };

      this.hide(el, options);
    }
  }, {
    key: "_setFinishHandler",
    value: function _setFinishHandler(el, track, duration, fn) {
      var eventName;
      var isCssTrack = true;

      if (track === 'transition') {
        eventName = 'transitionend';
      } else if (track === 'animation') {
        eventName = 'animationend';
      } else {
        isCssTrack = false;
      }

      if (isCssTrack) {
        var handler = function handler() {
          el.removeEventListener(eventName, handler);
          fn();
        };

        el.addEventListener(eventName, handler);
      } else {
        setTimeout(fn, duration);
      }
    }
  }, {
    key: "_calcOptions",
    value: function _calcOptions(options) {
      var name = options.name !== undefined ? options.name : 'dl-nothing-doing-class';

      var classNames = this._mergeSettings(this._classNames(name), options.classNames);

      delete options.classNames;
      var defaults = {
        name: '',
        track: 'transition',
        duration: null,
        classNames: classNames,
        beforeEnter: function beforeEnter(el) {},
        afterEnter: function afterEnter(el) {},
        beforeLeave: function beforeLeave(el) {},
        afterLeave: function afterLeave(el) {},
        systemDoneCallback: function systemDoneCallback(el) {}
      };

      var norm = this._mergeSettings(defaults, options);
      /* analize track & duration error */


      return norm;
    }
  }, {
    key: "_classNames",
    value: function _classNames(name) {
      return {
        enter: name + '-enter',
        enterActive: name + '-enter-active',
        enterTo: name + '-enter-to',
        leave: name + '-leave',
        leaveActive: name + '-leave-active',
        leaveTo: name + '-leave-to'
      };
    }
  }, {
    key: "_addFrame",
    value: function _addFrame(fn) {
      this.frames.push(fn);

      if (!this.framesRun) {
        this._nextFrame();
      }
    }
  }, {
    key: "_nextFrame",
    value: function _nextFrame() {
      var _this3 = this;

      if (this.frames.length === 0) {
        this.framesRun = false;
        return;
      }

      var frame = this.frames.shift();
      this.raf(function () {
        _this3.raf(function () {
          frame();

          _this3._nextFrame();
        });
      });
    }
  }, {
    key: "_addClasses",
    value: function _addClasses(el, str) {
      var arr = str.split(' ');

      for (var i = 0; i < arr.length; i++) {
        el.classList.add(arr[i]);
      }
    }
  }, {
    key: "_removeClasses",
    value: function _removeClasses(el, str) {
      var arr = str.split(' ');

      for (var i = 0; i < arr.length; i++) {
        el.classList.remove(arr[i]);
      }
    }
  }, {
    key: "_mergeSettings",
    value: function _mergeSettings(defaults, extra) {
      if (_typeof(extra) !== "object") {
        return defaults;
      }

      var res = {};

      for (var k in defaults) {
        res[k] = extra[k] !== undefined ? extra[k] : defaults[k];
      }

      return res;
    }
  }, {
    key: "_hide",
    value: function _hide(el) {
      el.style.display = 'none';
    }
  }, {
    key: "_show",
    value: function _show(el) {
      el.style.removeProperty('display');

      if (this._isHidden(el)) {
        el.style.display = 'block';
      }
    }
  }, {
    key: "_isHidden",
    value: function _isHidden(el) {
      return this._getStyle(el, 'display') === 'none';
    }
  }, {
    key: "_getStyle",
    value: function _getStyle(el, prop) {
      return getComputedStyle(el)[prop];
    }
  }]);

  return DLAnimate;
}();


// CONCATENATED MODULE: ./app/src/js/main.js
//Import Libraries';


/***** Main script *****/

document.addEventListener("DOMContentLoaded", function (domLoadedEvent) {
  // new WOW().init();
  var raf = function raf(callback) {
    window.requestAnimationFrame(function () {
      callback();
    });
  };

  var header = document.querySelector('.header');
  var windowWidth = document.documentElement.clientWidth,
      windowHeight = document.documentElement.clientHeight,
      headerHeight = header.offsetHeight;
  window.addEventListener('resize', function (e) {
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
    headerHeight = header.offsetHeight;
  });
  /**
   *	Header
   */
  //mobile menu

  var menuOpenBtn = document.querySelector('.header__menu-open');
  var menuCloseBtn = document.querySelector('.header__menu-close');
  var headerMenu = document.querySelector('.header__menu');
  var menuOverlay = document.querySelector('.header__overlay'); // header toggle menu

  var menuOpenHandler = function menuOpenHandler(e) {
    if (e) {
      e.preventDefault();
    }

    scroll_lock_default.a.disablePageScroll(headerMenu);
    headerMenu.style.display = 'flex';
    menuOverlay.style.display = 'block';
    raf(function () {
      headerMenu.classList.add('header__menu--opened');
      menuOverlay.classList.add('header__overlay--active');
      headerMenu.style.display = null;
      menuOverlay.style.display = null;
    });
    menuCloseBtn.addEventListener('click', menuCloseHandler);
    menuOverlay.addEventListener('click', menuCloseHandler);
  };

  var menuCloseHandler = function menuCloseHandler(e) {
    if (e) {
      e.preventDefault();
    }

    scroll_lock_default.a.enablePageScroll(headerMenu);
    headerMenu.style.transform = 'translateX(100%)';
    menuOverlay.style.opacity = 0;
    headerMenu.addEventListener('transitionend', function (e) {
      headerMenu.style.transform = null;
      headerMenu.classList.remove('header__menu--opened');
    }, {
      once: true
    });
    menuOverlay.addEventListener('transitionend', function (e) {
      menuOverlay.style.opacity = null;
      menuOverlay.classList.remove('header__overlay--active');
    }, {
      once: true
    });
    menuOpenBtn.addEventListener('click', menuOpenHandler);
  };

  if (menuOpenBtn && menuCloseBtn) {
    menuOpenBtn.addEventListener('click', menuOpenHandler);
  }

  window.onresize = function (e) {
    if (headerMenu.classList.contains('header__menu--opened')) {
      scroll_lock_default.a.enablePageScroll(headerMenu);
      headerMenu.classList.remove('header__menu--opened');
      menuOverlay.classList.remove('header__overlay--active');
      menuOpenBtn.addEventListener('click', menuOpenHandler);
    }
  };
  /**
   * Quiz
   */


  var gender;
  var genderButtons = document.querySelectorAll('.gender__input');
  var startBlock = document.querySelector('.quiz__start-block');
  var nextBtn = document.querySelector('.quiz__next-button');
  var btnPercent = nextBtn.querySelector('.button__percent');
  var stageWrapper = document.querySelector('.quiz__stage-wrapper');
  var stages = stageWrapper.querySelectorAll('.stage');
  var insertGender = document.querySelector('.quiz__insert-gender');
  var questionId = 0;
  var curQuestion = startBlock;

  for (var i = 0; i < genderButtons.length; i++) {
    var btn = genderButtons[i];
    btn.addEventListener('change', function () {
      gender = this.value;
      new DLAnimate().hide(curQuestion, {
        name: 'fade',
        track: 'animation',
        afterLeave: function afterLeave(el) {
          stages[questionId].classList.add('stage--active');
          stages[questionId + 1].classList.add('stage--next');
          questionId++;
          var opt = document.querySelector(".quiz__question[data-stage=\"".concat(questionId, "\"]"));
          curQuestion = opt;
          btnPercent.textContent = curQuestion.dataset.persent;

          switch (gender) {
            case 'female':
              insertGender.textContent = 'женщин';
              break;

            case 'male':
              insertGender.textContent = 'мужчин';
              break;

            default:
              insertGender.textContent = 'человек';
              break;
          }

          new DLAnimate().show(curQuestion, {
            name: 'fade',
            track: 'animation'
          });
          new DLAnimate().show(nextBtn, {
            name: 'fade',
            track: 'animation',
            beforeEnter: function beforeEnter(el) {
              el.disabled = true;
            }
          });
          new DLAnimate().show(stageWrapper, {
            name: 'fade',
            track: 'animation',
            beforeEnter: function beforeEnter(el) {
              el.style.display = 'flex';
            }
          });
        }
      });
    });
  }

  nextBtn.addEventListener('click', function (e) {
    this.disabled = true;
    new DLAnimate().hide(curQuestion, {
      name: 'fade',
      track: 'animation',
      afterLeave: function afterLeave(el) {
        if (questionId >= stages.length) {
          new DLAnimate().hide(stageWrapper, {
            name: 'fade',
            track: 'animation'
          });
        }

        if (questionId % 4 === 0) {
          stageWrapper.style.transform = 'translateX(-100%)';
        }

        if (questionId > 3) {} else {
          if (stages[questionId]) {
            stages[questionId].classList.add('stage--active');
            stages[questionId].classList.remove('stage--next');
            stages[questionId + 1].classList.add('stage--next');
          }
        }

        questionId++;
        var question = document.querySelector(".quiz__question[data-stage=\"".concat(questionId, "\"]"));
        curQuestion = question;

        if (curQuestion.querySelectorAll('.option').length <= 0) {
          nextBtn.disabled = false;
        }

        btnPercent.textContent = curQuestion.dataset.persent;
        new DLAnimate().show(question, {
          name: 'fade',
          track: 'animation'
        });
      }
    });
  }); // function hideStages(id, maxId) {
  // 	let el = stages[id];
  // 	new DLAnimate().hide(el, {
  // 		name: 'fade',
  // 		track: 'animation',
  // 		afterLeave: function () {
  // 			if (id === maxId) {
  // 				new DLAnimate().show(stages[id++], {
  // 					name: 'fade',
  // 					track: 'animation'
  // 				});
  // 			} else {
  // 				hideElement(id++, maxId);
  // 			}
  // 		}
  // 	});
  // }

  /**
   * Options checked
   */

  var optionsList = document.querySelectorAll('.option');

  var _loop = function _loop(_i) {
    var option = optionsList[_i];
    var input = option.querySelector('.option__input');
    input.addEventListener('change', function (e) {
      var group = option.parentElement.querySelectorAll('.option');

      if (input.getAttribute('type') === 'radio') {
        for (var j = 0; j < group.length; j++) {
          var opt = group[j];
          opt.classList.remove('option--active');
        }

        option.classList.add('option--active');
        nextBtn.disabled = false;
      } else {
        option.classList.toggle('option--active');
        nextBtn.disabled = true;

        for (var _j = 0; _j < group.length; _j++) {
          var _opt = group[_j];

          if (_opt.classList.contains('option--active')) {
            nextBtn.disabled = false;
            break;
          }
        }
      }
    });
  };

  for (var _i = 0; _i < optionsList.length; _i++) {
    _loop(_i);
  }
  /**
   * modals
   */

  /*
  	const modalOpenBtns = document.querySelectorAll('.modal-opener');
  	const modal = document.querySelector('.modal');
  	const modalCloseBtn = modal.querySelector('.modal__close-btn');
  
  	if (modal) {
  		for (let i = 0; i < modalOpenBtns.length; i++) {
  			const openBtn = modalOpenBtns[i],
  				modalId = "#" + openBtn.dataset.modal,
  				modalEl = document.querySelector(modalId);
  
  			if (!modalEl) {
  				continue;
  			}
  
  			const overlay = modal.querySelector('.modal__overlay');
  
  			openBtn.addEventListener("click", openModal);
  
  			function openModal(e) {
  				e.preventDefault();
  				modal.classList.add('modal--show');
  				modalEl.style.display = 'flex';
  				modalEl.appendChild(modalCloseBtn);
  				scrollLock.disablePageScroll(modal);
  
  				let handler = () => {
  					modalCloseBtn.addEventListener("click", closeModal);
  					overlay.addEventListener("click", closeModal);
  					openBtn.removeEventListener("click", openModal);
  				}
  
  				raf(() => {
  					modal.classList.add('modal--visible');
  					modal.addEventListener('transitionend', handler, { once: true });
  				});
  			}
  
  			function closeModal(e) {
  				e.preventDefault();
  				modal.classList.remove('modal--visible');
  				scrollLock.enablePageScroll(modal);
  
  				let handler = () => {
  					modal.classList.remove('modal--show');
  					modalEl.style.display = null;
  
  					openBtn.addEventListener("click", openModal);
  					overlay.removeEventListener("click", closeModal);
  					modalCloseBtn.removeEventListener("click", closeModal);
  				}
  
  				modal.addEventListener('transitionend', handler, { once: true });
  			}
  		}
  	}
  */

});

/***/ })
/******/ ]);