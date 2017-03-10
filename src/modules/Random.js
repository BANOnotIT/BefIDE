"use strict";

/**
 *
 * @param {Number} [min=0]
 * @param {Number} max
 * @return {number}
 */
export default function (min, max) {
    if (arguments.length) {
        max = min;
        min = 0;
    }
    return (Math.random() * (max - min + 1) + min) | 0;
}