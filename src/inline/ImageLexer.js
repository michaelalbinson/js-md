'use strict';

const AInlineLexer = require('./AInlineLexer');


class ImageLexer extends AInlineLexer {
	/**
	 *
	 * @param text {string}
	 * @param startIndex {number}
	 * @param reLex {function}
	 * @return {{ markup: string|null, continueIndex: number }}
	 */
	static lex(text, startIndex, reLex) {
		let textMode = true;
		let linkText = '';
		let link = '';

		// start after the '['
		let idx = startIndex + 1;
		while (text[idx]) {
			let char = text[idx];
			if (textMode && char === LinkLexer.RIGHT_BRACE) {
				// if the next character isn't a parenthesis, bail because this isn't a link
				if (text[idx + 1] !== LinkLexer.LEFT_PARENTHESIS)
					return { markup: '', continueIndex: startIndex + 1 };

				// skip over the '(' and start listening for the link itself
				idx += 2;
				textMode = false;
				continue;
			} else if (!textMode && char === LinkLexer.RIGHT_PARENTHESIS) {
				// we have a properly formed link!
				const linkMarkup = `<a href="${link}">${reLex(linkText)}</a>`;
				return { markup: linkMarkup, continueIndex: idx }
			}

			if (textMode)
				linkText += char;
			else
				link += char;

			idx++;
		}

		return { markup: '', continueIndex: startIndex };
	}

	/**
	 * Returns true if the first two characters are "!["
	 * @param char {string}
	 * @param lookahead {string}
	 * @return {boolean}
	 */
	static isTrigger(char, lookahead) {
		return ImageLexer.EXCLAMATION === char && ImageLexer.LEFT_BRACE === lookahead;
	}
}

ImageLexer.EXCLAMATION = '!';
ImageLexer.LEFT_BRACE = '[';
ImageLexer.RIGHT_BRACE = ']';
ImageLexer.LEFT_PARENTHESIS = '(';
ImageLexer.RIGHT_PARENTHESIS = ')';

module.exports = ImageLexer;
