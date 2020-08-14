'use strict';

const ARBlockLexer = require('./ARBlockLexer');
const RBlockQuoteLexer = require('./RBlockQuoteLexer');
const RHeaderLexer = require('./RHeaderLexer');
const RParagraphLexer = require('./RParagraphLexer');
const RPreFormattedLexer = require('./RPreFormattedLexer');


module.exports = {
	ARBlockLexer,
	RBlockQuoteLexer,
	RHeaderLexer,
	RParagraphLexer,
	RPreFormattedLexer,
	defaults: [RPreFormattedLexer, RBlockQuoteLexer, RHeaderLexer, RParagraphLexer],
	vanilla: [RPreFormattedLexer, RBlockQuoteLexer, RHeaderLexer, RParagraphLexer]
};