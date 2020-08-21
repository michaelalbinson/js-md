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
	 * @param options {{emojiRoot: string=, hashPrefix: string=, permitWordHashes: boolean=}=}
	 */
	static resetSharedState(options) {
		ARLexer.SHARED_STATE = {
			urls: [],
			titleAnchors: [],
			listLevel: 0,
			emojiRoot: (options && options.emojiRoot) || '/assets/emoji/',
			permitWordHashes: (options && !!options.permitWordHashes) || false,
			hashPrefix: (options && options.hashPrefix) || '--js-md-'
		};
	}

	/**
	 * Get a hash for a header on a page
	 * @param str
	 * @return {string}
	 */
	static getHash(str) {
		let hash;
		if (ARLexer.SHARED_STATE.permitWordHashes) {
			hash = str.split(' ').join('-').toLowerCase();
			if (ARLexer.SHARED_STATE.titleAnchors.includes(hash))
				hash += '-';
		} else {
			hash = 0;

			let i, chr;
			for (i = 0; i < str.length; i++) {
				chr = str.charCodeAt(i);
				hash = ((hash << 5) - hash) + chr;
				hash |= 0; // Convert to 32bit integer
			}

			if (ARLexer.SHARED_STATE.titleAnchors.includes(hash))
				hash += 'i';
		}

		ARLexer.SHARED_STATE.titleAnchors.push(hash);

		// to prevent dom clobbering
		return ARLexer.SHARED_STATE.hashPrefix + hash;
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
