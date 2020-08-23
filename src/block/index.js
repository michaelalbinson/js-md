'use strict';

const ARBlockLexer = require('./ARBlockLexer');
const ARListLexer = require('./ARListLexer');
const RBlockQuoteLexer = require('./RBlockQuoteLexer');
const RHeaderLexer = require('./RHeaderLexer');
const RHRLexer = require('./RHRLexer');
const ROrderedListLexer = require('./ROrderedListLexer');
const RParagraphLexer = require('./RParagraphLexer');
const RPreFormattedLexer = require('./RPreFormattedLexer');
const RUnorderedListLexer = require('./RUnorderedListLexer');


module.exports = {
	ARBlockLexer,
	RBlockQuoteLexer,
	RHRLexer,
	ARListLexer,
	ROrderedListLexer,
	RHeaderLexer,
	RParagraphLexer,
	RPreFormattedLexer,
	RUnorderedListLexer,
	defaults: [RHeaderLexer, ROrderedListLexer, RUnorderedListLexer, RPreFormattedLexer, RBlockQuoteLexer, RHRLexer, RParagraphLexer],
	vanilla: [RHeaderLexer, ROrderedListLexer, RUnorderedListLexer, RPreFormattedLexer, RBlockQuoteLexer, RParagraphLexer]
};
