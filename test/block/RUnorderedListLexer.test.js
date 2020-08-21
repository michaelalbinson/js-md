'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RUnorderedListLexer = require('../../src/block/RUnorderedListLexer');


describe('RListLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, expected) => {
            const result = RUnorderedListLexer.apply(input, text => text, text => text);
            expect(result).to.equal(expected);
        };

        it('should parse a single list item', () => {
            const input = '- test 123\n\n';
            const expected = `<ul>
<li>test 123</li>

</ul>`;
            assertOutput(input, expected);
        });

        it('should parse a multiple line list item', () => {
            const input = '- test 123\nthis is a line continuation\nbecause I have lots of things to say\n';
            const expected = `<ul>
<li>test 123
this is a line continuation
because I have lots of things to say</li>
</ul>`;
            assertOutput(input, expected);
        });

        it('should parse a multiple list items with mixed markers', () => {
            const input = `- test 123
* hello
`;

            const expected = `<ul>
<li>test 123</li>
<li>hello</li>
</ul>`;
            assertOutput(input, expected);
        });

        it('should allow multiline and single line list items', () => {
            const input =
`- test 123
Cool! maybe this will work!
* hello
`;

            const output = `<ul>
<li>test 123
Cool! maybe this will work!</li>

<li>hello</li>
</ul>`;

            assertOutput(input, output);
        });
    });
});
