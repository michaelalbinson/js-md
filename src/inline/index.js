'use strict';

const RBoldLexer = require('./RBoldLexer');
const RCodeLexer = require('./RCodeLexer');
const RCustomEmojiLexer = require('./RCustomEmojiLexer');
const REmojiLexer = require('./REmojiLexer');
const RImageLexer = require('./RImageLexer');
const RItalicLexer = require('./RItalicLexer');
const RLinkLexer = require('./RLinkLexer');
const RStrikethroughLexer = require('./RStrikethroughLexer');


module.exports = {
	RBoldLexer,
	RCodeLexer,
	RCustomEmojiLexer,
	REmojiLexer,
	RItalicLexer,
	RImageLexer,
	RLinkLexer,
	RStrikethroughLexer,
	defaults: [RImageLexer, RLinkLexer, RCodeLexer, REmojiLexer, RCustomEmojiLexer, RBoldLexer, RItalicLexer, RStrikethroughLexer],
	vanilla: [RImageLexer, RLinkLexer, RCodeLexer, RBoldLexer, RItalicLexer, RStrikethroughLexer]
};
