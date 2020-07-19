'use strict';

const inline = require('./inline');
const block = require('./block');
const Tokenizer = require('./Tokenizer');


class Lexer {
    constructor() {

    }
}


// copy the default inline and block lexers
const inlineLexers = inline.defaults.slice();
const blockLexers = block.defaults.slice();

/**
 * Add a new lexer class to a group of lexers
 * @param group {[]}
 * @param lexerClass
 */
const addLexer = (group, lexerClass) => {
    if (group.includes(lexerClass))
        return;

    group.push(lexerClass);
};

Lexer.registerInline = (newLexer) => {
    addLexer(inlineLexers, newLexer);
};

Lexer.registerBlock = (newLexer) => {
    addLexer(blockLexers, newLexer);
};


module.exports = Lexer;
