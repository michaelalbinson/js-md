'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');

const MDLexer = require('../src/MDLexer');
const RInlineLexers = require('../src/inline');
const RBlockLexers = require('../src/block');


describe('MDLexer', () => {
    describe('#addBlockLexer', () => {
        it('should add a lexer to the existing list', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getBlockLexers().length;
            lexer.addBlockLexer(TestLexer);
            expect(lexer.getBlockLexers().length).to.equal(originalLen + 1);
            expect(lexer.getBlockLexers().includes(TestLexer)).to.equal(true);
        });

        it('should not add a lexer to the list twice', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getBlockLexers().length;
            lexer.addBlockLexer(TestLexer);
            lexer.addBlockLexer(TestLexer);
            expect(lexer.getBlockLexers().length).to.equal(originalLen + 1);
            expect(lexer.getBlockLexers().includes(TestLexer)).to.equal(true);
        });
    });

    describe('#addInlieLexer', () => {
        it('should add a lexer to the existing list', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getInlineLexers().length;
            lexer.addInlineLexer(TestLexer);
            expect(lexer.getInlineLexers().length).to.equal(originalLen + 1);
            expect(lexer.getInlineLexers().includes(TestLexer)).to.equal(true);
        });

        it('should not add a lexer to the list twice', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getInlineLexers().length;
            lexer.addInlineLexer(TestLexer);
            lexer.addInlineLexer(TestLexer);
            expect(lexer.getInlineLexers().length).to.equal(originalLen + 1);
            expect(lexer.getInlineLexers().includes(TestLexer)).to.equal(true);
        });
    });

    describe('#removeBlockLexer', () => {
        it('should remove the lexer to the existing list', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getBlockLexers().length;
            lexer.addBlockLexer(TestLexer);
            expect(lexer.getBlockLexers().length).to.equal(originalLen + 1);
            expect(lexer.getBlockLexers().includes(TestLexer)).to.equal(true);

            lexer.removeBlockLexer(TestLexer);
            expect(lexer.getBlockLexers().length).to.equal(originalLen);
            expect(!lexer.getBlockLexers().includes(TestLexer)).to.equal(true);
        });

        it('should be a no-op if the lexer is not in the list', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getBlockLexers().length;

            lexer.removeBlockLexer(TestLexer);
            expect(lexer.getBlockLexers().length).to.equal(originalLen);
            expect(!lexer.getBlockLexers().includes(TestLexer)).to.equal(true);
        });
    });

    describe('#removeInlineLexer', () => {
        it('should remove the lexer to the existing list', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getInlineLexers().length;
            lexer.addInlineLexer(TestLexer);
            expect(lexer.getInlineLexers().length).to.equal(originalLen + 1);
            expect(lexer.getInlineLexers().includes(TestLexer)).to.equal(true);

            lexer.removeInlineLexer(TestLexer);
            expect(lexer.getInlineLexers().length).to.equal(originalLen);
            expect(!lexer.getInlineLexers().includes(TestLexer)).to.equal(true);
        });

        it('should be a no-op if the lexer is not in the list', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            const originalLen = lexer.getInlineLexers().length;

            lexer.removeInlineLexer(TestLexer);
            expect(lexer.getInlineLexers().length).to.equal(originalLen);
            expect(!lexer.getInlineLexers().includes(TestLexer)).to.equal(true);
        });
    });

    describe('#setMode', () => {
        it('should set the mode to \'vanilla\'', () => {
            const lexer = new MDLexer();
            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.defaults);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.defaults);
            lexer.setMode(MDLexer.MODES.VANILLA);
            expect(lexer.getInlineLexers()).to.deep.equal(RInlineLexers.vanilla);
            expect(lexer.getBlockLexers()).to.deep.equal(RBlockLexers.vanilla);
        });

        it('should set the mode to \'default\'', () => {
            const lexer = new MDLexer();
            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.defaults);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.defaults);
            lexer.setMode(MDLexer.MODES.DEFAULT);
            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.defaults);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.defaults);
        });

        it('should set the mode to \'default\' if no mode is specified', () => {
            const lexer = new MDLexer();
            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.defaults);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.defaults);
        });

        it('should set the mode to \'vanilla\' if it is specified in the constructor', () => {
            const lexer = new MDLexer({ vanilla: true });
            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.vanilla);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.vanilla);
        });
    });

    describe('#resetLexer', () => {
        it('should reset the lexers back to the defaults', () => {
            class TestLexer { }

            const lexer = new MDLexer();
            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.defaults);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.defaults);

            lexer.addInlineLexer(TestLexer);
            lexer.addBlockLexer(TestLexer);

            lexer.resetLexers();

            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.defaults);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.defaults);
        });

        it('should reset the lexers back to the vanilla defaults', () => {
            class TestLexer { }

            const lexer = new MDLexer({ vanilla: true });
            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.vanilla);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.vanilla);

            lexer.addInlineLexer(TestLexer);
            lexer.addBlockLexer(TestLexer);

            lexer.resetLexers();

            expect(lexer.getInlineLexers()).deep.to.equal(RInlineLexers.vanilla);
            expect(lexer.getBlockLexers()).deep.to.equal(RBlockLexers.vanilla);
        });
    });

    describe('#lex', () => {
        it('hello world', () => {
            const out = new MDLexer().lex('hello world');
            expect(out).to.equal('<p>hello world</p>');
        });

        it('should lex sample properly', () => {
            const out =  new MDLexer().lex('## ~Goodbye~ Hello World!');
            expect(out).to.equal('<h2 id="--js-md--845732878"><del>Goodbye</del> Hello World!</h2>')
        });

        it('should correctly parse this snippet', () => {
            const input = `
## But it ~does~ not? ##

Hello ~there's a code block in here~
`;
            const output = `<h2 id="--js-md-1098432783">But it <del>does</del> not?</h2>

<p>Hello <del>there's a code block in here</del></p>`;

            const out = new MDLexer().lex(input);
            expect(out).to.equal(output);
        });

        it('it should properly parse nested block-quotes', () => {
            const input = `
> you go bud
> 
> > nested blocks
`;
            const output = `<blockquote>
<p>you go bud</p>

<blockquote>
<p>nested blocks</p>
</blockquote>
</blockquote>`;

            const out = new MDLexer().lex(input);
            expect(out).to.equal(output);
        });
    });
});
