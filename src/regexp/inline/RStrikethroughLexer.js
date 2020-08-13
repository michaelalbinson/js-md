'use strict';

const ARLexer = require('../ARLexer');


class RStrikethroughLexer extends ARLexer {
	static apply(text) {
		return text.replace(/[~]((\w|\W)+?[~]*)[~]/gi, match => {
			return '<del>' + match.replace(/[~]/gi, '') + '</del>';
		});
	}
}

module.exports = RStrikethroughLexer;