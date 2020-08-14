'use strict';

const ARLexer = require('../ARLexer');
const emoji = require('./emoji');


class REmojiLexer extends ARLexer {
    static apply(text) {
        return text.replace(/:([\w-]+?:)/gi, match => {
            const name = match.replace(/:/gi, '').toLowerCase();
            if (name in emoji)
                return emoji[name];

            return match;
        });
    }
}

module.exports = REmojiLexer;
