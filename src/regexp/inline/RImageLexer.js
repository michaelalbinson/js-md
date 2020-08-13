'use strict';

const ARLexer = require('../ARLexer');


class RImageLexer extends ARLexer {
    static apply(text) {
        return text.replace(/!\[.*]\(.*\)/gi, match => {
            return '<em>' + match.replace(/[*_]/gi, '') + '</em>';
        });
    }
}

module.exports = RImageLexer;
