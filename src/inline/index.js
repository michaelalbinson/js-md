'use strict';

const RAutoLinkLexer = require('./RAutoLinkLexer');
const RBoldLexer = require('./RBoldLexer');
const RCodeLexer = require('./RCodeLexer');
const RCustomEmojiLexer = require('./RCustomEmojiLexer');
const REmailAutoLinkLexer = require('./REmailAutoLinkLexer');
const REmojiLexer = require('./REmojiLexer');
const RImageLexer = require('./RImageLexer');
const RItalicLexer = require('./RItalicLexer');
const RLinkLexer = require('./RLinkLexer');
const RStrikethroughLexer = require('./RStrikethroughLexer');


module.exports = {
	RAutoLinkLexer,
	RBoldLexer,
	RCodeLexer,
	RCustomEmojiLexer,
	REmojiLexer,
	REmailAutoLinkLexer,
	RItalicLexer,
	RImageLexer,
	RLinkLexer,
	RStrikethroughLexer,

	// Superset of GFM: Enables slack-style emoji syntax and custom-emoji syntax
	defaults: [RImageLexer, RLinkLexer, RCodeLexer, REmojiLexer, RCustomEmojiLexer, RBoldLexer, RItalicLexer,
		RStrikethroughLexer, RAutoLinkLexer, REmailAutoLinkLexer],

	// GitHub Flavored MarkDown: enables the auto-linker and strikethrough extensions
	gfm: [RImageLexer, RLinkLexer, RCodeLexer, RBoldLexer, RItalicLexer, RStrikethroughLexer, RAutoLinkLexer, REmailAutoLinkLexer],

	// aka CommonMark
	vanilla: [RImageLexer, RLinkLexer, RCodeLexer, RBoldLexer, RItalicLexer],
	cm: [RImageLexer, RLinkLexer, RCodeLexer, RBoldLexer, RItalicLexer]
};
