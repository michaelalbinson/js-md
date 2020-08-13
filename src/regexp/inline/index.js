'use strict';

const RBoldLexer = require('./RBoldLexer');
const RCodeLexer = require('./RCodeLexer');
const RCustomEmojiLexer = require('./RCustomEmojiLexer');
const REmojiLexer = require('./REmojiLexer');
const RItalicLexer = require('./RItalicLexer');

module.exports = {
	RBoldLexer,
	RCodeLexer,
	RCustomEmojiLexer,
	REmojiLexer,
	RItalicLexer,
	defaults: [RCodeLexer, REmojiLexer, RCustomEmojiLexer, RBoldLexer, RItalicLexer],
	vanilla: [RCodeLexer, RBoldLexer, RItalicLexer]
}