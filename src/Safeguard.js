'use strict';


/**
 * Contains a series of tests for things that must NEVER be allowed in outputted markup as it could allow for
 * severe security vulnerablites should someone insert scripts or arbitrary javascript
 */
class Safeguard {
	/**
	 *
	 * @param text
	 * @return {boolean}
	 */
	static applyAll(text) {
		return this.containsScriptTags(text) ||
			this.containsButtonMarkup(text) ||
			this.containsStyleTags(text) ||
			this.containsFormMarkup(text) ||
			this.containsInputMarkup(text) ||
			this.containsInlineJavascript(text) ||
			this.containsIframeMarkup(text);
	}

	/**
	 * Detects attacks such as
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsScriptTags(text) {
		return text.includes('<script')
	}

	/**
	 * Detects attacks such as
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsStyleTags(text) {
		return text.includes('<style');
	}

	/**
	 * Detects attacks such as
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsButtonMarkup(text) {
		return text.includes('<button');
	}

	/**
	 * Detects attacks such as
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsInputMarkup(text) {
		return text.includes('<input');
	}

	/**
	 * Detects attacks such as
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsFormMarkup(text) {
		return text.includes('<form');
	}

	/**
	 * Detects attacks such as <a href=""
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsInlineJavascript(text) {
		return text.includes('src="javascript:') || text.includes('href="javscript:');
	}

	/**
	 * Detects attacks such as <a href=""
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsIframeMarkup(text) {
		return text.includes('<iframe');
	}
}

module.exports = Safeguard;