'use strict';

const RInlineLexers = require('./inline');
const RBlockLexers = require('./block');
const ARLexer = require('./ARLexer');
const Normalizer = require('./Normalizer');
const Safeguard = require('./Safeguard');
const Sanitizer = require('./Sanitizer');
const MODES = require('./Modes');


class MDLexer {
	/**
	 * @param options {{
	 * 		mode: string='JS_MD',
	 * 		emojiRoot: string=,
	 * 		hashPrefix: string=,
	 * 		permitWordHashes: boolean=,
	 * 		failOnUnsafeTags: boolean=,
	 * 		escapeUnsafeTags: boolean=
	 * }=}
	 */
	constructor(options) {
		if (!options)
			options = {};

		this._options = {
			hashPrefix: options.hashPrefix,
			emojiRoot: options.emojiRoot,
			permitWordHashes: options.permitWordHashes,

			// default to false
			failOnUnsafeTags: !!options.failOnUnsafeTags,

			// default to true
			escapeUnsafeTags: options.escapeUnsafeTags || true,

			mode: options.mode || MDLexer.MODES.JS_MD
		};

		/**
		 * @type {[ARLexer]}
		 * @private
		 */
		this._inlineLexers = [];

		/**
		 * @type {[ARLexer]}
		 * @private
		 */
		this._blockLexers = [];
		this.resetLexers();
	}

	/**
	 * Adds the given lexer class to the block lexers in use
	 * @param lexerClass {ARLexer}
	 */
	addBlockLexer(lexerClass) {
		this._addLexer(this._blockLexers, lexerClass);
	}

	/**
	 * Adds the given lexer class to the inline lexers in use
	 * @param lexerClass {ARLexer}
	 */
	addInlineLexer(lexerClass) {
		this._addLexer(this._inlineLexers, lexerClass);
	}

	/**
	 * Add a lexer class to the given group of lexers
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
	 * Removes the given lexer class from the block lexers in use
	 * @param lexerClass {ARLexer}
	 */
	removeBlockLexer(lexerClass) {
		this._removeLexer(this._blockLexers, lexerClass);
	}

	/**
	 * Removes the given lexer class from the inline lexers in use
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
		if (this._options.mode === MDLexer.MODES.COMMON_MARK) {
			this._inlineLexers = RInlineLexers.vanilla.slice();
			this._blockLexers = RBlockLexers.vanilla.slice();
		} else if (this._options.mode === MDLexer.MODES.GFM) {
			this._inlineLexers = RInlineLexers.gfm.slice();
			this._blockLexers = RBlockLexers.gfm.slice();
		} else {
			this._inlineLexers = RInlineLexers.defaults.slice();
			this._blockLexers = RBlockLexers.defaults.slice();
		}
	}

	/**
	 * Get the current list of block lexers that will be used in parsing
	 * @return {ARLexer[]}
	 */
	getBlockLexers() {
		return this._blockLexers;
	}

	/**
	 * Get the current list of inline lexers that will be used in parsing
	 * @return {ARLexer[]}
	 */
	getInlineLexers() {
		return this._inlineLexers;
	}

	/**
	 * Set the mode of the lexer - 'vanilla' gives only bare minimum (CommonMark) lexing support, default gives
	 * extended syntax (similar to github flavored markdown)
	 * @param mode {'cm'|'default'}
	 */
	setMode(mode) {
		this._options.mode = mode === MDLexer.MODES.JS_MD;
		this.resetLexers();
	}

	/**
	 * Normalize and parse a MarkDown input string - output parsed HTML
	 * @param text
	 * @return {string|null}
	 */
	lex(text) {
		ARLexer.resetSharedState(this._options);
		text = Normalizer.normalize(text);

		text = this._lexBlocks(text);

		const hasUnsafeTags = Safeguard.defaultGuard(text);
		if (hasUnsafeTags && this._options.failOnUnsafeTags)
			throw new Error('Unsafe tags detected in parsed MarkDown - to bypass this check set failOnUnsafeTags to false');
		else if (hasUnsafeTags && this._options.escapeUnsafeTags)
			text = Sanitizer.sanitizeAll(text);

		return text;
	}

	/**
	 * Call the inline lexers on the given text to parse any inline markdown
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
	 * Call the block lexers on the text to parse any block-level markdown
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
		};

		// lex all the blocks and allow them to lex spans individually

		this._blockLexers.forEach(Lexer => {
			text = Lexer.apply(text, lexSpan, recurseBlocks);
		});

		return text;
	}
}

MDLexer.MODES = MODES;


module.exports = MDLexer;
