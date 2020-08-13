'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RCustomEmojiLexer = require('../../../src/regexp/inline/RCustomEmojiLexer');


describe('RCustomEmojiLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, expected) => {
            const result = RCustomEmojiLexer.apply(input);
            expect(result).to.equal(expected);
        };

        it('should parse out the correct emoji', () => {
            const input = ':rocket-flying-high:';
            const expected = '<img src="/assets/emoji/rocket-flying-high.png" alt="rocket-flying-high" class="inline-emoji" title="rocket-flying-high" />';
            assertOutput(input, expected);
        });

        it('should parse out multiple emoji when declared next to each other', () => {
            const input = ':surprised-pikachu::rocket-flying-high: this is pretty cool!';
            const expected = '<img src="/assets/emoji/surprised-pikachu.png" alt="surprised-pikachu" class="inline-emoji" title="surprised-pikachu" /><img src="/assets/emoji/rocket-flying-high.png" alt="rocket-flying-high" class="inline-emoji" title="rocket-flying-high" /> this is pretty cool!';
            assertOutput(input, expected);
        });

        it('should parse out multiple emoji when separated by a space', () => {
            const input = ':surprised-pikachu: :rocket-flying-high: this is pretty cool!';
            const expected = '<img src="/assets/emoji/surprised-pikachu.png" alt="surprised-pikachu" class="inline-emoji" title="surprised-pikachu" /> <img src="/assets/emoji/rocket-flying-high.png" alt="rocket-flying-high" class="inline-emoji" title="rocket-flying-high" /> this is pretty cool!';
            assertOutput(input, expected);
        });

        it('should not interpolate an entire sentence as an emoji', () => {
            const input = 'surprised-pikachu: this shouldn\'t work!';
            assertOutput(input, input);
        });

        it('should work for emoji with dashes', () => {
            const input = ':surprised-pikachu: this should work!';
            const expected = '<img src="/assets/emoji/surprised-pikachu.png" alt="surprised-pikachu" class="inline-emoji" title="surprised-pikachu" /> this should work!';
            assertOutput(input, expected);
        });
    });
});
