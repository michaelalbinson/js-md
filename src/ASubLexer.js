'use strict';


class ASubLexer {
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
}

module.exports = ASubLexer;
