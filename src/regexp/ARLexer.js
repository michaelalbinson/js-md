'use strict';


class ARLexer {
	/**
	 * @param text {string}
	 * @return {string}
	 */
	static apply(text) {
		throw new Error('Method must be overridden');
	}

	/**
	 * Markdown generates HTML, so consequently, we need to deal with escaping.
	 *
	 * Here we also escape markdown-magic characters...
	 *
	 * Generally within code blocks all characters must be escaped so they render properly in
	 * HTML, though there may be other use cases.
	 *
	 *
	 * @param str {string}
	 * @return {string}
	 */
	static escapeHTMLEntities(str) {
		return str.replace(/[\x26\x0A<>'"*_\[\]]/g, foundChar => {
			if (foundChar in ARLexer.ENTITY_MAP)
				return ARLexer.ENTITY_MAP[foundChar];

			return "&#" + foundChar.charCodeAt(0) + ";"
		});
	}

	/**
	 * Resets the shared state that all lexers can access to store state if they aren't stateless
	 */
	static resetSharedState() {
		ARLexer.SHARED_STATE = {
			urls: [],
			titles: [],
			emojiRoot: '/assets/emoji/'
		};
	}
}

ARLexer.ENTITY_MAP = {
	'<': '&lt;',
	'>': '&gt;',
	' ': '&nbsp;',
	'&': '&amp;',
	'"': '&quot;',
	'\'': '&apos;'
};

// initialize SHARED_STATE
ARLexer.resetSharedState();

module.exports = ARLexer;
