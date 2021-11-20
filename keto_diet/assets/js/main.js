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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Utility functions
var PREFIXES = 'Webkit Moz O ms'.split(' ');
var FLOAT_COMPARISON_EPSILON = 0.001; // Copy all attributes from source object to destination object.
// destination object is mutated.

function extend(destination, source, recursive) {
  destination = destination || {};
  source = source || {};
  recursive = recursive || false;

  for (var attrName in source) {
    if (source.hasOwnProperty(attrName)) {
      var destVal = destination[attrName];
      var sourceVal = source[attrName];

      if (recursive && isObject(destVal) && isObject(sourceVal)) {
        destination[attrName] = extend(destVal, sourceVal, recursive);
      } else {
        destination[attrName] = sourceVal;
      }
    }
  }

  return destination;
} // Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})


function render(template, vars) {
  var rendered = template;

  for (var key in vars) {
    if (vars.hasOwnProperty(key)) {
      var val = vars[key];
      var regExpString = '\\{' + key + '\\}';
      var regExp = new RegExp(regExpString, 'g');
      rendered = rendered.replace(regExp, val);
    }
  }

  return rendered;
}

function setStyle(element, style, value) {
  var elStyle = element.style; // cache for performance

  for (var i = 0; i < PREFIXES.length; ++i) {
    var prefix = PREFIXES[i];
    elStyle[prefix + capitalize(style)] = value;
  }

  elStyle[style] = value;
}

function setStyles(element, styles) {
  forEachObject(styles, function (styleValue, styleName) {
    // Allow disabling some individual styles by setting them
    // to null or undefined
    if (styleValue === null || styleValue === undefined) {
      return;
    } // If style's value is {prefix: true, value: '50%'},
    // Set also browser prefixed styles


    if (isObject(styleValue) && styleValue.prefix === true) {
      setStyle(element, styleName, styleValue.value);
    } else {
      element.style[styleName] = styleValue;
    }
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
} // Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array


function isObject(obj) {
  if (isArray(obj)) {
    return false;
  }

  var type = _typeof(obj);

  return type === 'object' && !!obj;
}

function forEachObject(object, callback) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var val = object[key];
      callback(val, key);
    }
  }
}

function floatEquals(a, b) {
  return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
} // https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements


function removeChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

module.exports = {
  extend: extend,
  render: render,
  setStyle: setStyle,
  setStyles: setStyles,
  capitalize: capitalize,
  isString: isString,
  isFunction: isFunction,
  isObject: isObject,
  forEachObject: forEachObject,
  floatEquals: floatEquals,
  removeChildren: removeChildren
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Base object for different progress bar shapes
var Path = __webpack_require__(4);

var utils = __webpack_require__(0);

var DESTROYED_ERROR = 'Object is destroyed';

var Shape = function Shape(container, opts) {
  // Throw a better error if progress bars are not initialized with `new`
  // keyword
  if (!(this instanceof Shape)) {
    throw new Error('Constructor was called without new keyword');
  } // Prevent calling constructor without parameters so inheritance
  // works correctly. To understand, this is how Shape is inherited:
  //
  //   Line.prototype = new Shape();
  //
  // We just want to set the prototype for Line.


  if (arguments.length === 0) {
    return;
  } // Default parameters for progress bar creation


  this._opts = utils.extend({
    color: '#555',
    strokeWidth: 1.0,
    trailColor: null,
    trailWidth: null,
    fill: null,
    text: {
      style: {
        color: null,
        position: 'absolute',
        left: '50%',
        top: '50%',
        padding: 0,
        margin: 0,
        transform: {
          prefix: true,
          value: 'translate(-50%, -50%)'
        }
      },
      autoStyleContainer: true,
      alignToBottom: true,
      value: null,
      className: 'progressbar-text'
    },
    svgStyle: {
      display: 'block',
      width: '100%'
    },
    warnings: false
  }, opts, true); // Use recursive extend
  // If user specifies e.g. svgStyle or text style, the whole object
  // should replace the defaults to make working with styles easier

  if (utils.isObject(opts) && opts.svgStyle !== undefined) {
    this._opts.svgStyle = opts.svgStyle;
  }

  if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
    this._opts.text.style = opts.text.style;
  }

  var svgView = this._createSvgView(this._opts);

  var element;

  if (utils.isString(container)) {
    element = document.querySelector(container);
  } else {
    element = container;
  }

  if (!element) {
    throw new Error('Container does not exist: ' + container);
  }

  this._container = element;

  this._container.appendChild(svgView.svg);

  if (this._opts.warnings) {
    this._warnContainerAspectRatio(this._container);
  }

  if (this._opts.svgStyle) {
    utils.setStyles(svgView.svg, this._opts.svgStyle);
  } // Expose public attributes before Path initialization


  this.svg = svgView.svg;
  this.path = svgView.path;
  this.trail = svgView.trail;
  this.text = null;
  var newOpts = utils.extend({
    attachment: undefined,
    shape: this
  }, this._opts);
  this._progressPath = new Path(svgView.path, newOpts);

  if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
    this.setText(this._opts.text.value);
  }
};

Shape.prototype.animate = function animate(progress, opts, cb) {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  }

  this._progressPath.animate(progress, opts, cb);
};

Shape.prototype.stop = function stop() {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  } // Don't crash if stop is called inside step function


  if (this._progressPath === undefined) {
    return;
  }

  this._progressPath.stop();
};

Shape.prototype.pause = function pause() {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  }

  if (this._progressPath === undefined) {
    return;
  }

  if (!this._progressPath._tweenable) {
    // It seems that we can't pause this
    return;
  }

  this._progressPath._tweenable.pause();
};

Shape.prototype.resume = function resume() {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  }

  if (this._progressPath === undefined) {
    return;
  }

  if (!this._progressPath._tweenable) {
    // It seems that we can't resume this
    return;
  }

  this._progressPath._tweenable.resume();
};

Shape.prototype.destroy = function destroy() {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  }

  this.stop();
  this.svg.parentNode.removeChild(this.svg);
  this.svg = null;
  this.path = null;
  this.trail = null;
  this._progressPath = null;

  if (this.text !== null) {
    this.text.parentNode.removeChild(this.text);
    this.text = null;
  }
};

Shape.prototype.set = function set(progress) {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  }

  this._progressPath.set(progress);
};

Shape.prototype.value = function value() {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  }

  if (this._progressPath === undefined) {
    return 0;
  }

  return this._progressPath.value();
};

Shape.prototype.setText = function setText(newText) {
  if (this._progressPath === null) {
    throw new Error(DESTROYED_ERROR);
  }

  if (this.text === null) {
    // Create new text node
    this.text = this._createTextContainer(this._opts, this._container);

    this._container.appendChild(this.text);
  } // Remove previous text and add new


  if (utils.isObject(newText)) {
    utils.removeChildren(this.text);
    this.text.appendChild(newText);
  } else {
    this.text.innerHTML = newText;
  }
};

Shape.prototype._createSvgView = function _createSvgView(opts) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  this._initializeSvg(svg, opts);

  var trailPath = null; // Each option listed in the if condition are 'triggers' for creating
  // the trail path

  if (opts.trailColor || opts.trailWidth) {
    trailPath = this._createTrail(opts);
    svg.appendChild(trailPath);
  }

  var path = this._createPath(opts);

  svg.appendChild(path);
  return {
    svg: svg,
    path: path,
    trail: trailPath
  };
};

Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
  svg.setAttribute('viewBox', '0 0 100 100');
};

Shape.prototype._createPath = function _createPath(opts) {
  var pathString = this._pathString(opts);

  return this._createPathElement(pathString, opts);
};

Shape.prototype._createTrail = function _createTrail(opts) {
  // Create path string with original passed options
  var pathString = this._trailString(opts); // Prevent modifying original


  var newOpts = utils.extend({}, opts); // Defaults for parameters which modify trail path

  if (!newOpts.trailColor) {
    newOpts.trailColor = '#eee';
  }

  if (!newOpts.trailWidth) {
    newOpts.trailWidth = newOpts.strokeWidth;
  }

  newOpts.color = newOpts.trailColor;
  newOpts.strokeWidth = newOpts.trailWidth; // When trail path is set, fill must be set for it instead of the
  // actual path to prevent trail stroke from clipping

  newOpts.fill = null;
  return this._createPathElement(pathString, newOpts);
};

Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathString);
  path.setAttribute('stroke', opts.color);
  path.setAttribute('stroke-width', opts.strokeWidth);

  if (opts.fill) {
    path.setAttribute('fill', opts.fill);
  } else {
    path.setAttribute('fill-opacity', '0');
  }

  return path;
};

Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
  var textContainer = document.createElement('div');
  textContainer.className = opts.text.className;
  var textStyle = opts.text.style;

  if (textStyle) {
    if (opts.text.autoStyleContainer) {
      container.style.position = 'relative';
    }

    utils.setStyles(textContainer, textStyle); // Default text color to progress bar's color

    if (!textStyle.color) {
      textContainer.style.color = opts.color;
    }
  }

  this._initializeTextContainer(opts, container, textContainer);

  return textContainer;
}; // Give custom shapes possibility to modify text element


Shape.prototype._initializeTextContainer = function (opts, container, element) {// By default, no-op
  // Custom shapes should respect API options, such as text.style
};

Shape.prototype._pathString = function _pathString(opts) {
  throw new Error('Override this function for each progress bar');
};

Shape.prototype._trailString = function _trailString(opts) {
  throw new Error('Override this function for each progress bar');
};

Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
  if (!this.containerAspectRatio) {
    return;
  }

  var computedStyle = window.getComputedStyle(container, null);
  var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
  var height = parseFloat(computedStyle.getPropertyValue('height'), 10);

  if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
    console.warn('Incorrect aspect ratio of container', '#' + container.id, 'detected:', computedStyle.getPropertyValue('width') + '(width)', '/', computedStyle.getPropertyValue('height') + '(height)', '=', width / height);
    console.warn('Aspect ratio of should be', this.containerAspectRatio);
  }
};

module.exports = Shape;

/***/ }),
/* 2 */
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Lower level API to animate any kind of svg path
var shifty = __webpack_require__(8);

var utils = __webpack_require__(0);

var Tweenable = shifty.Tweenable;
var EASING_ALIASES = {
  easeIn: 'easeInCubic',
  easeOut: 'easeOutCubic',
  easeInOut: 'easeInOutCubic'
};

var Path = function Path(path, opts) {
  // Throw a better error if not initialized with `new` keyword
  if (!(this instanceof Path)) {
    throw new Error('Constructor was called without new keyword');
  } // Default parameters for animation


  opts = utils.extend({
    delay: 0,
    duration: 800,
    easing: 'linear',
    from: {},
    to: {},
    step: function step() {}
  }, opts);
  var element;

  if (utils.isString(path)) {
    element = document.querySelector(path);
  } else {
    element = path;
  } // Reveal .path as public attribute


  this.path = element;
  this._opts = opts;
  this._tweenable = null; // Set up the starting positions

  var length = this.path.getTotalLength();
  this.path.style.strokeDasharray = length + ' ' + length;
  this.set(0);
};

Path.prototype.value = function value() {
  var offset = this._getComputedDashOffset();

  var length = this.path.getTotalLength();
  var progress = 1 - offset / length; // Round number to prevent returning very small number like 1e-30, which
  // is practically 0

  return parseFloat(progress.toFixed(6), 10);
};

Path.prototype.set = function set(progress) {
  this.stop();
  this.path.style.strokeDashoffset = this._progressToOffset(progress);
  var step = this._opts.step;

  if (utils.isFunction(step)) {
    var easing = this._easing(this._opts.easing);

    var values = this._calculateTo(progress, easing);

    var reference = this._opts.shape || this;
    step(values, reference, this._opts.attachment);
  }
};

Path.prototype.stop = function stop() {
  this._stopTween();

  this.path.style.strokeDashoffset = this._getComputedDashOffset();
}; // Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/


Path.prototype.animate = function animate(progress, opts, cb) {
  opts = opts || {};

  if (utils.isFunction(opts)) {
    cb = opts;
    opts = {};
  }

  var passedOpts = utils.extend({}, opts); // Copy default opts to new object so defaults are not modified

  var defaultOpts = utils.extend({}, this._opts);
  opts = utils.extend(defaultOpts, opts);

  var shiftyEasing = this._easing(opts.easing);

  var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

  this.stop(); // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating

  this.path.getBoundingClientRect();

  var offset = this._getComputedDashOffset();

  var newOffset = this._progressToOffset(progress);

  var self = this;
  this._tweenable = new Tweenable();

  this._tweenable.tween({
    from: utils.extend({
      offset: offset
    }, values.from),
    to: utils.extend({
      offset: newOffset
    }, values.to),
    duration: opts.duration,
    delay: opts.delay,
    easing: shiftyEasing,
    step: function step(state) {
      self.path.style.strokeDashoffset = state.offset;
      var reference = opts.shape || self;
      opts.step(state, reference, opts.attachment);
    }
  }).then(function (state) {
    if (utils.isFunction(cb)) {
      cb();
    }
  });
};

Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
  var computedStyle = window.getComputedStyle(this.path, null);
  return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
};

Path.prototype._progressToOffset = function _progressToOffset(progress) {
  var length = this.path.getTotalLength();
  return length - progress * length;
}; // Resolves from and to values for animation.


Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
  if (opts.from && opts.to) {
    return {
      from: opts.from,
      to: opts.to
    };
  }

  return {
    from: this._calculateFrom(easing),
    to: this._calculateTo(progress, easing)
  };
}; // Calculate `from` values from options passed at initialization


Path.prototype._calculateFrom = function _calculateFrom(easing) {
  return shifty.interpolate(this._opts.from, this._opts.to, this.value(), easing);
}; // Calculate `to` values from options passed at initialization


Path.prototype._calculateTo = function _calculateTo(progress, easing) {
  return shifty.interpolate(this._opts.from, this._opts.to, progress, easing);
};

Path.prototype._stopTween = function _stopTween() {
  if (this._tweenable !== null) {
    this._tweenable.stop();

    this._tweenable = null;
  }
};

Path.prototype._easing = function _easing(easing) {
  if (EASING_ALIASES.hasOwnProperty(easing)) {
    return EASING_ALIASES[easing];
  }

  return easing;
};

module.exports = Path;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Circle shaped progress bar
var Shape = __webpack_require__(1);

var utils = __webpack_require__(0);

var Circle = function Circle(container, options) {
  // Use two arcs to form a circle
  // See this answer http://stackoverflow.com/a/10477334/1446092
  this._pathTemplate = 'M 50,50 m 0,-{radius}' + ' a {radius},{radius} 0 1 1 0,{2radius}' + ' a {radius},{radius} 0 1 1 0,-{2radius}';
  this.containerAspectRatio = 1;
  Shape.apply(this, arguments);
};

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
  var widthOfWider = opts.strokeWidth;

  if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
    widthOfWider = opts.trailWidth;
  }

  var r = 50 - widthOfWider / 2;
  return utils.render(this._pathTemplate, {
    radius: r,
    '2radius': r * 2
  });
};

Circle.prototype._trailString = function _trailString(opts) {
  return this._pathString(opts);
};

module.exports = Circle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  // Higher level API, different shaped progress bars
  Line: __webpack_require__(7),
  Circle: __webpack_require__(5),
  SemiCircle: __webpack_require__(9),
  Square: __webpack_require__(10),
  // Lower level API to use any SVG path
  Path: __webpack_require__(4),
  // Base-class for creating new custom shapes
  // to be in line with the API of built-in shapes
  // Undocumented.
  Shape: __webpack_require__(1),
  // Internal utils, undocumented.
  utils: __webpack_require__(0)
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Line shaped progress bar
var Shape = __webpack_require__(1);

var utils = __webpack_require__(0);

var Line = function Line(container, options) {
  this._pathTemplate = 'M 0,{center} L 100,{center}';
  Shape.apply(this, arguments);
};

Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
  svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
  svg.setAttribute('preserveAspectRatio', 'none');
};

Line.prototype._pathString = function _pathString(opts) {
  return utils.render(this._pathTemplate, {
    center: opts.strokeWidth / 2
  });
};

Line.prototype._trailString = function _trailString(opts) {
  return this._pathString(opts);
};

module.exports = Line;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! For license information please see shifty.js.LICENSE.txt */
!function (t, n) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = n() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(self, function () {
  return function () {
    "use strict";

    var t = {
      720: function _(t, n, e) {
        e.r(n), e.d(n, {
          Scene: function Scene() {
            return Xt;
          },
          Tweenable: function Tweenable() {
            return _t;
          },
          interpolate: function interpolate() {
            return Wt;
          },
          processTweens: function processTweens() {
            return ft;
          },
          setBezierFunction: function setBezierFunction() {
            return Yt;
          },
          tween: function tween() {
            return yt;
          },
          unsetBezierFunction: function unsetBezierFunction() {
            return Zt;
          }
        });
        var r = {};
        e.r(r), e.d(r, {
          bounce: function bounce() {
            return D;
          },
          bouncePast: function bouncePast() {
            return q;
          },
          easeFrom: function easeFrom() {
            return B;
          },
          easeFromTo: function easeFromTo() {
            return Q;
          },
          easeInBack: function easeInBack() {
            return T;
          },
          easeInCirc: function easeInCirc() {
            return j;
          },
          easeInCubic: function easeInCubic() {
            return c;
          },
          easeInExpo: function easeInExpo() {
            return w;
          },
          easeInOutBack: function easeInOutBack() {
            return F;
          },
          easeInOutCirc: function easeInOutCirc() {
            return P;
          },
          easeInOutCubic: function easeInOutCubic() {
            return l;
          },
          easeInOutExpo: function easeInOutExpo() {
            return S;
          },
          easeInOutQuad: function easeInOutQuad() {
            return s;
          },
          easeInOutQuart: function easeInOutQuart() {
            return v;
          },
          easeInOutQuint: function easeInOutQuint() {
            return d;
          },
          easeInOutSine: function easeInOutSine() {
            return b;
          },
          easeInQuad: function easeInQuad() {
            return o;
          },
          easeInQuart: function easeInQuart() {
            return h;
          },
          easeInQuint: function easeInQuint() {
            return _;
          },
          easeInSine: function easeInSine() {
            return m;
          },
          easeOutBack: function easeOutBack() {
            return E;
          },
          easeOutBounce: function easeOutBounce() {
            return M;
          },
          easeOutCirc: function easeOutCirc() {
            return k;
          },
          easeOutCubic: function easeOutCubic() {
            return f;
          },
          easeOutExpo: function easeOutExpo() {
            return O;
          },
          easeOutQuad: function easeOutQuad() {
            return a;
          },
          easeOutQuart: function easeOutQuart() {
            return p;
          },
          easeOutQuint: function easeOutQuint() {
            return y;
          },
          easeOutSine: function easeOutSine() {
            return g;
          },
          easeTo: function easeTo() {
            return N;
          },
          elastic: function elastic() {
            return x;
          },
          linear: function linear() {
            return u;
          },
          swingFrom: function swingFrom() {
            return I;
          },
          swingFromTo: function swingFromTo() {
            return A;
          },
          swingTo: function swingTo() {
            return C;
          }
        });
        var i = {};
        e.r(i), e.d(i, {
          afterTween: function afterTween() {
            return Nt;
          },
          beforeTween: function beforeTween() {
            return Bt;
          },
          doesApply: function doesApply() {
            return qt;
          },
          tweenCreated: function tweenCreated() {
            return Qt;
          }
        });

        var u = function u(t) {
          return t;
        },
            o = function o(t) {
          return Math.pow(t, 2);
        },
            a = function a(t) {
          return -(Math.pow(t - 1, 2) - 1);
        },
            s = function s(t) {
          return (t /= .5) < 1 ? .5 * Math.pow(t, 2) : -.5 * ((t -= 2) * t - 2);
        },
            c = function c(t) {
          return Math.pow(t, 3);
        },
            f = function f(t) {
          return Math.pow(t - 1, 3) + 1;
        },
            l = function l(t) {
          return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
        },
            h = function h(t) {
          return Math.pow(t, 4);
        },
            p = function p(t) {
          return -(Math.pow(t - 1, 4) - 1);
        },
            v = function v(t) {
          return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2);
        },
            _ = function _(t) {
          return Math.pow(t, 5);
        },
            y = function y(t) {
          return Math.pow(t - 1, 5) + 1;
        },
            d = function d(t) {
          return (t /= .5) < 1 ? .5 * Math.pow(t, 5) : .5 * (Math.pow(t - 2, 5) + 2);
        },
            m = function m(t) {
          return 1 - Math.cos(t * (Math.PI / 2));
        },
            g = function g(t) {
          return Math.sin(t * (Math.PI / 2));
        },
            b = function b(t) {
          return -.5 * (Math.cos(Math.PI * t) - 1);
        },
            w = function w(t) {
          return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
        },
            O = function O(t) {
          return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
            S = function S(t) {
          return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t));
        },
            j = function j(t) {
          return -(Math.sqrt(1 - t * t) - 1);
        },
            k = function k(t) {
          return Math.sqrt(1 - Math.pow(t - 1, 2));
        },
            P = function P(t) {
          return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
            M = function M(t) {
          return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
            T = function T(t) {
          var n = 1.70158;
          return t * t * ((n + 1) * t - n);
        },
            E = function E(t) {
          var n = 1.70158;
          return (t -= 1) * t * ((n + 1) * t + n) + 1;
        },
            F = function F(t) {
          var n = 1.70158;
          return (t /= .5) < 1 ? t * t * ((1 + (n *= 1.525)) * t - n) * .5 : .5 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2);
        },
            x = function x(t) {
          return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1;
        },
            A = function A(t) {
          var n = 1.70158;
          return (t /= .5) < 1 ? t * t * ((1 + (n *= 1.525)) * t - n) * .5 : .5 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2);
        },
            I = function I(t) {
          var n = 1.70158;
          return t * t * ((n + 1) * t - n);
        },
            C = function C(t) {
          var n = 1.70158;
          return (t -= 1) * t * ((n + 1) * t + n) + 1;
        },
            D = function D(t) {
          return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
            q = function q(t) {
          return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
        },
            Q = function Q(t) {
          return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2);
        },
            B = function B(t) {
          return Math.pow(t, 4);
        },
            N = function N(t) {
          return Math.pow(t, .25);
        };

        function R(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function z(t, n) {
          for (var e = 0; e < n.length; e++) {
            var r = n[e];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
          }
        }

        function L(t) {
          return (L = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
            return _typeof(t);
          } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
          })(t);
        }

        function U(t, n) {
          var e = Object.keys(t);

          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            n && (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(t, n).enumerable;
            })), e.push.apply(e, r);
          }

          return e;
        }

        function V(t) {
          for (var n = 1; n < arguments.length; n++) {
            var e = null != arguments[n] ? arguments[n] : {};
            n % 2 ? U(Object(e), !0).forEach(function (n) {
              W(t, n, e[n]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : U(Object(e)).forEach(function (n) {
              Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
            });
          }

          return t;
        }

        function W(t, n, e) {
          return n in t ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = e, t;
        }

        var $,
            G,
            H,
            J = "linear",
            K = "undefined" != typeof window ? window : e.g,
            X = "afterTween",
            Y = "afterTweenEnd",
            Z = "beforeTween",
            tt = "tweenCreated",
            nt = "function",
            et = "string",
            rt = K.requestAnimationFrame || K.webkitRequestAnimationFrame || K.oRequestAnimationFrame || K.msRequestAnimationFrame || K.mozCancelRequestAnimationFrame && K.mozRequestAnimationFrame || setTimeout,
            it = function it() {},
            ut = null,
            ot = null,
            at = V({}, r),
            st = function st(t, n, e, r, i, u, o) {
          var a,
              s,
              c,
              f = t < u ? 0 : (t - u) / i,
              l = !1;

          for (var h in o && o.call && (l = !0, a = o(f)), n) {
            l || (a = ((s = o[h]).call ? s : at[s])(f)), c = e[h], n[h] = c + (r[h] - c) * a;
          }

          return n;
        },
            ct = function ct(t, n) {
          var e = t._timestamp,
              r = t._currentState,
              i = t._delay;

          if (!(n < e + i)) {
            var u = t._duration,
                o = t._targetState,
                a = e + i + u,
                s = n > a ? a : n,
                c = s >= a,
                f = u - (a - s),
                l = t._filters.length > 0;
            if (c) return t._render(o, t._data, f), t.stop(!0);
            l && t._applyFilter(Z), s < e + i ? e = u = s = 1 : e += i, st(s, r, t._originalState, o, u, e, t._easing), l && t._applyFilter(X), t._render(r, t._data, f);
          }
        },
            ft = function ft() {
          for (var t, n = _t.now(), e = ut; e;) {
            t = e._next, ct(e, n), e = t;
          }
        },
            lt = Date.now || function () {
          return +new Date();
        },
            ht = function ht(t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : J,
              e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              r = L(n);
          if (at[n]) return at[n];
          if (r === et || r === nt) for (var i in t) {
            e[i] = n;
          } else for (var u in t) {
            e[u] = n[u] || J;
          }
          return e;
        },
            pt = function pt(t) {
          t === ut ? (ut = t._next) ? ut._previous = null : ot = null : t === ot ? (ot = t._previous) ? ot._next = null : ut = null : (G = t._previous, H = t._next, G._next = H, H._previous = G), t._previous = t._next = null;
        },
            vt = "function" == typeof Promise ? Promise : null,
            _t = function () {
          function t() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
            R(this, t), this._config = {}, this._data = {}, this._delay = 0, this._filters = [], this._next = null, this._previous = null, this._timestamp = null, this._resolve = null, this._reject = null, this._currentState = n || {}, this._originalState = {}, this._targetState = {}, this._start = it, this._render = it, this._promiseCtor = vt, e && this.setConfig(e);
          }

          var n, e;
          return n = t, (e = [{
            key: "_applyFilter",
            value: function value(t) {
              for (var n = this._filters.length; n > 0; n--) {
                var e = this._filters[n - n][t];
                e && e(this);
              }
            }
          }, {
            key: "tween",
            value: function value() {
              var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
              return this._isPlaying && this.stop(), !n && this._config || this.setConfig(n), this._pausedAtTime = null, this._timestamp = t.now(), this._start(this.get(), this._data), this._delay && this._render(this._currentState, this._data, 0), this._resume(this._timestamp);
            }
          }, {
            key: "setConfig",
            value: function value() {
              var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  e = this._config;

              for (var r in n) {
                e[r] = n[r];
              }

              var i = e.promise,
                  u = void 0 === i ? this._promiseCtor : i,
                  o = e.start,
                  a = void 0 === o ? it : o,
                  s = e.finish,
                  c = e.render,
                  f = void 0 === c ? this._config.step || it : c,
                  l = e.step,
                  h = void 0 === l ? it : l;
              this._data = e.data || e.attachment || this._data, this._isPlaying = !1, this._pausedAtTime = null, this._scheduleId = null, this._delay = n.delay || 0, this._start = a, this._render = f || h, this._duration = e.duration || 500, this._promiseCtor = u, s && (this._resolve = s);

              var p = n.from,
                  v = n.to,
                  _ = void 0 === v ? {} : v,
                  y = this._currentState,
                  d = this._originalState,
                  m = this._targetState;

              for (var g in p) {
                y[g] = p[g];
              }

              var b = !1;

              for (var w in y) {
                var O = y[w];
                b || L(O) !== et || (b = !0), d[w] = O, m[w] = _.hasOwnProperty(w) ? _[w] : O;
              }

              if (this._easing = ht(this._currentState, e.easing, this._easing), this._filters.length = 0, b) {
                for (var S in t.filters) {
                  t.filters[S].doesApply(this) && this._filters.push(t.filters[S]);
                }

                this._applyFilter(tt);
              }

              return this;
            }
          }, {
            key: "then",
            value: function value(t, n) {
              var e = this;
              return this._promise = new this._promiseCtor(function (t, n) {
                e._resolve = t, e._reject = n;
              }), this._promise.then(t, n);
            }
          }, {
            key: "catch",
            value: function value(t) {
              return this.then()["catch"](t);
            }
          }, {
            key: "get",
            value: function value() {
              return V({}, this._currentState);
            }
          }, {
            key: "set",
            value: function value(t) {
              this._currentState = t;
            }
          }, {
            key: "pause",
            value: function value() {
              if (this._isPlaying) return this._pausedAtTime = t.now(), this._isPlaying = !1, pt(this), this;
            }
          }, {
            key: "resume",
            value: function value() {
              return this._resume();
            }
          }, {
            key: "_resume",
            value: function value() {
              var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t.now();
              return null === this._timestamp ? this.tween() : this._isPlaying ? this._promise : (this._pausedAtTime && (this._timestamp += n - this._pausedAtTime, this._pausedAtTime = null), this._isPlaying = !0, null === ut ? (ut = this, ot = this) : (this._previous = ot, ot._next = this, ot = this), this);
            }
          }, {
            key: "seek",
            value: function value(n) {
              n = Math.max(n, 0);
              var e = t.now();
              return this._timestamp + n === 0 || (this._timestamp = e - n, ct(this, e)), this;
            }
          }, {
            key: "stop",
            value: function value() {
              var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (!this._isPlaying) return this;
              this._isPlaying = !1, pt(this);
              var n = this._filters.length > 0;
              return t && (n && this._applyFilter(Z), st(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), n && (this._applyFilter(X), this._applyFilter(Y))), this._resolve && this._resolve({
                data: this._data,
                state: this._currentState,
                tweenable: this
              }), this._resolve = null, this._reject = null, this;
            }
          }, {
            key: "cancel",
            value: function value() {
              var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                  n = this._currentState,
                  e = this._data,
                  r = this._isPlaying;
              return r ? (this._reject && this._reject({
                data: e,
                state: n,
                tweenable: this
              }), this._resolve = null, this._reject = null, this.stop(t)) : this;
            }
          }, {
            key: "isPlaying",
            value: function value() {
              return this._isPlaying;
            }
          }, {
            key: "setScheduleFunction",
            value: function value(n) {
              t.setScheduleFunction(n);
            }
          }, {
            key: "data",
            value: function value() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
              return t && (this._data = V({}, t)), this._data;
            }
          }, {
            key: "dispose",
            value: function value() {
              for (var t in this) {
                delete this[t];
              }
            }
          }]) && z(n.prototype, e), t;
        }();

        function yt() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = new _t();
          return n.tween(t), n.tweenable = n, n;
        }

        W(_t, "now", function () {
          return $;
        }), _t.setScheduleFunction = function (t) {
          return rt = t;
        }, _t.formulas = at, _t.filters = {}, function t() {
          $ = lt(), rt.call(K, t, 16.666666666666668), ft();
        }();

        var dt,
            mt,
            gt = /(\d|-|\.)/,
            bt = /([^\-0-9.]+)/g,
            wt = /[0-9.-]+/g,
            Ot = (dt = wt.source, mt = /,\s*/.source, new RegExp("rgb\\(".concat(dt).concat(mt).concat(dt).concat(mt).concat(dt, "\\)"), "g")),
            St = /^.*\(/,
            jt = /#([0-9]|[a-f]){3,6}/gi,
            kt = "VAL",
            Pt = function Pt(t, n) {
          return t.map(function (t, e) {
            return "_".concat(n, "_").concat(e);
          });
        };

        function Mt(t) {
          return parseInt(t, 16);
        }

        var Tt = function Tt(t) {
          return "rgb(".concat((n = t, 3 === (n = n.replace(/#/, "")).length && (n = (n = n.split(""))[0] + n[0] + n[1] + n[1] + n[2] + n[2]), [Mt(n.substr(0, 2)), Mt(n.substr(2, 2)), Mt(n.substr(4, 2))]).join(","), ")");
          var n;
        },
            Et = function Et(t, n, e) {
          var r = n.match(t),
              i = n.replace(t, kt);
          return r && r.forEach(function (t) {
            return i = i.replace(kt, e(t));
          }), i;
        },
            Ft = function Ft(t) {
          for (var n in t) {
            var e = t[n];
            "string" == typeof e && e.match(jt) && (t[n] = Et(jt, e, Tt));
          }
        },
            xt = function xt(t) {
          var n = t.match(wt).map(Math.floor),
              e = t.match(St)[0];
          return "".concat(e).concat(n.join(","), ")");
        },
            At = function At(t) {
          return t.match(wt);
        },
            It = function It(t, n) {
          var e = {};
          return n.forEach(function (n) {
            e[n] = t[n], delete t[n];
          }), e;
        },
            Ct = function Ct(t, n) {
          return n.map(function (n) {
            return t[n];
          });
        },
            Dt = function Dt(t, n) {
          return n.forEach(function (n) {
            return t = t.replace(kt, +n.toFixed(4));
          }), t;
        },
            qt = function qt(t) {
          for (var n in t._currentState) {
            if ("string" == typeof t._currentState[n]) return !0;
          }

          return !1;
        };

        function Qt(t) {
          var n = t._currentState;
          [n, t._originalState, t._targetState].forEach(Ft), t._tokenData = function (t) {
            var n,
                e,
                r = {};

            for (var i in t) {
              var u = t[i];
              "string" == typeof u && (r[i] = {
                formatString: (n = u, e = void 0, e = n.match(bt), e ? (1 === e.length || n.charAt(0).match(gt)) && e.unshift("") : e = ["", ""], e.join(kt)),
                chunkNames: Pt(At(u), i)
              });
            }

            return r;
          }(n);
        }

        function Bt(t) {
          var n = t._currentState,
              e = t._originalState,
              r = t._targetState,
              i = t._easing,
              u = t._tokenData;
          !function (t, n) {
            var e = function e(_e) {
              var r = n[_e].chunkNames,
                  i = t[_e];

              if ("string" == typeof i) {
                var u = i.split(" "),
                    o = u[u.length - 1];
                r.forEach(function (n, e) {
                  return t[n] = u[e] || o;
                });
              } else r.forEach(function (n) {
                return t[n] = i;
              });

              delete t[_e];
            };

            for (var r in n) {
              e(r);
            }
          }(i, u), [n, e, r].forEach(function (t) {
            return function (t, n) {
              var e = function e(_e2) {
                At(t[_e2]).forEach(function (r, i) {
                  return t[n[_e2].chunkNames[i]] = +r;
                }), delete t[_e2];
              };

              for (var r in n) {
                e(r);
              }
            }(t, u);
          });
        }

        function Nt(t) {
          var n = t._currentState,
              e = t._originalState,
              r = t._targetState,
              i = t._easing,
              u = t._tokenData;
          [n, e, r].forEach(function (t) {
            return function (t, n) {
              for (var e in n) {
                var r = n[e],
                    i = r.chunkNames,
                    u = r.formatString,
                    o = Dt(u, Ct(It(t, i), i));
                t[e] = Et(Ot, o, xt);
              }
            }(t, u);
          }), function (t, n) {
            for (var e in n) {
              var r = n[e].chunkNames,
                  i = t[r[0]];
              t[e] = "string" == typeof i ? r.map(function (n) {
                var e = t[n];
                return delete t[n], e;
              }).join(" ") : i;
            }
          }(i, u);
        }

        function Rt(t, n) {
          var e = Object.keys(t);

          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            n && (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(t, n).enumerable;
            })), e.push.apply(e, r);
          }

          return e;
        }

        function zt(t) {
          for (var n = 1; n < arguments.length; n++) {
            var e = null != arguments[n] ? arguments[n] : {};
            n % 2 ? Rt(Object(e), !0).forEach(function (n) {
              Lt(t, n, e[n]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : Rt(Object(e)).forEach(function (n) {
              Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
            });
          }

          return t;
        }

        function Lt(t, n, e) {
          return n in t ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = e, t;
        }

        var Ut = new _t(),
            Vt = _t.filters,
            Wt = function Wt(t, n, e, r) {
          var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
              u = zt({}, t),
              o = ht(t, r);

          for (var a in Ut._filters.length = 0, Ut.set({}), Ut._currentState = u, Ut._originalState = t, Ut._targetState = n, Ut._easing = o, Vt) {
            Vt[a].doesApply(Ut) && Ut._filters.push(Vt[a]);
          }

          Ut._applyFilter("tweenCreated"), Ut._applyFilter("beforeTween");
          var s = st(e, u, t, n, 1, i, o);
          return Ut._applyFilter("afterTween"), s;
        };

        function $t(t, n) {
          (null == n || n > t.length) && (n = t.length);

          for (var e = 0, r = new Array(n); e < n; e++) {
            r[e] = t[e];
          }

          return r;
        }

        function Gt(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function Ht(t, n) {
          for (var e = 0; e < n.length; e++) {
            var r = n[e];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
          }
        }

        function Jt(t, n) {
          var e = n.get(t);
          if (!e) throw new TypeError("attempted to get private field on non-instance");
          return e.get ? e.get.call(t) : e.value;
        }

        var Kt = new WeakMap(),
            Xt = function () {
          function t() {
            Gt(this, t), Kt.set(this, {
              writable: !0,
              value: []
            });

            for (var n = arguments.length, e = new Array(n), r = 0; r < n; r++) {
              e[r] = arguments[r];
            }

            e.forEach(this.add.bind(this));
          }

          var n, e;
          return n = t, (e = [{
            key: "add",
            value: function value(t) {
              return Jt(this, Kt).push(t), t;
            }
          }, {
            key: "remove",
            value: function value(t) {
              var n = Jt(this, Kt).indexOf(t);
              return ~n && Jt(this, Kt).splice(n, 1), t;
            }
          }, {
            key: "empty",
            value: function value() {
              return this.tweenables.map(this.remove.bind(this));
            }
          }, {
            key: "isPlaying",
            value: function value() {
              return Jt(this, Kt).some(function (t) {
                return t.isPlaying();
              });
            }
          }, {
            key: "play",
            value: function value() {
              return Jt(this, Kt).forEach(function (t) {
                return t.tween();
              }), this;
            }
          }, {
            key: "pause",
            value: function value() {
              return Jt(this, Kt).forEach(function (t) {
                return t.pause();
              }), this;
            }
          }, {
            key: "resume",
            value: function value() {
              return Jt(this, Kt).forEach(function (t) {
                return t.resume();
              }), this;
            }
          }, {
            key: "stop",
            value: function value(t) {
              return Jt(this, Kt).forEach(function (n) {
                return n.stop(t);
              }), this;
            }
          }, {
            key: "tweenables",
            get: function get() {
              return function (t) {
                if (Array.isArray(t)) return $t(t);
              }(t = Jt(this, Kt)) || function (t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
              }(t) || function (t, n) {
                if (t) {
                  if ("string" == typeof t) return $t(t, n);
                  var e = Object.prototype.toString.call(t).slice(8, -1);
                  return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? $t(t, n) : void 0;
                }
              }(t) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }();
              var t;
            }
          }, {
            key: "promises",
            get: function get() {
              return Jt(this, Kt).map(function (t) {
                return t.then();
              });
            }
          }]) && Ht(n.prototype, e), t;
        }();

        var Yt = function Yt(t, n, e, r, i) {
          var u = function (t, n, e, r) {
            return function (i) {
              return f = 0, l = 0, h = 0, p = function p(t) {
                return ((f * t + l) * t + h) * t;
              }, v = function v(t) {
                return (3 * f * t + 2 * l) * t + h;
              }, _ = function _(t) {
                return t >= 0 ? t : 0 - t;
              }, f = 1 - (h = 3 * (u = t)) - (l = 3 * (e - u) - h), a = 1 - (c = 3 * (o = n)) - (s = 3 * (r - o) - c), function (t) {
                return ((a * t + s) * t + c) * t;
              }(function (t, n) {
                var e, r, i, u, o, a;

                for (i = t, a = 0; a < 8; a++) {
                  if (u = p(i) - t, _(u) < n) return i;
                  if (o = v(i), _(o) < 1e-6) break;
                  i -= u / o;
                }

                if ((i = t) < (e = 0)) return e;
                if (i > (r = 1)) return r;

                for (; e < r;) {
                  if (u = p(i), _(u - t) < n) return i;
                  t > u ? e = i : r = i, i = .5 * (r - e) + e;
                }

                return i;
              }(i, function (t) {
                return 1 / (200 * t);
              }(1)));

              var u, o, a, s, c, f, l, h, p, v, _;
            };
          }(n, e, r, i);

          return u.displayName = t, u.x1 = n, u.y1 = e, u.x2 = r, u.y2 = i, _t.formulas[t] = u;
        },
            Zt = function Zt(t) {
          return delete _t.formulas[t];
        };

        _t.filters.token = i;
      }
    },
        n = {};

    function e(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        exports: {}
      };
      return t[r](i, i.exports, e), i.exports;
    }

    return e.d = function (t, n) {
      for (var r in n) {
        e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
          enumerable: !0,
          get: n[r]
        });
      }
    }, e.g = function () {
      if ("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis))) return globalThis;

      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) return window;
      }
    }(), e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, e(720);
  }();
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Semi-SemiCircle shaped progress bar
var Shape = __webpack_require__(1);

var Circle = __webpack_require__(5);

var utils = __webpack_require__(0);

var SemiCircle = function SemiCircle(container, options) {
  // Use one arc to form a SemiCircle
  // See this answer http://stackoverflow.com/a/10477334/1446092
  this._pathTemplate = 'M 50,50 m -{radius},0' + ' a {radius},{radius} 0 1 1 {2radius},0';
  this.containerAspectRatio = 2;
  Shape.apply(this, arguments);
};

SemiCircle.prototype = new Shape();
SemiCircle.prototype.constructor = SemiCircle;

SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
  svg.setAttribute('viewBox', '0 0 100 50');
};

SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(opts, container, textContainer) {
  if (opts.text.style) {
    // Reset top style
    textContainer.style.top = 'auto';
    textContainer.style.bottom = '0';

    if (opts.text.alignToBottom) {
      utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
    } else {
      utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
    }
  }
}; // Share functionality with Circle, just have different path


SemiCircle.prototype._pathString = Circle.prototype._pathString;
SemiCircle.prototype._trailString = Circle.prototype._trailString;
module.exports = SemiCircle;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Square shaped progress bar
// Note: Square is not core part of API anymore. It's left here
//       for reference. square is not included to the progressbar
//       build anymore
var Shape = __webpack_require__(1);

var utils = __webpack_require__(0);

var Square = function Square(container, options) {
  this._pathTemplate = 'M 0,{halfOfStrokeWidth}' + ' L {width},{halfOfStrokeWidth}' + ' L {width},{width}' + ' L {halfOfStrokeWidth},{width}' + ' L {halfOfStrokeWidth},{strokeWidth}';
  this._trailTemplate = 'M {startMargin},{halfOfStrokeWidth}' + ' L {width},{halfOfStrokeWidth}' + ' L {width},{width}' + ' L {halfOfStrokeWidth},{width}' + ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';
  Shape.apply(this, arguments);
};

Square.prototype = new Shape();
Square.prototype.constructor = Square;

Square.prototype._pathString = function _pathString(opts) {
  var w = 100 - opts.strokeWidth / 2;
  return utils.render(this._pathTemplate, {
    width: w,
    strokeWidth: opts.strokeWidth,
    halfOfStrokeWidth: opts.strokeWidth / 2
  });
};

Square.prototype._trailString = function _trailString(opts) {
  var w = 100 - opts.strokeWidth / 2;
  return utils.render(this._trailTemplate, {
    width: w,
    strokeWidth: opts.strokeWidth,
    halfOfStrokeWidth: opts.strokeWidth / 2,
    startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
  });
};

module.exports = Square;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/scroll-lock/dist/scroll-lock.js
var scroll_lock = __webpack_require__(2);
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


// EXTERNAL MODULE: ./node_modules/progressbar.js/src/main.js
var main = __webpack_require__(6);
var main_default = /*#__PURE__*/__webpack_require__.n(main);

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
   * Progress Bar
   */


  var progressWrap = document.querySelector('.quiz__progress-wrap');
  var progressEl = progressWrap.querySelector('.quiz__progressbar');
  var progressBar = new main_default.a.Circle(progressEl, {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 3,
    trailWidth: 3,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      style: {
        color: '#000',
        position: 'absolute',
        left: '50%',
        top: '50%',
        padding: 0,
        margin: 0,
        transform: 'translate(-50%, -50%)'
      },
      autoStyleContainer: false
    },
    from: {
      color: 'rgba(247, 237, 66, 1)',
      width: 3
    },
    to: {
      color: 'rgba(243, 176, 13, 1)',
      width: 3
    },
    // Set default step function for all animate calls
    step: function step(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      var value = Math.round(circle.value() * 100);

      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value + ' %');
      }
    }
  });
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
  var stageId = 0;
  var curQuestion = startBlock;

  for (var i = 0; i < genderButtons.length; i++) {
    var btn = genderButtons[i];
    btn.addEventListener('change', function () {
      gender = this.value;
      new DLAnimate().hide(curQuestion, {
        name: 'fade',
        track: 'animation',
        afterLeave: function afterLeave(el) {
          stages[stageId].classList.add('stage--active');
          stages[stageId + 1].classList.add('stage--next');
          questionId++;
          stageId++;
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
            track: 'animation'
          });
        }
      });
    });
  }

  nextBtn.addEventListener('click', function (e) {
    this.disabled = true;

    if (stageId >= stages.length) {
      new DLAnimate().hide(nextBtn, {
        name: 'fade',
        track: 'animation'
      });
      new DLAnimate().hide(curQuestion, {
        name: 'fade',
        track: 'animation'
      });
      new DLAnimate().hide(stageWrapper, {
        name: 'fade',
        track: 'animation',
        afterLeave: function afterLeave(el) {
          new DLAnimate().show(progressWrap, {
            name: 'fade',
            track: 'animation',
            afterEnter: function afterEnter(el) {
              progressBar.animate(1.0);
            }
          });
        }
      });
      return;
    }

    new DLAnimate().hide(curQuestion, {
      name: 'fade',
      track: 'animation',
      afterLeave: function afterLeave(el) {
        if (stageId % 4 === 0) {
          stageWrapper.querySelector('.quiz__stage-list').style.transform = 'translateX(-100%)';
        }

        questionId++;
        var question = document.querySelector(".quiz__question[data-stage=\"".concat(questionId, "\"]"));
        curQuestion = question;

        if (!curQuestion.hasAttribute('data-stage-pause')) {
          stageId++;

          if (stages[stageId - 1]) {
            stages[stageId - 1].classList.add('stage--active');
            stages[stageId - 1].classList.remove('stage--next');
          }

          if (stages[stageId]) {
            stages[stageId].classList.add('stage--next');
          }
        }

        if (curQuestion.querySelectorAll('.option').length <= 0) {
          nextBtn.disabled = false;
        }

        if (curQuestion.dataset.persent) {
          btnPercent.textContent = "(" + curQuestion.dataset.persent + "%)";
        } else {
          btnPercent.textContent = "";
        }

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