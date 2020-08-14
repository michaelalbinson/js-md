'use strict';

const ARLexer = require('../ARLexer');


class ARBlockLexer extends ARLexer {
    /**
     *
     * @param text {string}
     * @param lexSpans {function}
     * @param lexBlocks {function}
     * @return {string}
     */
    static apply(text, lexSpans, lexBlocks) {
        throw new Error('method must be overridden');
    }
}

module.exports = ARBlockLexer;
