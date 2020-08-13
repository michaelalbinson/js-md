'use strict';

const ABlockLexer = require('./ABlockLexer');


class ListLexer extends ABlockLexer {
	static lex(text) {
		return '';
	}
}

module.exports = ListLexer;