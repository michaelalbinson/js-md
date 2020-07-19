'use strict';

const BoldLexer = require('./BoldLexer');
const EmojiLexer = require('./EmojiLexer');
const HRLexer = require('./HRLexer.js');
const ItalicLexer = require('./ItalicLexer');
const LinkLexer = require('./LinkLexer');


module.exports = {
    BoldLexer,
    EmojiLexer,
    HRLexer,
    ItalicLexer,
    LinkLexer,
    defaults: [BoldLexer, EmojiLexer, HRLexer, ItalicLexer, LinkLexer]
};
