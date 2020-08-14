'use strict';


/**
 * Contains a series of tests for things that must NEVER be allowed in outputted markup as it could allow for
 * severe security vulnerablites should someone insert scripts or arbitrary javascript
 */
class Safeguard {
	/**
	 *
	 * @param text {string}
	 * @param guards {function[]}
	 * @return {boolean}
	 */
	static customGuard(text, guards) {
		// undefined options or empty options, or the all option means use the default (most restrictive) guard
		if (!options || guards.length === 0)
			return this.defaultGuard(text);

		// reduce down all the guards and if any return true, return true
		return guards.reduce((acc, guard) => {
			return guard(text) || acc;
		}, false);
	}

	/**
	 *
	 * @param text {string}
	 * @return {boolean}
	 */
	static defaultGuard(text) {
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

Safeguard.TASKS = {
	iframes: Safeguard.containsIframeMarkup,
	inlineJS: Safeguard.containsInlineJavascript,
	inputs: Safeguard.containsInputMarkup,
	forms: Safeguard.containsFormMarkup,
	styles: Safeguard.containsStyleTags,
	buttons: Safeguard.containsButtonMarkup,
	scripts: Safeguard.containsScriptTags
}

module.exports = Safeguard;