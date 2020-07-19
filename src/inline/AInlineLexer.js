'use strict';

const ALexer = require('../ASubLexer');


class AInlineLexer extends ALexer {
    /**
     *
     * @param text {string}
     * @param startIndex {number}
     * @param reLex {function}
     * @return {{ markup: string|null, continueIndex: number }}
     */
    static lex(text, startIndex, reLex) {
        throw new Error('must be overridden');
    }

    /**
     *
     * @param char {string}
     * @param lookahead {string}
     * @return {boolean}
     */
    static isTrigger(char, lookahead) {
        return false;
    }
}

module.exports = AInlineLexer;
