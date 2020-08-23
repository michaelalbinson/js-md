'use strict';

const ARBlockLexer = require('./ARBlockLexer');


class RHeaderLexer extends ARBlockLexer {
    /**
     *
     * @param text {string}
     * @param lexSpans {function}
     * @return {string}
     */
    static apply(text, lexSpans) {
        // atx-style headers:
        //	# Header 1
        //	## Header 2
        //	## Header 2 with closing hashes ##
        //	...
        //	###### Header 6
        text = text.replace(/^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gim, match => {
            const h_depth = match.match(/^#+/)[0].length;
            const text = match.replace(/#/g, '').trim();
            return `<h${h_depth} id="${RHeaderLexer.getHash(text)}">${lexSpans(text)}</h${h_depth}>\n\n`;
        });

        // Setext-style headers:
        // Header 1
        // ========
        text = text.replace(/^(.+)[ \t]*\n={3,}[ \t]*\n+/gim, match => {
            const text = match.split('\n')[0];
            return `<h1 id="${RHeaderLexer.getHash(text)}">${lexSpans(text)}</h1>\n\n`;
        });

        // Header 2
        // --------
        text = text.replace(/^(.+)[ \t]*\n-{3,}[ \t]*\n+/gim, match => {
            const text = match.split('\n')[0];
            return `<h2 id="${RHeaderLexer.getHash(text)}">${lexSpans(text)}</h2>\n\n`;
        });

        return text;
    }
}

module.exports = RHeaderLexer;
