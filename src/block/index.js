'use strict';

const ARBlockLexer = require('./ARBlockLexer');
const RBlockQuoteLexer = require('./RBlockQuoteLexer');
const RHeaderLexer = require('./RHeaderLexer');
const RHRLexer = require('./RHRLexer');
const RParagraphLexer = require('./RParagraphLexer');
const RPreFormattedLexer = require('./RPreFormattedLexer');


module.exports = {
	ARBlockLexer,
	RBlockQuoteLexer,
	RHRLexer,
	RHeaderLexer,
	RParagraphLexer,
	RPreFormattedLexer,
	defaults: [RPreFormattedLexer, RBlockQuoteLexer, RHeaderLexer, RHRLexer, RParagraphLexer],
	vanilla: [RPreFormattedLexer, RBlockQuoteLexer, RHeaderLexer, RParagraphLexer]
};