'use strict';

class Tokenizer {

    constructor() {
        this.CRLF = /\r\n/gi;

        this._tagStack = [];
        this._tokens = [];
        this._lineTokens = [];
    }

    /**
     *
     * @param string {string}
     */
    tokenize(string) {
        const normalized = this._normalizeWhitespace(string.trim());
        const rawLines = normalized.split('\n');
        rawLines.forEach(line => {

        })
    }

    /**
     *
     * @param string {string}
     * @return {string}
     * @private
     */
    _normalizeWhitespace(string) {
        return string.replace(this.CRLF, '\n');
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
