'use strict';

const ARLexer = require('../ARLexer');


class RBoldLexer extends ARLexer {
	static apply(text) {
		return text.replace(/(\*\*|__)((\w|\W)+?[*_]*)(\*\*|__)/gi, match => {
			return '<strong>' + match.replace(/(\*\*|__)/gi, '') + '</strong>';
		});
	}
}

module.exports = RBoldLexer;