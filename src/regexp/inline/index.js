'use strict';

const RBoldLexer = require('./RBoldLexer');
const RCodeLexer = require('./RCodeLexer');
const RCustomEmojiLexer = require('./RCustomEmojiLexer');
const REmojiLexer = require('./REmojiLexer');
const RItalicLexer = require('./RItalicLexer');
const RStrikethroughLexer = require('./RStrikethroughLexer');


module.exports = {
	RBoldLexer,
	RCodeLexer,
	RCustomEmojiLexer,
	REmojiLexer,
	RItalicLexer,
	RStrikethroughLexer,
	defaults: [RCodeLexer, REmojiLexer, RCustomEmojiLexer, RBoldLexer, RItalicLexer, RStrikethroughLexer],
	vanilla: [RCodeLexer, RBoldLexer, RItalicLexer, RStrikethroughLexer]
};
