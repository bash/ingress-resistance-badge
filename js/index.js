(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

var _model = require('./model');

var _renderer = require('./renderer');

var _storage = require('./storage');

var _utilsForEach = require('./utils/for-each');

var _utilsBindInput = require('./utils/bind-input');

var renderer = new _renderer.Renderer();
var storage = new _storage.Storage();
var model = new _model.Model(storage.restore());

model.addListener(function (model) {
    renderer.render(model);
    storage.persist(model);
});

document.addEventListener('DOMContentLoaded', function () {
    var $canvas = document.querySelector('#badge'),
        $link = document.querySelector('#download');

    (0, _utilsBindInput.bindInput)('#agent', model, 'agent');
    (0, _utilsBindInput.bindInput)('#level', model, 'level');
    (0, _utilsBindInput.bindInput)('#country', model, 'country');

    renderer.$canvas = $canvas;
    renderer.$link = $link;
    renderer.ctx = $canvas.getContext('2d');

    model.addListener(function () {
        $link.setAttribute('download', model.agent.toLowerCase().replace(/[\s]+/, '-') + '.png');
    });

    model.callListeners();
});

window.addEventListener('load', function () {
    renderer.render(model);
});

},{"./model":2,"./renderer":3,"./storage":4,"./utils/bind-input":5,"./utils/for-each":6}],2:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Model = (function () {
    /**
     *
     * @param {string} agent
     * @param {string} level
     * @param {string} country
     */

    function Model(_ref) {
        var _ref$agent = _ref.agent;
        var agent = _ref$agent === undefined ? '' : _ref$agent;
        var _ref$level = _ref.level;
        var level = _ref$level === undefined ? '' : _ref$level;
        var _ref$country = _ref.country;
        var country = _ref$country === undefined ? '' : _ref$country;

        _classCallCheck(this, Model);

        /**
         *
         * @type {Function[]}
         * @private
         */
        this._listeners = [];

        this._agent = agent;
        this._level = level;
        this._country = country;
    }

    /**
     *
     * @param {Function} fn
     */

    _createClass(Model, [{
        key: 'addListener',
        value: function addListener(fn) {
            this._listeners.push(fn);
        }
    }, {
        key: 'callListeners',
        value: function callListeners() {
            var _this = this;

            this._listeners.forEach(function (fn) {
                return fn(_this);
            });
        }

        /**
         *
         * @param {string} name
         */
    }, {
        key: 'agent',
        set: function set(name) {
            if (this._agent !== name) {
                this._agent = name;
                this.callListeners();
            }
        },

        /**
         *
         * @returns {string}
         */
        get: function get() {
            return this._agent;
        }

        /**
         *
         * @param {string} level
         */
    }, {
        key: 'level',
        set: function set(level) {
            if (this._level !== level) {
                this._level = level;
                this.callListeners();
            }
        },

        /**
         *
         * @returns {string}
         */
        get: function get() {
            return this._level;
        }

        /**
         *
         * @param {string} country
         */
    }, {
        key: 'country',
        set: function set(country) {
            if (this._country !== country) {
                this._country = country;
                this.callListeners();
            }
        },

        /**
         *
         * @returns {string}
         */
        get: function get() {
            return this._country;
        }
    }]);

    return Model;
})();

exports.Model = Model;

},{}],3:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Renderer = (function () {
    function Renderer() {
        _classCallCheck(this, Renderer);

        /**
         * @type {Image}
         */
        this.template = new Image();
        this.template.src = 'images/badge.png';
    }

    /**
     *
     * @param {HTMLCanvasElement} $elem
     */

    _createClass(Renderer, [{
        key: 'render',

        /**
         *
         * @param {Model} model
         */
        value: function render(model) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.clearRect(this.$canvas.width, this.$canvas.height, 0, 0);
            ctx.drawImage(this.template, 0, 0);

            ctx.font = '50px Coda';

            if (model.level > 9) {
                ctx.fillText(model.level, 403, 708);
            } else {
                ctx.fillText(model.level, 410, 708);
            }

            ctx.font = '18px Coda';
            ctx.fillText(model.agent, 30, 540);
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = '#595959';
            ctx.fillText(model.country, 350, 489);
            ctx.closePath();

            this.$link.href = this.$canvas.toDataURL('image/png');
        }
    }, {
        key: '$canvas',
        set: function set($elem) {
            this._$canvas = $elem;
        },

        /**
         *
         * @returns {HTMLCanvasElement}
         */
        get: function get() {
            return this._$canvas;
        }

        /**
         *
         * @param {CanvasRenderingContext2D} value
         */
    }, {
        key: 'ctx',
        set: function set(value) {
            this._ctx = value;
        },

        /**
         *
         * @returns {CanvasRenderingContext2D}
         */
        get: function get() {
            return this._ctx;
        }

        /**
         *
         * @param {HTMLAnchorElement} $elem
         */
    }, {
        key: '$link',
        set: function set($elem) {
            this._$link = $elem;
        },

        /**
         *
         * @returns {HTMLAnchorElement}
         */
        get: function get() {
            return this._$link;
        }
    }]);

    return Renderer;
})();

exports.Renderer = Renderer;

},{}],4:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Storage = (function () {
    function Storage() {
        _classCallCheck(this, Storage);
    }

    _createClass(Storage, [{
        key: 'persist',

        /**
         *
         * @param {Model} model
         */
        value: function persist(model) {
            window.history.replaceState(null, '', '#' + btoa([model.agent, model.level, model.country].join('.')));
        }

        /**
         *
         * @returns {{agent: string, level: string, country: string}}
         */
    }, {
        key: 'restore',
        value: function restore() {
            var items = atob(window.location.hash.substring(1)).split('.');

            return {
                agent: items[0],
                level: items[1],
                country: items[2]
            };
        }
    }]);

    return Storage;
})();

exports.Storage = Storage;

},{}],5:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {string} selector
 * @param {Model} model
 * @param {string} property
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.bindInput = bindInput;

function bindInput(selector, model, property) {
    var $input = document.querySelector(selector);

    $input.addEventListener('change', function () {
        model[property] = this.value;
    });

    $input.addEventListener('keyup', function () {
        model[property] = this.value;
    });

    model.addListener(function () {
        $input.value = model[property];
    });
}

},{}],6:[function(require,module,exports){
/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {.length} list
 * @param {Function} callbackFn
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;

function forEach(list, callbackFn) {
  for (var i = 0; i < list.length; i++) {
    callbackFn(list[i], i);
  }
}

},{}]},{},[1])