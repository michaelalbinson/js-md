'use strict';

const ARLexer = require('../ARLexer');


class RLinkLexer extends ARLexer {
    static apply(text) {
        return text.replace(/\[.*]\(.*\)/gi, match => {
            return '<em>' + match.replace(/[*_]/gi, '') + '</em>';
        });
    }

    static getMarkup(text, link) {
        return `<a href="${link}">${text}</a>`
    }
}

module.exports = RLinkLexer;
