'use strict';

const ARBlockLexer = require('./ARBlockLexer');


class RParagraphLexer extends ARBlockLexer {
	static apply(text, lexSpan, lexBlock) {
		// trim leading and trailing lines
		text = text.trim();

		// split the remaining tags
		const blocks = text.split(/\n+/g);
		return blocks.map(block => {
			// if a block already begins with an HTML tag, don't apply
			// a paragraph around it
			const htmlTags = block.match(/^<.*>/im);
			if (htmlTags && htmlTags.length > 0)
				return block;

			block = block.trim();
			return `<p>${lexSpan(block)}</p>`
		}).join('\n');
	}
}

module.exports = RParagraphLexer;
