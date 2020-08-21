'use strict';

const ARListLexer = require('./ARListLexer');


/**
 * Lexer for creating lists
 */
class RUnorderedListLexer extends ARListLexer {
    /**
     * @return {RegExp}
     */
    static getListRegexp() {
        return /^([ ]{0,3}([*+\-])(?:.+?))(.*\n+)+(?![ \t]*(?:[*+\-])[ \t]+)/gim;
    }

    /**
     * @return {RegExp}
     */
    static getListItemRegexp() {
        return /[\n]?(^[ \t]*)(?:([*+\-]))[ \t]+((.+?)(\n{1,2}))+(?=\n*(\z|\2(?:[*+\-])[ \t]+)?)/gm;
    }

    /**
     * @return {RegExp}
     */
    static getListItemPrefixReplacer() {
        return /^[*+-]/;
    }

    /**
     * @return {string}
     */
    static getTagName() {
        return 'ul';
    }
}

module.exports = RUnorderedListLexer;
