'use strict';

const AInlineLexer = require('./AInlineLexer');


/**
 * Lexer for supporting custom emoji (inline images) in markdown documents
 */
class CustomEmojiLexer extends AInlineLexer {
	/**
	 *
	 * @param text {string}
	 * @param startIndex {number}
	 * @param reLex {function}
	 * @return {{ markup: string|null, continueIndex: number }}
	 */
	static lex(text, startIndex, reLex) {
		let emojiName = '';
		let idx = startIndex + 1;
		while (text[idx]) {
			let char = text[idx];
			// hunt for the next colon
			if (char === CustomEmojiLexer.COLON) {
				// if the
				if (emojiName.length === 0)
					return { markup: '', continueIndex: startIndex };
				else
					return { markup: CustomEmojiLexer._getEmojiImageMarkup(emojiName), continueIndex: idx };
			} else if (char === ' ' || char === '\n' || char === '\t' || char === '\r')
				return { markup: '', continueIndex: startIndex };

			emojiName += char;
			idx++;
		}

		return { markup: '', continueIndex: startIndex };
	}

	/**
	 * Returns true if the first character is ":" and the next character is some non-whitespace character
	 * @param char {string}
	 * @param lookahead {string}
	 * @return {boolean}
	 */
	static isTrigger(char, lookahead) {
		return CustomEmojiLexer.COLON === char && lookahead.match(/\W/gi);
	}

	static _getEmojiImageMarkup(named) {
		return `<img src="/assets/emoji/${named}.png" alt="${named}" class="inline-emoji" title="${named}" />`;
	}
}

CustomEmojiLexer.COLON = ':';

module.exports = CustomEmojiLexer;
