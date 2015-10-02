/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {string} selector
 * @param {Model} model
 * @param {string} property
 */
export function bindInput(selector, model, property) {
    var $input = document.querySelector(selector);

    $input.addEventListener('change', function(){
        model[property] = this.value;
    });

    $input.addEventListener('keyup', function(){
        model[property] = this.value;
    });

    model.addListener(function(){
        $input.value = model[property];
    });
}