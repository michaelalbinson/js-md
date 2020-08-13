'use strict';

const ALexer = require('../ASubLexer');


/**
 * Block lexers
 */
class ABlockLexer extends ALexer {
    /**
     *
     * @param text {string}
     * @return {string}
     */
    static lex(text) {
        throw new Error('must be overridden');
    }

    /**
     *
     * @param char {string}
     * @return {boolean}
     */
    static isTrigger(char) {
        throw new Error('must be overridden');
    }
}

module.exports = ABlockLexer;
