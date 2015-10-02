/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class Model {
    /**
     *
     * @param {string} agent
     * @param {string} level
     * @param {string} country
     */
    constructor({agent = '', level = '', country = ''}) {
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
    addListener(fn) {
        this._listeners.push(fn);
    }

    callListeners() {
        this._listeners.forEach(function (fn) {
            fn(this);
        }, this);
    }

    /**
     *
     * @param {string} name
     */
    set agent(name) {
        if (this._agent !== name) {
            this._agent = name;
            this.callListeners();
        }
    }

    /**
     *
     * @returns {string}
     */
    get agent() {
        return this._agent;
    }

    /**
     *
     * @param {string} level
     */
    set level(level) {
        if (this._level !== level) {
            this._level = level;
            this.callListeners();
        }
    }

    /**
     *
     * @returns {string}
     */
    get level() {
        return this._level;
    }

    /**
     *
     * @param {string} country
     */
    set country(country) {
        if (this._country !== country) {
            this._country = country;
            this.callListeners();
        }
    }

    /**
     *
     * @returns {string}
     */
    get country() {
        return this._country;
    }
}