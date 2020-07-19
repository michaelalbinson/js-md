'use strict';

const AInlineLexer = require('./AInlineLexer');


class ItalicLexer extends AInlineLexer {
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
        return (ItalicLexer.ASTERISK === char || ItalicLexer.UNDERSCORE === char);
    }
}

ItalicLexer.ASTERISK = '*';
ItalicLexer.UNDERSCORE = '_';

module.exports = ItalicLexer;
