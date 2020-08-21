'use strict';

const ARListLexer = require('./ARListLexer');


/**
 * Lexer for creating lists
 */
class ROrderedListLexer extends ARListLexer {
    /**
     * @return {RegExp}
     */
    static getListRegexp() {
        return /^([ ]{0,3}(\d+[.])(?:.+?))(.*\n+)+(?![ \t]*(?:\d+[.])[ \t]+)/gim;
    }

    /**
     * @return {RegExp}
     */
    static getListItemRegexp() {
        return /[\n]?(^[ \t]*)(?:(\d+[.]))[ \t]+((.+?)(\n{1,2}))+(?=\n*(\z|\2(?:\d+[.])[ \t]+)?)/gm;
    }

    /**
     * @return {RegExp}
     */
    static getListItemPrefixReplacer() {
        return /\d+[.]/g;
    }

    /**
     * @return {string}
     */
    static getTagName() {
        return 'ol';
    }
}

module.exports = ROrderedListLexer;
