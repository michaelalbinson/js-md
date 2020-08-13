'use strict';

class Tokenizer {
    /**
     *
     * @param string {string}
     * @return {[string]}
     */
    static tokenize(string) {
        const normalized = this._normalizeWhitespace(string.trim());
        return normalized.split(Tokenizer.NEW_LINE).map(line => line.trim());
    }

    /**
     *
     * @param string {string}
     * @return {string}
     * @private
     */
    static _normalizeWhitespace(string) {
        return string.replace(Tokenizer.CRLF, Tokenizer.NEW_LINE);
    }
}

// sets of characters that prevent flattening lines
Tokenizer.SPECIAL_CHARACTERS = [
    '>',
    '#',
    '---',
    '===',

    // any number character plus a dot (e.g. "1.", "22.")
    /\d+\./,

    // unordered list special line starts
    '* ',
    '- ',

    // tabs also indicate line continuation
    '\t'
];

Tokenizer.NEW_LINE = '\n';

Tokenizer.CRLF = /\r\n/gi;

module.exports = Tokenizer;