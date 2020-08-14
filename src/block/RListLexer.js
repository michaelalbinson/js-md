'use strict';

const ARLexer = require('../ARLexer');


/**
 * Lexer for creating lists
 */
class RListLexer extends ARLexer {
	static apply(text) {
		// TODO
		return text.replace(/^[=-]{3,}$/gim, match => {

		});
	}
}

RListLexer.UL_MARKERS = /[*+-]/g;
RListLexer.OL_MARKERS = /\d+[.]/g;
RListLexer.ANY_LIST_MARKER = /(?:[*+\-](\d+[.]))/g;

module.exports = RListLexer;
