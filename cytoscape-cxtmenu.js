(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeCxtmenu"] = factory();
	else
		root["cytoscapeCxtmenu"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var assign = __webpack_require__(1);

var _require = __webpack_require__(3),
    removeEles = _require.removeEles,
    setStyles = _require.setStyles,
    createElement = _require.createElement,
    getPixelRatio = _require.getPixelRatio,
    getOffset = _require.getOffset;

var cxtmenu = function cxtmenu(params) {
  var options = assign({}, defaults, params);
  var cy = this;
  var container = cy.container();
  var target = void 0;

  var data = {
    options: options,
    handlers: [],
    container: createElement({ class: 'cxtmenu' })
  };

  var wrapper = data.container;
  var parent = createElement();
  var canvas = createElement({ tag: 'canvas' });
  var commands = [];
  var c2d = canvas.getContext('2d');
  var r = options.menuRadius;
  var containerSize = (r + options.activePadding) * 2;
  var activeCommandI = void 0;
  var offset = void 0;
  var canvasSize = containerSize,
      activePadding = options.activePadding,
      hasSubCommand = !!options.commands.find(function (menu) {
    return !!menu.subCommands;
  }),
      offsetSize = hasSubCommand ? 2 * r : r;

  if (hasSubCommand) {
    containerSize = canvasSize + r * 2;
  }

  container.insertBefore(wrapper, container.firstChild);
  wrapper.appendChild(parent);
  parent.appendChild(canvas);

  setStyles(wrapper, {
    position: 'absolute',
    zIndex: options.zIndex,
    userSelect: 'none'
  });

  setStyles(parent, {
    display: 'none',
    width: containerSize + 'px',
    height: containerSize + 'px',
    position: 'absolute',
    zIndex: 1,
    marginLeft: -options.activePadding + 'px',
    marginTop: -options.activePadding + 'px',
    userSelect: 'none'
  });

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  function createMenuItems() {
    removeEles('.cxtmenu-item', parent);
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];

      var midtheta = (theta1 + theta2) / 2;
      var rx1 = 0.66 * r * Math.cos(midtheta);
      var ry1 = 0.66 * r * Math.sin(midtheta);

      var item = createElement({ class: 'cxtmenu-item' });
      setStyles(item, {
        color: options.itemColor,
        cursor: 'default',
        display: 'table',
        'text-align': 'center',
        //background: 'red',
        position: 'absolute',
        'text-shadow': '-1px -1px 2px ' + options.itemTextShadowColor + ', 1px -1px 2px ' + options.itemTextShadowColor + ', -1px 1px 2px ' + options.itemTextShadowColor + ', 1px 1px 1px ' + options.itemTextShadowColor,
        left: '50%',
        top: '50%',
        'min-height': r * 0.66 + 'px',
        width: r * 0.66 + 'px',
        height: r * 0.66 + 'px',
        marginLeft: rx1 - r * 0.33 + 'px',
        marginTop: -ry1 - r * 0.33 + 'px'
      });

      var content = createElement({ class: 'cxtmenu-content' });

      if (command.content instanceof HTMLElement) {
        content.appendChild(command.content);
      } else {
        content.innerHTML = command.content;
      }

      setStyles(content, {
        'width': r * 0.66 + 'px',
        'height': r * 0.66 + 'px',
        'vertical-align': 'middle',
        'display': 'table-cell'
      });

      setStyles(content, command.contentStyle || {});

      if (command.disabled === true || command.enabled === false) {
        content.classList.add('cxtmenu-disabled');
      }

      parent.appendChild(item);
      item.appendChild(content);

      theta1 += dtheta;
      theta2 += dtheta;
    }
  }

  function queueDrawBg(rspotlight) {
    redrawQueue.drawBg = [rspotlight];
  }

  function drawBg(rspotlight) {
    rspotlight = rspotlight !== undefined ? rspotlight : rs;

    c2d.globalCompositeOperation = 'source-over';

    c2d.clearRect(0, 0, containerSize, containerSize);

    // draw background items
    c2d.fillStyle = options.fillColor;
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    for (var index = 0; index < commands.length; index++) {
      var command = commands[index];

      if (command.fillColor) {
        c2d.fillStyle = command.fillColor;
      }
      c2d.beginPath();
      c2d.moveTo(offsetSize + options.activePadding, offsetSize + options.activePadding);
      c2d.arc(offsetSize + options.activePadding, offsetSize + options.activePadding, r, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
      c2d.closePath();
      c2d.fill();

      theta1 += dtheta;
      theta2 += dtheta;

      c2d.fillStyle = options.fillColor;
    }

    // draw separators between items
    c2d.globalCompositeOperation = 'destination-out';
    c2d.strokeStyle = 'white';
    c2d.lineWidth = options.separatorWidth;
    theta1 = Math.PI / 2;
    theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var rx1 = r * Math.cos(theta1);
      var ry1 = r * Math.sin(theta1);
      c2d.beginPath();
      c2d.moveTo(offsetSize + options.activePadding, offsetSize + options.activePadding);
      c2d.lineTo(offsetSize + options.activePadding + rx1, offsetSize + options.activePadding - ry1);
      c2d.closePath();
      c2d.stroke();

      theta1 += dtheta;
      theta2 += dtheta;
    }

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';
    c2d.beginPath();
    //c2d.arc(offsetSize + options.activePadding, offsetSize + options.activePadding, rspotlight + options.spotlightPadding, 0, Math.PI*2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function queueDrawCommands(rx, ry, theta, d) {
    redrawQueue.drawCommands = [rx, ry, theta, d];
  }

  function drawCommands(rx, ry, theta, d) {
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    var mouseR = d;

    theta1 += dtheta * activeCommandI;
    theta2 += dtheta * activeCommandI;

    c2d.fillStyle = options.activeFillColor;
    c2d.strokeStyle = 'black';
    c2d.lineWidth = 1;
    c2d.beginPath();
    c2d.moveTo(offsetSize + options.activePadding, offsetSize + options.activePadding);
    c2d.arc(offsetSize + options.activePadding, offsetSize + options.activePadding, r + options.activePadding, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
    c2d.closePath();
    c2d.fill();

    if (activeCommandI !== undefined) {
      var midtheta = (theta1 + theta2) / 2;
      var rx_2 = 0.66 * r * Math.cos(midtheta);
      var ry_2 = 0.66 * r * Math.sin(midtheta);

      var item = createElement({ class: 'cxtmenu-item' });

      setStyles(item, {
        color: options.itemColor,
        cursor: 'default',
        display: 'table',
        'text-align': 'center',
        //background: 'red',
        position: 'absolute',
        left: '50%',
        top: '50%',
        'min-height': r * 0.66 + 'px',
        width: r * 0.66 + 'px',
        height: r * 0.66 + 'px',
        marginLeft: rx_2 - r * 0.33 + 'px',
        marginTop: -ry_2 - r * 0.33 + 'px'
      });

      var content = createElement({ class: 'cxtmenu-content' });

      setStyles(content, {
        'width': r * 0.66 + 'px',
        'height': r * 0.66 + 'px',
        'vertical-align': 'middle',
        'display': 'table-cell'
      });
    }

    activeCommandI !== undefined && function (subCommands, thetaRange, thetaStart, thetaEnd) {
      if (!subCommands || !subCommands.length) return;
      var id = 0,
          sl = subCommands.length,
          dTheta = thetaRange / sl,
          theta1 = thetaStart,
          theta2 = theta1 + dTheta,
          rx1,
          ry1,
          rx2,
          ry2,
          parseTheta;

      parseTheta = theta < Math.PI ? theta + Math.PI * 2 : theta;

      for (; id < sl; id++) {
        rx1 = r * Math.cos(theta1);
        ry1 = r * Math.sin(theta1);
        rx2 = r * 2 * Math.cos(theta1);
        ry2 = r * 2 * Math.sin(theta1);

        var subCommand = subCommands[id];

        if (subCommand.fillColor) {
          c2d.fillStyle = subCommands[id].fillColor;
        }

        //The background of Two level's menu
        c2d.beginPath();
        //c2d.strokeStyle = 'white';
        c2d.arc(offsetSize + activePadding, offsetSize + activePadding, r, -theta1, -theta2, true);
        c2d.arc(offsetSize + activePadding, offsetSize + activePadding, r * 2, -theta2, -theta1, false);
        c2d.closePath();
        c2d.fill();

        c2d.beginPath();
        c2d.strokeStyle = "white";
        c2d.moveTo(offsetSize + activePadding + rx1, offsetSize + activePadding - ry1);
        //c2d.arc(offsetSize + activePadding + rx1,offsetSize + activePadding - ry1, 20 , 0, Math.PI * 2, false);
        c2d.lineTo(offsetSize + activePadding + rx2, offsetSize + activePadding - ry2);

        c2d.stroke();
        //c2d.closePath();


        //draw content
        var midTheta = (theta1 + theta2) / 2;
        var rx_1 = 1.66 * r * Math.cos(midTheta);
        var ry_1 = 1.66 * r * Math.sin(midTheta);

        var $subItem = createElement({ class: 'cxtmenu-sub-item' });
        setStyles($subItem, {
          color: options.itemColor,
          cursor: 'default',
          display: 'table',
          'text-align': 'center',
          //background: 'red',
          position: 'absolute',
          'text-shadow': '-1px -1px ' + options.itemTextShadowColor + ', 1px -1px ' + options.itemTextShadowColor + ', -1px 1px ' + options.itemTextShadowColor + ', 1px 1px ' + options.itemTextShadowColor,
          //left: '50%',
          //top: '50%',
          'min-height': r * 0.66,
          width: r * 0.66,
          height: r * 0.66,
          marginLeft: rx_1 - r * 0.33 - (rx_2 - r * 0.33) + "px",
          marginTop: -ry_1 - r * 0.33 - (-ry_2 - r * 0.33) + "px"
        });
        var $subContent = createElement({ class: 'cxtmenu-sub-content' });
        //$subContent = $('<div class="cxtmenu-sub-content">' + subCommand.content + '</div>');
        setStyles($subContent, {
          'transform': 'transform: rotate(' + (Math.PI / 2 - midTheta) * (180 / Math.PI) + 'deg)',
          'width': r * 0.66,
          'height': r * 0.66,
          'vertical-align': 'middle',
          'display': 'table-cell'
        });
        $subContent.innerHTML = subCommand.content;

        if (subCommand.disabled) {
          $subContent.classList.add('cxtmenu-disabled');
        }
        $subItem.appendChild($subContent);
        item.appendChild($subItem);

        if ((theta2 < Math.PI * 2 && theta1 < theta && theta < theta2 || theta2 > Math.PI * 2 && theta1 < parseTheta && parseTheta < theta2) && r < mouseR && mouseR < 2 * r) {
          activeCommandI = id;

          //level2's background
          c2d.beginPath();
          //c2d.strokeStyle = 'white';
          c2d.arc(offsetSize + activePadding, offsetSize + activePadding, r, -theta1, -theta2, true);
          c2d.arc(offsetSize + activePadding, offsetSize + activePadding, r * 2, -theta2, -theta1, false);
          c2d.closePath();
          c2d.fill();
        }

        theta1 += dTheta;
        theta2 += dTheta;

        if (commands[activeCommandI].fillColor) {
          c2d.fillStyle = commands[activeCommandI].fillColor;
        } else {
          c2d.fillStyle = options.activeFillColor;
        }
      }
    }(commands[activeCommandI].subCommands, dtheta, theta1, theta2);

    if (activeCommandI !== undefined) {
      parent.appendChild(item);
      item.appendChild(content);
    }

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';

    var tx = offsetSize + options.activePadding + rx / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var ty = offsetSize + options.activePadding + ry / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var rot = Math.PI / 4 - theta;

    c2d.translate(tx, ty);
    c2d.rotate(rot);

    // clear the indicator
    c2d.beginPath();
    c2d.fillRect(-options.indicatorSize / 2, -options.indicatorSize / 2, options.indicatorSize, options.indicatorSize);
    c2d.closePath();
    c2d.fill();

    c2d.rotate(-rot);
    c2d.translate(-tx, -ty);

    // c2d.setTransform( 1, 0, 0, 1, 0, 0 );

    // clear the spotlight
    c2d.beginPath();
    c2d.arc(offsetSize + options.activePadding, offsetSize + options.activePadding, rs + options.spotlightPadding, 0, Math.PI * 2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function updatePixelRatio() {
    var pxr = getPixelRatio();
    var w = container.clientWidth;
    var h = container.clientHeight;

    canvas.width = w * pxr;
    canvas.height = h * pxr;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    c2d.setTransform(1, 0, 0, 1, 0, 0);
    c2d.scale(pxr, pxr);
  }

  var redrawing = true;
  var redrawQueue = {};
  var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  var redraw = function redraw() {
    if (redrawQueue.drawBg) {
      drawBg.apply(null, redrawQueue.drawBg);
    }

    if (redrawQueue.drawCommands) {
      drawCommands.apply(null, redrawQueue.drawCommands);
    }

    redrawQueue = {};

    if (redrawing) {
      raf(redraw);
    }
  };

  // kick off
  updatePixelRatio();
  redraw();

  var ctrx = void 0,
      ctry = void 0,
      rs = void 0;

  var bindings = {
    on: function on(events, selector, fn) {

      var _fn = fn;
      if (selector === 'core') {
        _fn = function _fn(e) {
          if (e.cyTarget === cy || e.target === cy) {
            // only if event target is directly core
            return fn.apply(this, [e]);
          }
        };
      }

      data.handlers.push({
        events: events,
        selector: selector,
        fn: _fn
      });

      if (selector === 'core') {
        cy.on(events, _fn);
      } else {
        cy.on(events, selector, _fn);
      }

      return this;
    }
  };

  function addEventListeners() {
    var grabbable = void 0;
    var inGesture = false;
    var dragHandler = void 0;
    var zoomEnabled = void 0;
    var panEnabled = void 0;
    var boxEnabled = void 0;
    var gestureStartEvent = void 0;

    var restoreZoom = function restoreZoom() {
      if (zoomEnabled) {
        cy.userZoomingEnabled(true);
      }
    };

    var restoreGrab = function restoreGrab() {
      if (grabbable) {
        target.grabify();
      }
    };

    var restorePan = function restorePan() {
      if (panEnabled) {
        cy.userPanningEnabled(true);
      }
    };

    var restoreBoxSeln = function restoreBoxSeln() {
      if (boxEnabled) {
        cy.boxSelectionEnabled(true);
      }
    };

    var restoreGestures = function restoreGestures() {
      restoreGrab();
      restoreZoom();
      restorePan();
      restoreBoxSeln();
    };

    window.addEventListener('resize', updatePixelRatio);

    bindings.on('resize', function () {
      updatePixelRatio();
    }).on(options.openMenuEvents, options.selector, function (e) {
      target = this; // Remember which node the context menu is for
      var ele = this;
      var isCy = this === cy;

      if (inGesture) {
        parent.style.display = 'none';

        inGesture = false;

        restoreGestures();
      }

      if (typeof options.commands === 'function') {
        commands = options.commands(target);
      } else {
        commands = options.commands;
      }

      if (!commands || commands.length === 0) {
        return;
      }

      zoomEnabled = cy.userZoomingEnabled();
      cy.userZoomingEnabled(false);

      panEnabled = cy.userPanningEnabled();
      cy.userPanningEnabled(false);

      boxEnabled = cy.boxSelectionEnabled();
      cy.boxSelectionEnabled(false);

      grabbable = target.grabbable && target.grabbable();
      if (grabbable) {
        target.ungrabify();
      }

      var rp = void 0,
          rw = void 0,
          rh = void 0;
      if (!isCy && ele.isNode() && !ele.isParent() && !options.atMouse) {
        rp = ele.renderedPosition();
        rw = ele.renderedWidth();
        rh = ele.renderedHeight();
      } else {
        rp = e.renderedPosition || e.cyRenderedPosition;
        rw = 1;
        rh = 1;
      }

      offset = getOffset(container);

      ctrx = rp.x;
      ctry = rp.y;

      createMenuItems();

      setStyles(parent, {
        display: 'block',
        left: rp.x - offsetSize + 'px',
        top: rp.y - offsetSize + 'px'
      });

      rs = Math.max(rw, rh) / 2;
      rs = Math.max(rs, options.minSpotlightRadius);
      rs = Math.min(rs, options.maxSpotlightRadius);

      queueDrawBg();

      activeCommandI = undefined;

      inGesture = true;
      gestureStartEvent = e;
    }).on('cxtdrag tapdrag', options.selector, dragHandler = function dragHandler(e) {

      if (!inGesture) {
        return;
      }

      var origE = e.originalEvent;
      var isTouch = origE.touches && origE.touches.length > 0;

      var pageX = isTouch ? origE.touches[0].pageX : origE.pageX;
      var pageY = isTouch ? origE.touches[0].pageY : origE.pageY;

      activeCommandI = undefined;

      var dx = pageX - offset.left - ctrx;
      var dy = pageY - offset.top - ctry;

      if (dx === 0) {
        dx = 0.01;
      }

      var d = Math.sqrt(dx * dx + dy * dy);
      var cosTheta = (dy * dy - d * d - dx * dx) / (-2 * d * dx);
      var theta = Math.acos(cosTheta);

      if (d < rs + options.spotlightPadding) {
        queueDrawBg();
        return;
      }

      queueDrawBg();

      var rx = dx * r / d;
      var ry = dy * r / d;

      if (dy > 0) {
        theta = Math.PI + Math.abs(theta - Math.PI);
      }

      var dtheta = 2 * Math.PI / commands.length;
      var theta1 = Math.PI / 2;
      var theta2 = theta1 + dtheta;

      for (var i = 0; i < commands.length; i++) {
        var command = commands[i];

        var inThisCommand = theta1 <= theta && theta <= theta2 || theta1 <= theta + 2 * Math.PI && theta + 2 * Math.PI <= theta2;

        if (command.disabled === true || command.enabled === false) {
          inThisCommand = false;
        }

        if (inThisCommand) {
          activeCommandI = i;
          break;
        }

        theta1 += dtheta;
        theta2 += dtheta;
      }

      queueDrawCommands(rx, ry, theta, d);
    }).on('tapdrag', dragHandler).on('cxttapend tapend', function () {
      parent.style.display = 'none';

      if (activeCommandI !== undefined) {
        var select = commands[activeCommandI].select;

        if (select) {
          select.apply(target, [target, gestureStartEvent]);
          activeCommandI = undefined;
        }
      }

      inGesture = false;

      restoreGestures();
    });
  }

  function removeEventListeners() {
    var handlers = data.handlers;

    for (var i = 0; i < handlers.length; i++) {
      var h = handlers[i];

      if (h.selector === 'core') {
        cy.off(h.events, h.fn);
      } else {
        cy.off(h.events, h.selector, h.fn);
      }
    }

    window.removeEventListener('resize', updatePixelRatio);
  }

  function destroyInstance() {
    redrawing = false;

    removeEventListeners();

    wrapper.remove();
  }

  addEventListeners();

  return {
    destroy: function destroy() {
      destroyInstance();
    }
  };
};

module.exports = cxtmenu;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = {
  menuRadius: 100, // the radius of the circular menu in pixels
  selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: [// an array of commands to list in the menu or a function that returns the array
    /*
    { // example command
      fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
      content: 'a command name' // html/text content to be displayed in the menu
      contentStyle: {}, // css key:value pairs to set the command's css in js if you want
      select: function(ele){ // a function to execute when the command is selected
        console.log( ele.id() ) // `ele` holds the reference to the active element
      },
      enabled: true // whether the command is selectable
    }
    */
  ], // function( ele ){ return [ /*...*/ ] }, // example function for commands
  fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
  activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  indicatorSize: 24, // the size in pixels of the pointer to the active command
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
  openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  itemColor: 'white', // the colour of text in the command's content
  itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
  zIndex: 9999, // the z-index of the ui div
  atMouse: false // draw menu at mouse position
};

module.exports = defaults;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var removeEles = function removeEles(query) {
  var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  ancestor.querySelectorAll(query).forEach(function (el) {
    return el.parentNode.removeChild(el);
  });
};

var setStyles = function setStyles(el, style) {
  var props = Object.keys(style);

  for (var i = 0, l = props.length; i < l; i++) {
    el.style[props[i]] = style[props[i]];
  }
};

var createElement = function createElement(options) {
  options = options || {};

  var el = document.createElement(options.tag || 'div');

  el.className = options.class || '';

  if (options.style) {
    setStyles(el, options.style);
  }

  return el;
};

var getPixelRatio = function getPixelRatio() {
  return window.devicePixelRatio || 1;
};

var getOffset = function getOffset(el) {
  var offset = el.getBoundingClientRect();

  return {
    left: offset.left + document.body.scrollLeft + parseFloat(getComputedStyle(document.body)['padding-left']) + parseFloat(getComputedStyle(document.body)['border-left-width']),
    top: offset.top + document.body.scrollTop + parseFloat(getComputedStyle(document.body)['padding-top']) + parseFloat(getComputedStyle(document.body)['border-top-width'])
  };
};

module.exports = { removeEles: removeEles, setStyles: setStyles, createElement: createElement, getPixelRatio: getPixelRatio, getOffset: getOffset };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cxtmenu = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('core', 'cxtmenu', cxtmenu); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNjMwMDJhNWU3YTliNWM1YzU0MiIsIndlYnBhY2s6Ly8vLi9zcmMvY3h0bWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZG9tLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwicmVxdWlyZSIsImFzc2lnbiIsInJlbW92ZUVsZXMiLCJzZXRTdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0UGl4ZWxSYXRpbyIsImdldE9mZnNldCIsImN4dG1lbnUiLCJwYXJhbXMiLCJvcHRpb25zIiwiY3kiLCJjb250YWluZXIiLCJ0YXJnZXQiLCJkYXRhIiwiaGFuZGxlcnMiLCJjbGFzcyIsIndyYXBwZXIiLCJwYXJlbnQiLCJjYW52YXMiLCJ0YWciLCJjb21tYW5kcyIsImMyZCIsImdldENvbnRleHQiLCJyIiwibWVudVJhZGl1cyIsImNvbnRhaW5lclNpemUiLCJhY3RpdmVQYWRkaW5nIiwiYWN0aXZlQ29tbWFuZEkiLCJvZmZzZXQiLCJjYW52YXNTaXplIiwiaGFzU3ViQ29tbWFuZCIsImZpbmQiLCJtZW51Iiwic3ViQ29tbWFuZHMiLCJvZmZzZXRTaXplIiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsImFwcGVuZENoaWxkIiwicG9zaXRpb24iLCJ6SW5kZXgiLCJ1c2VyU2VsZWN0IiwiZGlzcGxheSIsIndpZHRoIiwiaGVpZ2h0IiwibWFyZ2luTGVmdCIsIm1hcmdpblRvcCIsImNyZWF0ZU1lbnVJdGVtcyIsImR0aGV0YSIsIk1hdGgiLCJQSSIsImxlbmd0aCIsInRoZXRhMSIsInRoZXRhMiIsImkiLCJjb21tYW5kIiwibWlkdGhldGEiLCJyeDEiLCJjb3MiLCJyeTEiLCJzaW4iLCJpdGVtIiwiY29sb3IiLCJpdGVtQ29sb3IiLCJjdXJzb3IiLCJpdGVtVGV4dFNoYWRvd0NvbG9yIiwibGVmdCIsInRvcCIsImNvbnRlbnQiLCJIVE1MRWxlbWVudCIsImlubmVySFRNTCIsImNvbnRlbnRTdHlsZSIsImRpc2FibGVkIiwiZW5hYmxlZCIsImNsYXNzTGlzdCIsImFkZCIsInF1ZXVlRHJhd0JnIiwicnNwb3RsaWdodCIsInJlZHJhd1F1ZXVlIiwiZHJhd0JnIiwidW5kZWZpbmVkIiwicnMiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJjbGVhclJlY3QiLCJmaWxsU3R5bGUiLCJmaWxsQ29sb3IiLCJpbmRleCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImFyYyIsImNsb3NlUGF0aCIsImZpbGwiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInNlcGFyYXRvcldpZHRoIiwibGluZVRvIiwic3Ryb2tlIiwicXVldWVEcmF3Q29tbWFuZHMiLCJyeCIsInJ5IiwidGhldGEiLCJkIiwiZHJhd0NvbW1hbmRzIiwibW91c2VSIiwiYWN0aXZlRmlsbENvbG9yIiwicnhfMiIsInJ5XzIiLCJ0aGV0YVJhbmdlIiwidGhldGFTdGFydCIsInRoZXRhRW5kIiwiaWQiLCJzbCIsImRUaGV0YSIsInJ4MiIsInJ5MiIsInBhcnNlVGhldGEiLCJzdWJDb21tYW5kIiwibWlkVGhldGEiLCJyeF8xIiwicnlfMSIsIiRzdWJJdGVtIiwiJHN1YkNvbnRlbnQiLCJ0eCIsInNwb3RsaWdodFBhZGRpbmciLCJpbmRpY2F0b3JTaXplIiwidHkiLCJyb3QiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJmaWxsUmVjdCIsInVwZGF0ZVBpeGVsUmF0aW8iLCJweHIiLCJ3IiwiY2xpZW50V2lkdGgiLCJoIiwiY2xpZW50SGVpZ2h0Iiwic3R5bGUiLCJzZXRUcmFuc2Zvcm0iLCJzY2FsZSIsInJlZHJhd2luZyIsInJhZiIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJlZHJhdyIsImFwcGx5IiwiY3RyeCIsImN0cnkiLCJiaW5kaW5ncyIsIm9uIiwiZXZlbnRzIiwic2VsZWN0b3IiLCJmbiIsIl9mbiIsImUiLCJjeVRhcmdldCIsInB1c2giLCJhZGRFdmVudExpc3RlbmVycyIsImdyYWJiYWJsZSIsImluR2VzdHVyZSIsImRyYWdIYW5kbGVyIiwiem9vbUVuYWJsZWQiLCJwYW5FbmFibGVkIiwiYm94RW5hYmxlZCIsImdlc3R1cmVTdGFydEV2ZW50IiwicmVzdG9yZVpvb20iLCJ1c2VyWm9vbWluZ0VuYWJsZWQiLCJyZXN0b3JlR3JhYiIsImdyYWJpZnkiLCJyZXN0b3JlUGFuIiwidXNlclBhbm5pbmdFbmFibGVkIiwicmVzdG9yZUJveFNlbG4iLCJib3hTZWxlY3Rpb25FbmFibGVkIiwicmVzdG9yZUdlc3R1cmVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9wZW5NZW51RXZlbnRzIiwiZWxlIiwiaXNDeSIsInVuZ3JhYmlmeSIsInJwIiwicnciLCJyaCIsImlzTm9kZSIsImlzUGFyZW50IiwiYXRNb3VzZSIsInJlbmRlcmVkUG9zaXRpb24iLCJyZW5kZXJlZFdpZHRoIiwicmVuZGVyZWRIZWlnaHQiLCJjeVJlbmRlcmVkUG9zaXRpb24iLCJ4IiwieSIsIm1heCIsIm1pblNwb3RsaWdodFJhZGl1cyIsIm1pbiIsIm1heFNwb3RsaWdodFJhZGl1cyIsIm9yaWdFIiwib3JpZ2luYWxFdmVudCIsImlzVG91Y2giLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImR4IiwiZHkiLCJzcXJ0IiwiY29zVGhldGEiLCJhY29zIiwiYWJzIiwiaW5UaGlzQ29tbWFuZCIsInNlbGVjdCIsInJlbW92ZUV2ZW50TGlzdGVuZXJzIiwib2ZmIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3lJbnN0YW5jZSIsInJlbW92ZSIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYmluZCIsInRndCIsInNyY3MiLCJmb3JFYWNoIiwia2V5cyIsInNyYyIsImsiLCJxdWVyeSIsImFuY2VzdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJwcm9wcyIsImwiLCJjbGFzc05hbWUiLCJkZXZpY2VQaXhlbFJhdGlvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm9keSIsInNjcm9sbExlZnQiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInNjcm9sbFRvcCIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBLElBQU1BLFdBQVcsbUJBQUFDLENBQVEsQ0FBUixDQUFqQjtBQUNBLElBQU1DLFNBQVMsbUJBQUFELENBQVEsQ0FBUixDQUFmOztlQUMyRSxtQkFBQUEsQ0FBUSxDQUFSLEM7SUFBbkVFLFUsWUFBQUEsVTtJQUFZQyxTLFlBQUFBLFM7SUFBV0MsYSxZQUFBQSxhO0lBQWVDLGEsWUFBQUEsYTtJQUFlQyxTLFlBQUFBLFM7O0FBRTdELElBQUlDLFVBQVUs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QUFXLFNBQVhBLFFBQVcsQ0FBVUMsU0FBVixFQUFxQjtBQUNsQyxNQUFJLENBQUNBLFNBQUwsRUFBZ0I7QUFBRTtBQUFTLEdBRE8sQ0FDTjs7QUFFNUJBLFlBQVcsTUFBWCxFQUFtQixTQUFuQixFQUE4QjVPLE9BQTlCLEVBSGtDLENBR087QUFDMUMsQ0FKRDs7QUFNQSxJQUFJLE9BQU80TyxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFdBQVVDLFNBQVY7QUFDRDs7QUFFRDVCLE9BQU9DLE9BQVAsR0FBaUIwQixRQUFqQixDIiwiZmlsZSI6ImN5dG9zY2FwZS1jeHRtZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlQ3h0bWVudVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeXRvc2NhcGVDeHRtZW51XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjYzMDAyYTVlN2E5YjVjNWM1NDIiLCJjb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG5jb25zdCB7IHJlbW92ZUVsZXMsIHNldFN0eWxlcywgY3JlYXRlRWxlbWVudCwgZ2V0UGl4ZWxSYXRpbywgZ2V0T2Zmc2V0IH0gPSByZXF1aXJlKCcuL2RvbS11dGlsJyk7XG5cbmxldCBjeHRtZW51ID0gZnVuY3Rpb24ocGFyYW1zKXtcbiAgbGV0IG9wdGlvbnMgPSBhc3NpZ24oe30sIGRlZmF1bHRzLCBwYXJhbXMpO1xuICBsZXQgY3kgPSB0aGlzO1xuICBsZXQgY29udGFpbmVyID0gY3kuY29udGFpbmVyKCk7XG4gIGxldCB0YXJnZXQ7XG5cbiAgbGV0IGRhdGEgPSB7XG4gICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICBoYW5kbGVyczogW10sXG4gICAgY29udGFpbmVyOiBjcmVhdGVFbGVtZW50KHtjbGFzczogJ2N4dG1lbnUnfSlcbiAgfTtcblxuICBsZXQgd3JhcHBlciA9IGRhdGEuY29udGFpbmVyO1xuICBsZXQgcGFyZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICBsZXQgY2FudmFzID0gY3JlYXRlRWxlbWVudCh7dGFnOiAnY2FudmFzJ30pO1xuICBsZXQgY29tbWFuZHMgPSBbXTtcbiAgbGV0IGMyZCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBsZXQgciA9IG9wdGlvbnMubWVudVJhZGl1cztcbiAgbGV0IGNvbnRhaW5lclNpemUgPSAociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZykqMjtcbiAgbGV0IGFjdGl2ZUNvbW1hbmRJO1xuICBsZXQgb2Zmc2V0O1xuICB2YXIgY2FudmFzU2l6ZSA9IGNvbnRhaW5lclNpemUsXG4gICAgYWN0aXZlUGFkZGluZyA9IG9wdGlvbnMuYWN0aXZlUGFkZGluZyxcbiAgICBoYXNTdWJDb21tYW5kID0gISFvcHRpb25zLmNvbW1hbmRzLmZpbmQoZnVuY3Rpb24gKG1lbnUpIHtcbiAgICAgIHJldHVybiAhIW1lbnUuc3ViQ29tbWFuZHNcbiAgICB9KSxcbiAgICBvZmZzZXRTaXplID0gaGFzU3ViQ29tbWFuZCA/IDIgKiByIDogcjtcblxuICBpZihoYXNTdWJDb21tYW5kKSB7XG4gICAgY29udGFpbmVyU2l6ZSA9IGNhbnZhc1NpemUgKyByICogMjtcbiAgfVxuXG4gIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUod3JhcHBlciwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICB3cmFwcGVyLmFwcGVuZENoaWxkKHBhcmVudCk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4gIHNldFN0eWxlcyh3cmFwcGVyLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiBvcHRpb25zLnpJbmRleCxcbiAgICB1c2VyU2VsZWN0OiAnbm9uZSdcbiAgfSk7XG5cbiAgc2V0U3R5bGVzKHBhcmVudCwge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICB3aWR0aDogY29udGFpbmVyU2l6ZSArICdweCcsXG4gICAgaGVpZ2h0OiBjb250YWluZXJTaXplICsgJ3B4JyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6IDEsXG4gICAgbWFyZ2luTGVmdDogLSBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyAncHgnLFxuICAgIG1hcmdpblRvcDogLSBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyAncHgnLFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJ1xuICB9KTtcblxuICBjYW52YXMud2lkdGggPSBjYW52YXNTaXplO1xuICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzU2l6ZTtcblxuICBmdW5jdGlvbiBjcmVhdGVNZW51SXRlbXMoKSB7XG4gICAgcmVtb3ZlRWxlcygnLmN4dG1lbnUtaXRlbScsIHBhcmVudCk7XG4gICAgbGV0IGR0aGV0YSA9IDIgKiBNYXRoLlBJIC8gKGNvbW1hbmRzLmxlbmd0aCk7XG4gICAgbGV0IHRoZXRhMSA9IE1hdGguUEkgLyAyO1xuICAgIGxldCB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2ldO1xuXG4gICAgICBsZXQgbWlkdGhldGEgPSAodGhldGExICsgdGhldGEyKSAvIDI7XG4gICAgICBsZXQgcngxID0gMC42NiAqIHIgKiBNYXRoLmNvcyhtaWR0aGV0YSk7XG4gICAgICBsZXQgcnkxID0gMC42NiAqIHIgKiBNYXRoLnNpbihtaWR0aGV0YSk7XG5cbiAgICAgIGxldCBpdGVtID0gY3JlYXRlRWxlbWVudCh7Y2xhc3M6ICdjeHRtZW51LWl0ZW0nfSk7XG4gICAgICBzZXRTdHlsZXMoaXRlbSwge1xuICAgICAgICBjb2xvcjogb3B0aW9ucy5pdGVtQ29sb3IsXG4gICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgICBkaXNwbGF5OiAndGFibGUnLFxuICAgICAgICAndGV4dC1hbGlnbic6ICdjZW50ZXInLFxuICAgICAgICAvL2JhY2tncm91bmQ6ICdyZWQnLFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgJ3RleHQtc2hhZG93JzogJy0xcHggLTFweCAycHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvciArICcsIDFweCAtMXB4IDJweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yICsgJywgLTFweCAxcHggMnB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IgKyAnLCAxcHggMXB4IDFweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yLFxuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgJ21pbi1oZWlnaHQnOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgd2lkdGg6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAocngxIC0gciAqIDAuMzMpICsgJ3B4JyxcbiAgICAgICAgbWFyZ2luVG9wOiAoLXJ5MSAtIHIgKiAwLjMzKSArICdweCdcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgY29udGVudCA9IGNyZWF0ZUVsZW1lbnQoe2NsYXNzOiAnY3h0bWVudS1jb250ZW50J30pO1xuXG4gICAgICBpZiggY29tbWFuZC5jb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKXtcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZCggY29tbWFuZC5jb250ZW50ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGNvbW1hbmQuY29udGVudDtcbiAgICAgIH1cblxuICAgICAgc2V0U3R5bGVzKGNvbnRlbnQsIHtcbiAgICAgICAgJ3dpZHRoJzogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgICdoZWlnaHQnOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogJ21pZGRsZScsXG4gICAgICAgICdkaXNwbGF5JzogJ3RhYmxlLWNlbGwnXG4gICAgICB9KTtcblxuICAgICAgc2V0U3R5bGVzKGNvbnRlbnQsIGNvbW1hbmQuY29udGVudFN0eWxlIHx8IHt9KTtcblxuICAgICAgaWYgKGNvbW1hbmQuZGlzYWJsZWQgPT09IHRydWUgfHwgY29tbWFuZC5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2N4dG1lbnUtZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgICAgdGhldGExICs9IGR0aGV0YTtcbiAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcXVldWVEcmF3QmcoIHJzcG90bGlnaHQgKXtcbiAgICByZWRyYXdRdWV1ZS5kcmF3QmcgPSBbIHJzcG90bGlnaHQgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdCZyggcnNwb3RsaWdodCApe1xuICAgIHJzcG90bGlnaHQgPSByc3BvdGxpZ2h0ICE9PSB1bmRlZmluZWQgPyByc3BvdGxpZ2h0IDogcnM7XG5cbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcblxuICAgIGMyZC5jbGVhclJlY3QoMCwgMCwgY29udGFpbmVyU2l6ZSwgY29udGFpbmVyU2l6ZSk7XG5cbiAgICAvLyBkcmF3IGJhY2tncm91bmQgaXRlbXNcbiAgICBjMmQuZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3I7XG4gICAgbGV0IGR0aGV0YSA9IDIqTWF0aC5QSS8oY29tbWFuZHMubGVuZ3RoKTtcbiAgICBsZXQgdGhldGExID0gTWF0aC5QSS8yO1xuICAgIGxldCB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICBmb3IoIGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tbWFuZHMubGVuZ3RoOyBpbmRleCsrICl7XG4gICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2luZGV4XTtcblxuICAgICAgaWYoIGNvbW1hbmQuZmlsbENvbG9yICl7XG4gICAgICAgIGMyZC5maWxsU3R5bGUgPSBjb21tYW5kLmZpbGxDb2xvcjtcbiAgICAgIH1cbiAgICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICAgIGMyZC5tb3ZlVG8ob2Zmc2V0U2l6ZSArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgb2Zmc2V0U2l6ZSArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyk7XG4gICAgICBjMmQuYXJjKG9mZnNldFNpemUgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIG9mZnNldFNpemUgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIsIDIqTWF0aC5QSSAtIHRoZXRhMSwgMipNYXRoLlBJIC0gdGhldGEyLCB0cnVlKTtcbiAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgIGMyZC5maWxsKCk7XG5cbiAgICAgIHRoZXRhMSArPSBkdGhldGE7XG4gICAgICB0aGV0YTIgKz0gZHRoZXRhO1xuXG4gICAgICBjMmQuZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3I7XG4gICAgfVxuXG4gICAgLy8gZHJhdyBzZXBhcmF0b3JzIGJldHdlZW4gaXRlbXNcbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgYzJkLnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgICBjMmQubGluZVdpZHRoID0gb3B0aW9ucy5zZXBhcmF0b3JXaWR0aDtcbiAgICB0aGV0YTEgPSBNYXRoLlBJLzI7XG4gICAgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgbGV0IHJ4MSA9IHIgKiBNYXRoLmNvcyh0aGV0YTEpO1xuICAgICAgbGV0IHJ5MSA9IHIgKiBNYXRoLnNpbih0aGV0YTEpO1xuICAgICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgICAgYzJkLm1vdmVUbyhvZmZzZXRTaXplICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCBvZmZzZXRTaXplICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nKTtcbiAgICAgIGMyZC5saW5lVG8ob2Zmc2V0U2l6ZSArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArIHJ4MSxvZmZzZXRTaXplICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nIC0gcnkxKTtcbiAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgIGMyZC5zdHJva2UoKTtcblxuICAgICAgdGhldGExICs9IGR0aGV0YTtcbiAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgfVxuXG5cbiAgICBjMmQuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgIC8vYzJkLmFyYyhvZmZzZXRTaXplICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCBvZmZzZXRTaXplICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByc3BvdGxpZ2h0ICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gIH1cblxuICBmdW5jdGlvbiBxdWV1ZURyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSAsIGQpe1xuICAgIHJlZHJhd1F1ZXVlLmRyYXdDb21tYW5kcyA9IFsgcngsIHJ5LCB0aGV0YSAsIGRdO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0NvbW1hbmRzKCByeCwgcnksIHRoZXRhLCBkKXtcbiAgICBsZXQgZHRoZXRhID0gMipNYXRoLlBJLyhjb21tYW5kcy5sZW5ndGgpO1xuICAgIGxldCB0aGV0YTEgPSBNYXRoLlBJLzI7XG4gICAgbGV0IHRoZXRhMiA9IHRoZXRhMSArIGR0aGV0YTtcblxuICAgIGxldCBtb3VzZVIgPSBkO1xuXG4gICAgdGhldGExICs9IGR0aGV0YSAqIGFjdGl2ZUNvbW1hbmRJO1xuICAgIHRoZXRhMiArPSBkdGhldGEgKiBhY3RpdmVDb21tYW5kSTtcblxuICAgIGMyZC5maWxsU3R5bGUgPSBvcHRpb25zLmFjdGl2ZUZpbGxDb2xvcjtcbiAgICBjMmQuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgIGMyZC5saW5lV2lkdGggPSAxO1xuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQubW92ZVRvKG9mZnNldFNpemUgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIG9mZnNldFNpemUgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpO1xuICAgIGMyZC5hcmMob2Zmc2V0U2l6ZSArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgb2Zmc2V0U2l6ZSArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgMipNYXRoLlBJIC0gdGhldGExLCAyKk1hdGguUEkgLSB0aGV0YTIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgaWYoYWN0aXZlQ29tbWFuZEkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIG1pZHRoZXRhID0gKHRoZXRhMSArIHRoZXRhMikgLyAyO1xuICAgICAgdmFyIHJ4XzIgPSAwLjY2ICogciAqIE1hdGguY29zKG1pZHRoZXRhKTtcbiAgICAgIHZhciByeV8yID0gMC42NiAqIHIgKiBNYXRoLnNpbihtaWR0aGV0YSk7XG5cbiAgICAgIHZhciBpdGVtID0gY3JlYXRlRWxlbWVudCh7Y2xhc3M6ICdjeHRtZW51LWl0ZW0nfSk7XG5cbiAgICAgIHNldFN0eWxlcyhpdGVtLCB7XG4gICAgICAgIGNvbG9yOiBvcHRpb25zLml0ZW1Db2xvcixcbiAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgIGRpc3BsYXk6ICd0YWJsZScsXG4gICAgICAgICd0ZXh0LWFsaWduJzogJ2NlbnRlcicsXG4gICAgICAgIC8vYmFja2dyb3VuZDogJ3JlZCcsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgJ21pbi1oZWlnaHQnOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgd2lkdGg6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAocnhfMiAtIHIgKiAwLjMzKSArICdweCcsXG4gICAgICAgIG1hcmdpblRvcDogKC1yeV8yIC0gciAqIDAuMzMpICsgJ3B4J1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBjb250ZW50ID0gY3JlYXRlRWxlbWVudCh7Y2xhc3M6ICdjeHRtZW51LWNvbnRlbnQnfSk7XG5cbiAgICAgIHNldFN0eWxlcyhjb250ZW50LCB7XG4gICAgICAgICd3aWR0aCc6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICAnaGVpZ2h0JzogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnLFxuICAgICAgICAnZGlzcGxheSc6ICd0YWJsZS1jZWxsJ1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWN0aXZlQ29tbWFuZEkgIT09IHVuZGVmaW5lZCAmJiAoZnVuY3Rpb24gKHN1YkNvbW1hbmRzLCB0aGV0YVJhbmdlLCB0aGV0YVN0YXJ0LCB0aGV0YUVuZCkge1xuICAgICAgaWYgKCFzdWJDb21tYW5kcyB8fCAhc3ViQ29tbWFuZHMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXJcbiAgICAgICAgaWQgPSAwLFxuICAgICAgICBzbCA9IHN1YkNvbW1hbmRzLmxlbmd0aCxcbiAgICAgICAgZFRoZXRhID0gdGhldGFSYW5nZSAvIHNsLFxuICAgICAgICB0aGV0YTEgPSB0aGV0YVN0YXJ0LFxuICAgICAgICB0aGV0YTIgPSB0aGV0YTEgKyBkVGhldGEsXG4gICAgICAgIHJ4MSwgcnkxLCByeDIsIHJ5MiwgcGFyc2VUaGV0YTtcblxuICAgICAgcGFyc2VUaGV0YSA9IHRoZXRhIDwgTWF0aC5QSSA/IHRoZXRhICsgTWF0aC5QSSAqIDIgOiB0aGV0YTtcblxuICAgICAgZm9yICg7IGlkIDwgc2w7IGlkKyspIHtcbiAgICAgICAgcngxID0gciAqIE1hdGguY29zKHRoZXRhMSk7XG4gICAgICAgIHJ5MSA9IHIgKiBNYXRoLnNpbih0aGV0YTEpO1xuICAgICAgICByeDIgPSAociAqIDIpICogTWF0aC5jb3ModGhldGExKTtcbiAgICAgICAgcnkyID0gKHIgKiAyKSAqIE1hdGguc2luKHRoZXRhMSk7XG5cbiAgICAgICAgdmFyIHN1YkNvbW1hbmQgPSBzdWJDb21tYW5kc1tpZF07XG5cbiAgICAgICAgaWYoIHN1YkNvbW1hbmQuZmlsbENvbG9yICl7XG4gICAgICAgICAgYzJkLmZpbGxTdHlsZSA9IHN1YkNvbW1hbmRzW2lkXS5maWxsQ29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICAvL1RoZSBiYWNrZ3JvdW5kIG9mIFR3byBsZXZlbCdzIG1lbnVcbiAgICAgICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgICAgICAvL2MyZC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGMyZC5hcmMob2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcsIG9mZnNldFNpemUgKyBhY3RpdmVQYWRkaW5nLCByLCAtdGhldGExLCAtdGhldGEyLCB0cnVlKTtcbiAgICAgICAgYzJkLmFyYyhvZmZzZXRTaXplICsgYWN0aXZlUGFkZGluZywgb2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcsIHIgKiAyLCAtdGhldGEyLCAtdGhldGExLCBmYWxzZSk7XG4gICAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgICAgYzJkLmZpbGwoKTtcblxuICAgICAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGMyZC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgYzJkLm1vdmVUbyhvZmZzZXRTaXplICsgYWN0aXZlUGFkZGluZyArIHJ4MSwgb2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcgLSByeTEpO1xuICAgICAgICAvL2MyZC5hcmMob2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcgKyByeDEsb2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcgLSByeTEsIDIwICwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgYzJkLmxpbmVUbyhvZmZzZXRTaXplICsgYWN0aXZlUGFkZGluZyArIHJ4Miwgb2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcgLSByeTIpO1xuXG4gICAgICAgIGMyZC5zdHJva2UoKTtcbiAgICAgICAgLy9jMmQuY2xvc2VQYXRoKCk7XG5cblxuICAgICAgICAvL2RyYXcgY29udGVudFxuICAgICAgICB2YXIgbWlkVGhldGEgPSAodGhldGExICsgdGhldGEyKSAvIDI7XG4gICAgICAgIHZhciByeF8xID0gMS42NiAqIHIgKiBNYXRoLmNvcyhtaWRUaGV0YSk7XG4gICAgICAgIHZhciByeV8xID0gMS42NiAqIHIgKiBNYXRoLnNpbihtaWRUaGV0YSk7XG5cbiAgICAgICAgdmFyICRzdWJJdGVtID0gY3JlYXRlRWxlbWVudCh7Y2xhc3M6ICdjeHRtZW51LXN1Yi1pdGVtJ30pO1xuICAgICAgICBzZXRTdHlsZXMoJHN1Ykl0ZW0sIHtcbiAgICAgICAgICBjb2xvcjogb3B0aW9ucy5pdGVtQ29sb3IsXG4gICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgICAgZGlzcGxheTogJ3RhYmxlJyxcbiAgICAgICAgICAndGV4dC1hbGlnbic6ICdjZW50ZXInLFxuICAgICAgICAgIC8vYmFja2dyb3VuZDogJ3JlZCcsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgJ3RleHQtc2hhZG93JzogJy0xcHggLTFweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yICsgJywgMXB4IC0xcHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvciArICcsIC0xcHggMXB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IgKyAnLCAxcHggMXB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IsXG4gICAgICAgICAgLy9sZWZ0OiAnNTAlJyxcbiAgICAgICAgICAvL3RvcDogJzUwJScsXG4gICAgICAgICAgJ21pbi1oZWlnaHQnOiByICogMC42NixcbiAgICAgICAgICB3aWR0aDogciAqIDAuNjYsXG4gICAgICAgICAgaGVpZ2h0OiByICogMC42NixcbiAgICAgICAgICBtYXJnaW5MZWZ0OiAoKHJ4XzEgLSByICogMC4zMykgLSAoIHJ4XzIgLSByICogMC4zMykpICsgXCJweFwiLFxuICAgICAgICAgIG1hcmdpblRvcDogKCgtcnlfMSAtIHIgKiAwLjMzKSAtICggLXJ5XzIgLSByICogMC4zMykpICsgXCJweFwiXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgJHN1YkNvbnRlbnQgPSBjcmVhdGVFbGVtZW50KHtjbGFzczogJ2N4dG1lbnUtc3ViLWNvbnRlbnQnfSk7XG4gICAgICAgIC8vJHN1YkNvbnRlbnQgPSAkKCc8ZGl2IGNsYXNzPVwiY3h0bWVudS1zdWItY29udGVudFwiPicgKyBzdWJDb21tYW5kLmNvbnRlbnQgKyAnPC9kaXY+Jyk7XG4gICAgICAgIHNldFN0eWxlcygkc3ViQ29udGVudCwge1xuICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNmb3JtOiByb3RhdGUoJyArIChNYXRoLlBJIC8gMiAtIG1pZFRoZXRhKSAqICgxODAgLyBNYXRoLlBJKSArICdkZWcpJyxcbiAgICAgICAgICAnd2lkdGgnOiByICogMC42NixcbiAgICAgICAgICAnaGVpZ2h0JzogciAqIDAuNjYsXG4gICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogJ21pZGRsZScsXG4gICAgICAgICAgJ2Rpc3BsYXknOiAndGFibGUtY2VsbCdcbiAgICAgICAgfSk7XG4gICAgICAgICRzdWJDb250ZW50LmlubmVySFRNTCA9IHN1YkNvbW1hbmQuY29udGVudDtcblxuICAgICAgICBpZiAoc3ViQ29tbWFuZC5kaXNhYmxlZCkge1xuICAgICAgICAgICRzdWJDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2N4dG1lbnUtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICAkc3ViSXRlbS5hcHBlbmRDaGlsZCgkc3ViQ29udGVudCk7XG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoJHN1Ykl0ZW0pO1xuXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChcbiAgICAgICAgICAgICh0aGV0YTIgPCBNYXRoLlBJICogMikgJiYgKCB0aGV0YTEgPCB0aGV0YSAmJiB0aGV0YSA8IHRoZXRhMilcbiAgICAgICAgICAgIHx8ICh0aGV0YTIgPiBNYXRoLlBJICogMikgJiYgKCB0aGV0YTEgPCBwYXJzZVRoZXRhICYmIHBhcnNlVGhldGEgPCB0aGV0YTIpXG4gICAgICAgICAgKVxuICAgICAgICAgICYmICggciA8IG1vdXNlUiAmJiBtb3VzZVIgPCAyICogcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgYWN0aXZlQ29tbWFuZEkgPSBpZDtcblxuICAgICAgICAgIC8vbGV2ZWwyJ3MgYmFja2dyb3VuZFxuICAgICAgICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAvL2MyZC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgYzJkLmFyYyhvZmZzZXRTaXplICsgYWN0aXZlUGFkZGluZywgb2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcsIHIsIC10aGV0YTEsIC10aGV0YTIsIHRydWUpO1xuICAgICAgICAgIGMyZC5hcmMob2Zmc2V0U2l6ZSArIGFjdGl2ZVBhZGRpbmcsIG9mZnNldFNpemUgKyBhY3RpdmVQYWRkaW5nLCByICogMiwgLXRoZXRhMiwgLXRoZXRhMSwgZmFsc2UpO1xuICAgICAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICBjMmQuZmlsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhldGExICs9IGRUaGV0YTtcbiAgICAgICAgdGhldGEyICs9IGRUaGV0YTtcblxuICAgICAgICBpZihjb21tYW5kc1thY3RpdmVDb21tYW5kSV0uZmlsbENvbG9yKSB7XG4gICAgICAgICAgYzJkLmZpbGxTdHlsZSA9IGNvbW1hbmRzW2FjdGl2ZUNvbW1hbmRJXS5maWxsQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYzJkLmZpbGxTdHlsZSA9IG9wdGlvbnMuYWN0aXZlRmlsbENvbG9yO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9KShjb21tYW5kc1thY3RpdmVDb21tYW5kSV0uc3ViQ29tbWFuZHMsIGR0aGV0YSwgdGhldGExLCB0aGV0YTIpO1xuXG4gICAgaWYoYWN0aXZlQ29tbWFuZEkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9XG5cbiAgICBjMmQuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG5cbiAgICBsZXQgdHggPSBvZmZzZXRTaXplICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nICsgcngvcioocnMgKyBvcHRpb25zLnNwb3RsaWdodFBhZGRpbmcgLSBvcHRpb25zLmluZGljYXRvclNpemUvNCk7XG4gICAgbGV0IHR5ID0gb2Zmc2V0U2l6ZSArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArIHJ5L3IqKHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nIC0gb3B0aW9ucy5pbmRpY2F0b3JTaXplLzQpO1xuICAgIGxldCByb3QgPSBNYXRoLlBJLzQgLSB0aGV0YTtcblxuICAgIGMyZC50cmFuc2xhdGUoIHR4LCB0eSApO1xuICAgIGMyZC5yb3RhdGUoIHJvdCApO1xuXG4gICAgLy8gY2xlYXIgdGhlIGluZGljYXRvclxuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQuZmlsbFJlY3QoLW9wdGlvbnMuaW5kaWNhdG9yU2l6ZS8yLCAtb3B0aW9ucy5pbmRpY2F0b3JTaXplLzIsIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZSwgb3B0aW9ucy5pbmRpY2F0b3JTaXplKTtcbiAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgYzJkLmZpbGwoKTtcblxuICAgIGMyZC5yb3RhdGUoIC1yb3QgKTtcbiAgICBjMmQudHJhbnNsYXRlKCAtdHgsIC10eSApO1xuXG4gICAgLy8gYzJkLnNldFRyYW5zZm9ybSggMSwgMCwgMCwgMSwgMCwgMCApO1xuXG4gICAgLy8gY2xlYXIgdGhlIHNwb3RsaWdodFxuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQuYXJjKG9mZnNldFNpemUgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIG9mZnNldFNpemUgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQaXhlbFJhdGlvKCl7XG4gICAgbGV0IHB4ciA9IGdldFBpeGVsUmF0aW8oKTtcbiAgICBsZXQgdyA9IGNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICBsZXQgaCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICBjYW52YXMud2lkdGggPSB3ICogcHhyO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoICogcHhyO1xuXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuXG4gICAgYzJkLnNldFRyYW5zZm9ybSggMSwgMCwgMCwgMSwgMCwgMCApO1xuICAgIGMyZC5zY2FsZSggcHhyLCBweHIgKTtcbiAgfVxuXG4gIGxldCByZWRyYXdpbmcgPSB0cnVlO1xuICBsZXQgcmVkcmF3UXVldWUgPSB7fTtcbiAgbGV0IHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICBsZXQgcmVkcmF3ID0gZnVuY3Rpb24oKXtcbiAgICBpZiggcmVkcmF3UXVldWUuZHJhd0JnICl7XG4gICAgICBkcmF3QmcuYXBwbHkoIG51bGwsIHJlZHJhd1F1ZXVlLmRyYXdCZyApO1xuICAgIH1cblxuICAgIGlmKCByZWRyYXdRdWV1ZS5kcmF3Q29tbWFuZHMgKXtcbiAgICAgIGRyYXdDb21tYW5kcy5hcHBseSggbnVsbCwgcmVkcmF3UXVldWUuZHJhd0NvbW1hbmRzICk7XG4gICAgfVxuXG4gICAgcmVkcmF3UXVldWUgPSB7fTtcblxuICAgIGlmKCByZWRyYXdpbmcgKXtcbiAgICAgIHJhZiggcmVkcmF3ICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtpY2sgb2ZmXG4gIHVwZGF0ZVBpeGVsUmF0aW8oKTtcbiAgcmVkcmF3KCk7XG5cbiAgbGV0IGN0cngsIGN0cnksIHJzO1xuXG4gIGxldCBiaW5kaW5ncyA9IHtcbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBzZWxlY3RvciwgZm4pe1xuXG4gICAgICBsZXQgX2ZuID0gZm47XG4gICAgICBpZiggc2VsZWN0b3IgPT09ICdjb3JlJyl7XG4gICAgICAgIF9mbiA9IGZ1bmN0aW9uKCBlICl7XG4gICAgICAgICAgaWYoIGUuY3lUYXJnZXQgPT09IGN5IHx8IGUudGFyZ2V0ID09PSBjeSApeyAvLyBvbmx5IGlmIGV2ZW50IHRhcmdldCBpcyBkaXJlY3RseSBjb3JlXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoIHRoaXMsIFsgZSBdICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBkYXRhLmhhbmRsZXJzLnB1c2goe1xuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICBmbjogX2ZuXG4gICAgICB9KTtcblxuICAgICAgaWYoIHNlbGVjdG9yID09PSAnY29yZScgKXtcbiAgICAgICAgY3kub24oZXZlbnRzLCBfZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3kub24oZXZlbnRzLCBzZWxlY3RvciwgX2ZuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgbGV0IGdyYWJiYWJsZTtcbiAgICBsZXQgaW5HZXN0dXJlID0gZmFsc2U7XG4gICAgbGV0IGRyYWdIYW5kbGVyO1xuICAgIGxldCB6b29tRW5hYmxlZDtcbiAgICBsZXQgcGFuRW5hYmxlZDtcbiAgICBsZXQgYm94RW5hYmxlZDtcbiAgICBsZXQgZ2VzdHVyZVN0YXJ0RXZlbnQ7XG5cbiAgICBsZXQgcmVzdG9yZVpvb20gPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIHpvb21FbmFibGVkICl7XG4gICAgICAgIGN5LnVzZXJab29taW5nRW5hYmxlZCggdHJ1ZSApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZUdyYWIgPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIGdyYWJiYWJsZSApe1xuICAgICAgICB0YXJnZXQuZ3JhYmlmeSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZVBhbiA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiggcGFuRW5hYmxlZCApe1xuICAgICAgICBjeS51c2VyUGFubmluZ0VuYWJsZWQoIHRydWUgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlc3RvcmVCb3hTZWxuID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBib3hFbmFibGVkICl7XG4gICAgICAgIGN5LmJveFNlbGVjdGlvbkVuYWJsZWQoIHRydWUgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlc3RvcmVHZXN0dXJlcyA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXN0b3JlR3JhYigpO1xuICAgICAgcmVzdG9yZVpvb20oKTtcbiAgICAgIHJlc3RvcmVQYW4oKTtcbiAgICAgIHJlc3RvcmVCb3hTZWxuKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVQaXhlbFJhdGlvKTtcblxuICAgIGJpbmRpbmdzXG4gICAgICAub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHVwZGF0ZVBpeGVsUmF0aW8oKTtcbiAgICAgIH0pXG5cbiAgICAgIC5vbihvcHRpb25zLm9wZW5NZW51RXZlbnRzLCBvcHRpb25zLnNlbGVjdG9yLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdGFyZ2V0ID0gdGhpczsgLy8gUmVtZW1iZXIgd2hpY2ggbm9kZSB0aGUgY29udGV4dCBtZW51IGlzIGZvclxuICAgICAgICBsZXQgZWxlID0gdGhpcztcbiAgICAgICAgbGV0IGlzQ3kgPSB0aGlzID09PSBjeTtcblxuICAgICAgICBpZiAoaW5HZXN0dXJlKSB7XG4gICAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICBpbkdlc3R1cmUgPSBmYWxzZTtcblxuICAgICAgICAgIHJlc3RvcmVHZXN0dXJlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHR5cGVvZiBvcHRpb25zLmNvbW1hbmRzID09PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgY29tbWFuZHMgPSBvcHRpb25zLmNvbW1hbmRzKHRhcmdldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbWFuZHMgPSBvcHRpb25zLmNvbW1hbmRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoICFjb21tYW5kcyB8fCBjb21tYW5kcy5sZW5ndGggPT09IDAgKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgem9vbUVuYWJsZWQgPSBjeS51c2VyWm9vbWluZ0VuYWJsZWQoKTtcbiAgICAgICAgY3kudXNlclpvb21pbmdFbmFibGVkKCBmYWxzZSApO1xuXG4gICAgICAgIHBhbkVuYWJsZWQgPSBjeS51c2VyUGFubmluZ0VuYWJsZWQoKTtcbiAgICAgICAgY3kudXNlclBhbm5pbmdFbmFibGVkKCBmYWxzZSApO1xuXG4gICAgICAgIGJveEVuYWJsZWQgPSBjeS5ib3hTZWxlY3Rpb25FbmFibGVkKCk7XG4gICAgICAgIGN5LmJveFNlbGVjdGlvbkVuYWJsZWQoIGZhbHNlICk7XG5cbiAgICAgICAgZ3JhYmJhYmxlID0gdGFyZ2V0LmdyYWJiYWJsZSAmJiAgdGFyZ2V0LmdyYWJiYWJsZSgpO1xuICAgICAgICBpZiggZ3JhYmJhYmxlICl7XG4gICAgICAgICAgdGFyZ2V0LnVuZ3JhYmlmeSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJwLCBydywgcmg7XG4gICAgICAgIGlmKCAhaXNDeSAmJiBlbGUuaXNOb2RlKCkgJiYgIWVsZS5pc1BhcmVudCgpICYmICFvcHRpb25zLmF0TW91c2UgKXtcbiAgICAgICAgICBycCA9IGVsZS5yZW5kZXJlZFBvc2l0aW9uKCk7XG4gICAgICAgICAgcncgPSBlbGUucmVuZGVyZWRXaWR0aCgpO1xuICAgICAgICAgIHJoID0gZWxlLnJlbmRlcmVkSGVpZ2h0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnAgPSBlLnJlbmRlcmVkUG9zaXRpb24gfHwgZS5jeVJlbmRlcmVkUG9zaXRpb247XG4gICAgICAgICAgcncgPSAxO1xuICAgICAgICAgIHJoID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldCA9IGdldE9mZnNldChjb250YWluZXIpO1xuXG4gICAgICAgIGN0cnggPSBycC54O1xuICAgICAgICBjdHJ5ID0gcnAueTtcblxuICAgICAgICBjcmVhdGVNZW51SXRlbXMoKTtcblxuICAgICAgICBzZXRTdHlsZXMocGFyZW50LCB7XG4gICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICBsZWZ0OiAocnAueCAtIG9mZnNldFNpemUpICsgJ3B4JyxcbiAgICAgICAgICB0b3A6IChycC55IC0gb2Zmc2V0U2l6ZSkgKyAncHgnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJzID0gTWF0aC5tYXgocncsIHJoKS8yO1xuICAgICAgICBycyA9IE1hdGgubWF4KHJzLCBvcHRpb25zLm1pblNwb3RsaWdodFJhZGl1cyk7XG4gICAgICAgIHJzID0gTWF0aC5taW4ocnMsIG9wdGlvbnMubWF4U3BvdGxpZ2h0UmFkaXVzKTtcblxuICAgICAgICBxdWV1ZURyYXdCZygpO1xuXG4gICAgICAgIGFjdGl2ZUNvbW1hbmRJID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGluR2VzdHVyZSA9IHRydWU7XG4gICAgICAgIGdlc3R1cmVTdGFydEV2ZW50ID0gZTtcbiAgICAgIH0pXG5cbiAgICAgIC5vbignY3h0ZHJhZyB0YXBkcmFnJywgb3B0aW9ucy5zZWxlY3RvciwgZHJhZ0hhbmRsZXIgPSBmdW5jdGlvbihlKXtcblxuICAgICAgICBpZiggIWluR2VzdHVyZSApeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgb3JpZ0UgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgIGxldCBpc1RvdWNoID0gb3JpZ0UudG91Y2hlcyAmJiBvcmlnRS50b3VjaGVzLmxlbmd0aCA+IDA7XG5cbiAgICAgICAgbGV0IHBhZ2VYID0gaXNUb3VjaCA/IG9yaWdFLnRvdWNoZXNbMF0ucGFnZVggOiBvcmlnRS5wYWdlWDtcbiAgICAgICAgbGV0IHBhZ2VZID0gaXNUb3VjaCA/IG9yaWdFLnRvdWNoZXNbMF0ucGFnZVkgOiBvcmlnRS5wYWdlWTtcblxuICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBsZXQgZHggPSBwYWdlWCAtIG9mZnNldC5sZWZ0IC0gY3RyeDtcbiAgICAgICAgbGV0IGR5ID0gcGFnZVkgLSBvZmZzZXQudG9wIC0gY3RyeTtcblxuICAgICAgICBpZiggZHggPT09IDAgKXsgZHggPSAwLjAxOyB9XG5cbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcbiAgICAgICAgbGV0IGNvc1RoZXRhID0gKGR5KmR5IC0gZCpkIC0gZHgqZHgpLygtMiAqIGQgKiBkeCk7XG4gICAgICAgIGxldCB0aGV0YSA9IE1hdGguYWNvcyggY29zVGhldGEgKTtcblxuICAgICAgICBpZiggZCA8IHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nICl7XG4gICAgICAgICAgcXVldWVEcmF3QmcoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBxdWV1ZURyYXdCZygpO1xuXG4gICAgICAgIGxldCByeCA9IGR4KnIgLyBkO1xuICAgICAgICBsZXQgcnkgPSBkeSpyIC8gZDtcblxuICAgICAgICBpZiggZHkgPiAwICl7XG4gICAgICAgICAgdGhldGEgPSBNYXRoLlBJICsgTWF0aC5hYnModGhldGEgLSBNYXRoLlBJKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdGhldGEgPSAyKk1hdGguUEkvKGNvbW1hbmRzLmxlbmd0aCk7XG4gICAgICAgIGxldCB0aGV0YTEgPSBNYXRoLlBJLzI7XG4gICAgICAgIGxldCB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAgIGxldCBjb21tYW5kID0gY29tbWFuZHNbaV07XG5cbiAgICAgICAgICBsZXQgaW5UaGlzQ29tbWFuZCA9IHRoZXRhMSA8PSB0aGV0YSAmJiB0aGV0YSA8PSB0aGV0YTJcbiAgICAgICAgICAgIHx8IHRoZXRhMSA8PSB0aGV0YSArIDIqTWF0aC5QSSAmJiB0aGV0YSArIDIqTWF0aC5QSSA8PSB0aGV0YTI7XG5cbiAgICAgICAgICBpZiggY29tbWFuZC5kaXNhYmxlZCA9PT0gdHJ1ZSB8fCBjb21tYW5kLmVuYWJsZWQgPT09IGZhbHNlICl7XG4gICAgICAgICAgICBpblRoaXNDb21tYW5kID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIGluVGhpc0NvbW1hbmQgKXtcbiAgICAgICAgICAgIGFjdGl2ZUNvbW1hbmRJID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoZXRhMSArPSBkdGhldGE7XG4gICAgICAgICAgdGhldGEyICs9IGR0aGV0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHF1ZXVlRHJhd0NvbW1hbmRzKCByeCwgcnksIHRoZXRhLCBkICk7XG4gICAgICB9KVxuXG4gICAgICAub24oJ3RhcGRyYWcnLCBkcmFnSGFuZGxlcilcblxuICAgICAgLm9uKCdjeHR0YXBlbmQgdGFwZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgaWYoIGFjdGl2ZUNvbW1hbmRJICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICBsZXQgc2VsZWN0ID0gY29tbWFuZHNbIGFjdGl2ZUNvbW1hbmRJIF0uc2VsZWN0O1xuXG4gICAgICAgICAgaWYoIHNlbGVjdCApe1xuICAgICAgICAgICAgc2VsZWN0LmFwcGx5KCB0YXJnZXQsIFt0YXJnZXQsIGdlc3R1cmVTdGFydEV2ZW50XSApO1xuICAgICAgICAgICAgYWN0aXZlQ29tbWFuZEkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5HZXN0dXJlID0gZmFsc2U7XG5cbiAgICAgICAgcmVzdG9yZUdlc3R1cmVzKCk7XG4gICAgICB9KVxuICAgIDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCl7XG4gICAgbGV0IGhhbmRsZXJzID0gZGF0YS5oYW5kbGVycztcblxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKysgKXtcbiAgICAgIGxldCBoID0gaGFuZGxlcnNbaV07XG5cbiAgICAgIGlmKCBoLnNlbGVjdG9yID09PSAnY29yZScgKXtcbiAgICAgICAgY3kub2ZmKGguZXZlbnRzLCBoLmZuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN5Lm9mZihoLmV2ZW50cywgaC5zZWxlY3RvciwgaC5mbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVBpeGVsUmF0aW8pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveUluc3RhbmNlKCl7XG4gICAgcmVkcmF3aW5nID0gZmFsc2U7XG5cbiAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgd3JhcHBlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpe1xuICAgICAgZGVzdHJveUluc3RhbmNlKCk7XG4gICAgfVxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGN4dG1lbnU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3h0bWVudS5qcyIsIi8vIFNpbXBsZSwgaW50ZXJuYWwgT2JqZWN0LmFzc2lnbigpIHBvbHlmaWxsIGZvciBvcHRpb25zIG9iamVjdHMgZXRjLlxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24uYmluZCggT2JqZWN0ICkgOiBmdW5jdGlvbiggdGd0LCAuLi5zcmNzICl7XG4gIHNyY3MuZm9yRWFjaCggc3JjID0+IHtcbiAgICBPYmplY3Qua2V5cyggc3JjICkuZm9yRWFjaCggayA9PiB0Z3Rba10gPSBzcmNba10gKTtcbiAgfSApO1xuXG4gIHJldHVybiB0Z3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2lnbi5qcyIsImxldCBkZWZhdWx0cyA9IHtcbiAgbWVudVJhZGl1czogMTAwLCAvLyB0aGUgcmFkaXVzIG9mIHRoZSBjaXJjdWxhciBtZW51IGluIHBpeGVsc1xuICBzZWxlY3RvcjogJ25vZGUnLCAvLyBlbGVtZW50cyBtYXRjaGluZyB0aGlzIEN5dG9zY2FwZS5qcyBzZWxlY3RvciB3aWxsIHRyaWdnZXIgY3h0bWVudXNcbiAgY29tbWFuZHM6IFsgLy8gYW4gYXJyYXkgb2YgY29tbWFuZHMgdG8gbGlzdCBpbiB0aGUgbWVudSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYXJyYXlcbiAgICAvKlxuICAgIHsgLy8gZXhhbXBsZSBjb21tYW5kXG4gICAgICBmaWxsQ29sb3I6ICdyZ2JhKDIwMCwgMjAwLCAyMDAsIDAuNzUpJywgLy8gb3B0aW9uYWw6IGN1c3RvbSBiYWNrZ3JvdW5kIGNvbG9yIGZvciBpdGVtXG4gICAgICBjb250ZW50OiAnYSBjb21tYW5kIG5hbWUnIC8vIGh0bWwvdGV4dCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgbWVudVxuICAgICAgY29udGVudFN0eWxlOiB7fSwgLy8gY3NzIGtleTp2YWx1ZSBwYWlycyB0byBzZXQgdGhlIGNvbW1hbmQncyBjc3MgaW4ganMgaWYgeW91IHdhbnRcbiAgICAgIHNlbGVjdDogZnVuY3Rpb24oZWxlKXsgLy8gYSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbW1hbmQgaXMgc2VsZWN0ZWRcbiAgICAgICAgY29uc29sZS5sb2coIGVsZS5pZCgpICkgLy8gYGVsZWAgaG9sZHMgdGhlIHJlZmVyZW5jZSB0byB0aGUgYWN0aXZlIGVsZW1lbnRcbiAgICAgIH0sXG4gICAgICBlbmFibGVkOiB0cnVlIC8vIHdoZXRoZXIgdGhlIGNvbW1hbmQgaXMgc2VsZWN0YWJsZVxuICAgIH1cbiAgICAqL1xuICBdLCAvLyBmdW5jdGlvbiggZWxlICl7IHJldHVybiBbIC8qLi4uKi8gXSB9LCAvLyBleGFtcGxlIGZ1bmN0aW9uIGZvciBjb21tYW5kc1xuICBmaWxsQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNzUpJywgLy8gdGhlIGJhY2tncm91bmQgY29sb3VyIG9mIHRoZSBtZW51XG4gIGFjdGl2ZUZpbGxDb2xvcjogJ3JnYmEoMSwgMTA1LCAyMTcsIDAuNzUpJywgLy8gdGhlIGNvbG91ciB1c2VkIHRvIGluZGljYXRlIHRoZSBzZWxlY3RlZCBjb21tYW5kXG4gIGFjdGl2ZVBhZGRpbmc6IDIwLCAvLyBhZGRpdGlvbmFsIHNpemUgaW4gcGl4ZWxzIGZvciB0aGUgYWN0aXZlIGNvbW1hbmRcbiAgaW5kaWNhdG9yU2l6ZTogMjQsIC8vIHRoZSBzaXplIGluIHBpeGVscyBvZiB0aGUgcG9pbnRlciB0byB0aGUgYWN0aXZlIGNvbW1hbmRcbiAgc2VwYXJhdG9yV2lkdGg6IDMsIC8vIHRoZSBlbXB0eSBzcGFjaW5nIGluIHBpeGVscyBiZXR3ZWVuIHN1Y2Nlc3NpdmUgY29tbWFuZHNcbiAgc3BvdGxpZ2h0UGFkZGluZzogNCwgLy8gZXh0cmEgc3BhY2luZyBpbiBwaXhlbHMgYmV0d2VlbiB0aGUgZWxlbWVudCBhbmQgdGhlIHNwb3RsaWdodFxuICBtaW5TcG90bGlnaHRSYWRpdXM6IDI0LCAvLyB0aGUgbWluaW11bSByYWRpdXMgaW4gcGl4ZWxzIG9mIHRoZSBzcG90bGlnaHRcbiAgbWF4U3BvdGxpZ2h0UmFkaXVzOiAzOCwgLy8gdGhlIG1heGltdW0gcmFkaXVzIGluIHBpeGVscyBvZiB0aGUgc3BvdGxpZ2h0XG4gIG9wZW5NZW51RXZlbnRzOiAnY3h0dGFwc3RhcnQgdGFwaG9sZCcsIC8vIHNwYWNlLXNlcGFyYXRlZCBjeXRvc2NhcGUgZXZlbnRzIHRoYXQgd2lsbCBvcGVuIHRoZSBtZW51OyBvbmx5IGBjeHR0YXBzdGFydGAgYW5kL29yIGB0YXBob2xkYCB3b3JrIGhlcmVcbiAgaXRlbUNvbG9yOiAnd2hpdGUnLCAvLyB0aGUgY29sb3VyIG9mIHRleHQgaW4gdGhlIGNvbW1hbmQncyBjb250ZW50XG4gIGl0ZW1UZXh0U2hhZG93Q29sb3I6ICd0cmFuc3BhcmVudCcsIC8vIHRoZSB0ZXh0IHNoYWRvdyBjb2xvdXIgb2YgdGhlIGNvbW1hbmQncyBjb250ZW50XG4gIHpJbmRleDogOTk5OSwgLy8gdGhlIHotaW5kZXggb2YgdGhlIHVpIGRpdlxuICBhdE1vdXNlOiBmYWxzZSAvLyBkcmF3IG1lbnUgYXQgbW91c2UgcG9zaXRpb25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMuanMiLCJjb25zdCByZW1vdmVFbGVzID0gZnVuY3Rpb24ocXVlcnksIGFuY2VzdG9yID0gZG9jdW1lbnQpIHtcbiAgYW5jZXN0b3IucXVlcnlTZWxlY3RvckFsbChxdWVyeSkuZm9yRWFjaCggZWwgPT4gZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCkgKTtcbn07XG5cbmNvbnN0IHNldFN0eWxlcyA9IGZ1bmN0aW9uKGVsLCBzdHlsZSkge1xuICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhzdHlsZSk7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBwcm9wcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBlbC5zdHlsZVtwcm9wc1tpXV0gPSBzdHlsZVtwcm9wc1tpXV07XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChvcHRpb25zLnRhZyB8fCAnZGl2Jyk7XG5cbiAgZWwuY2xhc3NOYW1lID0gb3B0aW9ucy5jbGFzcyB8fCAnJztcblxuICBpZiAob3B0aW9ucy5zdHlsZSkge1xuICAgIHNldFN0eWxlcyhlbCwgb3B0aW9ucy5zdHlsZSk7XG4gIH1cblxuICByZXR1cm4gZWw7XG59O1xuXG5jb25zdCBnZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG59O1xuXG5jb25zdCBnZXRPZmZzZXQgPSBmdW5jdGlvbihlbCl7XG4gIGxldCBvZmZzZXQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICByZXR1cm4ge1xuICAgIGxlZnQ6IG9mZnNldC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICtcbiAgICAgICAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbJ3BhZGRpbmctbGVmdCddKSArXG4gICAgICAgICAgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWydib3JkZXItbGVmdC13aWR0aCddKSxcbiAgICB0b3A6IG9mZnNldC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCArXG4gICAgICAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbJ3BhZGRpbmctdG9wJ10pICtcbiAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsnYm9yZGVyLXRvcC13aWR0aCddKVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbW92ZUVsZXMsIHNldFN0eWxlcywgY3JlYXRlRWxlbWVudCwgZ2V0UGl4ZWxSYXRpbywgZ2V0T2Zmc2V0IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZG9tLXV0aWwuanMiLCJjb25zdCBjeHRtZW51ID0gcmVxdWlyZSgnLi9jeHRtZW51Jyk7XG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uKCBjeXRvc2NhcGUgKXtcbiAgaWYoICFjeXRvc2NhcGUgKXsgcmV0dXJuOyB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gIGN5dG9zY2FwZSggJ2NvcmUnLCAnY3h0bWVudScsIGN4dG1lbnUgKTsgLy8gcmVnaXN0ZXIgd2l0aCBjeXRvc2NhcGUuanNcbn07XG5cbmlmKCB0eXBlb2YgY3l0b3NjYXBlICE9PSAndW5kZWZpbmVkJyApeyAvLyBleHBvc2UgdG8gZ2xvYmFsIGN5dG9zY2FwZSAoaS5lLiB3aW5kb3cuY3l0b3NjYXBlKVxuICByZWdpc3RlciggY3l0b3NjYXBlICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9