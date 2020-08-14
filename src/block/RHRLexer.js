'use strict';

const ARLexer = require('../ARLexer');


/**
 * Lexer for creating <hr /> tags from a series of dashes or equals signs
 */
class RHRLexer extends ARLexer {
	static apply(text) {
		return text.replace(/^[=-]{3,}$/gim, match => {
			return `<hr />`;
		});
	}
}

module.exports = RHRLexer;
