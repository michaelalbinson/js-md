'use strict';

const ABlockLexer = require('./ABlockLexer');


class HeaderLexer extends ABlockLexer {
	static lex(text) {
		return '';
	}

	static isTrigger() {

	}
}

module.exports = HeaderLexer;