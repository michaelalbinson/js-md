'use strict';

const Safeguard = require('./Safeguard');


class Sanitizer extends Safeguard {
	/**
	 *
	 * @param text {string}
	 * @return {string}
	 */
	static sanitizeAll(text) {
		text = Sanitizer.sanitizeBasic(text);
		return Sanitizer.sanitizeExtended(text);
	}

	/**
	 *
	 * @param text {string}
	 * @return {string}
	 */
	static sanitizeBasic(text) {
		return Sanitizer._sanitizeTags(text, Sanitizer.ILLEGAL_TAGS);
	}

	/**
	 *
	 * @param text {string}
	 * @return {string}
	 */
	static sanitizeExtended(text) {
		return Sanitizer._sanitizeTags(text, Sanitizer.EXTENDED_ILLEGAL_TAGS);
	}

	/**
	 *
	 * @param text {string}
	 * @param tagList {object}
	 * @return {string}
	 * @private
	 */
	static _sanitizeTags(text, tagList) {
		for (let tag in tagList) {
			if (!tagList.hasOwnProperty(tag))
				continue;

			// do a global case-insensitive search for the opening tag and escape the tag's opening bracket
			const tagName = tagList[tag];
			text = text.replace(new RegExp(`<${tagName}`, 'gi'), `&lt;${tagName}`);
		}

		return text;
	}
}

module.exports = Sanitizer;