'use strict';

const ARLexer = require('../ARLexer');
const emoji = require('../../inline/emoji');


class REmojiLexer extends ARLexer {
    static apply(text) {
        return text.replace(/:([\w-]+?:)/gi, match => {
            return emoji[match.replace(/:/gi, '')];
        });
    }
}

module.exports = REmojiLexer;
