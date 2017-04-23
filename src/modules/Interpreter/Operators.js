import {MODE_INTER, MODE_STRING, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP} from "./Consts";
import Rand from "../Random";
import {FieldRangeError} from "./Errors";
import * as ASCII from "../ASCII";
"use strict";

/**
 * @callback Operator
 * @param {String} cur Current char
 * @return {Number}
 */

/**
 * @enum {Operator}
 */
const operators = {
    // Move
    ">": move,
    "v": move,
    "<": move,
    "^": move,
    "_": function () {
        if (this.top === 0)
            this._dir = MOVE_RIGHT;
        else
            this._dir = MOVE_LEFT;
    },
    "|": function () {
        if (this.top === 0)
            this._dir = MOVE_DOWN;
        else
            this._dir = MOVE_UP;
    },
    "?": function () {
        this._dir =
            ([
                MOVE_RIGHT,
                MOVE_LEFT,
                MOVE_DOWN,
                MOVE_UP
            ])[Rand(3)];
    },
    "#": function () {
        this._moveCursor();
    },
    "@": function () {
        return 0;
    },
    // Stack operations
    ":": function () {
        this.stack.push(this.top);
    },
    "\\": function () {
        this.stack = this.stack.concat(this.pop(), this.pop());
    },
    "$": function () {
        this.pop();
    },
    // Code mods
    "p": function () {
        let [y, x] = [this.pop(), this.pop()];
        if (this._size[0] <= x || this._size[1] <= y)
            throw new FieldRangeError(`Trying to Put at point (${[x, y]}) witch if out of size`);
        this.put(x, y, ASCII.fromNumeric2ASCII(this.pop()));
    },
    "g": function () {
        let [y, x] = [this.pop(), this.pop()];
        if (this._size[0] <= x || this._size[1] <= y)
            throw new FieldRangeError(`Trying to Get at point (${[x, y]}) witch if out of size`);
        this.stack.push(ASCII.fromASCII2Numeric(this.get(x, y)));
    },
    // Constants
    "0": number,
    "1": number,
    "2": number,
    "3": number,
    "4": number,
    "5": number,
    "6": number,
    "7": number,
    "8": number,
    "9": number,
    // entering string mode
    "\"": function () {
        this._mode = MODE_STRING;
    },
    // leaving string mode
    ["\"[" + MODE_STRING + "]"]: function () {
        this._mode = MODE_INTER;
    },
    // Math
    "+": function () {
        this.stack.push(this.pop() + this.pop());
    },
    "-": function () {
        let [b, a] = [this.pop(), this.pop()];
        this.stack.push(a - b);
    },
    "*": function () {
        this.stack.push(this.pop() * this.pop());
    },
    "/": function () {
        let [b, a] = [this.pop(), this.pop()];
        this.stack.push(a / b | 0);
    },
    "%": function () {
        let [b, a] = [this.pop(), this.pop()];
        this.stack.push(a % b);
    },
    // Logical
    "!": function () {
        let a = this.pop();
        if (!~[1, 0].indexOf(a))
            throw new Error(`${a} can't be inverted`);
        this.stack.push(+!a);
    },
    "`": function () {
        let [b, a] = [this.pop(), this.pop()];
        this.stack.push(a > b ? 1 : 0);
    },
    // IO
    "&": function () {
        this.stack.push(this.inputNumber());
    },
    "~": function () {
        this.stack.push(ASCII.fromASCII2Numeric(this._getValueFromIO()));
    },
    ".": function () {
        this._print(this.top);
    },
    ",": function () {
        this._print(ASCII.fromNumeric2ASCII(this.top));
    },
    " ": new Function(),
    // Modes
    ['[' + MODE_STRING + ']']: function (char) {
        this.stack.push(ASCII.fromASCII2Numeric(char))
    }
};

function move(direction) {
    this._dir = ">v<^".indexOf(direction);
}

function number(num) {
    this.stack.push(+num);
}

export default operators;
