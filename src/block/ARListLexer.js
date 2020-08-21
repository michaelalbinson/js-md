'use strict';

const ARBlockLexer = require('./ARBlockLexer');


/**
 * Abstract lexer for creating lists
 */
class ARListLexer extends ARBlockLexer {
    static apply(text, lexSpans, lexBlocks) {
        if (ARListLexer.SHARED_STATE.listLevel > 0) {
            return text.replace(ARListLexer.LIST_MATCHER, match => {
                match = match.replace(/\n{2,}/g, '\n\n\n');
                return `<${this.getTagName()}>\n${this._processListItems(match, lexBlocks)}</${this.getTagName()}>`;
            });
        } else {
            return text.replace(this.getListRegexp(), match => {
                match = match.replace(/\n{2,}/g, '\n\n\n');
                return `<${this.getTagName()}>\n${this._processListItems(match, lexBlocks)}</${this.getTagName()}>`;
            });
        }
    }

    static _processListItems(listStr, lexBlocks) {
        ARListLexer.SHARED_STATE.listLevel++;

        // trim trailing blank lines
        listStr = listStr.replace(/\n{2,}\z/gm, '\n');
        listStr = listStr.replace(this.getListItemRegexp(), match => {
            console.log(match);
            match = match.replace(this.getListItemPrefixReplacer(), '');
            return `<li>${lexBlocks(match.trim())}</li>\n`;
        });

        ARListLexer.SHARED_STATE.listLevel--;

        return listStr;
    }

    /**
     * @return {RegExp}
     */
    static getListRegexp() {
        throw new Error('must be overridden');
    }

    /**
     * @return {RegExp}
     */
    static getListItemRegexp() {
        throw new Error('must be overridden');
    }

    /**
     * @return {RegExp}
     */
    static getListItemPrefixReplacer() {
        throw new Error('must be overridden');
    }

    /**
     * @return {string}
     */
    static getTagName() {
        throw new Error('must be overridden');
    }
}

ARListLexer.LIST_MATCHER = /^([ ]{0,3}([*+\-]|\d+[.])(?:.+?))(.*\n+)+(?![ \t]*(?:[*+\-]|\d+[.])[ \t]+)/gim;
ARListLexer.LIST_ITEM_MATCHER = /[\n]?(^[ \t]*)(?:([*+\-])|(\d+[.]))[ \t]+((.+?)(\n{1,2}))+(?=\n*(\z|\2(?:[*+\-]|\d+[.])[ \t]+)?)/gm;

module.exports = ARListLexer;
