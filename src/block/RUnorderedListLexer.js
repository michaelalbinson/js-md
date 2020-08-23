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
        return /^([ ]{0,3}[*+-][ \t]((?:.+)\n\n?)+)+/gim;
        // return /^([ ]{0,3}([*+\-])(?:.+?))(.*\n+)+(?![ \t]*(?:[*+\-])[ \t]+)/gim;
    }

    /**
     * @return {RegExp}
     */
    static getListItemRegexp() {
        return /^[ ]{0,3}[*+-][ \t](.+\n?(?!^[ ]{0,3}[*+-]))+/gim;
        // return /\n?(^[ \t]*)(?:([*+-]))[ \t]+([\w \t]*\n{1,2})+(?=\n{0,2}(\z|\2(?:[*+\-])[ \t]+)?)/gim;
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
