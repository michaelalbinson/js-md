'use strict';

const ARBlockLexer = require('./ARBlockLexer');


class RBlockQuoteLexer extends ARBlockLexer {
	static apply(text, lexSpan, lexBlock) {
		return text.replace(/^(([ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gim, match => {
			match = match.trim();

			// trim one level of quoting
			match = match.replace(/^[ \t]*>[ \t]?/gim, '');

			// trim whitespace-only lines
			match = match.replace(/^[ \t]+$/mg, '');

			match = lexBlock(match + '\n');

			return `<blockquote>\n${lexBlock(match)}\n</blockquote>\n\n`;
		});
	}
}

module.exports = RBlockQuoteLexer;
