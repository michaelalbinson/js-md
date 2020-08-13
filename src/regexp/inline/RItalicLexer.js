'use strict';

const ARLexer = require('../ARLexer');


class RItalicLexer extends ARLexer {
	static apply(text) {
		return text.replace(/[*_]((\w|\W)+?[*_]*)[*_]/gi, match => {
			return '<em>' + match.replace(/[*_]/gi, '') + '</em>';
		});
	}
}

module.exports = RItalicLexer;