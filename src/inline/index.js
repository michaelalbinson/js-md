'use strict';

const BoldLexer = require('./BoldLexer');
const CustomEmojiLexer = require('./CustomEmojiLexer');
const EmojiLexer = require('./EmojiLexer');
const HRLexer = require('./HRLexer.js');
const ItalicLexer = require('./ItalicLexer');
const LinkLexer = require('./LinkLexer');


module.exports = {
    BoldLexer,
    CustomEmojiLexer,
    EmojiLexer,
    HRLexer,
    ItalicLexer,
    LinkLexer,
    defaults: [
        BoldLexer,
        CustomEmojiLexer,
        EmojiLexer,
        HRLexer,
        ItalicLexer,
        LinkLexer
    ]
};
