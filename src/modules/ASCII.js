const map = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

/**
 * Convert ASCII codes to chars
 * @param {number} num
 * @return {Char|Error}
 */
export function fromNumeric2ASCII(num) {

    if (num == 9)
        return "\t";

    num -= 32;

    if (num >= 0 && num < map.length)
        return map[num];

    else
        throw new Error(`Number ${num + 32} is out of printable ASCII range`);

}

/**
 * Convert ASCII chars to codes
 * @param {Char} char
 * @return {number|Error}
 */
export function fromASCII2Numeric(char) {

    char = char[0];

    if (char == '\t')
        return 9;

    let pos = map.indexOf(char);

    if (~pos)
        return pos + 32;

    else
        throw new Error(`Char "${char}" isn't a ASCII printable char`)
}

/**
 * @typedef {String} Char
 */