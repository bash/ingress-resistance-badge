/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class Renderer {
    constructor() {
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
    set $canvas($elem) {
        this._$canvas = $elem;
    }

    /**
     *
     * @returns {HTMLCanvasElement}
     */
    get $canvas() {
        return this._$canvas;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} value
     */
    set ctx(value) {
        this._ctx = value;
    }

    /**
     *
     * @returns {CanvasRenderingContext2D}
     */
    get ctx() {
        return this._ctx;
    }

    /**
     *
     * @param {HTMLAnchorElement} $elem
     */
    set $link($elem) {
        this._$link = $elem;
    }

    /**
     *
     * @returns {HTMLAnchorElement}
     */
    get $link() {
        return this._$link;
    }

    /**
     *
     * @param {Model} model
     */
    render(model) {
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
}