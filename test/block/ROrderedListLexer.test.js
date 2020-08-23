'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const ROrderedListLexer = require('../../src/block/ROrderedListLexer');


describe('ROrderedListLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, expected) => {
            const result = ROrderedListLexer.apply(input, text => text, text => text);
            expect(result).to.equal(expected);
        };

        it('should parse a single list item', () => {
            const input = '1. test 123\n\n';
            const expected = `<ol>
<li>test 123</li>


</ol>
`;
            assertOutput(input, expected);
        });

        it('should parse a multiple line list item', () => {
            const input = '2. test 123\nthis is a line continuation\nbecause I have lots of things to say\n';
            const expected = `<ol>
<li>test 123
this is a line continuation
because I have lots of things to say</li>
</ol>
`;
            assertOutput(input, expected);
        });

        it('should parse a multiple list items with mixed markers', () => {
            const input = `4. test 123
4) hello
`;

            const expected = `<ol>
<li>test 123</li>

<li>hello</li>
</ol>
`;
            assertOutput(input, expected);
        });

        it('should allow multiline and single line list items', () => {
            const input =
                `1. test 123
Cool! maybe this will work!
2. hello
`;

            const output = `<ol>
<li>test 123
Cool! maybe this will work!</li>

<li>hello</li>
</ol>
`;

            assertOutput(input, output);
        });

        it('should ignore text preceeding and proceeding the list', () => {
            const input =
                `
There is a paragraph before the list
it's pretty long!

1. test 123
Cool! maybe this will work!


There's also a paragraph following the list!
It also has more than
one line!
`;

            const output =
                `
There is a paragraph before the list
it's pretty long!

<ol>
<li>test 123
Cool! maybe this will work!</li>


</ol>

There's also a paragraph following the list!
It also has more than
one line!
`;

            assertOutput(input, output);
        });

        it('should allow sub-markdown', () => {
            const input =
                `
There is a paragraph before the list
it's pretty long!

2. test 123
Cool! maybe this will work! **There's other markdown in here! It could be 4) interpreted as a list!**


There's also a paragraph following the list!
It also has more than
one line!
`;

            const output =
                `
There is a paragraph before the list
it's pretty long!

<ol>
<li>test 123
Cool! maybe this will work! **There's other markdown in here! It could be 4) interpreted as a list!**</li>


</ol>

There's also a paragraph following the list!
It also has more than
one line!
`;

            assertOutput(input, output);
        });

        it('should not consume hr/setext header triggers', () => {
            const input = '---';
            const output = '---';
            assertOutput(input, output);
        });

        it('should allow a list continuation', () => {
            const input = `
1. Interesting
unfortunately this ends the list?

3. test 2
`;

            const output = `
<ol>
<li>Interesting
unfortunately this ends the list?</li>


<li>test 2</li>
</ol>
`;

            assertOutput(input, output);
        });
    });
});
