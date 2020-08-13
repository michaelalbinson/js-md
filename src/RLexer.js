'use strict';

const RInlineLexers = require('./regexp/inline');
const RBlockLexers = require('./regexp/block');
const { ARLexer, Normalizer } = require('./regexp');


class RLexer {
	/**
	 *
	 * @param options {{vanilla: boolean=, emojiRoot: string=}}
	 */
	constructor(options) {
		this._vanilla = !!options.vanilla;

		/**
		 *
		 * @type {[ARLexer]}
		 * @private
		 */
		this._inlineLexers = [];

		/**
		 *
		 * @type {[ARLexer]}
		 * @private
		 */
		this._blockLexers = [];
		this.resetLexers();
	}

	addBlockLexer(lexerClass) {

	}

	removeBlockLexer(lexerClass) {

	}

	addInlineLexer(lexerClass) {

	}

	removeInlineLexer(lexerClass) {

	}

	resetLexers() {
		if (this._vanilla) {
			this._inlineLexers = RInlineLexers.vanilla.slice();
			this._blockLexers = RBlockLexers.vanilla.slice();
		} else {
			this._inlineLexers = RInlineLexers.defaults.slice();
			this._blockLexers = RBlockLexers.defaults.slice();
		}
	}

	/**
	 * Set the mode of the lexer - 'vanilla' gives only bare minimum
	 * @param mode {'vanilla'|'default'}
	 */
	setMode(mode) {
		this._vanilla = mode === 'vanilla';
		this.resetLexers();
	}

	/**
	 *
	 * @param text
	 * @return {string}
	 */
	lex(text) {
		ARLexer.resetSharedState();

		text = Normalizer.normalize(text);

		this._blockLexers.forEach(Lexer => {
			text = Lexer.apply(text);
		});

		this._inlineLexers.forEach(Lexer => {
			text = Lexer.apply(text);
		});

		return text;
	}
}