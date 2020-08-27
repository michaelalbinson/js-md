'use strict';

const ARLexer = require('../ARLexer');


class RIndentedCodeBlock extends ARLexer {
	static apply(text) {
		return text.replace(/^(\t?[ ]{4,})/gim, match => {
			return `<pre><code>${ARLexer.escapeHTMLEntities(match.slice(3, -3))}</code></pre>`;
		});
	}
}

module.exports = RIndentedCodeBlock;