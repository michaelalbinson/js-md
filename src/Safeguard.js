'use strict';


/**
 * Contains a series of tests for things that must NEVER be allowed in outputted markup as it could allow for
 * severe security vulnerabilities should someone insert scripts or arbitrary javascript
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
		if (guards.length === 0)
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
		return Safeguard.containsIllegalTags(text) ||
			Safeguard.containsExtendedIllegalTags(text) ||
			Safeguard.containsInlineJavascript(text);
	}

	/**
	 * Detects attacks using links to execute javascript such as `<a href="javascript:alert('hello')"`
	 * @param text {string}
	 * @return {boolean}
	 */
	static containsInlineJavascript(text) {
		return Safeguard._hasRegexpMatch(text, /src=["']?javascript:/gi) ||
			Safeguard._hasRegexpMatch(text, /href=["']?javascript:/gi);
	}

	/**
	 *
	 * @param text{string}
	 * @return {boolean}
	 */
	static containsIllegalTags(text) {
		return Safeguard._containsTags(text, Safeguard.ILLEGAL_TAGS)
	}

	/**
	 *
	 * @param text{string}
	 * @return {boolean}
	 */
	static containsExtendedIllegalTags(text) {
		return Safeguard._containsTags(text, Safeguard.EXTENDED_ILLEGAL_TAGS);
	}

	/**
	 *
	 * @param text {string}
	 * @param tagList {object}
	 * @return {boolean}
	 * @private
	 */
	static _containsTags(text, tagList) {
		for (let tag in tagList) {
			if (!tagList.hasOwnProperty(tag))
				continue;

			// do a global case-insensitive search for the opening tag
			const tagName = tagList[tag];
			if (Safeguard._hasRegexpMatch(text, new RegExp(`<${tagName}`, 'gi')))
				return true;
		}

		return false;
	}

	/**
	 *
	 * @param text {string}
	 * @param search {RegExp}
	 * @return {boolean}
	 */
	static _hasRegexpMatch(text, search) {
		const matches = text.match(search);
		return matches ? matches.length > 0 : false;
	}
}

Safeguard.TASKS = {
	inlineJS: Safeguard.containsInlineJavascript,
	illegalTags: Safeguard.containsIllegalTags,
	extendedIllegalTags: Safeguard.containsExtendedIllegalTags
};

// tags that are prohibited in the
Safeguard.ILLEGAL_TAGS = {
	TITLE: 'title',
	TEXTAREA: 'textarea',
	STYLE: 'style',
	XMP: 'xmp',
	IFRAME: 'iframe',
	NOEMBED: 'noembed',
	NOFRAMES: 'noframes',
	SCRIPT: 'script',
	PLAINTEXT: 'plaintext'
};

Safeguard.EXTENDED_ILLEGAL_TAGS = {
	BUTTON: 'button',
	INPUT: 'input',
	FORM: 'form'
};

module.exports = Safeguard;
