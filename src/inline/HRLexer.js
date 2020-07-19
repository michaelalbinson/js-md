'use strict';

const AInlineLexer = require('./AInlineLexer');


class HRLexer extends AInlineLexer {
    /**
     *
     * @param text {string}
     * @param startIndex {number}
     * @param reLex {function}
     * @return {{ markup: string|null, continueIndex: number }}
     */
    static lex(text, startIndex, reLex) {
        if (HRLexer.lineContainsOnlyDashes(text))
            return { markup: '<hr />', continueIndex: text.length };

        return { markup: null, continueIndex: 0 };
    }

    /**
     *
     * @param char {string}
     * @param lookahead {string}
     * @return {boolean}
     */
    static isTrigger(char, lookahead) {

    }

    static lineContainsOnlyDashes(text) {
        let textLen = text.trim().length;
        return textLen >= 3 &&
            text.trim() === HRLexer.DASH.repeat(textLen) ||
            text.trim() === HRLexer.EQUALS.repeat(textLen);
    }
}

HRLexer.DASH = '-';
HRLexer.EQUALS = '=';

module.exports = HRLexer;
