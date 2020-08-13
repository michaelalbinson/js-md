'use strict';

const inline = require('./inline');
const block = require('./block');
const Tokenizer = require('./Tokenizer');

// copy the default inline and block lexers
const inlineLexers = inline.defaults.slice();
const blockLexers = block.defaults.slice();


/**
 *
 */
class Lexer {
    constructor() {

    }

    lex(markdown) {
        const finalMarkup = '';

        const blocks = Tokenizer.tokenize(markdown);
        blocks.forEach(block => {

        });
    }

    /**
     * Add a new lexer class to a group of lexers
     * @param group {[ASubLexer]}
     * @param lexerClass {ASubLexer}
     */
    static _addLexer(group, lexerClass) {
        if (group.includes(lexerClass))
            return;

        group.push(lexerClass);
    }

    /**
     *
     * @param newLexer {AInlineLexer}
     */
    static registerInline(newLexer) {
        Lexer._addLexer(inlineLexers, newLexer);
    }

    /**
     *
     * @param newLexer {ABlockLexer}
     */
    static registerBlock(newLexer) {
        Lexer._addLexer(blockLexers, newLexer);
    }

    /**
     *
     * @param lexer {AInlineLexer}
     */
    static removeInline(lexer) {
        blockLexers.remove(lexer);
    }

    /**
     *
     * @param lexer {ABlockLexer}
     */
    static removeBlock(lexer) {
        blockLexers.remove(lexer);
    }
}

module.exports = Lexer;
