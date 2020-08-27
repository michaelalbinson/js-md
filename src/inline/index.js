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

// It's CommonMark!
const COMMON_MARK = [RImageLexer, RLinkLexer, RCodeLexer, RBoldLexer, RItalicLexer];

// GitHub Flavored MarkDown: enables the auto-linker and strikethrough extensions
const GFM = COMMON_MARK.slice();
GFM.push(RStrikethroughLexer, RAutoLinkLexer, REmailAutoLinkLexer);

// Superset of GFM: Enables slack-style emoji syntax and custom-emoji syntax
const JS_MD = GFM.slice();
JS_MD.push(REmojiLexer, RCustomEmojiLexer);


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
	defaults: JS_MD,

	// GitHub Flavored MarkDown: enables the auto-linker and strikethrough extensions
	gfm: GFM,

	// aka CommonMark
	cm: COMMON_MARK
};
