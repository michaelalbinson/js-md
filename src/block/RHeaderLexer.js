'use strict';

const ARBlockLexer = require('./ARBlockLexer');
const MODES = require('../Modes');


class RHeaderLexer extends ARBlockLexer {
    /**
     *
     * @param text {string}
     * @param lexSpans {function}
     * @param lexBlocks {function}
     * @return {string}
     */
    static apply(text, lexSpans, lexBlocks) {
        // atx-style headers:
        //	# Header 1
        //	## Header 2
        //	## Header 2 with closing hashes ##
        //	...
        //	###### Header 6
        text = text.replace(/^[ ]{0,3}(#{1,6})[\w \t]+([ \t]+#*)?.*\n?/gim, match => {
            const h_depth = match.match(/#+/)[0].length;
            let headerText = match.replace(/^[ ]{0,3}#*/, '');
            if (headerText[0] !== ' ' && headerText[0] !== '\t')
                return match;

            headerText = headerText.replace(/[ \t]#+[ \t]*\n?$/, '');
            headerText = headerText.trim();

            // CommonMark doesn't allow the hashes on headings
            if (RHeaderLexer.SHARED_STATE.mode === MODES.COMMON_MARK)
                return `<h${h_depth}>${lexSpans(headerText)}</h${h_depth}>\n`;
            else
                return `<h${h_depth} id="${RHeaderLexer.getHash(headerText)}">${lexSpans(headerText)}</h${h_depth}>\n`;
        });

        // special case for no-content ATX-style headers, which CommonMark allows... for some reason
        text = text.replace(/^[ ]{0,3}#{1,6}(\n|$)/gim, match => {
            const h_depth = match.match(/#+/)[0].length;
            return `<h${h_depth}></h${h_depth}>\n`;
        });

        // Setext-style headers:
        // Header 1
        // ========
        text = text.replace(/^[ ]{0,3}[\w`<]([^=](.+)\n)*(.+)\n[ ]{0,3}(=+)[ \t]*(\n+?|$)/gim, match => {
            const headerText = RHeaderLexer.getHeaderText(match);
            if (RHeaderLexer.SHARED_STATE.mode === MODES.COMMON_MARK)
                return `<h1>${lexSpans(headerText)}</h1>\n`;
            else
                return `<h1 id="${RHeaderLexer.getHash(headerText)}">${lexSpans(headerText)}</h1>\n`;
        });

        // Header 2
        // --------
        text = text.replace(/^[ ]{0,3}[\w`<\\]([^-](.+)\n)*(.+)\n[ ]{0,3}(-+)[ \t]*(\n+?|$)/gim, match => {
            const headerText = RHeaderLexer.getHeaderText(match);
            if (RHeaderLexer.SHARED_STATE.mode === MODES.COMMON_MARK)
                return `<h2>${lexSpans(headerText)}</h2>\n`;
            else
                return `<h2 id="${RHeaderLexer.getHash(headerText)}">${lexSpans(headerText)}</h2>\n`;
        });

        return text;
    }

    static getHeaderText(setextMatch) {
        const cleanMatch = setextMatch.trim();
        const splitByNewLine = cleanMatch.split('\n');

        // split off the last non-empty match (either "=*" or "-*"
        return setextMatch.replace(splitByNewLine[splitByNewLine.length - 1], '').trim();
    }

    static getHeaderMarkup(hLevel, text, inlineLexer) {
        return `<h${hLevel}>${inlineLexer(text)}</h${hLevel}>\n`;
    }
}

module.exports = RHeaderLexer;
