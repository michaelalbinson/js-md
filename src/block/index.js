'use strict';

const ARBlockLexer = require('./ARBlockLexer');
const RBlockQuoteLexer = require('./RBlockQuoteLexer');
const RHeaderLexer = require('./RHeaderLexer');
const RHRLexer = require('./RHRLexer');
const RListLexer = require('./RListLexer');
const RParagraphLexer = require('./RParagraphLexer');
const RPreFormattedLexer = require('./RPreFormattedLexer');


module.exports = {
	ARBlockLexer,
	RBlockQuoteLexer,
	RHRLexer,
	RListLexer,
	RHeaderLexer,
	RParagraphLexer,
	RPreFormattedLexer,
	defaults: [RListLexer, RPreFormattedLexer, RBlockQuoteLexer, RHeaderLexer, RHRLexer, RParagraphLexer],
	vanilla: [RListLexer, RPreFormattedLexer, RBlockQuoteLexer, RHeaderLexer, RParagraphLexer]
};