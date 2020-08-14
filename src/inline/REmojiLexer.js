'use strict';

const ARLexer = require('../ARLexer');
const emoji = require('./emoji');


class REmojiLexer extends ARLexer {
    static apply(text) {
        return text.replace(/:([\w-]+?:)/gi, match => {
            if (match.replace(/:/gi, '') in emoji)
                return emoji[match.replace(/:/gi, '')];

            return match;
        });
    }
}

module.exports = REmojiLexer;
