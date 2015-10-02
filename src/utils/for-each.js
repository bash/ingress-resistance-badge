/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {.length} list
 * @param {Function} callbackFn
 */
export function forEach(list, callbackFn) {
    for (var i = 0; i < list.length; i++) {
        callbackFn(list[i], i);
    }
}