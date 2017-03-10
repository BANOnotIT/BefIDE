import operators from "./Operators";
import {MODE_INTER, MOVE_RIGHT, MOVE_UP, MOVE_DOWN, MOVE_LEFT, MODE_STRING} from "./Consts";
import {Unexpexted, FieldRangeError} from "./Errors";
import EventEmitter from "events";

"use strict";
/**
 * Interpreter works with matrix of chars
 * @typedef {Array<Array<Char>>} SourceCode
 */


export default class Interpreter extends EventEmitter {

    /**
     *
     * @param {SourceCode|String} source - Source code
     * @param {Direction} direction - Direction of cursor
     * @param {Array<Number>} position - Position of cursor
     * @param {Array<Number>} stack - Stack
     * @param {Array<Number>} size - Size of "workplace"
     */
    constructor(opts) {

        super();

        opts = opts || {};

        let
            size = opts.hasOwnProperty("size") ? opts.size : [25, 80],
            source = opts.hasOwnProperty("source") ?
                opts.source :
                Array.from(Array(size[1]), () => Array.from(Array(size[0]), () => ' ')),
            direction = opts.hasOwnProperty("direction") ? opts.direction : MOVE_RIGHT,
            position = opts.hasOwnProperty("position") ? opts.position : [-1, 0],
            stack = opts.hasOwnProperty("stack") ? opts.stack : [];


        this.source = typeof source == "string" ? this.text2source(source, size) : source;
        this._pos = [...position];
        this._dir = direction;
        this._size = [...size];
        this.stack = [...stack];

        this._mode = MODE_INTER

    }

    /**
     * @return {undefined|number}
     */
    step() {
        this._moveCursor();
        return this._evalUnderCursor();
    }

    _moveCursor() {

        switch (this._dir) {
            case MOVE_RIGHT:
                if (this._pos[0] + 1 == this._size[0])
                    throw new FieldRangeError();

                this._pos[0] += 1;

                break;
            case MOVE_LEFT:
                if (this._pos[0] == 0)
                    throw new FieldRangeError();

                this._pos[0] += -1;

                break;
            case MOVE_DOWN:
                if (this._pos[1] + 1 == this._size[1])
                    throw new FieldRangeError();

                this._pos[1] += 1;

                break;
            case MOVE_UP:
                if (this._pos[1] == 0)
                    throw new FieldRangeError();

                this._pos[1] += -1;

                break;
        }

    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @return {Char}
     */
    get(x, y) {
        return this.source[y][x];
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Char} sym
     */
    put(x, y, sym) {
        this.source[y][x] = sym
    }

    /**
     * Interprets charter under the cursor. Returns undefined if programme isn't finished and status code if is
     * @return {undefined|number}
     */
    _evalUnderCursor() {

        let cur = this.get(this._pos[0], this._pos[1]),
            ret = undefined;

        if (this.operators.hasOwnProperty(cur))
            ret = this.operators[cur].call(this, cur);

        else if (this.operators.hasOwnProperty(cur + '[' + this._mode + ']'))
            ret = this.operators[cur].call(this, cur);

        else if (this._mode == MODE_STRING) {

            this.stack.push(cur);
            return -1;

        } else
            throw new Unexpexted();

        return ret;
    }

    /**
     * @return {T}
     */
    pop() {

        if (this.stack.length == 0)
            throw new Error("Trying to pop empty stack");

        else
            return this.stack.pop()
    }

    print(string) {
        this.emit("output", string)
    }

    /**
     *
     * Converting text with `\n` to array with strings
     *
     * @param {String} text
     * @param {Number} width
     * @param {Number} height
     * @return {SourceCode}
     */
    text2source(text, [width, height]) {

        let strings = text.split("\n");

        return Array
            .from(new Array(height), () => " ".repeat(width))
            .map(function (a, i) {
                return ((strings[i] || "") + a).slice(0, width).split("");
            })

    }

    get top() {
        return this.stack[this.stack.length - 1];
    }

}

Interpreter.prototype.operators = operators;
