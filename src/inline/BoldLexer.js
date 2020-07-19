'use strict';

const AInlineLexer = require('./AInlineLexer');


class BoldLexer extends AInlineLexer {
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
        return (BoldLexer.ASTERISK === char || BoldLexer.UNDERSCORE === char) && char === lookahead;
    }
}

BoldLexer.ASTERISK = '*';
BoldLexer.UNDERSCORE = '_';

module.exports = BoldLexer;
