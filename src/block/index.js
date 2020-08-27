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


const COMMON_MARK = [RHeaderLexer, RHRLexer, ROrderedListLexer, RUnorderedListLexer, RPreFormattedLexer, RBlockQuoteLexer, RParagraphLexer];


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
	defaults: COMMON_MARK.slice(),
	cm: COMMON_MARK.slice(),
	gfm: COMMON_MARK.slice()
};
