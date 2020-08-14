'use strict';

const ARLexer = require('../ARLexer');


class RCodeLexer extends ARLexer {
	/**
	 *
	 * @param text {string}
	 * @return {string}
	 */
	static apply(text) {
		return text.replace(/(`)((\w|\W)+?[`]*)(`)/gi, match => {
			return '<code>' + RCodeLexer.escapeHTMLEntities(match.replace(/(`)/gi, '')) + '</code>';
		});
	}
}

module.exports = RCodeLexer;