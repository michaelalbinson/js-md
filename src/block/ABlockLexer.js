'use strict';

const ALexer = require('../ASubLexer');


class ABlockLexer extends ALexer {
    /**
     *
     * @param text {string}
     * @param startIndex {number}
     * @return {{ markup: string, continueIndex: number }}
     */
    static lex(text, startIndex) {
        throw new Error('must be overridden');
    }
}

module.exports = ABlockLexer;
