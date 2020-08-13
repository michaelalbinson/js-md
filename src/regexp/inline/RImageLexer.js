'use strict';

const ARLexer = require('../ARLexer');


class RImageLexer extends ARLexer {
    static apply(text) {
        return text.replace(/!\[.*?]\(.*?\)/gi, match => {
            const text = match.slice(2, match.indexOf(']'));
            const link = match.slice(match.indexOf('(') + 1, -1);
            return this.getMarkup(text, link);
        });
    }

    static getMarkup(altText, link) {
        return `<img src="${link}" alt="${altText}" title="${altText}" />`
    }
}

module.exports = RImageLexer;
