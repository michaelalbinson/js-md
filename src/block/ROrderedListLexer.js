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
        return /^([ ]{0,3}\d+[.)][ \t]((?:.+)\n\n?)+)+/gim;
    }

    /**
     * @return {RegExp}
     */
    static getListItemRegexp() {
        return /^[ ]{0,3}\d+[.)][ \t](.+\n?(?!^[ ]{0,3}\d+[.)]))+/gim;
    }

    /**
     * @return {RegExp}
     */
    static getListItemPrefixReplacer() {
        return /^[ ]{0,3}\d+[.)]/gm;
    }

    /**
     * @return {string}
     */
    static getTagName() {
        return 'ol';
    }
}

module.exports = ROrderedListLexer;
