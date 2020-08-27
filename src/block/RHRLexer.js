'use strict';

const ARLexer = require('../ARLexer');


/**
 * Lexer for creating <hr /> tags from a series of dashes or equals signs
 */
class RHRLexer extends ARLexer {
	static apply(text) {
		text = text.replace(/^[ ]{0,3}\*[* \t]{2,}$/gim, RHRLexer._asteriskMatcher);
		text = text.replace(/^[ ]{0,3}_[_ \t]{2,}$/gim, RHRLexer._underscoreMatcher);
		return text.replace(/^[ ]{0,3}-[- \t]{2,}$/gim, RHRLexer._dashMatcher);
	}

	static _asteriskMatcher(match) {
		return RHRLexer._min3Matches(/\*/g, match);
	}

	static _underscoreMatcher(match) {
		return RHRLexer._min3Matches(/_/g, match);
	}

	static _dashMatcher(match) {
		return RHRLexer._min3Matches(/-/g, match);
	}

	static _min3Matches(regExp, match) {
		// there has to be at least 3 instances of the marker token in the string to qualify as a thematic break
		const countMatches = match.match(regExp);
		if (countMatches && countMatches.length >= 3)
			return '<hr />';

		return match;
	}
}

module.exports = RHRLexer;
