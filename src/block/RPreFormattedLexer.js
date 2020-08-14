'use strict';

const ARLexer = require('../ARLexer');


class RPreFormattedLexer extends ARLexer {
	static apply(text) {
		return text.replace(/(```)((\w|\W)+?)(```)/gi, match => {
			return `<pre>${ARLexer.escapeHTMLEntities(match.slice(3, -3))}</pre>`;
		});
	}
}

module.exports = RPreFormattedLexer;
