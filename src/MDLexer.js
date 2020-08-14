'use strict';

const RInlineLexers = require('./inline');
const RBlockLexers = require('./block');
const ARLexer = require('./ARLexer');
const Normalizer = require('./Normalizer');


class MDLexer {
	/**
	 *
	 * @param options {{vanilla: boolean=, emojiRoot: string=, hashPrefix: string=, permitWordHashes: boolean=}=}
	 */
	constructor(options) {
		if (!options)
			options = {};

		this._vanilla = !!options.vanilla;

		this._options = {
			hashPrefix: options.hashPrefix,
			emojiRoot: options.emojiRoot,
			permitWordHashes: options.permitWordHashes
		}

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

	/**
	 *
	 * @param lexerClass {ARLexer}
	 */
	addBlockLexer(lexerClass) {
		this._addLexer(this._blockLexers, lexerClass);
	}

	/**
	 *
	 * @param lexerClass {ARLexer}
	 */
	addInlineLexer(lexerClass) {
		this._addLexer(this._inlineLexers, lexerClass);
	}

	/**
	 *
	 * @param group {[ARLexer]}
	 * @param lexer {ARLexer}
	 * @private
	 */
	_addLexer(group, lexer) {
		if (group.includes(lexer))
			return;

		group.push(lexer);
	}

	/**
	 *
	 * @param lexerClass {ARLexer}
	 */
	removeBlockLexer(lexerClass) {
		this._removeLexer(this._blockLexers, lexerClass);
	}

	/**
	 *
	 * @param lexerClass {ARLexer}
	 */
	removeInlineLexer(lexerClass) {
		this._removeLexer(this._inlineLexers, lexerClass);
	}

	/**
	 * Removes a lexer from the given group
	 * @param group {[ARLexer]}
	 * @param lexer {ARLexer}
	 * @private
	 */
	_removeLexer(group, lexer) {
		const index = group.indexOf(lexer);
		if (index === -1)
			return;

		group.splice(index, 1);
	}

	/**
	 * Resets the lexers to the defaults for the mode the lexer is in -- vanilla or custom
	 */
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
	 *
	 * @return {ARLexer[]}
	 */
	getBlockLexers() {
		return this._blockLexers;
	}

	/**
	 *
	 * @return {ARLexer[]}
	 */
	getInlineLexers() {
		return this._inlineLexers;
	}

	/**
	 * Set the mode of the lexer - 'vanilla' gives only bare minimum
	 * @param mode {'vanilla'|'default'}
	 */
	setMode(mode) {
		this._vanilla = mode === MDLexer.MODES.VANILLA;
		this.resetLexers();
	}

	/**
	 *
	 * @param text
	 * @return {string}
	 */
	lex(text) {
		ARLexer.resetSharedState(this._options);
		text = Normalizer.normalize(text);
		return this._lexBlocks(text);
	}

	/**
	 *
	 * @param text {string}
	 * @return {string}
	 * @private
	 */
	_lexSpan(text) {
		this._inlineLexers.forEach(Lexer => {
			text = Lexer.apply(text);
		});

		return text;
	}

	/**
	 *
	 * @param text {string}
	 * @return {string}
	 * @private
	 */
	_lexBlocks(text) {
		// convenience method to prevent worrying about `this` binding
		const lexSpan = text => {
			return this._lexSpan(text);
		};

		// allow block lexers to recurse if needed
		const recurseBlocks = text => {
			return this._lexBlocks(text);
		}

		// lex all the blocks and allow them to lex spans individually
		this._blockLexers.forEach(Lexer => {
			text = Lexer.apply(text, lexSpan, recurseBlocks);
		});

		return text;
	}
}

MDLexer.MODES = {
	VANILLA: 'vanilla',
	DEFAULT: 'default'
}

module.exports = MDLexer;
