'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const REmojiLexer = require('../../src/inline/REmojiLexer');


describe('REmojiLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, expected) => {
            const result = REmojiLexer.apply(input);
            expect(result).to.equal(expected);
        };

        it('should parse out the correct emoji', () => {
            const input = ':rocket:';
            const expected = '🚀';
            assertOutput(input, expected);
        });

        it('should parse out multiple emoji when declared next to each other', () => {
            const input = ':smile::rocket: this is pretty cool!';
            const expected = '😄🚀 this is pretty cool!';
            assertOutput(input, expected);
        });

        it('should parse out multiple emoji when separated by a space', () => {
            const input = ':smile: :rocket: this is pretty cool!';
            const expected = '😄 🚀 this is pretty cool!';
            assertOutput(input, expected);
        });

        it('should not interpolate an entire sentence as an emoji', () => {
            const input = 'smile: this shouldn\'t work!';
            assertOutput(input, input);
        });

        it('should work for emoji with dashes', () => {
            const input = ':raised-eyebrow: this should work!';
            const expected = '🤨 this should work!';
            assertOutput(input, expected);
        });
    });
});
