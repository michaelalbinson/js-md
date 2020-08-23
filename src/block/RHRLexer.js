'use strict';

const ARLexer = require('../ARLexer');


/**
 * Lexer for creating <hr /> tags from a series of dashes or equals signs
 */
class RHRLexer extends ARLexer {
	static apply(text) {
		text = text.replace(/^[ ]{0,3}[*]{3,}[ ]*$/gim, '<hr />');
		text = text.replace(/^[ ]{0,3}[_]{3,}[ ]*$/gim, '<hr />');
		return text.replace(/^[ ]{0,3}[-]{3,}[ ]*$/gim, '<hr />');
	}
}

module.exports = RHRLexer;
